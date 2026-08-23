CREATE TABLE IF NOT EXISTS site_videos (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  placement     ENUM('home','mantenimientos_empresas') NOT NULL,
  sort_order    INT           NOT NULL DEFAULT 0,
  tiktok_user   VARCHAR(100)  NULL,
  tiktok_url    VARCHAR(500)  NULL,
  profile_url   VARCHAR(500)  NULL,
  data          LONGBLOB      NOT NULL,
  mime_type     VARCHAR(100)  NOT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_placement (placement, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
