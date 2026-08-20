-- Esquema Fase 1: tabla única de productos (torres, periféricos, portátiles).
-- Los campos que en el código eran arrays de objetos (fullSpecs, gamingPerformance,
-- creativePerformance, features, images) se guardan como JSON: el admin los edita
-- como una unidad por producto, no hace falta normalizarlos en tablas separadas.

CREATE TABLE IF NOT EXISTS products (
  id                    VARCHAR(191)  NOT NULL PRIMARY KEY,
  section               ENUM('torres','perifericos','portatiles') NOT NULL,
  category              VARCHAR(100)  NOT NULL,
  category_slug         VARCHAR(100)  NULL,
  badge                 VARCHAR(50)   NULL,
  name                  VARCHAR(255)  NOT NULL,
  specs                 VARCHAR(500)  NOT NULL,
  description           TEXT          NOT NULL,
  short_description     TEXT          NULL,
  full_specs            JSON          NOT NULL,
  gaming_performance    JSON          NOT NULL,
  creative_performance  JSON          NOT NULL,
  features              JSON          NOT NULL,
  images                JSON          NOT NULL,
  price_label           VARCHAR(50)   NOT NULL,
  numeric_price         INT UNSIGNED  NOT NULL,
  original_price        INT UNSIGNED  NULL,
  external_url          VARCHAR(500)  NULL,
  sort_order            INT           NOT NULL DEFAULT 0,
  created_at            TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_section (section),
  INDEX idx_category_slug (category_slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
