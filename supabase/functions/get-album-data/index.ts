import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

console.log(`Function "get-album-data" up and running!`);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Empfange den 'albumSlug' (umbenannt von albumId für Klarheit)
    const { albumSlug } = await req.json(); // Erwartet jetzt 'albumSlug'

    if (!albumSlug) {
      throw new Error("albumSlug is required in the request body.");
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '', // Holt URL aus Umgebungsvariablen
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Holt Key aus Umgebungsvariablen
      { auth: { persistSession: false } }
    );

    // 3. Frage über die 'slug'-Spalte ab
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice')
      .eq('slug', albumSlug) // Suche nach dem Slug
      .single();

    // 4. Fehlerbehandlung (bleibt ähnlich)
    if (error || !data) {
      const status = (error && error.code === 'PGRST116') || !data ? 404 : 500;
      const message = status === 404 ? "Album not found." : (error?.message || "Failed to fetch album data.");
      console.error(`Error fetching album for slug ${albumSlug}:`, error || "Not found");
      return new Response(JSON.stringify({ error: message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: status,
      });
    }

    // 5. Gib die Daten zurück
    return new Response(JSON.stringify(data), {
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