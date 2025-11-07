// supabase/functions/create-order/index.ts

import { createClient } from '@supabase/supabase-js';

// Definiert die CORS-Header, um Anfragen von deinem Frontend zu erlauben
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Im Produktivbetrieb auf deine Domain einschränken!
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Hilfsfunktion: Slug-Erstellung ---
function sanitizeNamePart(namePart: string): string {
  return (namePart || '')
    .toLowerCase()
    .replace(/\s+/g, '-') // Leerzeichen durch Bindestriche
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, ''); // Alle anderen ungültigen Zeichen entfernen
}

// --- Hilfsfunktion: Preisberechnung (Warenwert) ---
type PriceCalculationPayload = {
  product?: 'basic' | 'premium' | 'deluxe';
  mode?: 'human' | 'pet' | 'surprise';
  pet_tag_keychain?: boolean;
  pet_tag_customEnabled?: boolean;
  total_price?: number; // Dient als Fallback, falls Produkt unbekannt
};

function calculateOriginalPriceFromServer(payload: PriceCalculationPayload): number {
    console.log("Berechne Originalpreis (Server):", payload);
    const { product, mode, pet_tag_keychain, pet_tag_customEnabled } = payload;
    let price = 0;

    switch (product) {
        case "basic":
            price = 59; 
            if (mode === 'pet') {
                if (pet_tag_keychain) price += 7;
                if (pet_tag_customEnabled) price += 10;
            }
            break;
        case "premium":
            price = 89; 
            break;
        case "deluxe":
            price = 149; 
            break;
        default:
            console.error("Unbekannter Produkttyp für Preisberechnung:", product);
            return payload.total_price || 0; // Fallback
    }
    console.log("Berechneter Originalpreis (Server):", price);
    return price;
}

// --- Hilfsfunktion: Versandkostenberechnung ---

// Definiert den Produkttyp-Schlüssel (wird für die Logik benötigt)
type ProductKey = 'basic' | 'premium' | 'deluxe';

// 1. Definiert die neuen gestaffelten Preise
const SHIPPING_COSTS = {
  CH: {
    basic: 0.00,
    premium: 0.00,
    deluxe: 0.00,
  },
  EU: {
    basic: 3.10,   // Tag Europa
    premium: 6.00,  // Frame Europa
    deluxe: 15.00,  // Deluxe Europa
  },
  WORLD: {
    basic: 4.20,   // Tag Welt
    premium: 12.00, // Frame Welt
    deluxe: 27.00,  // Deluxe Welt
  }
};

/**
 * Ermittelt die Versandzone (CH, EU oder Welt) 
 */
function getShippingZone(countryCode: string | undefined): 'CH' | 'EU' | 'WORLD' {
  // Standard-Fallback
  if (!countryCode) return 'CH';

  const code = countryCode.toUpperCase();

  // 1. Zone CH
  if (code === 'CH') {
    return 'CH';
  }

  // 2. Zone EU (Prüft nur noch Kürzel)
  const euCodes = [
    'DE', 'FR', 'IT', 'AT', 'ES', 'PT', 'NL', 'BE', 'LU', 'DK', 'SE', 'FI', 'PL', 'CZ', 
    'SK', 'HU', 'SI', 'HR', 'GR', 'IE', 'LT', 'LV', 'EE', 'MT', 'CY', 'RO', 'BG', 
    'NO', 'GB', 'LI' 
  ];
  if (euCodes.includes(code)) {
    return 'EU';
  }

  // 3. Zone WORLD (Alles andere)
  return 'WORLD';
}

/**
 * Berechnet die finalen Versandkosten basierend auf Land UND Produkttyp.
 */
function calculateShippingCost(country: string | undefined, product: ProductKey | undefined): number {
    const zone = getShippingZone(country);
    
    if (!product) {
        // Fallback, falls Produkt aus irgendeinem Grund nicht übergeben wurde
        console.warn("calculateShippingCost: Produkt-Typ fehlt, verwende 'basic' als Fallback.");
        return SHIPPING_COSTS[zone]['basic']; 
    }
    
    // Greift auf die verschachtelte Preisstruktur zu (z.B. SHIPPING_COSTS['EU']['premium'])
    return SHIPPING_COSTS[zone][product];
}

// Startmeldung der Supabase Function
console.log(`Function "create-order" up and running!`);

