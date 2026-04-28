import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v', '.ogg']

function isMediaPath(path: string): boolean {
  const lower = path.toLowerCase()
  if (IMAGE_EXTENSIONS.some((ext) => lower.endsWith(ext))) return true
  return VIDEO_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

type PageType = 'intro' | 'outro'
interface LayoutPage {
  type: PageType
  name?: string
}

function generateAlbumLayout(subjectName: string): { pages: LayoutPage[] } {
  return {
    pages: [
      { type: 'intro', name: subjectName },
      { type: 'outro' },
    ],
  }
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let albumSlug: string
    try {
      const body = await req.json()
      albumSlug = body.albumSlug
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    if (!albumSlug) {
      return new Response(JSON.stringify({ error: 'albumSlug is required.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // 1) Try new clean customer_orders table first
    const { data: customerData } = await supabaseAdmin
      .from('customer_orders')
      .select(
        'id, slug, subject_type, subject_name, birth_date, passing_date, dedication, ' +
        'album_style, music_choice, uploaded_files, album_layout, ' +
        'contact_name, is_test, payment_status, shipping_zone, status'
      )
      .eq('slug', albumSlug)
      .maybeSingle()

    if (customerData) {
      // Show placeholder for unpublished orders
      if (customerData.status !== 'published') {
        return new Response(
          JSON.stringify({ placeholder: true, status: customerData.status }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
        )
      }

      const uploadedFiles = (customerData.uploaded_files as { path: string; caption?: string }[]) || []
      const mediaFiles = Array.isArray(uploadedFiles)
        ? uploadedFiles.filter((f) => f?.path && isMediaPath(f.path))
        : []
      const folder = `order_${customerData.id}`
      let albumLayout = customerData.album_layout as { pages: LayoutPage[] } | null
      if (!albumLayout || !Array.isArray((albumLayout as { pages?: LayoutPage[] }).pages)) {
        albumLayout = generateAlbumLayout(customerData.subject_name)
      }

      return new Response(
        JSON.stringify({
          album_type: 'native',
          source: 'customer_orders',
          subject_name: customerData.subject_name,
          subject_type: customerData.subject_type,
          dedication: customerData.dedication,
          birth_date: customerData.birth_date,
          passing_date: customerData.passing_date,
          music_choice: customerData.music_choice || 'Keine Auswahl',
          album_style: customerData.album_style || 'modern',
          is_test: customerData.is_test,
          payment_status: customerData.payment_status,
          status: customerData.status,
          image_sources: {
            bucket: 'uploads',
            folder,
            files: mediaFiles,
          },
          album_layout: albumLayout,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    // 1b) Slug exists in tag_slugs but not yet assigned → placeholder
    const { data: tagSlugData } = await supabaseAdmin
      .from('tag_slugs')
      .select('id, assigned_order_id')
      .eq('slug', albumSlug)
      .maybeSingle()

    if (tagSlugData) {
      // Slug is registered but not yet linked to a published order
      return new Response(
        JSON.stringify({ placeholder: true, status: 'unassigned' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }

    // 2) Legacy fallback: orders + partner_orders (alte Flows)
    let { data: orderData } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice, album_style, id, uploaded_files')
      .eq('slug', albumSlug)
      .maybeSingle()

    let partnerData: Record<string, unknown> | null = null
    let source: 'orders' | 'partner_orders' = 'orders'

    if (!orderData) {
      const { data: pData } = await supabaseAdmin
        .from('partner_orders')
        .select('canva_link, contact_name, music_choice, album_style, id, uploaded_files, album_layout')
        .eq('slug', albumSlug)
        .maybeSingle()
      if (pData) {
        partnerData = pData as Record<string, unknown>
        source = 'partner_orders'
      }
    }

    const record = source === 'partner_orders' ? partnerData : (orderData as Record<string, unknown> | null)
    if (!record) {
      return new Response(JSON.stringify({ error: 'Album not found.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    const subjectDetails =
      source === 'partner_orders' ? (record.contact_name as string) : (record.subject_details as string)
    const musicChoice = (record.music_choice as string) || 'Keine Auswahl'
    const albumStyle = (record.album_style as string) || 'modern'
    const canvaLink = record.canva_link as string | null

    if (canvaLink && canvaLink.trim()) {
      return new Response(
        JSON.stringify({
          album_type: 'canva',
          source,
          canva_link: canvaLink,
          subject_details: subjectDetails,
          music_choice: musicChoice,
          album_style: albumStyle,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    const uploadedFiles = (record.uploaded_files as { path: string; caption?: string }[]) || []
    const mediaFiles = Array.isArray(uploadedFiles)
      ? uploadedFiles.filter((f) => f?.path && isMediaPath(f.path))
      : []
    const folder = `order_${record.id as string | number}`

    let albumLayout = record.album_layout as { pages: LayoutPage[] } | null
    if (!albumLayout || !Array.isArray(albumLayout.pages)) {
      albumLayout = generateAlbumLayout(subjectDetails || '')
    }

    return new Response(
      JSON.stringify({
        album_type: 'native',
        source,
        subject_details: subjectDetails,
        music_choice: musicChoice,
        album_style: albumStyle,
        image_sources: {
          bucket: 'uploads',
          folder,
          files: mediaFiles,
        },
        album_layout: albumLayout,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (err) {
    const error = err as Error
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
