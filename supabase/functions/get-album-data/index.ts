import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let albumSlug
    try {
        const body = await req.json()
        albumSlug = body.albumSlug
    } catch (e) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }

    if (!albumSlug) throw new Error("albumSlug is required.")

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // 1. Zuerst in der normalen 'orders' Tabelle suchen
    let { data, error } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice')
      .eq('slug', albumSlug)
      .single()

    // 2. Wenn nicht gefunden, in 'partner_orders' suchen
    if (!data || error) {
       const { data: partnerData, error: partnerError } = await supabaseAdmin
        .from('partner_orders')
        .select('canva_link, contact_name, music_choice') // Spalten heißen hier etwas anders
        .eq('slug', albumSlug)
        .single()
      
      if (partnerData && !partnerError) {
        // Daten normalisieren, damit das Frontend sie versteht
        data = {
          canva_link: partnerData.canva_link,
          subject_details: partnerData.contact_name, // Mapping auf Frontend-Erwartung
          music_choice: partnerData.music_choice
        }
        error = null // Fehler zurücksetzen, da wir was gefunden haben
      }
    }

    if (error || !data) {
      return new Response(JSON.stringify({ error: "Album not found." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    const error = err as any
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})