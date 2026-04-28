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

  const url = new URL(req.url)
  const statusFilter = url.searchParams.get('status')
  // pass ?includeTest=false to exclude test orders
  const includeTest = url.searchParams.get('includeTest') !== 'false'

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    let query = supabaseAdmin
      .from('customer_orders')
      .select(
        'id, slug, subject_type, subject_name, birth_date, passing_date, dedication, ' +
        'album_style, music_choice, uploaded_files, album_layout, ' +
        'contact_name, contact_email, contact_phone, shipping_address, shipping_zone, ' +
        'price_chf, payment_status, status, is_test, ' +
        'created_at, updated_at, published_at'
      )
      .order('created_at', { ascending: false })

    if (statusFilter) query = query.eq('status', statusFilter)
    if (!includeTest) query = query.eq('is_test', false)

    const { data, error } = await query
    if (error) throw error

    return new Response(JSON.stringify({ orders: data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
  }
})
