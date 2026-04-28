import type { AlbumLayout, ImageSource } from '@/components/album/types'
import { ModernAlbumViewer } from './ModernAlbumViewer'
import { ClassicAlbumViewer } from './ClassicAlbumViewer'
import { TimelessAlbumViewer } from './TimelessAlbumViewer'

interface AlbumViewerRouterProps {
  albumStyle: 'modern' | 'classic' | 'timeless' | 'vintage'
  albumLayout: AlbumLayout
  imageSources: ImageSource
  subjectName: string
  dedication?: string
  dateRange?: string
}

export function AlbumViewerRouter({
  albumStyle,
  albumLayout,
  imageSources,
  subjectName,
  dedication,
  dateRange,
}: AlbumViewerRouterProps) {
  // Backward compat: legacy 'vintage' rows are treated as 'timeless'
  const normalizedStyle = albumStyle === 'vintage' ? 'timeless' : albumStyle

  if (normalizedStyle === 'classic') {
    return (
      <ClassicAlbumViewer
        albumLayout={albumLayout}
        imageSources={imageSources}
        subjectName={subjectName}
        dedication={dedication}
        dateRange={dateRange}
      />
    )
  }

  if (normalizedStyle === 'timeless') {
    return (
      <TimelessAlbumViewer
        albumLayout={albumLayout}
        imageSources={imageSources}
        subjectName={subjectName}
        dedication={dedication}
        dateRange={dateRange}
      />
    )
  }

  return (
    <ModernAlbumViewer
      albumLayout={albumLayout}
      imageSources={imageSources}
      subjectName={subjectName}
      dedication={dedication}
      dateRange={dateRange}
    />
  )
}
