-- Add uploaded_files and album_layout to partner_orders for native album system
ALTER TABLE partner_orders
ADD COLUMN IF NOT EXISTS uploaded_files JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS album_layout JSONB DEFAULT NULL;

COMMENT ON COLUMN partner_orders.uploaded_files IS 'Array of { path, caption } for images in uploads bucket';
COMMENT ON COLUMN partner_orders.album_layout IS 'Generated album page structure { pages: [...] }';
