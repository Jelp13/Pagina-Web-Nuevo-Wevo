-- Fase 3: stock de productos + imágenes subidas desde el panel de admin.
--
-- Las imágenes que ya existían (archivos en public/Imagenes/productos/) se
-- quedan como están, referenciadas por su ruta estática en products.images.
-- Las imágenes NUEVAS que el admin suba desde el panel se guardan como blob
-- en esta tabla (el filesystem de Hostinger no es persistente entre
-- despliegues) y se referencian como '/api/imagenes/{id}' en products.images.

ALTER TABLE products
  ADD COLUMN in_stock BOOLEAN NOT NULL DEFAULT TRUE AFTER original_price;

CREATE TABLE IF NOT EXISTS images (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  data        LONGBLOB      NOT NULL,
  mime_type   VARCHAR(100)  NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
