import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Plus, Copy, Trash2, Download, Loader2, X, Check } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

// ─── types ───────────────────────────────────────────────────────────────────

interface TagSlug {
  id: string
  slug: string
  batch_label: string | null
  assigned_order_id: string | null
  created_at: string
  assigned_at: string | null
  // joined from customer_orders
  subject_name?: string | null
  contact_name?: string | null
}

type SlugFilter = 'all' | 'free' | 'assigned'

// ─── helpers ─────────────────────────────────────────────────────────────────

function randomSuffix(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function buildTagUrl(slug: string): string {
  return `${window.location.origin}/album/${slug}`
}

// ─── generate dialog ─────────────────────────────────────────────────────────

interface GenerateDialogProps {
  onClose: () => void
  onCreated: (tags: TagSlug[]) => void
}

function GenerateDialog({ onClose, onCreated }: GenerateDialogProps) {
  const [count, setCount] = useState(10)
  const [batchLabel, setBatchLabel] = useState('')
  const [prefix, setPrefix] = useState('album')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (count < 1 || count > 200) {
      toast.error('Anzahl muss zwischen 1 und 200 liegen.')
      return
    }
    setLoading(true)

    // Load existing slugs to avoid collisions
    const { data: existing } = await supabase.from('tag_slugs').select('slug')
    const existingSet = new Set((existing ?? []).map((r: { slug: string }) => r.slug))

    // Also check customer_orders slugs
    const { data: orderSlugs } = await supabase.from('customer_orders').select('slug')
    ;(orderSlugs ?? []).forEach((r: { slug: string | null }) => { if (r.slug) existingSet.add(r.slug) })

    const cleanBatch = batchLabel.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const cleanPrefix = prefix.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/^-+|-+$/g, '') || 'album'

    // Sequential mode — base = batch-label when set, otherwise prefix
    const base = cleanBatch || cleanPrefix
    const pattern = new RegExp(`^${base}-(\\d+)$`)
    let maxSeq = 0
    for (const s of existingSet) {
      const m = s.match(pattern)
      if (m) {
        const n = parseInt(m[1], 10)
        if (n > maxSeq) maxSeq = n
      }
    }
    const startSeq = maxSeq + 1
    const slugsToInsert: { slug: string; batch_label: string | null }[] = []
    for (let i = 0; i < count; i++) {
      const seq = startSeq + i
      const candidate = `${base}-${String(seq).padStart(2, '0')}`
      slugsToInsert.push({ slug: candidate, batch_label: batchLabel.trim() || null })
      existingSet.add(candidate)
    }

    const { data, error } = await supabase.from('tag_slugs').insert(slugsToInsert).select()
    if (error) {
      toast.error(`Fehler: ${error.message}`)
      setLoading(false)
      return
    }

    toast.success(`${slugsToInsert.length} Slugs erstellt.`)
    onCreated(data as TagSlug[])
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="memorial-card rounded-2xl p-8 w-full max-w-sm mx-4 shadow-xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl text-memorial-ink">Slugs generieren</h2>
          <button onClick={onClose} className="p-1 text-memorial-ink-soft hover:text-memorial-ink transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Anzahl</label>
            <input
              type="number"
              min={1}
              max={200}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="memorial-underline-input w-full text-[15px] text-memorial-ink"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Slug-Prefix <span className="normal-case">(default: album)</span></label>
            <input
              type="text"
              placeholder="album"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="memorial-underline-input w-full text-[15px] text-memorial-ink"
            />
          </div>

          <div>
            <label className="text-[11px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Batch-Label <span className="normal-case">(optional)</span></label>
            <input
              type="text"
              placeholder="z.B. 2026-Q2 oder Messe-München"
              value={batchLabel}
              onChange={(e) => setBatchLabel(e.target.value)}
              className="memorial-underline-input w-full text-[15px] text-memorial-ink"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="memorial-cta memorial-cta-ghost flex-1 rounded-full py-2.5 text-[13px] font-medium"
          >
            Abbrechen
          </button>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="memorial-cta memorial-cta-primary flex-1 rounded-full py-2.5 text-[13px] font-medium disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
            Erstellen
          </button>
        </div>
      </motion.div>
    </div>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function AdminTags() {
  const navigate = useNavigate()
  const { isAuthed } = useAdminAuth()

  const [tags, setTags] = useState<TagSlug[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<SlugFilter>('all')
  const [showDialog, setShowDialog] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuthed) navigate('/admin')
  }, [isAuthed, navigate])

  const loadTags = async () => {
    setLoading(true)
    // Fetch tag_slugs with joined order data
    const { data, error } = await supabase
      .from('tag_slugs')
      .select('id, slug, batch_label, assigned_order_id, created_at, assigned_at')
      .order('created_at', { ascending: false })

    if (error) { toast.error('Fehler beim Laden.'); setLoading(false); return }

    const rows = (data ?? []) as TagSlug[]

    // Enrich with customer name for assigned ones
    const assignedIds = rows.filter((r) => r.assigned_order_id).map((r) => r.assigned_order_id!)
    if (assignedIds.length > 0) {
      const { data: orders } = await supabase
        .from('customer_orders')
        .select('id, subject_name, contact_name')
        .in('id', assignedIds)

      const orderMap = new Map((orders ?? []).map((o: { id: string; subject_name: string | null; contact_name: string | null }) => [o.id, o]))
      rows.forEach((row) => {
        if (row.assigned_order_id) {
          const o = orderMap.get(row.assigned_order_id)
          if (o) {
            row.subject_name = o.subject_name
            row.contact_name = o.contact_name
          }
        }
      })
    }

    setTags(rows)
    setLoading(false)
  }

  useEffect(() => { loadTags() }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (tag: TagSlug) => {
    if (tag.assigned_order_id) {
      toast.error('Zugewiesene Slugs können nicht gelöscht werden.')
      return
    }
    if (!window.confirm(`Slug „${tag.slug}" wirklich löschen?`)) return
    setDeletingId(tag.id)
    const { error } = await supabase.from('tag_slugs').delete().eq('id', tag.id)
    if (error) { toast.error('Löschen fehlgeschlagen.'); setDeletingId(null); return }
    setTags((prev) => prev.filter((t) => t.id !== tag.id))
    toast.success('Slug gelöscht.')
    setDeletingId(null)
  }

  const handleCopy = async (tag: TagSlug) => {
    await navigator.clipboard.writeText(buildTagUrl(tag.slug))
    setCopiedId(tag.id)
    setTimeout(() => setCopiedId(null), 1500)
    toast.success('URL kopiert.')
  }

  const handleExportCsv = () => {
    const header = 'slug,full_url,batch,status\n'
    const rows = filtered.map((t) => {
      const status = t.assigned_order_id ? `zugewiesen (${t.subject_name || t.contact_name || t.assigned_order_id})` : 'frei'
      return `${t.slug},${buildTagUrl(t.slug)},${t.batch_label ?? ''},${status}`
    })
    const blob = new Blob([header + rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tag-slugs-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exportiert.')
  }

  const filtered = tags.filter((t) => {
    if (filter === 'free') return !t.assigned_order_id
    if (filter === 'assigned') return !!t.assigned_order_id
    return true
  })

  const freeCount = tags.filter((t) => !t.assigned_order_id).length
  const assignedCount = tags.filter((t) => !!t.assigned_order_id).length

  if (!isAuthed) return null

  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet><title>Tag-Pool — Memora Moments</title></Helmet>

      <AnimatePresence>
        {showDialog && (
          <GenerateDialog
            onClose={() => setShowDialog(false)}
            onCreated={(newTags) => setTags((prev) => [...newTags, ...prev])}
          />
        )}
      </AnimatePresence>

      <header className="border-b border-memorial-line px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Admin</p>
            <h1 className="font-display text-2xl text-memorial-ink">Tag-Pool</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="memorial-cta memorial-cta-ghost flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            CSV
          </button>
          <button
            onClick={() => setShowDialog(true)}
            className="memorial-cta memorial-cta-primary flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Neue Slugs generieren
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: tags.length },
            { label: 'Frei', value: freeCount },
            { label: 'Zugewiesen', value: assignedCount },
          ].map((s) => (
            <div key={s.label} className="memorial-card rounded-2xl p-5 text-center">
              <p className="font-display text-3xl text-memorial-ink">{s.value}</p>
              <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {([
            { key: 'all' as SlugFilter, label: 'Alle' },
            { key: 'free' as SlugFilter, label: 'Frei' },
            { key: 'assigned' as SlugFilter, label: 'Zugewiesen' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200',
                filter === f.key
                  ? 'bg-memorial-bronze-deep text-white border-memorial-bronze-deep'
                  : 'border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-memorial-bronze-deep" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-memorial-ink-soft">
            {tags.length === 0 ? 'Noch keine Slugs. Erstelle den ersten Batch.' : 'Keine Slugs in diesem Filter.'}
          </div>
        ) : (
          <div className="memorial-card rounded-2xl overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-memorial-line">
                  {['Slug', 'Batch', 'Status', 'Erstellt', ''].map((h) => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-widest text-memorial-ink-soft px-5 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((tag) => {
                  const isAssigned = !!tag.assigned_order_id
                  const customerLabel = tag.subject_name || tag.contact_name || tag.assigned_order_id?.slice(0, 8)
                  return (
                    <tr key={tag.id} className="border-b border-memorial-line last:border-0 hover:bg-memorial-canvas/50 transition-colors">
                      <td className="px-5 py-4 font-mono text-[12px] text-memorial-ink">{tag.slug}</td>
                      <td className="px-5 py-4 text-memorial-ink-soft">{tag.batch_label ?? '—'}</td>
                      <td className="px-5 py-4">
                        {isAssigned ? (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-memorial-sage/10 text-memorial-sage-deep font-medium">
                            {customerLabel}
                          </span>
                        ) : (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium">Frei</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-memorial-ink-soft text-[12px]">
                        {new Date(tag.created_at).toLocaleDateString('de-CH')}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleCopy(tag)}
                            title="URL kopieren"
                            className="p-2 rounded-full text-memorial-ink-soft hover:text-memorial-ink hover:bg-memorial-canvas transition-colors"
                          >
                            {copiedId === tag.id ? <Check className="w-4 h-4 text-memorial-sage-deep" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(tag)}
                            disabled={isAssigned || deletingId === tag.id}
                            title={isAssigned ? 'Zugewiesene Slugs können nicht gelöscht werden' : 'Slug löschen'}
                            className="p-2 rounded-full text-memorial-ink-soft hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            {deletingId === tag.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" strokeWidth={1.6} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
