import pg from 'pg'
import fs from 'node:fs'

// SECURITY: read connection string from env. Never hardcode credentials.
const CONN = process.env.OLD_DB_CONN
if (!CONN) {
  console.error('Set env var OLD_DB_CONN with the old project connection string.')
  process.exit(1)
}

const client = new pg.Client({ connectionString: CONN, ssl: { rejectUnauthorized: false } })
await client.connect()
console.log('Connected to old DB')

// ──────────── SCHEMA ────────────

const { rows: tables } = await client.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  ORDER BY table_name
`)
console.log(`Found ${tables.length} tables:`, tables.map(t => t.table_name).join(', '))

const schemaLines = []
schemaLines.push('-- Schema dump from old Memora project')
schemaLines.push('-- Generated ' + new Date().toISOString())
schemaLines.push('')

// Extensions (common Supabase ones)
schemaLines.push(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
schemaLines.push(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`)
schemaLines.push('')

// Sequences
const { rows: sequences } = await client.query(`
  SELECT sequence_name, data_type, start_value, minimum_value, maximum_value, increment, cycle_option
  FROM information_schema.sequences
  WHERE sequence_schema = 'public'
`)
for (const s of sequences) {
  schemaLines.push(`CREATE SEQUENCE IF NOT EXISTS ${s.sequence_name} AS ${s.data_type} START ${s.start_value} INCREMENT ${s.increment};`)
}
if (sequences.length > 0) schemaLines.push('')

// Tables
for (const { table_name } of tables) {
  const { rows: cols } = await client.query(`
    SELECT column_name, data_type, udt_name, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `, [table_name])

  const colDefs = cols.map(c => {
    let type = c.data_type
    if (type === 'USER-DEFINED') type = c.udt_name
    else if (type === 'ARRAY') type = `${c.udt_name.replace(/^_/, '')}[]`
    else if (type === 'character varying' && c.character_maximum_length) type = `varchar(${c.character_maximum_length})`
    else if (type === 'numeric' && c.numeric_precision) type = `numeric(${c.numeric_precision},${c.numeric_scale ?? 0})`
    else if (type === 'timestamp with time zone') type = 'timestamptz'
    else if (type === 'timestamp without time zone') type = 'timestamp'

    let line = `  "${c.column_name}" ${type}`
    if (c.column_default !== null) line += ` DEFAULT ${c.column_default}`
    if (c.is_nullable === 'NO') line += ' NOT NULL'
    return line
  })

  schemaLines.push(`CREATE TABLE IF NOT EXISTS "${table_name}" (`)
  schemaLines.push(colDefs.join(',\n'))
  schemaLines.push(');')
  schemaLines.push('')
}

// Constraints (PK, FK, UNIQUE, CHECK)
const { rows: constraints } = await client.query(`
  SELECT conname, contype, conrelid::regclass AS table_name,
         pg_get_constraintdef(oid) AS def
  FROM pg_constraint
  WHERE connamespace = 'public'::regnamespace
  ORDER BY contype
`)
for (const c of constraints) {
  schemaLines.push(`ALTER TABLE ${c.table_name} ADD CONSTRAINT "${c.conname}" ${c.def};`)
}
if (constraints.length > 0) schemaLines.push('')

// Indexes (non-constraint)
const { rows: indexes } = await client.query(`
  SELECT indexname, indexdef FROM pg_indexes
  WHERE schemaname = 'public'
  AND indexname NOT IN (
    SELECT conname FROM pg_constraint WHERE connamespace = 'public'::regnamespace
  )
`)
for (const i of indexes) {
  schemaLines.push(i.indexdef + ';')
}
if (indexes.length > 0) schemaLines.push('')

// Functions
const { rows: functions } = await client.query(`
  SELECT proname, pg_get_functiondef(oid) AS def
  FROM pg_proc
  WHERE pronamespace = 'public'::regnamespace
`)
for (const f of functions) {
  schemaLines.push(f.def + ';')
  schemaLines.push('')
}

// Triggers
const { rows: triggers } = await client.query(`
  SELECT tgname, pg_get_triggerdef(t.oid) AS def
  FROM pg_trigger t
  JOIN pg_class c ON c.oid = t.tgrelid
  WHERE c.relnamespace = 'public'::regnamespace
  AND NOT tgisinternal
`)
for (const t of triggers) {
  schemaLines.push(t.def + ';')
}
if (triggers.length > 0) schemaLines.push('')

fs.writeFileSync('schema.sql', schemaLines.join('\n'))
console.log(`schema.sql written (${schemaLines.length} lines)`)

// ──────────── DATA ────────────

function escapeValue(val) {
  if (val === null) return 'NULL'
  if (typeof val === 'number') return String(val)
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  if (val instanceof Date) return `'${val.toISOString()}'`
  if (Array.isArray(val) || (typeof val === 'object' && val !== null)) {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`
  }
  // string
  return `'${String(val).replace(/'/g, "''")}'`
}

const dataLines = []
dataLines.push('-- Data dump from old Memora project')
dataLines.push('-- Generated ' + new Date().toISOString())
dataLines.push('SET session_replication_role = replica;')
dataLines.push('')

let totalRows = 0
for (const { table_name } of tables) {
  const { rows } = await client.query(`SELECT * FROM "${table_name}"`)
  if (rows.length === 0) {
    dataLines.push(`-- ${table_name}: empty`)
    dataLines.push('')
    continue
  }

  const cols = Object.keys(rows[0])
  dataLines.push(`-- ${table_name}: ${rows.length} rows`)
  for (const row of rows) {
    const vals = cols.map(c => escapeValue(row[c]))
    dataLines.push(`INSERT INTO "${table_name}" (${cols.map(c => `"${c}"`).join(', ')}) VALUES (${vals.join(', ')});`)
  }
  dataLines.push('')
  totalRows += rows.length
}

dataLines.push('SET session_replication_role = DEFAULT;')

fs.writeFileSync('data.sql', dataLines.join('\n'))
console.log(`data.sql written (${totalRows} rows across ${tables.length} tables)`)

await client.end()
console.log('Done')
