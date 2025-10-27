import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function "finalize-order" up and running!`);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Daten vom Frontend empfangen
    const { orderId, uploadedFilePaths, previewFilePath } = await req.json();

    if (!orderId || !Array.isArray(uploadedFilePaths)) {
      throw new Error("orderId and uploadedFilePaths (array) are required.");
    }

    // 2. Supabase Admin Client erstellen
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // 3. Datenbankeintrag aktualisieren (nur Dateipfade)
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        uploaded_files: uploadedFilePaths,
        preview_file_path: previewFilePath || null // Setze auf null, falls nicht vorhanden
      })
      .eq('id', orderId) // Nur den spezifischen Eintrag
      .select() // Optional: Um zu prüfen, ob der Eintrag existiert/aktualisiert wurde
      .single(); // Erwarte genau einen Treffer

    // 4. Fehlerbehandlung
    if (updateError) {
       console.error("Error updating order:", updateError);
       // Spezifischer Fehler, falls die orderId nicht gefunden wurde
       if (updateError.code === 'PGRST116') {
           return new Response(JSON.stringify({ error: `Order with ID ${orderId} not found.` }), {
               headers: { ...corsHeaders, 'Content-Type': 'application/json' },
               status: 404, // Not Found
           });
       }
       // Andere Datenbankfehler
       throw updateError;
    }

    // 5. Erfolgsantwort senden
    console.log(`Order ${orderId} successfully finalized with file paths.`);
    return new Response(JSON.stringify({ success: true, orderId: orderId }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error creating order:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});