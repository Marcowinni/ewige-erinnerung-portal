-- Atomic slug generation with advisory lock per base name
CREATE OR REPLACE FUNCTION public.next_album_slug(
  base_name TEXT,
  tbl_name TEXT DEFAULT 'customer_orders'
) RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  next_n INT;
  candidate TEXT;
  regex_pattern TEXT;
BEGIN
  -- serialize all requests for this base name
  PERFORM pg_advisory_xact_lock(hashtext(base_name));

  regex_pattern := '^' || base_name || '-(\d+)$';

  EXECUTE format(
    'SELECT COALESCE(MAX(CAST(substring(slug from %L) AS INT)), 0) + 1 FROM %I WHERE slug ~ %L',
    regex_pattern, tbl_name, regex_pattern
  ) INTO next_n;

  candidate := base_name || '-' || LPAD(next_n::text, 2, '0');
  RETURN candidate;
END;
$$;

-- Grant to service_role
GRANT EXECUTE ON FUNCTION public.next_album_slug(TEXT, TEXT) TO service_role;
