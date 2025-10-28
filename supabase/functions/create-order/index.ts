import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Im Produktivbetrieb auf deine Domain einschränken!
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// --- Hilfsfunktion zum Bereinigen von Namensteilen für den Slug ---
function sanitizeNamePart(namePart: string): string {
  return (namePart || '')
    .toLowerCase()
    .replace(/\s+/g, '-') // Leerzeichen durch Bindestriche
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, ''); // Ungültige Zeichen entfernen
}

// --- HILFSFUNKTION FÜR PREISBERECHNUNG (SERVER-SEITIG) ---
type PriceCalculationPayload = {
  product?: 'basic' | 'premium' | 'deluxe';
  mode?: 'human' | 'pet' | 'surprise';
  pet_tag_keychain?: boolean;
  pet_tag_customEnabled?: boolean;
  total_price?: number; // Als Fallback
};

function calculateOriginalPriceFromServer(payload: PriceCalculationPayload): number {
    console.log("Calculating original price for server payload:", payload); // Zum Debuggen
    const product = payload.product;
    const mode = payload.mode;
    const pet_tag_keychain = payload.pet_tag_keychain;
    const pet_tag_customEnabled = payload.pet_tag_customEnabled;

    let price = 0;

    switch (product) {
        case "basic":
            price = 59;
            if (mode === 'pet') {
                if (pet_tag_keychain) {
                    price += 7;
                }
                if (pet_tag_customEnabled) {
                    price += 10;
                }
            }
            break;
        case "premium":
            price = 89;
            break;
        case "deluxe":
            price = 149;
            break;
        default:
            console.error("Unknown product type received in payload for price calculation:", product);
            // Fallback: Nimm den Preis, den das Frontend geschickt hat, wenn Produkt unbekannt
            return payload.total_price || 0;
    }
    console.log("Calculated original price on server:", price);
    return price;
}

