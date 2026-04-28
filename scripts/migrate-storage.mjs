import { createClient } from '@supabase/supabase-js'
import { Buffer } from 'node:buffer'

// Old project — read credentials
const OLD_URL = 'https://btwzspkoyusxajcchapn.supabase.co'
const OLD_SERVICE_ROLE = process.env.OLD_SERVICE_ROLE_KEY

// New project
const NEW_URL = 'https://lguxgliutkgvlbrlqicv.supabase.co'
const NEW_SERVICE_ROLE = process.env.NEW_SERVICE_ROLE_KEY

const BUCKET = 'uploads'

if (!OLD_SERVICE_ROLE || !NEW_SERVICE_ROLE) {
  console.error('Set env vars: OLD_SERVICE_ROLE_KEY and NEW_SERVICE_ROLE_KEY')
  process.exit(1)
}

const SRC = createClient(OLD_URL, OLD_SERVICE_ROLE, { auth: { persistSession: false } })
const DST = createClient(NEW_URL, NEW_SERVICE_ROLE, { auth: { persistSession: false } })

async function listAll(prefix = '') {
  const out = []
  let offset = 0
  const pageSize = 1000
  while (true) {
    const { data, error } = await SRC.storage.from(BUCKET).list(prefix, { limit: pageSize, offset })
    if (error) throw error
    if (!data || data.length === 0) break
    for (const item of data) {
      const path = prefix ? `${prefix}/${item.name}` : item.name
      if (item.id === null) {
        out.push(...(await listAll(path)))
      } else {
        out.push(path)
      }
    }
    if (data.length < pageSize) break
    offset += pageSize
  }
  return out
}

console.log('Listing files in old bucket...')
const files = await listAll()
console.log(`Found ${files.length} files`)

let success = 0, fail = 0
for (const [i, path] of files.entries()) {
  process.stdout.write(`[${i + 1}/${files.length}] ${path}... `)

  const { data: blob, error: dlErr } = await SRC.storage.from(BUCKET).download(path)
  if (dlErr) { console.log(`DL FAIL: ${dlErr.message}`); fail++; continue }

  const buffer = Buffer.from(await blob.arrayBuffer())
  const { error: upErr } = await DST.storage.from(BUCKET).upload(path, buffer, {
    contentType: blob.type || 'application/octet-stream',
    upsert: true,
  })
  if (upErr) { console.log(`UP FAIL: ${upErr.message}`); fail++; continue }

  success++
  console.log('OK')
}

console.log(`\nDone: ${success} success, ${fail} fail`)
