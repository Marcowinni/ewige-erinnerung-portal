# Compliance-Fix: Album-Medien aus Public Storage → Private + Signed URLs

## Befund (IST)

- **1 Bucket** `uploads`, `public = true`, 56 Objekte, 4 Order-Ordner.
- **Pfadschema** bereits UUID-basiert: `order_<uuid>/<uuid>-<dateiname>` → nicht erratbar.
- **album_layout** speichert **Pfade**, keine URLs (gut — URLs werden zur Laufzeit erzeugt).
- **Viewer** (`useAlbumImages`) signiert **client-seitig** via `createSignedUrl` (anon, 1 h).
- **AdminAlbum.tsx:81** nutzt `getPublicUrl` (bricht bei privatem Bucket).
- **Sample-Alben** (`/album/MODERN-MENSCH` etc.) nutzen statische `/public`-Pfade → nicht betroffen.
- **productMedia.ts** zeigt auf fremdes Projekt `btwzspkoyusxajcchapn` (website-media) → nicht relevant.

### RLS auf `storage.objects` (KRITISCH)

| Policy | cmd | Rolle | Wirkung |
|---|---|---|---|
| uploads_anon_insert | INSERT | anon | Upload (nötig im Bestellprozess vor Zahlung) |
| uploads_anon_select | SELECT | anon | **jeder anon-key kann alle Medien listen/lesen** |
| uploads_anon_update | UPDATE | anon | **jeder kann fremde Medien überschreiben** |
| uploads_anon_delete | DELETE | anon | **jeder kann fremde Medien löschen** |
| uploads_public_select | SELECT | public | **öffentlich lesbar ohne Auth** |

→ anon-key liegt im Frontend offen. Aktuell: Vollzugriff (inkl. Löschen) auf alle Trauer-Medien.

## Ziel (Variante A — empfohlen, DSGVO Art. 32 / nDSG Art. 8 konform)

Server-seitig signierte URLs (service role), privater Bucket, enge RLS, Audit via Edge-Logs.

### Schritte

1. **Edge: `get-album-data`** (service role) — generiert Signed URLs für die Medien des Albums
   und liefert sie im Payload (`files[i].signedUrl` oder paralleles `urls[]`, 1 h Lifetime).
   Audit: jeder Album-Abruf = ein Edge-Invoke-Log.

2. **Frontend Viewer** — `useAlbumImages` signiert nicht mehr selbst, sondern konsumiert die
   vom Backend gelieferten Signed URLs. (3 Viewer + AlbumViewer.tsx + editorLayoutConverter
   prüfen.)

3. **AdminAlbum.tsx** — `getPublicUrl` → Signed URL (über Edge/Service, da Admin auf anon-key
   mit Custom-Auth läuft). Eigener Admin-Sign-Pfad oder Wiederverwendung der Edge-Funktion.

4. **Bucket privat**: `UPDATE storage.buckets SET public = false WHERE id = 'uploads'`.

5. **RLS härten**:
   - DROP `uploads_public_select`, `uploads_anon_select`, `uploads_anon_update`, `uploads_anon_delete`.
   - BEHALTEN `uploads_anon_insert` (Upload im Bestellprozess, vor Zahlung, anon).
     - Optional später: Upload ebenfalls über Edge/Token absichern (Scope getrennt halten).
   - Lesen/Löschen/Ändern künftig nur service role (Edge-Funktionen).

6. **Migration/Test**: 4 bestehende Orders durchklicken (`bello-04`, `hans-uster-01`, +2),
   prüfen dass Signed URLs rendern. Keine Datenverschiebung nötig (nur Bucket-Flag + RLS).

7. **Doku-Konsistenz**: DSE Ziff. 4.2 / 13 + Bearbeitungsverzeichnis ergänzen:
   „Privater Bucket, Zugriff ausschliesslich über zeitlich begrenzte signierte URLs,
   Server-seitige Generierung, Zugriffs-Logging."

### Offene Entscheidungen

- **A vs A'**: A' = nur Bucket privat + anon SELECT behalten → Viewer-Client-Signing bleibt,
  aber anon kann weiterhin jeden Pfad signieren → **kein echter Gewinn**. → A nötig.
- **Upload-Policy**: anon INSERT bleibt nötig (Upload vor Order/Zahlung). Akzeptiert?
- **Delete-Pfad**: Admin-Löschen (`Admin.tsx:144` `.remove()`) muss auf service role
  umziehen (anon DELETE wird entfernt).

## Risiko / Reversibilität

- Bucket-Flag + RLS sofort reversibel (zurückflippen). Keine Objekt-Migration.
- Während Umstellung: alte Frontend-Bundles (Vercel-Cache) signieren noch client-seitig →
  brechen erst, wenn anon SELECT entfernt wird. Reihenfolge: erst Code deployen + promoten,
  dann RLS/Bucket umstellen.
