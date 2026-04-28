-- Atomic append for customer_orders.uploaded_files
-- Prevents race conditions when multiple finalize calls append concurrently.
CREATE OR REPLACE FUNCTION append_customer_order_files(
  order_id uuid,
  new_files jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_files jsonb;
BEGIN
  IF jsonb_typeof(new_files) <> 'array' THEN
    RAISE EXCEPTION 'new_files must be a JSON array';
  END IF;

  UPDATE customer_orders
  SET uploaded_files = COALESCE(uploaded_files, '[]'::jsonb) || new_files
  WHERE id = order_id
  RETURNING uploaded_files INTO updated_files;

  IF updated_files IS NULL THEN
    RAISE EXCEPTION 'Order % not found', order_id;
  END IF;

  RETURN updated_files;
END;
$$;

-- Allow service_role to call it
GRANT EXECUTE ON FUNCTION append_customer_order_files(uuid, jsonb) TO service_role;
