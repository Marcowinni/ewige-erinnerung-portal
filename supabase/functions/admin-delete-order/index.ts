import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password',
}

// Deletes a customer order and its storage media using the service role, so
// the bucket needs no anon DELETE access. Guarded by the admin password.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const adminPassword = req.headers.get('x-admin-password')
  if (adminPassword !== Deno.env.get('ADMIN_PASSWORD')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 401,
    })
  }

  try {
    const { orderId } = await req.json()
    if (!orderId) {
      return new Response(JSON.stringify({ error: 'orderId is required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Look up the order's media paths first
    const { data: order, error: fetchErr } = await supabaseAdmin
      .from('customer_orders')
      .select('uploaded_files')
      .eq('id', orderId)
      .maybeSingle()
    if (fetchErr) throw fetchErr

    const files = Array.isArray(order?.uploaded_files)
      ? (order!.uploaded_files as { path?: string }[])
      : []
    const paths = files.map((f) => f?.path).filter((p): p is string => Boolean(p))

    if (paths.length > 0) {
      const { error: storageErr } = await supabaseAdmin.storage.from('uploads').remove(paths)
      if (storageErr) console.warn('Storage cleanup error:', storageErr.message)
    }

    const { error: delErr } = await supabaseAdmin.from('customer_orders').delete().eq('id', orderId)
    if (delErr) throw delErr

    return new Response(JSON.stringify({ success: true, removed: paths.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
