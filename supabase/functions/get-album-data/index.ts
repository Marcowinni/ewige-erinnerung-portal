import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

function isImagePath(path: string): boolean {
  const lower = path.toLowerCase()
  return IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext))
}

type PageType = 'intro' | 'hero' | 'single' | 'polaroid' | 'overlap' | 'bento' | 'double' | 'triple' | 'grid' | 'outro'

interface LayoutPage {
  type: PageType
  name?: string
  imageIndex?: number
  imageIndices?: number[]
}

function generateAlbumLayout(
  imageFiles: { path: string; caption?: string }[],
  contactName: string
): { pages: LayoutPage[] } {
  const pages: LayoutPage[] = []
  pages.push({ type: 'intro', name: contactName })

  const count = imageFiles.length
  let idx = 0

  if (count === 0) {
    // Keine Bilder
  } else if (count === 1) {
    pages.push({ type: 'hero', imageIndex: 0 })
  } else if (count === 2) {
    pages.push({ type: 'polaroid', imageIndices: [0, 1] })
  } else if (count === 3) {
    pages.push({ type: 'overlap', imageIndices: [0, 1, 2] })
  } else {
    // 4+: Abwechslungsreicher Mix – mehr Hero, Polaroid, Overlap, weniger Grid
    const layoutCycle: PageType[] = ['hero', 'polaroid', 'overlap', 'bento', 'hero', 'overlap']
    let cycleIdx = 0
    while (idx < count) {
      const remaining = count - idx
      const layoutType = layoutCycle[cycleIdx % layoutCycle.length]
      if (layoutType === 'hero' && remaining >= 1) {
        pages.push({ type: 'hero', imageIndex: idx })
        idx += 1
      } else if (layoutType === 'polaroid' && remaining >= 2) {
        pages.push({ type: 'polaroid', imageIndices: [idx, idx + 1] })
        idx += 2
      } else if (layoutType === 'overlap' && remaining >= 2) {
        const n = Math.min(3, remaining)
        pages.push({ type: 'overlap', imageIndices: Array.from({ length: n }, (_, i) => idx + i) })
        idx += n
      } else if (layoutType === 'bento' && remaining >= 3) {
        const n = Math.min(4, remaining)
        pages.push({ type: 'bento', imageIndices: Array.from({ length: n }, (_, i) => idx + i) })
        idx += n
      } else if (remaining >= 1) {
        pages.push({ type: 'hero', imageIndex: idx })
        idx += 1
      }
      cycleIdx += 1
    }
  }

  pages.push({ type: 'outro' })
  return { pages }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    let albumSlug: string
    try {
      const body = await req.json()
      albumSlug = body.albumSlug
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    if (!albumSlug) {
      return new Response(JSON.stringify({ error: "albumSlug is required." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // 1. Zuerst in 'orders' suchen (Legacy)
    let { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('canva_link, subject_details, music_choice, album_style, id, uploaded_files')
      .eq('slug', albumSlug)
      .single()

    // 2. Wenn nicht gefunden, in 'partner_orders' suchen
    let source: 'orders' | 'partner_orders' = 'orders'
    let partnerData: any = null

    if (!orderData || orderError) {
      const { data: pData, error: pError } = await supabaseAdmin
        .from('partner_orders')
        .select('canva_link, contact_name, music_choice, album_style, id, uploaded_files, album_layout')
        .eq('slug', albumSlug)
        .single()

      if (pData && !pError) {
        partnerData = pData
        source = 'partner_orders'
      }
    }

    const record = source === 'partner_orders' ? partnerData : orderData
    if (!record) {
      return new Response(JSON.stringify({ error: "Album not found." }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      })
    }

    const subjectDetails = source === 'partner_orders'
      ? record.contact_name
      : record.subject_details
    const musicChoice = record.music_choice || 'Keine Auswahl'
    const albumStyle = record.album_style || 'modern'
    const canvaLink = record.canva_link

    // Canva-Legacy: Wenn canva_link gesetzt, Canva-Embed zurückgeben
    if (canvaLink && canvaLink.trim()) {
      return new Response(JSON.stringify({
        album_type: 'canva',
        canva_link: canvaLink,
        subject_details: subjectDetails,
        music_choice: musicChoice,
        album_style: albumStyle,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // Natives Album: uploaded_files aus DB
    const uploadedFiles = record.uploaded_files || []
    const imageFiles = Array.isArray(uploadedFiles)
      ? uploadedFiles.filter((f: any) => f?.path && isImagePath(f.path))
      : []

    const folder = source === 'partner_orders' ? `order_${record.id}` : `order_${record.id}`

    let albumLayout = record.album_layout
    if (!albumLayout) {
      albumLayout = generateAlbumLayout(imageFiles, subjectDetails || '')
      // Nur partner_orders hat album_layout-Spalte; Layout speichern für spätere Aufrufe
      if (source === 'partner_orders') {
        await supabaseAdmin
          .from('partner_orders')
          .update({ album_layout: albumLayout })
          .eq('id', record.id)
      }
    }

    return new Response(JSON.stringify({
      album_type: 'native',
      subject_details: subjectDetails,
      music_choice: musicChoice,
      album_style: albumStyle,
      image_sources: {
        bucket: 'uploads',
        folder,
        files: imageFiles,
      },
      album_layout: albumLayout,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    const error = err as Error
    return new Response(JSON.stringify({ error: error.message || 'Unknown error' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
