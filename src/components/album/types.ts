export type AlbumPageType = 'intro' | 'hero' | 'single' | 'polaroid' | 'overlap' | 'bento' | 'double' | 'triple' | 'grid' | 'outro'

export interface AlbumLayoutPage {
  type: AlbumPageType
  name?: string
  imageIndex?: number
  imageIndices?: number[]
}

export interface AlbumLayout {
  pages: AlbumLayoutPage[]
}

export interface ImageSource {
  bucket: string
  folder: string
  files: { path: string; caption?: string }[]
}
