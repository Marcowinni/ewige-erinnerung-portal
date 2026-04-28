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
    const { orderId, albumLayout, albumStyle } = await req.json()
    if (!orderId || !albumLayout) throw new Error('orderId and albumLayout are required')

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const updateData: Record<string, unknown> = {
      album_layout: albumLayout,
      status: 'in-progress',
    }
    if (albumStyle) updateData.album_style = albumStyle

    const { error } = await supabaseAdmin.from('customer_orders').update(updateData).eq('id', orderId)
    if (error) throw error

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
  }
})