console.log(`Function "create-order" up and running!`);

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let orderId: number | null = null; // Variable für die numerische ID
  let validatedDiscountCode: string | null = null; // Für das Inkrementieren am Ende

  try {
    const payload = await req.json();
    const now = new Date(); // Aktueller Zeitstempel für created_at

    // Stelle sicher, dass essentielle Payload-Daten vorhanden sind
     if (!payload.product_type || !payload.contact_name || !payload.contact_email || !payload.billing_address) {
        throw new Error("Missing essential order data in payload.");
     }


    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // --- PREIS- UND RABATTVALIDIERUNG (SERVER-SEITIG) ---
    let finalPrice = payload.total_price; // Nimm Frontend-Preis als Fallback
    const originalPrice = calculateOriginalPriceFromServer(payload); // Berechne Originalpreis IMMER neu

    if (payload.applied_discount_code) {
         const codeToCheck = payload.applied_discount_code.trim().toUpperCase();
         console.log(`Attempting to validate discount code: ${codeToCheck} on server.`);

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
                 let discountAmount = 0;
                 if (discountData.discount_type === 'fixed') {
                     discountAmount = Math.min(originalPrice, discountData.value);
                 } else if (discountData.discount_type === 'percentage') {
                     discountAmount = originalPrice * (discountData.value / 100);
                 }
                 finalPrice = Math.max(0, originalPrice - discountAmount);
                 validatedDiscountCode = codeToCheck;
                 console.log(`Server validation success. Code: ${validatedDiscountCode}, Original: ${originalPrice}, Discount: ${discountAmount}, Final: ${finalPrice}`);
             } else {
                 console.warn(`Discount code ${codeToCheck} failed server-side re-validation. Reason: active=${isActive}, expired=${isExpired}, maxUsed=${isMaxUsed}`);
                 finalPrice = originalPrice; // Ohne Rabatt fortfahren
             }
         } else {
             console.warn(`Applied discount code ${codeToCheck} not found or error during server re-validation:`, discountError);
             finalPrice = originalPrice; // Ohne Rabatt fortfahren
         }
     } else {
        finalPrice = originalPrice; // Kein Code, nimm Originalpreis
     }
     // --- ENDE PREIS- UND RABATTVALIDIERUNG ---

    // 1. Daten EINFÜGEN (mit validiertem Preis/Code, ohne Slug)
    const orderDataToInsert = {
      product_type: payload.product_type,
      options_summary: payload.options_summary || '', // Sicherstellen, dass es kein undefined ist
      total_price: finalPrice,
      subject_details: payload.subject_details || '',
      music_choice: payload.music_choice || 'Keine Auswahl',
      contact_name: payload.contact_name,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone || 'N/A',
      billing_address: payload.billing_address,
      notes: payload.notes || 'Keine Notizen',
      applied_discount_code: validatedDiscountCode,
      created_at: now.toISOString(),
      // slug wird später gesetzt
    };

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert(orderDataToInsert)
      .select('id')
      .single();

    if (insertError) {
      console.error("Error inserting order:", insertError);
      throw insertError;
    }

    orderId = insertedData.id;

    // 2. SLUG GENERIEREN
    const contactNameParts = (payload.contact_name || "").split(" ");
    const firstNameRaw = payload.human_firstName || contactNameParts[0] || ""; // Holt Vorname aus Payload oder ContactName
    const lastNameRaw = payload.human_lastName || contactNameParts.slice(1).join(" ") || ""; // Holt Nachname aus Payload oder ContactName
    const firstName = sanitizeNamePart(firstNameRaw);
    const lastName = sanitizeNamePart(lastNameRaw);
    let baseSlug = `${orderId}`;
    if (firstName) baseSlug += `_${firstName}`;
    if (lastName) baseSlug += `_${lastName}`;
    let finalSlug = baseSlug;

    // 3. Zeile AKTUALISIEREN mit dem Slug
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ slug: finalSlug })
      .eq('id', orderId);

    if (updateError) {
       console.error(`Error updating order ${orderId} with slug ${finalSlug}:`, updateError);
       if (updateError.code === '23505') { // Unique constraint für Slug verletzt
           console.warn(`Slug ${finalSlug} already exists. Trying with suffix.`);
           const uniqueSuffix = Math.random().toString(36).substring(2, 7);
           finalSlug = `${baseSlug}-${uniqueSuffix}`;
           const { error: retryUpdateError } = await supabaseAdmin
               .from('orders')
               .update({ slug: finalSlug })
               .eq('id', orderId);
           if (retryUpdateError) {
               console.error(`Retry updating slug for order ${orderId} failed:`, retryUpdateError);
               // Fahre trotzdem fort, Slug bleibt null in DB, aber Logge Fehler
           } else {
                console.log(`Successfully updated slug for order ${orderId} on retry: ${finalSlug}`);
           }
       } else {
          // Logge andere Update-Fehler, aber fahre fort
           console.error(`Non-unique constraint error updating slug for order ${orderId}:`, updateError);
       }
    } else {
         console.log(`Successfully updated slug for order ${orderId}: ${finalSlug}`);
    }

    // 4. Rabattcode-Nutzung inkrementieren (falls einer validiert wurde)
    if (validatedDiscountCode) {
        console.log(`Incrementing usage for code: ${validatedDiscountCode}`);
        const { error: rpcError } = await supabaseAdmin.rpc('increment_discount_usage', {
            code_to_increment: validatedDiscountCode
        });
        if (rpcError) {
            console.error(`Failed to increment usage count for code ${validatedDiscountCode}:`, rpcError);
        } else {
            console.log(`Successfully incremented usage for code: ${validatedDiscountCode}`);
        }
    }

    // 5. BEIDE IDs zurückgeben (numerische ID und finaler Text-Slug)
    // Stelle sicher, dass finalSlug einen Wert hat, auch wenn das Update fehlschlug
    return new Response(JSON.stringify({ orderId: orderId, orderSlug: finalSlug || baseSlug }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in create-order function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage, orderIdAttempted: orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500, // Eher 500 bei serverseitigen Fehlern
    });
  }
});