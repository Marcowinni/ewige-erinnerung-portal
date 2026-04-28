import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function sanitizeNamePart(namePart: string): string {
  return (namePart || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]/g, '')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      subjectType,
      albumStyle,
      subjectName,
      dedication,
      birthDate,
      passingDate,
      musicChoice,
      email,
      phone,
      albumLayout,
    } = await req.json()

    if (!subjectName || !email) {
      throw new Error('subjectName and email are required')
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Insert into partner_orders reusing existing table.
    // order_type='self_service' stored in subject_details JSONB alongside other meta.
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('partner_orders')
      .insert({
        contact_name: subjectName,
        music_choice: musicChoice?.value ?? 'Keine Auswahl',
        album_style: albumStyle ?? 'modern',
        notes: dedication ?? null,
        partner_key: 'self_service',
        subject_details: {
          order_type: 'self_service',
          subject_type: subjectType,
          subject_name: subjectName,
          dedication: dedication ?? null,
          birth_date: birthDate ?? null,
          passing_date: passingDate ?? null,
          music_choice: musicChoice,
          email,
          phone: phone ?? null,
        },
        album_layout: albumLayout ?? null,
      })
      .select('id')
      .single()

    if (insertError) throw insertError
    if (!insertData) throw new Error('No data returned from insert')

    const orderId = insertData.id
    const sanitizedName = sanitizeNamePart(subjectName)
    const slug = `self_${orderId}_${sanitizedName}`

    await supabaseAdmin
      .from('partner_orders')
      .update({ slug })
      .eq('id', orderId)

    const folderName = `order_${orderId}`

    // We also create a matching record in the orders table so create-checkout-session
    // can look up contact_email (it queries the orders table).
    const { data: orderRow, error: orderInsertError } = await supabaseAdmin
      .from('orders')
      .insert({
        contact_email: email,
        contact_name: subjectName,
        album_style: albumStyle ?? 'modern',
        status: 'pending',
      })
      .select('id')
      .single()

    if (orderInsertError) {
      // Non-fatal: log and continue; Stripe checkout will fail gracefully.
      console.error('Failed to insert into orders:', orderInsertError)
    }

    const stripeOrderId = orderRow?.id ?? null

    return new Response(
      JSON.stringify({ folderName, orderId, slug, stripeOrderId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
