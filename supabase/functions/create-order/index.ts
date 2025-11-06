// supabase/functions/create-order/index.ts

import { createClient } from '@supabase/supabase-js';

// Definiert die CORS-Header, um Anfragen von deinem Frontend zu erlauben
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Im Produktivbetrieb auf deine Domain einschränken!
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Hilfsfunktion: Slug-Erstellung ---
// Bereinigt Textteile (z.B. Namen) für die Erstellung einer URL-freundlichen "Slug"
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
// Definiert die Typen der Daten, die vom Frontend für die Preisberechnung erwartet werden
type PriceCalculationPayload = {
  product?: 'basic' | 'premium' | 'deluxe';
  mode?: 'human' | 'pet' | 'surprise';
  pet_tag_keychain?: boolean;
  pet_tag_customEnabled?: boolean;
  total_price?: number; // Dient als Fallback, falls Produkt unbekannt
};

/**
 * Berechnet den *originalen* Preis (reiner Warenwert) serverseitig.
 * Dies ist wichtig, um Manipulationen der Preise vom Frontend zu verhindern.
 */
function calculateOriginalPriceFromServer(payload: PriceCalculationPayload): number {
    console.log("Berechne Originalpreis (Server):", payload);
    const { product, mode, pet_tag_keychain, pet_tag_customEnabled } = payload;
    let price = 0;

    switch (product) {
        case "basic":
            price = 59; // Dein Preis aus dem Skript
            if (mode === 'pet') {
                if (pet_tag_keychain) price += 7;
                if (pet_tag_customEnabled) price += 10;
            }
            break;
        case "premium":
            price = 89; // Dein Preis aus dem Skript
            break;
        case "deluxe":
            price = 149; // Dein Preis aus dem Skript
            break;
        default:
            console.error("Unbekannter Produkttyp für Preisberechnung:", product);
            return payload.total_price || 0; // Fallback
    }
    console.log("Berechneter Originalpreis (Server):", price);
    return price;
}

// --- Hilfsfunktion: Versandkostenberechnung ---
// Definiert die Versandkostenpauschalen
const SHIPPING_COSTS = {
  CH: 0.00,
  INTL: 15.00, // Dein internationaler Preis aus dem Skript
};

/**
 * Ermittelt die Versandzone (Schweiz oder International) anhand des Landesnamens.
 */
function getShippingZone(country: string | undefined): 'CH' | 'INTL' {
  if (!country) return 'CH'; // Standard (Schweiz)
  const normalizedCountry = country.trim().toUpperCase();
  
  // Liste gängiger Bezeichnungen für die Schweiz
  const swissNames = ['SCHWEIZ', 'SWITZERLAND', 'SUISSE', 'SVIZZERA', 'CH'];
  
  if (swissNames.includes(normalizedCountry)) {
    return 'CH';
  }
  // Alle anderen Länder gelten als International
  return 'INTL';
}

/**
 * Berechnet die finalen Versandkosten.
 */
function calculateShippingCost(country: string | undefined): number {
    const zone = getShippingZone(country);
    return SHIPPING_COSTS[zone];
}

// Startmeldung der Supabase Function
console.log(`Function "create-order" up and running!`);

