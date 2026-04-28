-- New clean table for the customer self-service flow.
-- Replaces the catch-all partner_orders approach for customer orders.
-- partner_orders stays for the legacy partner-upload flow at /upload.

CREATE TABLE IF NOT EXISTS customer_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,

  -- Subject (person or pet)
  subject_type text NOT NULL CHECK (subject_type IN ('human', 'pet')),
  subject_name text NOT NULL,
  birth_date date,
  passing_date date,
  dedication text,

  -- Album content
  album_style text NOT NULL CHECK (album_style IN ('modern', 'classic', 'vintage')),
  music_choice jsonb,
  uploaded_files jsonb NOT NULL DEFAULT '[]'::jsonb,
  album_layout jsonb,

  -- Customer contact
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  shipping_address jsonb,
  shipping_zone text CHECK (shipping_zone IN ('CH', 'EU', 'WORLD')),

  -- Commerce
  price_chf numeric(10,2),
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'test', 'refunded')),
  stripe_session_id text,

  -- Workflow
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'in-progress', 'published', 'cancelled')),
  is_test boolean NOT NULL DEFAULT false,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

CREATE INDEX IF NOT EXISTS customer_orders_status_idx ON customer_orders(status);
CREATE INDEX IF NOT EXISTS customer_orders_is_test_idx ON customer_orders(is_test);
CREATE INDEX IF NOT EXISTS customer_orders_email_idx ON customer_orders(contact_email);
CREATE INDEX IF NOT EXISTS customer_orders_created_at_idx ON customer_orders(created_at DESC);

-- Keep updated_at in sync
CREATE OR REPLACE FUNCTION customer_orders_set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS customer_orders_updated_at ON customer_orders;
CREATE TRIGGER customer_orders_updated_at
  BEFORE UPDATE ON customer_orders
  FOR EACH ROW
  EXECUTE FUNCTION customer_orders_set_updated_at();

-- RLS off for now; Edge Functions access via service role
ALTER TABLE customer_orders DISABLE ROW LEVEL SECURITY;
