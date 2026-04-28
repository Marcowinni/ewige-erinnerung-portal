import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Loader2, Check, Globe, Heart, PawPrint, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useAlbumPages, type EditorMediaItem } from '@/hooks/useAlbumPages'
import { AlbumEditor } from '@/components/AlbumEditor/AlbumEditor'
import { ModernEditor } from '@/components/AlbumEditor/ModernEditor'
import { ClassicEditor } from '@/components/AlbumEditor/ClassicEditor'
import { TimelessEditor } from '@/components/AlbumEditor/TimelessEditor'
import { PreviewModal } from '@/components/AlbumEditor/PreviewModal'
import { cn } from '@/lib/utils'
import {
  toStoredModernPages,
  toStoredClassicPages,
  toStoredTimelessPages,
  fromStoredModernPages,
  fromStoredClassicPages,
  fromStoredTimelessPages,
  isStoredPages,
  type StoredPage,
} from '@/lib/storedAlbumLayout'
import {
  isEditorPages,
  buildMediaIdUrlMap,
  editorPagesToModern,
  editorPagesToClassic,
  editorPagesToTimeless,
  type EditorPage,
} from '@/lib/editorLayoutConverter'

// ─── tag slug types ───────────────────────────────────────────────────────────

interface FreeTagSlug {
  id: string
  slug: string
  batch_label: string | null
}

// ─── types ───────────────────────────────────────────────────────────────────

interface UploadedFileMeta {
  path: string
  caption?: string
  focalX?: number
  focalY?: number
}

interface OrderRow {
  id: string
  slug: string | null
  subject_type: 'human' | 'pet' | null
  subject_name: string | null
  birth_date: string | null
  passing_date: string | null
  dedication: string | null
  album_style: 'modern' | 'classic' | 'timeless' | 'vintage' | null
  music_choice: unknown
  uploaded_files: UploadedFileMeta[] | null
  album_layout: unknown | null
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  shipping_address: unknown
  shipping_zone: string | null
  price_chf: number | null
  payment_status: string | null
  status: string
  is_test: boolean
  created_at: string | null
  published_at: string | null
}

// ─── build editor media from storage paths ───────────────────────────────────

