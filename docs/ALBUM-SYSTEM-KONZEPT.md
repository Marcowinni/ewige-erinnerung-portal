# Memora Moments – Eigenes Album-System (Konzept)

## 1. Ausgangslage

- **Aktuell:** Alben wurden in Canva erstellt und über `/album/SLUG` als iframe eingebettet.
- **Ziel:** Eigenes Album-System, das aus Bildern im Supabase Storage automatisch digitale Fotoalben erzeugt.
- **URL:** `/album/SLUG` bleibt unverändert.
- **Fokus:** Natives Album-System als Standard. Canva-Links bleiben für bestehende Alben erhalten (Legacy).

---

## 2. Ein Bestellfluss: Partner Orders

Es gibt nur noch **einen** Upload- und Bestellprozess: **Partner Orders**.

| Aspekt | Details |
|--------|---------|
| **Tabelle** | `partner_orders` |
| **Storage** | Bucket `uploads` |
| **Ordner** | `order_{id}/` (einheitlich) |
| **Bildliste** | In DB gespeichert (`uploaded_files`) |

### 2.1 Einheitlicher Upload

- Alle Bilder gehen in den Bucket **`uploads`** unter `order_{orderId}/`.
- Die Bildliste wird in der DB gespeichert (analog zu früheren `orders`).
- Kein separater `flueckiger`-Bucket mehr für den Hauptfluss.

### 2.2 Relevante Metadaten (partner_orders)

- `contact_name` – Name der Person
- `music_choice` – Hintergrundmusik
- `album_style` – `'modern'` oder `'classic'` (Layout-Stil)
- `uploaded_files` – `{ path, caption }[]` (neu in DB)

---

## 3. Produktlogik: Automatische Album-Generierung

### 3.1 Prinzip

Kein manuelles Layout wie in Canva. Eine **Layout-Engine** erzeugt aus der Bildliste automatisch Seiten mit klaren Regeln.

### 3.2 Layout-Typen (Seiten)

| Typ | Beschreibung | Verwendung |
|-----|--------------|------------|
| **Single** | 1 Bild, volle Seite | Einzelne, starke Momente |
| **Double** | 2 Bilder nebeneinander | Paare, Vergleiche |
| **Triple** | 3 Bilder (1 groß, 2 klein oder 1+2) | Kleine Serie |
| **Grid** | 4 Bilder (2×2) | Übersicht, Collage |
| **Intro** | Titelseite mit Name | Erste Seite |
| **Outro** | Abschlussseite | Letzte Seite |

### 3.3 Layout-Algorithmus

```
Eingabe: sortierte Bildliste [img1, img2, ...], album_style

1. Intro-Seite (Name aus subject_details/contact_name)
2. Für jedes Bild bzw. jede Bildgruppe:
   - 1–3 Bilder: Single/Double/Triple je nach Kontext
   - 4+ Bilder: abwechselnd Single, Double, Grid
   - Variation nach album_style (modern: mehr Weißraum, classic: mehr Rahmen)
3. Outro-Seite (optional)
```

**Konkrete Regeln (vereinfacht):**

- **1 Bild:** Single
- **2 Bilder:** Double (nebeneinander)
- **3 Bilder:** Triple (1 groß oben, 2 unten)
- **4 Bilder:** Grid 2×2
- **5–8 Bilder:** Mix aus Single + Double
- **9+ Bilder:** Mix aus Single, Double, Grid (z.B. jede 4. Seite ein Grid)

### 3.4 Sortierung

- Reihenfolge aus `uploaded_files` (Upload-Reihenfolge, in DB gespeichert).

### 3.5 Templates & DB-Speicherung

- **Layout-Templates** sind vordefinierte Regeln (Single, Double, Triple, Grid, Intro, Outro).
- Das **generierte Album-Layout** wird in der DB gespeichert, damit es reproduzierbar ist und nicht bei jedem Aufruf neu berechnet werden muss.
- Spalte in `partner_orders`: `album_layout` (JSONB) – speichert die Seitenstruktur.

**Beispiel `album_layout`:**

```json
{
  "pages": [
    { "type": "intro", "name": "Max Mustermann" },
    { "type": "single", "imageIndex": 0 },
    { "type": "double", "imageIndices": [1, 2] },
    { "type": "grid", "imageIndices": [3, 4, 5, 6] },
    { "type": "outro" }
  ]
}
```