// Haupt-Handler für Deno (nimmt alle Anfragen entgegen)
Deno.serve(async (req) => {
  // Behandelt CORS Preflight-Anfragen (OPTIONS-Methode)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let orderId: number | null = null; // Platzhalter für die ID der erstellten Bestellung
  let validatedDiscountCode: string | null = null; // Platzhalter für einen gültigen Rabattcode

  try {
    // Empfängt die Daten (Payload) vom Frontend
    const payload = await req.json();
    const now = new Date(); // Aktueller Zeitstempel

    // Validierung der minimal notwendigen Daten vom Frontend
    // WICHTIG: Das Frontend muss 'billing_address' als Objekt senden: { full_address: "...", country: "..." }
    if (!payload.product_type || !payload.contact_name || !payload.contact_email || !payload.billing_address || !payload.billing_address.full_address || !payload.billing_address.country) {
        throw new Error("Essentielle Bestelldaten fehlen (Produkt, Kontakt oder Rechnungsinfo unvollständig).");
    }

    // Erstellt den Supabase Admin-Client (hat volle DB-Rechte)
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
    const shippingCost = calculateShippingCost(country);
    
    // 3. Rabatt validieren und berechnen
    let discountAmount = 0;
    let finalPrice = 0; // Wird nachfolgend berechnet

    if (payload.applied_discount_code) {
      const codeToCheck = payload.applied_discount_code.trim().toUpperCase();
      console.log(`Validiere Rabattcode (Server): ${codeToCheck}`);

      // Suche den Code in der Datenbank
      const { data: discountData, error: discountError } = await supabaseAdmin
          .from('discount_codes')
          .select('discount_type, value, is_active, valid_until, max_uses, times_used')
          .eq('code', codeToCheck)
          .single();

      // Prüfe, ob der Code existiert und gültig ist
      if (!discountError && discountData) {
        const isActive = discountData.is_active;
        const isExpired = discountData.valid_until && new Date(discountData.valid_until) < now;
        const isMaxUsed = discountData.max_uses !== null && discountData.times_used >= discountData.max_uses;

        // Code ist nur gültig, wenn aktiv, nicht abgelaufen und nicht maximal genutzt
        if (isActive && !isExpired && !isMaxUsed) {
            if (discountData.discount_type === 'fixed') {
                discountAmount = Math.min(originalPrice, discountData.value);
            } else if (discountData.discount_type === 'percentage') {
                discountAmount = originalPrice * (discountData.value / 100);
            }
            validatedDiscountCode = codeToCheck; // Code für später speichern (Nutzung erhöhen)
            console.log(`Rabatt validiert. Code: ${validatedDiscountCode}, Rabatt: ${discountAmount}`);
        } else {
            console.warn(`Rabattcode ${codeToCheck} nicht gültig (Server). Grund: active=${isActive}, expired=${isExpired}, maxUsed=${isMaxUsed}`);
        }
      } else {
          console.warn(`Rabattcode ${codeToCheck} nicht gefunden (Server):`, discountError?.message);
      }
    }

    // 4. Endpreis berechnen: (Warenwert - Rabatt + Versand)
    finalPrice = Math.max(0, originalPrice - discountAmount + shippingCost);
    console.log(`Finale Preisberechnung (Server): Warenwert ${originalPrice} - Rabatt ${discountAmount} + Versand ${shippingCost} = ${finalPrice}`);
    
    // --- ENDE PREISBERECHNUNG ---

    // 1. Daten in 'orders'-Tabelle einfügen
    // (Stelle sicher, dass die Spalten 'shipping_cost' und 'billing_country' in deiner Tabelle existieren)
    const orderDataToInsert = {
      product_type: payload.product_type,
      options_summary: payload.options_summary || '',
      
      // Setzt den serverseitig berechneten Endpreis
      total_price: finalPrice, 
      // Speichert die Versandkosten separat
      shipping_cost: shippingCost, 
      // Speichert das Land separat
      billing_country: country, 

      subject_details: payload.subject_details || '',
      music_choice: payload.music_choice || 'Keine Auswahl',
      album_style: payload.selectedCalendarStyle || 'modern',

      contact_name: payload.contact_name,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone || 'N/A',
      
      // Speichert die formatierte Adresse aus dem Payload-Objekt
      billing_address: payload.billing_address.full_address, 
      
      notes: payload.notes || 'Keine Notizen',
      applied_discount_code: validatedDiscountCode,
      created_at: now.toISOString(),
      
    };

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert(orderDataToInsert)
      .select('id') // Holt die ID der neu erstellten Zeile
      .single();

    if (insertError) {
      console.error("Fehler beim Einfügen der Bestellung:", insertError);
      throw insertError;
    }

    orderId = insertedData.id;

    // 2. Slug (URL-Name) generieren
    // Baut den Slug aus der ID und den Namen (falls vom Frontend übermittelt)
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
      
      // Fallback, falls der Slug bereits existiert (Kollision)
      if (updateError.code === '23505') { 
          console.warn(`Slug ${finalSlug} existiert bereits. Versuche Suffix...`);
          const uniqueSuffix = Math.random().toString(36).substring(2, 7);
          finalSlug = `${baseSlug}-${uniqueSuffix}`;
          
          // Zweiter Versuch mit Suffix
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

    // 4. Rabattcode-Nutzung erhöhen (falls einer verwendet wurde)
    if (validatedDiscountCode) {
        console.log(`Erhöhe Nutzung für Code: ${validatedDiscountCode}`);
        // Ruft eine Datenbank-Funktion 'increment_discount_usage' auf
        const { error: rpcError } = await supabaseAdmin.rpc('increment_discount_usage', {
            code_to_increment: validatedDiscountCode
        });
        if (rpcError) {
            console.error(`Fehler beim Erhöhen der Code-Nutzung ${validatedDiscountCode}:`, rpcError);
        } else {
            console.log(`Nutzung für Code ${validatedDiscountCode} erfolgreich erhöht.`);
        }
    }

    // 5. Erfolg! Sende die numerische ID und den Text-Slug zurück ans Frontend
    return new Response(JSON.stringify({ 
      orderId: orderId, 
      orderSlug: finalSlug || baseSlug // Fallback auf baseSlug, falls Update fehlschlug
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    // Globale Fehlerbehandlung für die gesamte Funktion
    console.error('Globaler Fehler in create-order function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage, orderIdAttempted: orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});