function buildEditorMedia(files: UploadedFileMeta[]): EditorMediaItem[] {
  return files.map((f, i) => {
    const { data } = supabase.storage.from('uploads').getPublicUrl(f.path)
    const isVideo = /\.(mp4|mov|webm|m4v|ogg|avi|mkv)$/i.test(f.path)
    return {
      id: `file-${i}-${f.path}`,
      // File is not available after upload, use a blob placeholder
      file: new File([], f.path),
      previewUrl: data.publicUrl,
      caption: f.caption ?? '',
      kind: isVideo ? 'video' : 'image',
      width: 1200,
      height: 800,
      focalX: f.focalX,
      focalY: f.focalY,
    }
  })
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AdminAlbum() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthed } = useAdminAuth()

  const [order, setOrder] = useState<OrderRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editorMedia, setEditorMedia] = useState<EditorMediaItem[]>([])

  // Tag-slug pool
  const [freeSlugs, setFreeSlugs] = useState<FreeTagSlug[]>([])
  const [selectedTagSlug, setSelectedTagSlug] = useState<string>('')
  const [assigningSlug, setAssigningSlug] = useState(false)

  // Normalize legacy 'vintage' to 'timeless'
  const rawStyle = order?.album_style
  const mode = ((rawStyle === 'vintage' ? 'timeless' : rawStyle) as 'modern' | 'classic' | 'timeless') ?? 'modern'
  const albumPages = useAlbumPages([], mode)

  // Build editor-URL map (file-index → previewUrl) so stored pages can be hydrated
  const editorUrlMap = useMemo(() => {
    const m = new Map<number, string>()
    editorMedia.forEach((it, i) => m.set(i, it.previewUrl))
    return m
  }, [editorMedia])

  // Extract stored pages from order.album_layout (StoredPage OR legacy EditorPage)
  const rawLayoutPages = useMemo<unknown[] | null>(() => {
    const raw = order?.album_layout as { pages?: unknown[] } | null
    if (!raw || !Array.isArray(raw.pages) || raw.pages.length === 0) return null
    return raw.pages
  }, [order?.album_layout])

  const storedPages = useMemo<StoredPage[] | null>(() => {
    if (!rawLayoutPages) return null
    return isStoredPages(rawLayoutPages) ? rawLayoutPages : null
  }, [rawLayoutPages])

  const legacyEditorPages = useMemo<EditorPage[] | null>(() => {
    if (!rawLayoutPages) return null
    return isEditorPages(rawLayoutPages) ? rawLayoutPages : null
  }, [rawLayoutPages])

  // Build editorMedia-based mediaId→URL map for legacy EditorPage hydration
  const editorIdUrlMap = useMemo(() => {
    const files = editorMedia.map((m, i) => ({ path: m.file.name, id: m.id, _i: i }))
    const urlMap = new Map<number, string>()
    editorMedia.forEach((m, i) => urlMap.set(i, m.previewUrl))
    return buildMediaIdUrlMap(files, urlMap)
  }, [editorMedia])

  const initialModernPages = useMemo(() => {
    if (editorMedia.length === 0) return undefined
    if (storedPages) return fromStoredModernPages(storedPages, editorUrlMap)
    if (legacyEditorPages) return editorPagesToModern(legacyEditorPages, editorIdUrlMap)
    return undefined
  }, [storedPages, legacyEditorPages, editorUrlMap, editorIdUrlMap, editorMedia.length])

  const initialClassicPages = useMemo(() => {
    if (editorMedia.length === 0) return undefined
    if (storedPages) return fromStoredClassicPages(storedPages, editorUrlMap)
    if (legacyEditorPages) return editorPagesToClassic(legacyEditorPages, editorIdUrlMap)
    return undefined
  }, [storedPages, legacyEditorPages, editorUrlMap, editorIdUrlMap, editorMedia.length])

  const initialTimelessPages = useMemo(() => {
    if (editorMedia.length === 0) return undefined
    if (storedPages) return fromStoredTimelessPages(storedPages, editorUrlMap)
    if (legacyEditorPages) return editorPagesToTimeless(legacyEditorPages, editorIdUrlMap)
    return undefined
  }, [storedPages, legacyEditorPages, editorUrlMap, editorIdUrlMap, editorMedia.length])

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthed) navigate('/admin')
  }, [isAuthed, navigate])

  // Load order
  useEffect(() => {
    if (!id) return
    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('customer_orders')
        .select('id, slug, subject_type, subject_name, birth_date, passing_date, dedication, album_style, music_choice, uploaded_files, album_layout, contact_name, contact_email, contact_phone, shipping_address, shipping_zone, price_chf, payment_status, status, is_test, created_at, published_at')
        .eq('id', id)
        .single()

      if (error || !data) {
        toast.error('Bestellung nicht gefunden.')
        navigate('/admin')
        return
      }

      const row = data as OrderRow
      setOrder(row)

      // Build editor media from uploaded files
      const files = Array.isArray(row.uploaded_files) ? row.uploaded_files : []
      const media = buildEditorMedia(files)
      setEditorMedia(media)

      // Initialize pages from saved album_layout or build fresh from media
      if (row.album_layout && Array.isArray((row.album_layout as { pages?: unknown[] }).pages)) {
        albumPages.setState(row.album_layout as Parameters<typeof albumPages.setState>[0])
      } else {
        albumPages.reset(media)
      }

      setLoading(false)
    }
    load()
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load free tag slugs from pool
  useEffect(() => {
    const loadFreeSlugs = async () => {
      const { data } = await supabase
        .from('tag_slugs')
        .select('id, slug, batch_label')
        .is('assigned_order_id', null)
        .order('created_at', { ascending: false })
      setFreeSlugs((data ?? []) as FreeTagSlug[])
    }
    loadFreeSlugs()
  }, [])

  const handleAssignSlug = async () => {
    if (!order || !selectedTagSlug) return
    setAssigningSlug(true)

    const oldSlug = order.slug

    // Update customer_orders.slug
    const { error: orderErr } = await supabase
      .from('customer_orders')
      .update({ slug: selectedTagSlug })
      .eq('id', order.id)

    if (orderErr) {
      toast.error(`Fehler: ${orderErr.message}`)
      setAssigningSlug(false)
      return
    }

    // Mark new slug as assigned
    const { error: tagErr } = await supabase
      .from('tag_slugs')
      .update({ assigned_order_id: order.id, assigned_at: new Date().toISOString() })
      .eq('slug', selectedTagSlug)

    if (tagErr) {
      toast.error(`Tag-Update fehlgeschlagen: ${tagErr.message}`)
      setAssigningSlug(false)
      return
    }

    // Release old slug if it was from the tag pool
    if (oldSlug && oldSlug !== selectedTagSlug) {
      await supabase
        .from('tag_slugs')
        .update({ assigned_order_id: null, assigned_at: null })
        .eq('slug', oldSlug)
    }

    setOrder((prev) => prev ? { ...prev, slug: selectedTagSlug } : prev)
    setFreeSlugs((prev) => prev.filter((s) => s.slug !== selectedTagSlug))
    setSelectedTagSlug('')
    toast.success('Tag-Slug zugewiesen.')
    setAssigningSlug(false)
  }

  const handleSave = async () => {
    if (!order) return
    setSaving(true)
    const { error } = await supabase
      .from('customer_orders')
      .update({ album_layout: albumPages.state, status: order.status === 'new' ? 'in-progress' : order.status })
      .eq('id', order.id)

    if (error) { toast.error('Fehler beim Speichern.'); setSaving(false); return }
    toast.success('Album gespeichert.')
    setOrder((prev) => prev ? { ...prev, status: prev.status === 'new' ? 'in-progress' : prev.status } : prev)
    setSaving(false)
  }

  const handlePublish = async () => {
    if (!order) return
    setPublishing(true)
    const { error } = await supabase
      .from('customer_orders')
      .update({ album_layout: albumPages.state, status: 'published' })
      .eq('id', order.id)

    if (error) { toast.error('Fehler beim Veröffentlichen.'); setPublishing(false); return }

    // TODO: trigger email to customer via admin-publish-album edge function when email dispatcher is set up
    toast.success('Album veröffentlicht.')
    setOrder((prev) => prev ? { ...prev, status: 'published' } : prev)
    setPublishing(false)
  }

  const regenerate = useCallback(
    (media: EditorMediaItem[], m: typeof mode) => albumPages.regenerate(media, m),
    [albumPages]
  )

  // Update focal point per media item; persist to uploaded_files in DB.
  const setMediaFocal = useCallback(async (mediaId: string, focalX: number, focalY: number) => {
    setEditorMedia((prev) => prev.map((m) => (m.id === mediaId ? { ...m, focalX, focalY } : m)))
    // Persist immediately so reloads keep the crop
    if (!order) return
    const target = editorMedia.find((m) => m.id === mediaId)
    if (!target) return
    const currentFiles: UploadedFileMeta[] = Array.isArray(order.uploaded_files) ? order.uploaded_files : []
    const updatedFiles = currentFiles.map((f) => {
      // EditorMediaItem.id format: `file-${i}-${path}`. Match by path suffix.
      if (mediaId.endsWith(f.path)) return { ...f, focalX, focalY }
      return f
    })
    const { error } = await supabase
      .from('customer_orders')
      .update({ uploaded_files: updatedFiles })
      .eq('id', order.id)
    if (error) {
      toast.error('Bildausschnitt konnte nicht gespeichert werden.')
    } else {
      setOrder((prev) => (prev ? { ...prev, uploaded_files: updatedFiles } : prev))
    }
  }, [editorMedia, order])

  if (!isAuthed) return null

  if (loading) {
    return (
      <div className="memorial-canvas min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-memorial-bronze-deep" />
      </div>
    )
  }

  if (!order) return null

  const subjectName = order.subject_name || order.contact_name || '—'
  const email = order.contact_email || '—'

  const styleLabels: Record<string, string> = { modern: 'Modern', classic: 'Klassisch', timeless: 'Zeitlos', vintage: 'Zeitlos' }
  const paymentLabels: Record<string, string> = { pending: 'Ausstehend', paid: 'Bezahlt', test: 'Test', refunded: 'Erstattet' }
  const paymentClasses: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700',
    paid: 'bg-memorial-sage/10 text-memorial-sage-deep',
    test: 'bg-stone-100 text-stone-500',
    refunded: 'bg-red-50 text-red-600',
  }
  const zoneLabels: Record<string, string> = { CH: 'Schweiz', EU: 'Europa', WORLD: 'Weltweit' }

  const dedicationText = order.dedication ?? null

  return (
    <div className="memorial-canvas min-h-screen flex flex-col">
      <Helmet><title>Album bearbeiten — Memora Moments</title></Helmet>

      {order.is_test && (
        <div className="bg-amber-100 border-b border-amber-300 px-6 py-2 text-center text-[12px] text-amber-800 font-medium tracking-wide">
          🧪 TEST-BESTELLUNG — keine echte Zahlung
        </div>
      )}

      {/* Top bar */}
      <header className="border-b border-memorial-line px-6 py-3 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {order.subject_type === 'pet' ? (
              <PawPrint className="w-4 h-4 text-memorial-sage-deep flex-shrink-0" strokeWidth={1.5} />
            ) : (
              <Heart className="w-4 h-4 text-memorial-bronze-deep flex-shrink-0" strokeWidth={1.5} />
            )}
            <p className="font-display text-lg text-memorial-ink truncate">{subjectName}</p>
            {order.is_test && (
              <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-300 flex-shrink-0">TEST</span>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap mt-0.5">
            <p className="text-[11px] text-memorial-ink-soft">{email}</p>
            {order.album_style && (
              <p className="text-[11px] text-memorial-ink-soft">{styleLabels[order.album_style] ?? order.album_style}</p>
            )}
            {order.shipping_zone && (
              <p className="text-[11px] text-memorial-ink-soft">{zoneLabels[order.shipping_zone] ?? order.shipping_zone}</p>
            )}
            {order.price_chf != null && (
              <p className="text-[11px] text-memorial-ink-soft">CHF {order.price_chf}</p>
            )}
            {order.payment_status && (
              <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', paymentClasses[order.payment_status] ?? 'bg-gray-100 text-gray-600')}>
                {paymentLabels[order.payment_status] ?? order.payment_status}
              </span>
            )}
            {order.birth_date && (
              <p className="text-[11px] text-memorial-ink-soft">* {order.birth_date}</p>
            )}
            {order.passing_date && (
              <p className="text-[11px] text-memorial-ink-soft">† {order.passing_date}</p>
            )}
            {dedicationText && (
              <p className="text-[11px] text-memorial-ink-soft italic truncate max-w-[200px]">„{dedicationText}"</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Tag-Slug Zuweisen */}
          <div className="flex items-center gap-2 border border-memorial-line rounded-full px-3 py-1.5">
            <Tag className="w-3.5 h-3.5 text-memorial-ink-soft flex-shrink-0" />
            {order.slug ? (
              <span className="text-[12px] font-mono text-memorial-ink">{order.slug}</span>
            ) : (
              <span className="text-[12px] text-memorial-ink-soft italic">kein Slug</span>
            )}
            {freeSlugs.length > 0 && (
              <>
                <select
                  value={selectedTagSlug}
                  onChange={(e) => setSelectedTagSlug(e.target.value)}
                  className="text-[12px] text-memorial-ink bg-transparent border-none outline-none cursor-pointer ml-1"
                >
                  <option value="">— wechseln —</option>
                  {freeSlugs.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {s.slug}{s.batch_label ? ` (${s.batch_label})` : ''}
                    </option>
                  ))}
                </select>
                {selectedTagSlug && (
                  <button
                    onClick={handleAssignSlug}
                    disabled={assigningSlug}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-memorial-bronze-deep text-white font-medium disabled:opacity-60 flex items-center gap-1"
                  >
                    {assigningSlug ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                    Zuweisen
                  </button>
                )}
              </>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="memorial-cta memorial-cta-ghost flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Speichern
          </motion.button>

          {order.status !== 'published' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePublish}
              disabled={publishing}
              className="memorial-cta memorial-cta-primary flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium disabled:opacity-60"
            >
              {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Globe className="w-3.5 h-3.5" />}
              Veröffentlichen
            </motion.button>
          )}

          {order.status === 'published' && (
            <span className="text-[11px] px-3 py-1.5 rounded-full bg-memorial-sage/10 text-memorial-sage-deep font-medium">
              Veröffentlicht
            </span>
          )}
        </div>
      </header>

      {/* Editor — takes remaining height */}
      <div className="flex-1 overflow-hidden">
        {editorMedia.length > 0 ? (
          mode === 'modern' ? (
            <ModernEditor
              key={`modern-${order.id}-${editorMedia.length}`}
              media={editorMedia}
              initialPages={initialModernPages}
              subjectName={subjectName}
              dateRange={(() => {
                const parts = [order.birth_date, order.passing_date]
                  .filter(Boolean)
                  .map((d) => { const y = d ? new Date(d!).getFullYear() : null; return y ? String(y) : '' })
                  .filter(Boolean)
                return parts.length > 0 ? parts.join(' – ') : undefined
              })()}
              dedication={order.dedication ?? null}
              onPreview={() => setPreviewOpen(true)}
              onBack={() => navigate('/admin')}
              onSave={async ({ pages, assignments }) => {
                setSaving(true)
                const storedPages = toStoredModernPages(pages, editorMedia)
                const { error } = await supabase
                  .from('customer_orders')
                  .update({
                    album_layout: { theme: 'modern', pages: storedPages, assignments },
                    status: order.status === 'new' ? 'in-progress' : order.status,
                  })
                  .eq('id', order.id)
                if (error) { toast.error('Fehler beim Speichern.'); setSaving(false); return }
                toast.success('Album gespeichert.')
                setOrder((prev) => prev ? { ...prev, status: prev.status === 'new' ? 'in-progress' : prev.status } : prev)
                setSaving(false)
              }}
              onPublish={handlePublish}
              saving={saving}
              publishing={publishing}
              isPublished={order.status === 'published'}
              onSetMediaFocal={setMediaFocal}
            />
          ) : mode === 'classic' ? (
            <ClassicEditor
              key={`classic-${order.id}-${editorMedia.length}`}
              media={editorMedia}
              initialPages={initialClassicPages}
              subjectName={subjectName}
              dateRange={(() => {
                const parts = [order.birth_date, order.passing_date]
                  .filter(Boolean)
                  .map((d) => { const y = d ? new Date(d!).getFullYear() : null; return y ? String(y) : '' })
                  .filter(Boolean)
                return parts.length > 0 ? parts.join(' – ') : undefined
              })()}
              dedication={order.dedication ?? null}
              onPreview={() => setPreviewOpen(true)}
              onBack={() => navigate('/admin')}
              onSave={async ({ pages, assignments }) => {
                setSaving(true)
                const storedPages = toStoredClassicPages(pages, editorMedia)
                const { error } = await supabase
                  .from('customer_orders')
                  .update({
                    album_layout: { theme: 'classic', pages: storedPages, assignments },
                    status: order.status === 'new' ? 'in-progress' : order.status,
                  })
                  .eq('id', order.id)
                if (error) { toast.error('Fehler beim Speichern.'); setSaving(false); return }
                toast.success('Album gespeichert.')
                setOrder((prev) => prev ? { ...prev, status: prev.status === 'new' ? 'in-progress' : prev.status } : prev)
                setSaving(false)
              }}
              onPublish={handlePublish}
              saving={saving}
              publishing={publishing}
              isPublished={order.status === 'published'}
              onSetMediaFocal={setMediaFocal}
            />
          ) : mode === 'timeless' ? (
            <TimelessEditor
              key={`timeless-${order.id}-${editorMedia.length}`}
              media={editorMedia}
              initialPages={initialTimelessPages}
              subjectName={subjectName}
              dateRange={(() => {
                const parts = [order.birth_date, order.passing_date]
                  .filter(Boolean)
                  .map((d) => { const y = d ? new Date(d!).getFullYear() : null; return y ? String(y) : '' })
                  .filter(Boolean)
                return parts.length > 0 ? parts.join(' – ') : undefined
              })()}
              dedication={order.dedication ?? null}
              onPreview={() => setPreviewOpen(true)}
              onBack={() => navigate('/admin')}
              onSave={async ({ pages, assignments }) => {
                setSaving(true)
                const storedPages = toStoredTimelessPages(pages, editorMedia)
                const { error } = await supabase
                  .from('customer_orders')
                  .update({
                    album_layout: { theme: 'timeless', pages: storedPages, assignments },
                    status: order.status === 'new' ? 'in-progress' : order.status,
                  })
                  .eq('id', order.id)
                if (error) { toast.error('Fehler beim Speichern.'); setSaving(false); return }
                toast.success('Album gespeichert.')
                setOrder((prev) => prev ? { ...prev, status: prev.status === 'new' ? 'in-progress' : prev.status } : prev)
                setSaving(false)
              }}
              onPublish={handlePublish}
              saving={saving}
              publishing={publishing}
              isPublished={order.status === 'published'}
              onSetMediaFocal={setMediaFocal}
            />
          ) : (
            <AlbumEditor
              media={editorMedia}
              mode={mode}
              value={albumPages.state}
              onPreview={() => setPreviewOpen(true)}
              onBack={() => navigate('/admin')}
              regenerate={regenerate}
              swapMediaAt={albumPages.swapMediaAt}
              changePageLayout={albumPages.changePageLayout}
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full text-memorial-ink-soft">
            Keine Bilder in dieser Bestellung.
          </div>
        )}
      </div>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onOrder={handlePublish}
        pages={albumPages.state.pages}
        media={editorMedia}
        mode={mode}
        subjectName={subjectName}
      />
    </div>
  )
}