- Wird beim ersten Album-Aufruf (oder nach Upload) generiert und gespeichert.
- Bei Änderung der Bilder (falls später möglich) kann das Layout neu generiert werden.

---

## 4. Technische Architektur

### 4.1 Backend-Änderungen

#### `partner_orders` erweitern

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `uploaded_files` | JSONB | `[{ path, caption }]` – Bildliste (neu) |
| `album_layout` | JSONB | Generierte Seitenstruktur (neu) |

#### `get-album-data` erweitern

**Aktuell:** Liefert `canva_link`, `subject_details`, `music_choice`.

**Neu:**

```ts
{
  // Legacy – nur wenn vorhanden (bestehende Canva-Alben)
  canva_link?: string | null,

  // Immer
  subject_details: string,
  music_choice: string,
  album_style: 'modern' | 'classic',

  // album_type: 'canva' = Legacy, 'native' = Standard
  album_type: 'canva' | 'native',

  // Für natives Album (Fokus)
  image_sources?: {
    bucket: 'uploads',
    folder: string,
    files: { path: string; caption?: string }[]
  },
  album_layout?: { pages: [...] }  // Aus DB, falls bereits generiert
}
```

**Logik:**

1. Slug in `partner_orders` suchen (Hauptquelle).
2. **Legacy:** Falls in `orders` oder `partner_orders` ein `canva_link` gesetzt ist → `album_type: 'canva'`, Canva-Embed wie bisher.
3. **Standard (nativ):** Wenn kein `canva_link` oder Fokus auf nativ:
   - `uploaded_files` aus DB lesen.
   - Bucket `uploads`, Ordner `order_{id}`.
   - Falls `album_layout` in DB → verwenden. Sonst: Layout generieren, in DB speichern, zurückgeben.

### 4.2 Frontend-Struktur

```
src/
├── pages/
│   └── Album.tsx              # Router, lädt Daten, wählt Canva vs. Native
├── components/
│   └── album/
│       ├── AlbumViewer.tsx     # Haupt-Container (Swipe, Navigation)
│       ├── AlbumPage.tsx       # Einzelne Seite (Single/Double/Grid etc.)
│       ├── PageTurnEffect.tsx  # Blätter-Animation (optional)
│       ├── useAlbumLayout.ts   # Hook: Bildliste + album_style → Seiten-Layout (oder aus DB)
│       └── useAlbumImages.ts   # Hook: signed URLs aus Storage
```

### 4.3 Ablauf im Frontend

1. `Album.tsx` ruft `get-album-data` auf.
2. **Legacy:** Wenn `album_type === 'canva'` und `canva_link` → bestehendes iframe-Verhalten.
3. **Standard (nativ):** Wenn `album_type === 'native'`:
   - `image_sources.files` → signed URLs aus Supabase Storage (`uploads`).
   - Layout: aus `album_layout` (DB) oder per `useAlbumLayout` generieren.
   - `AlbumViewer` rendert Seiten mit Swipe/Blättern.
   - Musik wie bisher.

---

## 5. UX: Swipe & Blättern

### 5.1 Mobile

- **Swipe:** Horizontal wischen (links/rechts) für nächste/vorherige Seite.
- **Touch:** Optional Doppelseiten-Layout (links + rechts).
- **Fullscreen:** Album im Vollbild, keine Ablenkung.

### 5.2 Desktop

- **Klicks:** Pfeile oder Klick auf linke/rechte Hälfte.
- **Tastatur:** Pfeiltasten links/rechts.
- **Optional:** Blätter-Animation (CSS 3D transform) für Buch-Feeling.

### 5.3 Technik

- **Bibliothek:** z.B. `react-swipeable` oder `use-gesture` für Swipe.
- **State:** `currentPage` (0-basiert).
- **Rendering:** Nur aktuelle + evtl. Nachbar-Seiten für Performance (Lazy Loading).

---

## 6. Design-System (Memora Moments)

### 6.1 Stile

| Stil | Merkmale |
|------|----------|
| **Modern** | Viel Weißraum, dezente Schatten, klare Typografie, ruhige Farben |
| **Classic** | Rahmen, Papier-Textur, serifenähnliche Schriften, warme Töne |

### 6.2 Farben

- Nutzung der bestehenden CSS-Variablen (`--primary`, `--background`, `--muted` etc.).
- Album-Hintergrund: `album-background` (bereits in `index.css`).

