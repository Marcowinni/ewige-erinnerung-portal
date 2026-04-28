const VIDEO_EXT = ['.mp4', '.webm', '.mov', '.m4v', '.ogg', '.avi', '.mkv']
const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp']

export function isVideoPath(path: string): boolean {
  const lower = path.toLowerCase()
  return VIDEO_EXT.some((ext) => lower.endsWith(ext))
}

export function isImagePath(path: string): boolean {
  const lower = path.toLowerCase()
  return IMAGE_EXT.some((ext) => lower.endsWith(ext))
}

export function isAlbumMediaPath(path: string): boolean {
  return isImagePath(path) || isVideoPath(path)
}
