-- role 'admin'  → acceso total (productos, precios, imágenes, stock, descuentos y ventas)
-- role 'ventas' → solo puede ver el listado de ventas/pedidos
CREATE TABLE IF NOT EXISTS admins (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  username       VARCHAR(100)  NOT NULL UNIQUE,
  password_hash  VARCHAR(255)  NOT NULL,
  role           ENUM('admin','ventas') NOT NULL DEFAULT 'ventas',
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
