import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { orderId, uploadedFilePaths } = await req.json()
    if (!orderId || !Array.isArray(uploadedFilePaths)) {
      throw new Error('orderId and uploadedFilePaths (array) are required.')
    }
    if (uploadedFilePaths.length === 0) {
      return new Response(JSON.stringify({ success: true, orderId, count: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Atomic append via Postgres function — avoids read/merge/write races
    const { data, error } = await supabaseAdmin.rpc('append_customer_order_files', {
      order_id: orderId,
      new_files: uploadedFilePaths,
    })

    if (error) {
      if (error.message?.includes('not found')) {
        return new Response(JSON.stringify({ error: `Order ${orderId} not found.` }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        })
      }
      throw error
    }

    const finalCount = Array.isArray(data) ? data.length : 0

    return new Response(JSON.stringify({ success: true, orderId, count: finalCount }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
