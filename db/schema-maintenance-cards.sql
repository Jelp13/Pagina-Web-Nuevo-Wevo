CREATE TABLE IF NOT EXISTS maintenance_cards (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  category       ENUM('torres','portatiles','otros') NOT NULL,
  gama           VARCHAR(100)  NOT NULL,
  title          VARCHAR(100)  NOT NULL,
  description    TEXT          NOT NULL,
  icon           VARCHAR(20)   NOT NULL,
  accent_color   VARCHAR(50)   NOT NULL,
  services       JSON          NULL,
  sort_order     INT           NOT NULL DEFAULT 0,
  created_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_category (category, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
