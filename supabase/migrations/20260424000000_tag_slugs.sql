CREATE TABLE IF NOT EXISTS tag_slugs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  batch_label text,
  assigned_order_id uuid REFERENCES customer_orders(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  assigned_at timestamptz
);
CREATE INDEX IF NOT EXISTS tag_slugs_assigned_order_idx ON tag_slugs(assigned_order_id);
CREATE INDEX IF NOT EXISTS tag_slugs_batch_idx ON tag_slugs(batch_label);
ALTER TABLE tag_slugs DISABLE ROW LEVEL SECURITY;
