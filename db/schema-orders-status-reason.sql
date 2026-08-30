ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS status_reason VARCHAR(500) NULL AFTER status,
  ADD COLUMN IF NOT EXISTS status_updated_by VARCHAR(100) NULL AFTER status_reason;
