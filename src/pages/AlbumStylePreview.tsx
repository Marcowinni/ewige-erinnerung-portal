import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AlbumViewer } from '@/components/album'
import type { AlbumLayout, ImageSource } from '@/components/album'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/** Quer/Hoch/Quer-Mix damit Spread-Vorlagen (2L+1P, …) sichtbar werden */
const PREVIEW_IMAGES = [
  'https://picsum.photos/seed/memoraL1/920/520',
  'https://picsum.photos/seed/memoraP1/520/820',
  'https://picsum.photos/seed/memoraL2/900/500',
  'https://picsum.photos/seed/memoraP2/480/780',
  'https://picsum.photos/seed/memoraL3/880/540',
  'https://picsum.photos/seed/memoraP3/540/860',
]

/** Wie Produktion: nur Intro/Outro – Blöcke erzeugt der Viewer via buildEngineBlocks + Metadaten */
const MOCK_LAYOUT: AlbumLayout = {
  pages: [
    { type: 'intro', name: 'Vorschau Name' },
    { type: 'outro' },
  ],
}

const DUMMY_SOURCES: ImageSource = {
  bucket: 'uploads',
  folder: 'preview',
  files: [],
}

/**
 * Route: /album-stil-vorschau
 * Modern ↔ Classic umschalten, alle wichtigen Seiten-Typen durchswipen.
 * Speicher AlbumPage.tsx oder index.css – Vite aktualisiert die Ansicht sofort.
 */
export default function AlbumStylePreview() {
  const [style, setStyle] = useState<'modern' | 'classic'>('modern')

  return (
    <div className="album-background min-h-screen flex flex-col">
      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <header className="shrink-0 flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div>
            <h1 className="text-lg font-serif font-semibold">Album-Stil Vorschau</h1>
            <p className="text-xs text-muted-foreground">
              <code className="rounded bg-muted px-1">AlbumSpread.tsx</code> /{' '}
              <code className="rounded bg-muted px-1">AlbumPage.tsx</code> – sofort sichtbar (HMR).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Stil:</span>
            <div className="flex rounded-lg border border-border p-0.5 bg-muted/30">
              <Button
                type="button"
                variant={style === 'modern' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn('rounded-md', style === 'modern' && 'shadow-sm')}
                onClick={() => setStyle('modern')}
              >
                Modern
              </Button>
              <Button
                type="button"
                variant={style === 'classic' ? 'secondary' : 'ghost'}
                size="sm"
                className={cn('rounded-md', style === 'classic' && 'shadow-sm')}
                onClick={() => setStyle('classic')}
              >
                Klassisch
              </Button>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">Zur Startseite</Link>
            </Button>
          </div>
        </header>

        <div className="flex-1 min-h-0 flex flex-col px-3 py-4 md:px-10 md:py-8 max-w-5xl mx-auto w-full min-h-[min(100dvh,100%)] h-[calc(100dvh-8.5rem)] sm:h-[calc(100dvh-140px)]">
          <AlbumViewer
            albumLayout={MOCK_LAYOUT}
            imageSources={DUMMY_SOURCES}
            albumStyle={style}
            subjectName="Vorschau"
            previewImageUrls={PREVIEW_IMAGES}
          />
        </div>
      </div>
    </div>
  )
}
