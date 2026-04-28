import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Loader2, LogOut, Heart, PawPrint, Trash2, Tag } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

// ─── types ───────────────────────────────────────────────────────────────────

interface Order {
  id: string
  slug: string | null
  subject_type: 'human' | 'pet' | null
  subject_name: string | null
  birth_date: string | null
  passing_date: string | null
  dedication: string | null
  album_style: 'modern' | 'classic' | 'timeless' | 'vintage' | null
  uploaded_files: unknown[] | null
  contact_name: string | null
  contact_email: string | null
  shipping_zone: string | null
  price_chf: number | null
  payment_status: string | null
  status: string
  is_test: boolean
  created_at: string
}

type StatusFilter = 'all' | 'new' | 'in-progress' | 'published'
type TestFilter = 'all' | 'real' | 'test'

// ─── badges ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  new:          { label: 'Neu',          class: 'bg-slate-100 text-slate-600' },
  'in-progress':{ label: 'In Arbeit',    class: 'bg-memorial-bronze/10 text-memorial-bronze-deep' },
  published:    { label: 'Veröffentlicht', class: 'bg-memorial-sage/10 text-memorial-sage-deep' },
  cancelled:    { label: 'Abgebrochen',  class: 'bg-red-50 text-red-600' },
}

const PAYMENT_CONFIG: Record<string, { label: string; class: string }> = {
  pending:  { label: 'Ausstehend', class: 'bg-amber-50 text-amber-700' },
  paid:     { label: 'Bezahlt',    class: 'bg-memorial-sage/10 text-memorial-sage-deep' },
  test:     { label: 'Test',       class: 'bg-stone-100 text-stone-500' },
  refunded: { label: 'Erstattet',  class: 'bg-red-50 text-red-600' },
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status, class: 'bg-gray-100 text-gray-600' }
  return <span className={cn('text-[11px] px-2.5 py-1 rounded-full font-medium', cfg.class)}>{cfg.label}</span>
}

function PaymentBadge({ status }: { status: string | null }) {
  const key = status ?? 'pending'
  const cfg = PAYMENT_CONFIG[key] ?? { label: key, class: 'bg-gray-100 text-gray-600' }
  return <span className={cn('text-[11px] px-2.5 py-1 rounded-full font-medium', cfg.class)}>{cfg.label}</span>
}

function TestBadge() {
  return (
    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide bg-amber-100 text-amber-800 border border-amber-300">
      TEST
    </span>
  )
}

// ─── login gate ───────────────────────────────────────────────────────────────

