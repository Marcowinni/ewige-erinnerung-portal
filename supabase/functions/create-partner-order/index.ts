// Wir nutzen jetzt den Alias aus der deno.json
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Hilfsfunktion: Slug bereinigen
function sanitizeNamePart(namePart: string): string {
  return (namePart || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, '');
}

Deno.serve(async (req) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, music, style, notes } = await req.json()

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // 1. Eintrag erstellen
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('partner_orders')
      .insert({
        contact_name: name,
        music_choice: music,
        album_style: style,
        notes: notes,
        partner_key: 'flueckiger'
      })
      .select('id')
      .single()

    if (insertError) throw insertError
    if (!insertData) throw new Error("Keine Daten zurückerhalten")

    // Hier definieren wir orderId sicher
    const orderId = insertData.id
    
    // 2. Slug generieren (flue_5_max-mustermann)
    const sanitizedName = sanitizeNamePart(name)
    const slug = `flue_${orderId}_${sanitizedName}`

    // 3. Slug speichern
    const { error: updateError } = await supabaseAdmin
      .from('partner_orders')
      .update({ slug: slug })
      .eq('id', orderId)

    if (updateError) {
      console.error("Fehler beim Slug-Update:", updateError)
    }

    // 4. Ordnername für uploads-Bucket (order_{id})
    const folderName = `order_${orderId}`

    return new Response(JSON.stringify({ folderName, orderId, slug }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})