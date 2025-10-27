import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function "get-album-data" up and running!`);

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Empfange die albumId aus dem Request Body
    const { albumId } = await req.json();

    if (!albumId) {
      throw new Error("albumId is required in the request body.");
    }

    // 2. Erstelle Supabase Admin Client (mit Service Role Key)
    // Dieser umgeht RLS-Policies für den anon key.
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } } // Wichtig für Server-seitige Clients
    );

    // 3. Frage NUR die benötigten Daten sicher ab
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice') // Nur diese Spalten
      .eq('id', albumId) // Filtere nach der ID
      .single(); // Erwarte genau ein Ergebnis (oder null)

    // 4. Fehlerbehandlung (z.B. wenn Album nicht gefunden)
    if (error) {
      // Spezifischer Fehler für "nicht gefunden"
      if (error.code === 'PGRST116') { // PostgREST code for "Resource not found"
         return new Response(JSON.stringify({ error: "Album not found." }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
           status: 404,
         });
      }
      // Andere Datenbankfehler
      throw error;
    }

    if (!data) {
       return new Response(JSON.stringify({ error: "Album data not found." }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
           status: 404,
         });
    }

    // 5. Gib die erlaubten Daten zurück
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (err) { // err is 'unknown' here
    console.error('Error fetching album data:', err);

    // Safely determine the error message and status
    let errorMessage = 'An unknown error occurred.';
    let status = 500; // Default to Internal Server Error

    if (err instanceof Error) {
      errorMessage = err.message;
      // Set status to 400 only if it's an Error and the message matches
      if (err.message.includes("albumId is required")) {
        status = 400; // Bad Request
      }
    } else if (typeof err === 'string') {
      // Handle cases where a string might be thrown
      errorMessage = err;
    }
    // You could add more checks here for other types if needed (e.g., objects)

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: status, // Use the determined status
    });
  }
});