// Haupt-Handler für Deno
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let orderId: number | null = null; 
  let validatedDiscountCode: string | null = null; 

  try {
    const payload = await req.json();
    const now = new Date(); 

    // Validierung der minimal notwendigen Daten
    if (!payload.product_type || !payload.contact_name || !payload.contact_email || !payload.billing_address || !payload.billing_address.full_address || !payload.billing_address.country) {
        throw new Error("Essentielle Bestelldaten fehlen (Produkt, Kontakt oder Rechnungsinfo unvollständig).");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // --- PREIS-, RABATT- UND VERSANDBERECHNUNG (SERVER-SEITIG) ---

    // 1. Warenwert (Originalpreis) berechnen
    const originalPrice = calculateOriginalPriceFromServer(payload);
    
    // 2. Versandkosten berechnen
    const country = payload.billing_address.country;
    const shippingCost = calculateShippingCost(country, payload.product);
    
    // 3. Rabatt validieren und berechnen
    let discountAmount = 0;
    
    if (payload.applied_discount_code) {
      const codeToCheck = payload.applied_discount_code.trim().toUpperCase();
      console.log(`Validiere Rabattcode (Server): ${codeToCheck}`);

      const { data: discountData, error: discountError } = await supabaseAdmin
          .from('discount_codes')
          .select('discount_type, value, is_active, valid_until, max_uses, times_used')
          .eq('code', codeToCheck)
          .single();

      if (!discountError && discountData) {
        const isActive = discountData.is_active;
        const isExpired = discountData.valid_until && new Date(discountData.valid_until) < now;
        const isMaxUsed = discountData.max_uses !== null && discountData.times_used >= discountData.max_uses;

        if (isActive && !isExpired && !isMaxUsed) {
            if (discountData.discount_type === 'fixed') {
                discountAmount = Math.min(originalPrice, discountData.value);
            } else if (discountData.discount_type === 'percentage') {
                discountAmount = originalPrice * (discountData.value / 100);
            }
            validatedDiscountCode = codeToCheck; 
            console.log(`Rabatt validiert. Code: ${validatedDiscountCode}, Rabatt: ${discountAmount}`);
        } else {
            console.warn(`Rabattcode ${codeToCheck} nicht gültig (Server). Grund: active=${isActive}, expired=${isExpired}, maxUsed=${isMaxUsed}`);
        }
      } else {
          console.warn(`Rabattcode ${codeToCheck} nicht gefunden (Server):`, discountError?.message);
      }
    }

    // 4. Endpreis berechnen: (Warenwert - Rabatt + Versand)
    // KORREKTUR: shippingCost muss hier addiert werden!
    const finalPrice = Math.max(0, originalPrice - discountAmount + shippingCost);
    console.log(`Finale Preisberechnung (Server): Warenwert ${originalPrice} - Rabatt ${discountAmount} + Versand ${shippingCost} = ${finalPrice}`);
    
    // --- ENDE PREISBERECHNUNG ---

    // 1. Daten in 'orders'-Tabelle einfügen
    // Dieses Objekt MUSS exakt den Spalten in deiner Supabase-DB entsprechen
    const orderDataToInsert = {
      product_type: payload.product_type,
      options_summary: payload.options_summary || '',
      
      // Preis-Spalten
      total_price: finalPrice, 
      shipping_cost: shippingCost, // <-- Benötigt Spalte 'shipping_cost' (numeric)
      applied_discount_code: validatedDiscountCode, // <-- Benötigt Spalte 'applied_discount_code' (text)

      // Detail-Spalten
      subject_details: payload.subject_details || '',
      music_choice: payload.music_choice || 'Keine Auswahl',
      album_style: payload.selectedCalendarStyle || 'modern', // <-- Benötigt Spalte 'album_style' (text)

      // Kontakt-Spalten
      contact_name: payload.contact_name,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone || 'N/A',
      
      // Adress-Spalten
      billing_address: payload.billing_address.full_address, 
      billing_country: country, 
      
      notes: payload.notes || 'Keine Notizen',
      created_at: now.toISOString(),

      payment_status: 'pending', // Anfangsstatus
      
      
    };

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert(orderDataToInsert)
      .select('id') // Holt die ID der neu erstellten Zeile
      .single();

    if (insertError) {
      console.error("Fehler beim Einfügen der Bestellung:", insertError);
      throw insertError; // Dies löst den 'non-2xx' Fehler aus
    }

    orderId = insertedData.id;

    // 2. Slug (URL-Name) generieren
    const contactNameParts = (payload.contact_name || "").split(" ");
    const firstNameRaw = payload.human_firstName || contactNameParts[0] || "";
    const lastNameRaw = payload.human_lastName || contactNameParts.slice(1).join(" ") || "";
    const firstName = sanitizeNamePart(firstNameRaw);
    const lastName = sanitizeNamePart(lastNameRaw);
    
    let baseSlug = `${orderId}`;
    if (firstName) baseSlug += `_${firstName}`;
    if (lastName) baseSlug += `_${lastName}`;
    let finalSlug = baseSlug;

    // 3. Bestellung mit dem generierten Slug aktualisieren
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ slug: finalSlug })
      .eq('id', orderId);

    if (updateError) {
      console.error(`Fehler beim Aktualisieren des Slugs für Order ${orderId}:`, updateError);
      
      if (updateError.code === '23505') { 
          console.warn(`Slug ${finalSlug} existiert bereits. Versuche Suffix...`);
          const uniqueSuffix = Math.random().toString(36).substring(2, 7);
          finalSlug = `${baseSlug}-${uniqueSuffix}`;
          
          const { error: retryUpdateError } = await supabaseAdmin
              .from('orders')
              .update({ slug: finalSlug })
              .eq('id', orderId);
              
          if (retryUpdateError) {
              console.error(`Erneutes Slug-Update für Order ${orderId} fehlgeschlagen:`, retryUpdateError);
          } else {
              console.log(`Slug-Update für Order ${orderId} erfolgreich (Retry): ${finalSlug}`);
          }
      }
    } else {
        console.log(`Slug-Update für Order ${orderId} erfolgreich: ${finalSlug}`);
    }
    /*
    // 4. Rabattcode-Nutzung erhöhen (falls einer verwendet wurde)
    if (validatedDiscountCode) {
        console.log(`Erhöhe Nutzung für Code: ${validatedDiscountCode}`);
        const { error: rpcError } = await supabaseAdmin.rpc('increment_discount_usage', {
            code_to_increment: validatedDiscountCode
        });
        if (rpcError) {
            console.error(`Fehler beim Erhöhen der Code-Nutzung ${validatedDiscountCode}:`, rpcError);
        } else {
            console.log(`Nutzung für Code ${validatedDiscountCode} erfolgreich erhöht.`);
        }
    }
    */
    // 5. Erfolg!
    return new Response(JSON.stringify({ 
      orderId: orderId, 
      orderSlug: finalSlug || baseSlug,
      finalPrice: finalPrice
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    // Globale Fehlerbehandlung
    console.error('Globaler Fehler in create-order function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage, orderIdAttempted: orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, 
    });
  }
});