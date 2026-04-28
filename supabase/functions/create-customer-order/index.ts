import { createClient } from '@supabase/supabase-js'
import { makeUniqueSlug } from '../_shared/slug.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SHIPPING_COSTS: Record<string, number> = { CH: 9, EU: 19, WORLD: 29 }

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const {
      subjectType,
      subjectName,
      albumStyle,
      dedication,
      birthDate,
      passingDate,
      music,
      uploadedFiles,
      contactEmail,
      contactName,
      contactPhone,
      shippingAddress,
      shippingZone,
      isTest,
    } = await req.json()

    if (!contactEmail) throw new Error('contactEmail is required')
    if (!subjectName) throw new Error('subjectName is required')
    if (!subjectType || !['human', 'pet'].includes(subjectType)) {
      throw new Error('subjectType must be "human" or "pet"')
    }
    if (!albumStyle || !['modern', 'classic', 'timeless'].includes(albumStyle)) {
      throw new Error('albumStyle must be "modern", "classic" or "timeless"')
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const zone: string = shippingZone ?? 'CH'
    const shippingCost = SHIPPING_COSTS[zone] ?? 9
    const totalCHF = 89 + shippingCost
    const testMode = isTest === true

    const orderPayload = {
      subject_type: subjectType,
      subject_name: subjectName,
      birth_date: birthDate || null,
      passing_date: passingDate || null,
      dedication: dedication || null,
      album_style: albumStyle,
      music_choice: music ?? null,
      uploaded_files: uploadedFiles ?? [],
      album_layout: null,
      contact_name: contactName || subjectName,
      contact_email: contactEmail,
      contact_phone: contactPhone || null,
      shipping_address: shippingAddress || null,
      shipping_zone: zone,
      price_chf: totalCHF,
      payment_status: testMode ? 'test' : 'pending',
      status: 'new',
      is_test: testMode,
    }

    let slug = await makeUniqueSlug(supabaseAdmin, subjectName, 'customer_orders')
    let insertResult = await supabaseAdmin
      .from('customer_orders')
      .insert({ slug, ...orderPayload })
      .select('id')
      .single()
    let retries = 0
    while (insertResult.error?.code === '23505' && retries < 5) {
      retries++
      slug = await makeUniqueSlug(supabaseAdmin, subjectName, 'customer_orders')
      insertResult = await supabaseAdmin
        .from('customer_orders')
        .insert({ slug, ...orderPayload })
        .select('id')
        .single()
    }

    const { data: insertData, error: insertError } = insertResult
    if (insertError) throw insertError
    if (!insertData) throw new Error('No data returned')

    const orderId = insertData.id

    // Send admin notification email — errors are silenced so order creation never fails
    // TODO: Set RESEND_API_KEY and ADMIN_EMAIL in Supabase project secrets
    try {
      const resendKey = Deno.env.get('RESEND_API_KEY')
      if (resendKey) {
        const adminEmail = Deno.env.get('ADMIN_EMAIL') ?? 'admin@memora-moments.ch'
        const siteUrl = Deno.env.get('SITE_URL') ?? 'https://memoramoments.ch'
        const pictureCount = Array.isArray(uploadedFiles) ? uploadedFiles.length : 0
        const subject = `🎨 Neue Bestellung: ${subjectName}`
        const html = `
          <h2>Neue Memora Moments Bestellung</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:4px 12px 4px 0;color:#666">Name</td><td><strong>${subjectName}</strong></td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Typ</td><td>${subjectType}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Stil</td><td>${albumStyle}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Bilder</td><td>${pictureCount}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Kontakt</td><td>${contactName || '—'} &lt;${contactEmail}&gt;</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Zone</td><td>${zone}</td></tr>
            <tr><td style="padding:4px 12px 4px 0;color:#666">Betrag</td><td>CHF ${totalCHF}</td></tr>
            ${testMode ? '<tr><td colspan="2" style="color:#b45309;font-weight:bold">TEST-Bestellung</td></tr>' : ''}
          </table>
          <p style="margin-top:16px">
            <a href="${siteUrl}/admin/album/${orderId}" style="background:#78543c;color:#fff;padding:10px 20px;border-radius:20px;text-decoration:none;font-size:13px">
              Album im Admin öffnen →
            </a>
          </p>
        `
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from: 'noreply@memora-moments.ch', to: adminEmail, subject, html }),
        })
      }
    } catch (mailErr) {
      console.warn('Admin mail failed (non-fatal):', mailErr)
    }

    if (testMode) {
      return new Response(
        JSON.stringify({ folderName: `order_${orderId}`, orderId, slug, isTest: true, totalCHF }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    return new Response(
      JSON.stringify({ folderName: `order_${orderId}`, orderId, slug, totalCHF }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: message }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 })
  }
})
