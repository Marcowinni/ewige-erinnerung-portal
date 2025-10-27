import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hilfsfunktion zum Bereinigen von Namensteilen für den Slug
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

console.log(`Function "create-order" up and running!`);

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  let orderId: number | null = null; // Variable für die numerische ID

  try {
    const payload = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } } // Auth-Teil hinzugefügt
    );

    // 1. Daten EINFÜGEN (ohne Slug) und die numerische ID erhalten
    const orderDataToInsert = {
      product_type: payload.product_type,
      options_summary: payload.options_summary,
      total_price: payload.total_price,
      subject_details: payload.subject_details,
      music_choice: payload.music_choice,
      contact_name: payload.contact_name,
      contact_email: payload.contact_email,
      contact_phone: payload.contact_phone,
      billing_address: payload.billing_address,
      notes: payload.notes,
      // slug wird später gesetzt
    };

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from('orders')
      .insert(orderDataToInsert)
      .select('id') // Hol die generierte numerische ID
      .single();

    if (insertError) {
      console.error("Error inserting order:", insertError);
      throw insertError; // Fehler beim initialen Einfügen
    }

    orderId = insertedData.id; // Speichere die numerische ID

    // 2. SLUG GENERIEREN
    // Namen extrahieren (Annahme: contact_name enthält "Vorname Nachname")
    const contactNameParts = (payload.contact_name || "").split(" ");
    const firstNameRaw = payload.human_firstName || contactNameParts[0] || "";
    const lastNameRaw = payload.human_lastName || contactNameParts.slice(1).join(" ") || "";

    const firstName = sanitizeNamePart(firstNameRaw);
    const lastName = sanitizeNamePart(lastNameRaw);

    let baseSlug = `${orderId}`; // Beginne mit der numerischen ID
    if (firstName) baseSlug += `_${firstName}`;
    if (lastName) baseSlug += `_${lastName}`;

    let finalSlug = baseSlug;

    // 3. Zeile AKTUALISIEREN mit dem generierten Slug
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ slug: finalSlug })
      .eq('id', orderId); // Update genau die Zeile, die wir gerade erstellt haben

    if (updateError) {
       console.error(`Error updating order ${orderId} with slug ${finalSlug}:`, updateError);
       // Optional: Versuche mit Suffix bei Unique Constraint Fehler (23505)
       if (updateError.code === '23505') {
           console.warn(`Slug ${finalSlug} already exists. Trying with suffix.`);
           const uniqueSuffix = Math.random().toString(36).substring(2, 7);
           finalSlug = `${baseSlug}-${uniqueSuffix}`;
           const { error: retryUpdateError } = await supabaseAdmin
               .from('orders')
               .update({ slug: finalSlug })
               .eq('id', orderId);
           if (retryUpdateError) {
               console.error(`Retry updating slug for order ${orderId} failed:`, retryUpdateError);
               // Hier entscheiden, ob der Fehler kritisch ist oder die ID trotzdem zurückgegeben werden soll
               throw retryUpdateError; // Oder nur loggen und weitermachen
           }
       } else {
           throw updateError; // Anderen Update-Fehler weiterwerfen
       }
    }

    // 4. BEIDE IDs zurückgeben (numerische ID und Text-Slug)
    return new Response(JSON.stringify({ orderId: orderId, orderSlug: finalSlug }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in create-order function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    // Wenn ein Fehler auftritt, bevor die ID generiert wurde, ist orderId null
    return new Response(JSON.stringify({ error: errorMessage, orderIdAttempted: orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, // Oder 500
    });
  }
});