### 6.3 Typografie

- Serif für Titel (z.B. Lora, Playfair Display).
- Sans-Serif für Captions (z.B. Lato, Montserrat).

---

## 7. Datenschutz & Kontrolle

- **Keine externen Dienste:** Kein Canva, keine externen CDNs für Album-Inhalte.
- **Supabase Storage:** Bilder bleiben im eigenen Projekt.
- **Signed URLs:** Zeitlich begrenzte URLs für Bilder, keine öffentlichen Links.
- **Keine Tracking-Pixel** in Album-Ansicht.

---

## 8. Migrations-Strategie

### 8.1 Rückwärtskompatibilität (Canva Legacy)

- Bestehende Alben mit `canva_link` → weiterhin Canva-Embed.
- Beide Modi können parallel existieren: **Canva (Legacy)** und **nativ (Standard)**.
- Fokus auf nativ; Canva nur für bereits erstellte Alben.

### 8.2 Partner-Orders (einziger Bestellfluss)

- `partner_orders` erhält neue Spalten: `uploaded_files`, `album_layout`.
- Upload-Flow: Bilder in Bucket `uploads` unter `order_{id}/` speichern (Ordner z.B. `order_5/` statt `flue_5/`).
- `uploaded_files` beim Upload in DB schreiben: Nach dem Upload die Pfade an eine Edge Function übergeben (z.B. `finalize-partner-order`) oder direkt per `update` in `partner_orders` speichern.
- `album_layout` wird beim ersten Album-Aufruf generiert und in DB gespeichert.

### 8.3 Alte Orders (optional)

- Falls noch Einträge in `orders` mit `canva_link` existieren: Lookup in `get-album-data` beibehalten, damit alte Links weiter funktionieren.

---

## 9. Implementierungs-Reihenfolge

1. **Phase 1 – DB & Upload**
   - `partner_orders`: Spalten `uploaded_files`, `album_layout` hinzufügen.
   - PartnerUploader: Upload in Bucket `uploads` (statt `flueckiger`), `uploaded_files` in DB speichern.

2. **Phase 2 – Backend**
   - `get-album-data` erweitern: `album_type`, `image_sources`, `album_layout`.
   - Logik: Canva (Legacy) vs. nativ; bei nativ: `uploaded_files` aus DB, Layout generieren und speichern.

3. **Phase 3 – Layout-Engine & Templates**
   - `useAlbumLayout` Hook: Bildliste + Stil → Seiten-Array.
   - Layout-Typen: Intro, Single, Double, Triple, Grid, Outro.
   - Generiertes Layout in DB speichern (`album_layout`).

4. **Phase 4 – Album-Viewer**
   - `AlbumViewer` mit Swipe und Navigation.
   - `AlbumPage` für die verschiedenen Layout-Typen.
   - Signed URLs aus Storage (`uploads`).

5. **Phase 5 – Integration & Feinschliff**
   - `Album.tsx` anpassen: Canva (Legacy) vs. nativ, Fokus auf nativ.
   - Musik, Cover, Mobile/Desktop-Ansichten.
   - Blätter-Animation (optional), Lazy Loading, Captions.

---

## 10. Erweiterbarkeit

- **Neue Layout-Typen:** Einfach neue Typen in der Layout-Engine ergänzen.
- **Neue Stile:** `album_style` erweiterbar (z.B. `minimal`, `elegant`).
- **Videos:** Später möglich, wenn `uploaded_files` oder Storage auch Videos enthält.
- **Mehrsprachigkeit:** Texte (Intro/Outro) über i18next wie im Rest der App.

---

## 11. Zusammenfassung

| Aspekt | Lösung |
|--------|--------|
| **Bestellfluss** | Nur Partner Orders (ein Flow) |
| **Storage** | Bucket `uploads`, Ordner `order_{id}/` |
| **URL** | `/album/SLUG` unverändert |
| **Bilder** | `uploaded_files` in DB, Bilder in `uploads` |
| **Layout** | Templates + `album_layout` in DB gespeichert |
| **Swipe** | Mobile: Swipe, Desktop: Klick/Tastatur |
| **Canva** | Legacy: nur für bestehende Alben mit `canva_link` |
| **Fokus** | Natives Album-System als Standard |
| **Datenschutz** | Alles im eigenen Supabase |
| **Erweiterbarkeit** | Layout-Typen und Stile modular |