function LoginGate({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [pw, setPw] = useState('')
  const [shake, setShake] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const ok = onLogin(pw)
    setLoading(false)
    if (!ok) {
      setShake(true)
      setPw('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="memorial-canvas min-h-screen flex items-center justify-center">
      <motion.div
        animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="memorial-card rounded-2xl p-10 w-full max-w-sm text-center"
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-memorial-ink-soft mb-2">Admin</p>
        <h1 className="font-display text-3xl text-memorial-ink mb-8">Memora Moments</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Passwort"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            autoFocus
            className="memorial-underline-input w-full text-[15px] text-memorial-ink text-center"
          />
          <button
            type="submit"
            disabled={loading || !pw}
            className="memorial-cta memorial-cta-primary w-full rounded-full py-3 text-sm font-medium disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Einloggen'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [testFilter, setTestFilter] = useState<TestFilter>('all')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    const label = order.subject_name || order.contact_name || 'diese Bestellung'
    if (!window.confirm(`Album „${label}" wirklich unwiderruflich löschen?\n\nAlle Bilder werden aus dem Speicher entfernt.`)) {
      return
    }
    setDeletingId(order.id)
    try {
      const files = Array.isArray(order.uploaded_files) ? (order.uploaded_files as { path?: string }[]) : []
      const paths = files.map((f) => f?.path).filter((p): p is string => Boolean(p))
      if (paths.length > 0) {
        const { error: storageErr } = await supabase.storage.from('uploads').remove(paths)
        if (storageErr) console.warn('Storage cleanup error:', storageErr)
      }
      const { error } = await supabase.from('customer_orders').delete().eq('id', order.id)
      if (error) throw error
      setOrders((prev) => prev.filter((o) => o.id !== order.id))
      toast.success('Album gelöscht.')
    } catch (err) {
      console.error(err)
      toast.error('Löschen fehlgeschlagen.')
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('customer_orders')
        .select(
          'id, slug, subject_type, subject_name, birth_date, passing_date, dedication, ' +
          'album_style, uploaded_files, contact_name, contact_email, ' +
          'shipping_zone, price_chf, payment_status, status, is_test, created_at'
        )
        .order('created_at', { ascending: false })
      if (!error && data) setOrders(data as Order[])
      setLoading(false)
    }
    load()
  }, [])

  const filtered = orders.filter((o) => {
    if (filter !== 'all' && o.status !== filter) return false
    if (testFilter === 'real' && o.is_test) return false
    if (testFilter === 'test' && !o.is_test) return false
    return true
  })

  const testCount = orders.filter((o) => o.is_test).length

  const stats = {
    total: orders.length,
    new: orders.filter((o) => o.status === 'new').length,
    inProgress: orders.filter((o) => o.status === 'in-progress').length,
    published: orders.filter((o) => o.status === 'published').length,
  }

  const styleLabels: Record<string, string> = { modern: 'Modern', classic: 'Klassisch', timeless: 'Zeitlos', vintage: 'Zeitlos' }

  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet><title>Admin — Memora Moments</title></Helmet>

      <header className="border-b border-memorial-line px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Admin</p>
          <h1 className="font-display text-2xl text-memorial-ink">Bestellungen</h1>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/tags')} className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors">
            <Tag className="w-4 h-4" />
            Tag-Pool
          </button>
          <button onClick={onLogout} className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total },
            { label: 'Neu', value: stats.new },
            { label: 'In Arbeit', value: stats.inProgress },
            { label: 'Veröffentlicht', value: stats.published },
            { label: 'Test', value: testCount },
          ].map((s) => (
            <div key={s.label} className={cn('memorial-card rounded-2xl p-5 text-center', s.label === 'Test' && testCount > 0 ? 'border border-amber-200' : '')}>
              <p className={cn('font-display text-3xl', s.label === 'Test' && testCount > 0 ? 'text-amber-700' : 'text-memorial-ink')}>{s.value}</p>
              <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'new', 'in-progress', 'published'] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200',
                filter === f ? 'bg-memorial-bronze-deep text-white border-memorial-bronze-deep' : 'border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze'
              )}
            >
              {f === 'all' ? 'Alle' : f === 'new' ? 'Neu' : f === 'in-progress' ? 'In Arbeit' : 'Veröffentlicht'}
            </button>
          ))}

          <div className="w-px bg-memorial-line mx-1" />

          {([
            { key: 'all' as TestFilter, label: 'Alle' },
            { key: 'real' as TestFilter, label: 'Nur echte' },
            { key: 'test' as TestFilter, label: 'Nur Test' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setTestFilter(f.key)}
              className={cn(
                'text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200',
                testFilter === f.key ? 'bg-amber-700 text-white border-amber-700' : 'border-memorial-line text-memorial-ink-soft hover:border-amber-400'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-memorial-bronze-deep" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-memorial-ink-soft">Keine Bestellungen gefunden.</div>
        ) : (
          <div className="memorial-card rounded-2xl overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-memorial-line">
                  {['Name', 'Typ', 'Stil', 'Bilder', 'Status', 'Zahlung', '', ''].map((h) => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-widest text-memorial-ink-soft px-5 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => {
                  const name = order.subject_name || order.contact_name || '—'
                  const pictureCount = Array.isArray(order.uploaded_files) ? order.uploaded_files.length : 0
                  return (
                    <tr
                      key={order.id}
                      className="border-b border-memorial-line last:border-0 hover:bg-memorial-canvas/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/album/${order.id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-memorial-ink font-medium">{name}</span>
                          {order.is_test && <TestBadge />}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        {order.subject_type === 'pet' ? (
                          <PawPrint className="w-4 h-4 text-memorial-sage-deep" strokeWidth={1.5} />
                        ) : order.subject_type === 'human' ? (
                          <Heart className="w-4 h-4 text-memorial-bronze-deep" strokeWidth={1.5} />
                        ) : (
                          <span className="text-memorial-ink-soft">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-memorial-ink-soft">{order.album_style ? (styleLabels[order.album_style] ?? order.album_style) : '—'}</td>
                      <td className="px-5 py-4 text-memorial-ink-soft">{pictureCount > 0 ? pictureCount : '—'}</td>
                      <td className="px-5 py-4"><StatusBadge status={order.status ?? 'new'} /></td>
                      <td className="px-5 py-4"><PaymentBadge status={order.payment_status} /></td>
                      <td className="px-5 py-4 text-right whitespace-nowrap">
                        <span className="text-memorial-bronze-deep text-[12px] hover:underline">Öffnen →</span>
                      </td>
                      <td className="px-3 py-4 text-right">
                        <button
                          onClick={(e) => handleDelete(order, e)}
                          disabled={deletingId === order.id}
                          aria-label="Album löschen"
                          title="Album löschen"
                          className="p-2 rounded-full text-memorial-ink-soft hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                        >
                          {deletingId === order.id
                            ? <Loader2 className="w-4 h-4 animate-spin" />
                            : <Trash2 className="w-4 h-4" strokeWidth={1.6} />}
                        </button>
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

// ─── page ─────────────────────────────────────────────────────────────────────

export default function Admin() {
  const { isAuthed, login, logout } = useAdminAuth()

  if (!isAuthed) return <LoginGate onLogin={login} />
  return <Dashboard onLogout={logout} />
}
