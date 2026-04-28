import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const adminPassword = req.headers.get('x-admin-password')
  if (adminPassword !== Deno.env.get('ADMIN_PASSWORD')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 })
  }

  try {
    const { orderId } = await req.json()
    if (!orderId) throw new Error('orderId is required')

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { data: order, error: fetchError } = await supabaseAdmin
      .from('customer_orders')
      .select('slug, contact_email')
      .eq('id', orderId)
      .single()

    if (fetchError) throw fetchError

    const { error: updateError } = await supabaseAdmin
      .from('customer_orders')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', orderId)

    if (updateError) throw updateError

    const albumUrl = `${Deno.env.get('SITE_URL') ?? 'https://memoramoments.ch'}/album/${order.slug}`

    // No customer notification mail — customer receives the NFC tag by post
    // with the album link pre-programmed on it.

    return new Response(
      JSON.stringify({ success: true, albumUrl }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
  }
})
