import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Loader2, LogOut, ArrowLeft, Tag, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { cn } from '@/lib/utils'

interface DiscountStat {
  code: string
  discount_type: 'percentage' | 'fixed' | string
  value: string | number
  is_active: boolean
  valid_until: string | null
  max_uses: number | null
  times_used: number
  total_orders: number
  paid_orders: number
  pending_orders: number
  total_revenue_chf: string | number
  total_discount_chf: string | number
  last_used_at: string | null
}

function formatChf(v: string | number | null | undefined): string {
  if (v == null) return '0.00'
  const n = typeof v === 'string' ? parseFloat(v) : v
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

function formatDate(s: string | null): string {
  if (!s) return '—'
  const d = new Date(s)
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

interface NewCodeForm {
  code: string
  discount_type: 'percentage' | 'fixed'
  value: string
  valid_until: string
  max_uses: string
  is_active: boolean
}

const EMPTY_FORM: NewCodeForm = {
  code: '',
  discount_type: 'percentage',
  value: '',
  valid_until: '',
  max_uses: '',
  is_active: true,
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate()
  const [rows, setRows] = useState<DiscountStat[]>([])
  const [loading, setLoading] = useState(true)
  const [showInactive, setShowInactive] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<NewCodeForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const { data, error } = await supabase
      .from('discount_code_stats')
      .select('*')
    if (!error && data) setRows(data as DiscountStat[])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const handleCreate = async () => {
    const code = form.code.trim().toUpperCase()
    const value = parseFloat(form.value)
    if (!code) { toast.error('Code fehlt'); return }
    if (!Number.isFinite(value) || value <= 0) { toast.error('Wert ungültig'); return }
    if (form.discount_type === 'percentage' && value > 100) { toast.error('Prozent max 100'); return }

    setSaving(true)
    const payload: Record<string, unknown> = {
      code,
      discount_type: form.discount_type,
      value,
      is_active: form.is_active,
      valid_until: form.valid_until ? new Date(form.valid_until).toISOString() : null,
      max_uses: form.max_uses ? parseInt(form.max_uses, 10) : null,
    }
    const { error } = await supabase.from('discount_codes').insert(payload)
    setSaving(false)
    if (error) { toast.error(`Fehler: ${error.message}`); return }
    toast.success(`Code ${code} erstellt`)
    setForm(EMPTY_FORM)
    setShowForm(false)
    load()
  }

  const toggleActive = async (code: string, current: boolean) => {
    const { error } = await supabase
      .from('discount_codes')
      .update({ is_active: !current })
      .eq('code', code)
    if (error) { toast.error(`Fehler: ${error.message}`); return }
    toast.success(`${code} ${!current ? 'aktiviert' : 'deaktiviert'}`)
    load()
  }

  const filtered = rows.filter((r) => (showInactive ? true : r.is_active))

  const totals = filtered.reduce(
    (acc, r) => {
      acc.paid += Number(r.paid_orders) || 0
      acc.revenue += Number(r.total_revenue_chf) || 0
      acc.discount += Number(r.total_discount_chf) || 0
      return acc
    },
    { paid: 0, revenue: 0, discount: 0 }
  )

  return (
    <div className="memorial-canvas min-h-screen">
      <Helmet><title>Rabattcodes — Memora Moments Admin</title></Helmet>

      <header className="border-b border-memorial-line px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-memorial-ink-soft">Admin</p>
            <h1 className="font-display text-2xl text-memorial-ink">Rabattcodes</h1>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-[13px] text-memorial-ink-soft hover:text-memorial-ink transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="memorial-card rounded-2xl p-5 text-center">
            <p className="font-display text-3xl text-memorial-ink">{totals.paid}</p>
            <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mt-1">Bezahlte Bestellungen</p>
          </div>
          <div className="memorial-card rounded-2xl p-5 text-center">
            <p className="font-display text-3xl text-memorial-ink">CHF {formatChf(totals.revenue)}</p>
            <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mt-1">Umsatz mit Rabatt</p>
          </div>
          <div className="memorial-card rounded-2xl p-5 text-center">
            <p className="font-display text-3xl text-memorial-bronze-deep">− CHF {formatChf(totals.discount)}</p>
            <p className="text-[11px] uppercase tracking-widest text-memorial-ink-soft mt-1">Total Rabatt</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowInactive(false)}
              className={cn(
                'text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200',
                !showInactive ? 'bg-memorial-bronze-deep text-white border-memorial-bronze-deep' : 'border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze',
              )}
            >
              Nur aktive
            </button>
            <button
              onClick={() => setShowInactive(true)}
              className={cn(
                'text-[12px] px-4 py-1.5 rounded-full border transition-all duration-200',
                showInactive ? 'bg-memorial-bronze-deep text-white border-memorial-bronze-deep' : 'border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze',
              )}
            >
              Alle
            </button>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[12px] px-4 py-1.5 rounded-full bg-memorial-bronze-deep text-white hover:bg-memorial-bronze transition-colors"
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? 'Schliessen' : 'Neuer Code'}
          </button>
        </div>

        {showForm && (
          <div className="memorial-card rounded-2xl p-6 mb-6 border border-memorial-line/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Code *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="SOMMER25"
                  className="w-full px-3 py-2 text-[13px] rounded-md border border-memorial-line bg-white focus:outline-none focus:border-memorial-bronze-deep font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Typ *</label>
                <select
                  value={form.discount_type}
                  onChange={(e) => setForm({ ...form, discount_type: e.target.value as 'percentage' | 'fixed' })}
                  className="w-full px-3 py-2 text-[13px] rounded-md border border-memorial-line bg-white focus:outline-none focus:border-memorial-bronze-deep"
                >
                  <option value="percentage">Prozent (%)</option>
                  <option value="fixed">Fix (CHF)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">
                  Wert * {form.discount_type === 'percentage' ? '(0-100)' : '(CHF)'}
                </label>
                <input
                  type="number"
                  step={form.discount_type === 'percentage' ? '1' : '0.01'}
                  min="0"
                  max={form.discount_type === 'percentage' ? '100' : undefined}
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder={form.discount_type === 'percentage' ? '25' : '10.00'}
                  className="w-full px-3 py-2 text-[13px] rounded-md border border-memorial-line bg-white focus:outline-none focus:border-memorial-bronze-deep"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Gültig bis (optional)</label>
                <input
                  type="date"
                  value={form.valid_until}
                  onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
                  className="w-full px-3 py-2 text-[13px] rounded-md border border-memorial-line bg-white focus:outline-none focus:border-memorial-bronze-deep"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-memorial-ink-soft block mb-1.5">Max. Anwendungen (optional)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={form.max_uses}
                  onChange={(e) => setForm({ ...form, max_uses: e.target.value })}
                  placeholder="∞"
                  className="w-full px-3 py-2 text-[13px] rounded-md border border-memorial-line bg-white focus:outline-none focus:border-memorial-bronze-deep"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-[13px] text-memorial-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                    className="w-4 h-4 accent-memorial-bronze-deep"
                  />
                  Aktiv
                </label>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}
                className="px-4 py-2 text-[12px] rounded-md border border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-[12px] rounded-md bg-memorial-bronze-deep text-white hover:bg-memorial-bronze disabled:opacity-50 transition-colors"
              >
                {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Speichern
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-memorial-bronze-deep" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-memorial-ink-soft">Keine Rabattcodes gefunden.</div>
        ) : (
          <div className="memorial-card rounded-2xl overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-memorial-line">
                  {['Code', 'Wert', 'Status', 'Bestellungen', 'Bezahlt', 'Pending', 'Umsatz', 'Rabatt', 'Zuletzt', 'Limit', ''].map((h) => (
                    <th key={h} className="text-left text-[10px] uppercase tracking-widest text-memorial-ink-soft px-4 py-3 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const valueLabel =
                    r.discount_type === 'percentage'
                      ? `${r.value}%`
                      : `CHF ${formatChf(r.value)}`
                  const limitLabel =
                    r.max_uses == null
                      ? '∞'
                      : `${r.times_used}/${r.max_uses}`
                  const expired = r.valid_until && new Date(r.valid_until) < new Date()
                  return (
                    <tr key={r.code} className="border-b border-memorial-line last:border-0 hover:bg-memorial-canvas/50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 font-mono text-memorial-ink font-medium">
                          <Tag className="w-3 h-3 text-memorial-bronze-deep" />
                          {r.code}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-memorial-ink">{valueLabel}</td>
                      <td className="px-4 py-3">
                        {!r.is_active ? (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">Inaktiv</span>
                        ) : expired ? (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">Abgelaufen</span>
                        ) : (
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-memorial-sage/10 text-memorial-sage-deep">Aktiv</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-memorial-ink-soft">{r.total_orders}</td>
                      <td className="px-4 py-3 font-medium text-memorial-ink">{r.paid_orders}</td>
                      <td className="px-4 py-3 text-memorial-ink-soft">{r.pending_orders}</td>
                      <td className="px-4 py-3 text-memorial-ink">CHF {formatChf(r.total_revenue_chf)}</td>
                      <td className="px-4 py-3 text-memorial-bronze-deep">− CHF {formatChf(r.total_discount_chf)}</td>
                      <td className="px-4 py-3 text-memorial-ink-soft whitespace-nowrap">{formatDate(r.last_used_at)}</td>
                      <td className="px-4 py-3 text-memorial-ink-soft">{limitLabel}</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleActive(r.code, r.is_active)}
                          className="text-[11px] px-2.5 py-1 rounded-full border border-memorial-line text-memorial-ink-soft hover:border-memorial-bronze hover:text-memorial-ink transition-colors"
                        >
                          {r.is_active ? 'Deaktivieren' : 'Aktivieren'}
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

export default function AdminDiscounts() {
  const { isAuthed, login: _login, logout } = useAdminAuth()
  const navigate = useNavigate()
  if (!isAuthed) {
    navigate('/admin')
    return null
  }
  return <Dashboard onLogout={logout} />
}
