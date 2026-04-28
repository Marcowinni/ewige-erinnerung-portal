export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

export async function makeUniqueSlug(
  supabase: any,
  base: string,
  table = 'partner_orders'
): Promise<string> {
  const cleanBase = slugify(base) || 'album'
  const { data, error } = await supabase.rpc('next_album_slug', { base_name: cleanBase, tbl_name: table })
  if (error || !data) {
    // fallback with timestamp
    return `${cleanBase}-${Date.now()}`
  }
  return data as string
}
