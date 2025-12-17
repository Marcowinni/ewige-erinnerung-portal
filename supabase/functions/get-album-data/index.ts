import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS Headers definieren
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log(`Function "get-album-data" up and running!`)

Deno.serve(async (req) => {
  // 1. Handle CORS preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Request Body parsen
    let albumSlug
    try {
        const body = await req.json()
        albumSlug = body.albumSlug
    } catch (e) {
        // Hier geben wir direkt JSON zurück, falls Parsing fehlschlägt
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }

    if (!albumSlug) {
      throw new Error("albumSlug is required in the request body.")
    }

    // 3. Supabase Client initialisieren
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // 4. Datenbankabfrage
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice')
      .eq('slug', albumSlug)
      .single()

    // 5. Fehlerbehandlung
    if (error || !data) {
      console.error(`Error fetching album for slug ${albumSlug}:`, error)
      
      // Typ-sichere Prüfung auf den Fehlercode
      // Wir casten 'error' zu 'any', um den TypeScript 'never' Fehler zu vermeiden
      const errCode = (error as any)?.code
      const isNotFound = (errCode === 'PGRST116') || !data
      
      const status = isNotFound ? 404 : 500
      const dbErrorMessage = (error as any)?.message || "Failed to fetch album data."
      const message = isNotFound ? "Album not found." : dbErrorMessage

      return new Response(JSON.stringify({ error: message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: status,
      })
    }

    // 6. Erfolgreiche Antwort zurückgeben
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    // Catch-Variable ist 'unknown', wir casten sicherheitshalber
    const error = err as any
    console.error('Unexpected error:', error)
    
    const errorMessage = error?.message || String(error || 'An unknown error occurred')
    
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})