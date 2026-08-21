CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  reference       VARCHAR(100)  NOT NULL UNIQUE,
  nombres         VARCHAR(150)  NOT NULL,
  apellidos       VARCHAR(150)  NOT NULL,
  email           VARCHAR(190)  NOT NULL,
  tipo_documento  VARCHAR(5)    NOT NULL,
  documento       VARCHAR(20)   NOT NULL,
  telefono        VARCHAR(20)   NOT NULL,
  direccion       VARCHAR(255)  NOT NULL,
  departamento    VARCHAR(100)  NOT NULL,
  ciudad          VARCHAR(100)  NOT NULL,
  items           JSON          NOT NULL,
  total           INT UNSIGNED  NOT NULL,
  payment_method  VARCHAR(30)   NOT NULL,
  status          ENUM('pendiente','pagado','rechazado','cancelado') NOT NULL DEFAULT 'pendiente',
  mp_payment_id   VARCHAR(50)   NULL,
  created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
