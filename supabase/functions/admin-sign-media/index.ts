import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password',
}

const SIGNED_URL_EXPIRY = 7200 // 2 hours — admin editing session

// Returns short-lived signed URLs for the given storage paths. Guarded by the
// admin password so a private bucket needs no anon read access.
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
    const { paths } = await req.json()
    if (!Array.isArray(paths) || paths.length === 0) {
      return new Response(JSON.stringify({ urls: {} }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { data, error } = await supabaseAdmin.storage
      .from('uploads')
      .createSignedUrls(paths as string[], SIGNED_URL_EXPIRY)
    if (error) throw error

    const urls: Record<string, string> = {}
    for (const row of data ?? []) {
      if (row?.path && row?.signedUrl) urls[row.path] = row.signedUrl
    }

    return new Response(JSON.stringify({ urls }), {
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
