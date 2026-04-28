# Album-Engine (Modern & Classic)

## Überblick

- **`src/lib/album-engine/`** — Typen, Layout-Katalog, Scoring, `buildEngineBlocks(items, mode)`.
- **`src/components/album-v2/`** — `AlbumEngineView`, `MediaFrame`, `VideoPremiumBlock`.
- **`AlbumViewer`** bündelt Medien → `engineItemsFromSources` → `buildEngineBlocks` → jeder Block eine Carousel-Seite mit `engineBlock`.

Der Legacy-Pfad `AlbumBlockPage` bleibt in `AlbumPage`, falls eine Seite nur `layout` + `mediaIndices` ohne `engineBlock` hat.

## Page-Flip (Classic)

Für echtes Album-Blättern eignen sich z. B.:

- **[react-pageflip](https://www.npmjs.com/package/react-pageflip)** (StPageFlip-Wrapper) — Doppelseiten, typisch für Bücher.
- **Custom CSS 3D** — volle Kontrolle, mehr Aufwand.

Integration: `EngineAlbumBlock[]` oder `StoryPage[]` aus `buildEngineBlocks` als „Spreads“ gruppieren (2 Seiten pro Spread), dann jede Seite als Layer in der Flip-Library rendern. Die aktuelle `AlbumViewer`-Carousel-Logik kann parallel bleiben oder durch eine `ClassicAlbumBook`-Shell ersetzt werden.

## Erweiterung

- Neues Layout: Eintrag in `catalog.ts` (`MODERN_LAYOUTS` / `CLASSIC_LAYOUTS`) inkl. `match`, `family`, `baseScore`.
- Fokuspunkt / Featured: Felder an `EngineMediaItem` nutzen und in `scoreSpec` oder `match` gewichten.
