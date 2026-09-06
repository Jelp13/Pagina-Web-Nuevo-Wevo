# Nuevo Wevo — Tienda de PC Gaming

E-commerce completo para venta de torres gaming, portátiles y periféricos, con panel de administración propio, pagos en línea y gestión de pedidos. Construido con **Next.js 14 (App Router)**, **TypeScript**, **MySQL** y desplegado en **Hostinger**.

---

## Tabla de contenidos

1. [Qué incluye el sitio](#qué-incluye-el-sitio)
2. [Stack técnico](#stack-técnico)
3. [Estructura del proyecto](#estructura-del-proyecto)
4. [Base de datos](#base-de-datos)
5. [Checkout y métodos de pago](#checkout-y-métodos-de-pago)
6. [Ciclo de vida de un pedido](#ciclo-de-vida-de-un-pedido)
7. [Panel de administración](#panel-de-administración)
8. [Autenticación y roles](#autenticación-y-roles)
9. [Recomendador (quiz)](#recomendador-quiz)
10. [Correos automáticos](#correos-automáticos)
11. [Manejo de imágenes y videos](#manejo-de-imágenes-y-videos)
12. [Variables de entorno](#variables-de-entorno)
13. [Instalación y desarrollo local](#instalación-y-desarrollo-local)
14. [Notas de despliegue (Hostinger)](#notas-de-despliegue-hostinger)
15. [Contacto](#contacto)

---

## Qué incluye el sitio

**De cara al cliente:**
- Catálogo de productos en 3 secciones: **torres** (PCs de escritorio), **portátiles** y **periféricos**, con ficha de producto (galería, especificaciones, rendimiento en juegos y software creativo, características destacadas).
- Carrito de compras y checkout con validación de datos de envío (incluye selector de departamento/ciudad de Colombia).
- **Quiz recomendador**: 8 preguntas que sugieren la torre más adecuada según uso, presupuesto, resolución y prioridades del cliente.
- Página de mantenimientos (torres, portátiles y otros equipos) con tarjetas de servicios y video institucional.
- Página de contacto con datos de la empresa editables desde el panel.
- Páginas legales (términos y condiciones, política de privacidad, tratamiento de datos personales, eliminación de datos) editables como Markdown.
- Confirmación de compra con instrucciones específicas según el método de pago usado.
- Correo de agradecimiento automático tras una compra exitosa.

**Panel de administración (`/admin`):**
- Gestión completa de productos (crear, editar, eliminar, precios, descuentos, stock, imágenes, specs).
- Gestión de pedidos: ver, filtrar por estado y marcar manualmente como pagado o cancelado.
- Editor de contenido del sitio (CMS ligero): torres destacadas en el home, imagen de fondo del hero, logos de marcas, tarjetas de mantenimiento, información de contacto, títulos de cada página y el texto de las preguntas del quiz.
- Editor de páginas legales en Markdown.
- Gestor de videos (TikToks del home y video de mantenimientos para empresas).
- Dos roles de acceso: **admin** (acceso total) y **ventas** (productos y pedidos únicamente).

---

## Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 14.2.5 (App Router) |
| Lenguaje | TypeScript 5.5.4 |
| UI | React 18.3.1 + Tailwind CSS 3.4.4 |
| Base de datos | MySQL (driver `mysql2`) + Kysely 0.29.5 (query builder tipado) |
| Autenticación | JWT firmado con `jose` (compatible con Edge) + `bcryptjs` para contraseñas |
| Pagos | SDK oficial de Mercado Pago (`mercadopago` 3.1.0) |
| Correo | `nodemailer` sobre SMTP de Hostinger |
| Contenido | `react-markdown` para páginas legales editables |
| Estado del carrito | Zustand |
| Imágenes | `next/image` (usa `sharp` para optimización) |

No hay ORM adicional, framework de testing configurado, ni librería de componentes UI — todo el estilo es Tailwind puro.

---

## Estructura del proyecto

```
app/
├── admin/               # Panel de administración (protegido por middleware)
│   ├── contenido/       # CMS: hero, marcas, mantenimientos, contacto, títulos, quiz
│   ├── legal/           # Editor de páginas legales
│   ├── login/
│   ├── productos/       # CRUD de productos
│   ├── ventas/          # Gestión de pedidos
│   └── videos/          # Gestor de videos (solo admin)
├── api/
│   ├── admin/           # Endpoints protegidos (productos, videos, settings, ventas)
│   ├── checkout/        # Creación de pedidos
│   ├── imagenes/[id]/   # Servir imágenes almacenadas en BD
│   ├── mercadopago/webhook/
│   └── videos/[id]/     # Servir videos almacenados en BD (con soporte de Range)
├── carrito/, checkout/, contacto/, mantenimientos/, quiz/
├── legal/                # 4 páginas legales
├── perifericos/, portatiles/, torres/   # Catálogo + fichas de producto
└── page.tsx              # Home

components/
├── admin/                 # Componentes del panel de administración
└── ...                    # Navbar, Footer, tarjetas de producto, checkout, quiz, etc.

lib/
├── db.ts                  # Conexión y tipos de la base de datos (Kysely)
├── products-db.ts / admin-products.ts
├── orders-db.ts            # Pedidos, cambios de estado, barrido de abandonados
├── mailer.ts                # Correo de agradecimiento
├── session.ts / passwords.ts  # Autenticación
├── site-settings.ts          # Configuración editable del sitio (key/value)
├── legal-pages-defaults.ts    # Contenido legal por defecto
├── brands-db.ts, maintenance-cards-db.ts, videos-db.ts
├── constants.ts              # Preguntas del quiz, features estáticas
└── config.ts, cart-store.ts, colombia-geo.ts, format.ts

db/                      # Migraciones SQL (aplicadas manualmente, sin runner formal)
scripts/                 # Scripts puntuales (crear admin, aplicar schema, mantenimiento)
middleware.ts             # Protección de rutas /admin y /api/admin por sesión y rol
```

---

## Base de datos

MySQL, sin ORM — Kysely provee tipado sobre SQL plano. Tablas principales:

| Tabla | Propósito |
|---|---|
| `products` | Catálogo completo (torres, portátiles, periféricos): specs, precios, imágenes, stock, rendimiento en juegos/software. |
| `orders` | Pedidos: datos del cliente, ítems, total, método de pago, estado y quién/por qué lo cambió. |
| `admins` | Usuarios del panel (`admin` / `ventas`) con contraseña hasheada. |
| `images` | Imágenes almacenadas como BLOB (productos, marcas, hero del home). |
| `site_videos` | Videos almacenados como BLOB (TikToks del home, video de mantenimientos). |
| `site_settings` | Configuración editable clave/valor en JSON: torres destacadas, hero, contacto, títulos, preguntas del quiz, contenido legal. |
| `brands` | Logos de marcas mostrados en el home. |
| `maintenance_cards` | Tarjetas de servicios de mantenimiento por categoría. |

Las imágenes y videos se guardan **en la base de datos (BLOB)** y no en el sistema de archivos, porque el filesystem de Hostinger no persiste entre despliegues. Nunca se sobrescribe un registro existente: al reemplazar una imagen se inserta una fila nueva y se borra la anterior, para no invalidar el caché inmutable de un año que usan esos endpoints.

---

## Checkout y métodos de pago

| Método | Estado | Comportamiento |
|---|---|---|
| Tarjeta / PSE / Nequi | Activo | Redirige a la pasarela de Mercado Pago. |
| Contra entrega | Activo | Solo para pedidos hasta **$400.000 COP**. Se confirma por WhatsApp; el correo de agradecimiento se envía de inmediato. |
| BRE-B | Activo | Pago por QR o llave BRE-B; el cliente envía el comprobante por WhatsApp para verificación manual. |
| ADDI | **Deshabilitado temporalmente** | La integración no está funcionando bien. Aparece bloqueado en el checkout (UI y API). El código queda listo para reactivarse cambiando `ADDI_ENABLED` a `true` en `app/api/checkout/route.ts` y `components/CheckoutPageClient.tsx`. |

## Ciclo de vida de un pedido

Un pedido nace en estado `pendiente` y puede terminar en `pagado`, `rechazado` o `cancelado`.

- **Mercado Pago** confirma vía webhook (verificado con firma HMAC y re-consultado contra la API de MP, nunca se confía ciegamente en el payload) y actualiza el estado automáticamente.
- **Barrido de pedidos abandonados** (corre cada vez que se abre `/admin/ventas`):
  - Tarjeta/PSE/Nequi pendientes por más de **2 horas**: se verifican contra la API de Mercado Pago antes de cancelarlos (red de seguridad por si el webhook nunca llegó); si el pago sí fue aprobado, se marcan como pagados en vez de cancelarse.
  - Contra entrega y ADDI pendientes por más de **3 días**: se cancelan automáticamente.
  - **BRE-B queda fuera de este barrido a propósito** — el equipo prefiere revisar el comprobante y cambiar el estado manualmente desde `/admin/ventas`.
- Cualquier pedido puede marcarse manualmente como pagado o cancelado desde el panel, quedando registrado quién hizo el cambio.

---

## Panel de administración

| Sección | Acceso | Qué permite |
|---|---|---|
| `/admin/productos` | admin y ventas | Crear, editar y eliminar productos; precios, descuentos, stock, imágenes y specs. |
| `/admin/ventas` | admin y ventas | Ver y filtrar pedidos, marcar como pagado/cancelado. |
| `/admin/contenido` | solo admin | Torres destacadas, imagen del hero, marcas, tarjetas de mantenimiento, información de contacto, títulos de cada página, texto de las preguntas del quiz. |
| `/admin/legal` | solo admin | Editor Markdown de las 4 páginas legales. |
| `/admin/videos` | solo admin | Videos del home y de mantenimientos para empresas. |

Todo lo editable en `/admin/contenido` y `/admin/legal` usa un patrón de "valor por defecto perezoso": si nunca se ha guardado nada, el sitio muestra el contenido original — nada cambia visualmente hasta que un admin edita algo explícitamente.

---

## Autenticación y roles

- Sesión mediante JWT firmado (`jose`, HS256) guardado en una cookie `httpOnly`, válida 7 días.
- Contraseñas hasheadas con `bcryptjs`.
- Dos roles: **admin** (acceso total) y **ventas** (solo productos y pedidos).
- `middleware.ts` protege todas las rutas `/admin/*` y `/api/admin/*`: sin sesión válida redirige a `/admin/login` (o responde 401/403 en las rutas de API); las secciones exclusivas de admin devuelven 403 si un usuario `ventas` intenta acceder.

---

## Recomendador (quiz)

El quiz vive en `components/QuizPageClient.tsx` y usa 8 preguntas fijas (uso principal, presupuesto, resolución, FPS objetivo, software creativo, estética, prioridad y nivel de uso). **La lógica de recomendación está en el código, no es editable** — depende del orden exacto de las preguntas y opciones. Desde `/admin/contenido` solo se puede editar el **texto** de las preguntas y opciones, nunca su cantidad, orden o si son de selección múltiple, precisamente para no romper el motor de recomendación.

---

## Correos automáticos

`lib/mailer.ts` envía un correo de agradecimiento (vía SMTP de Hostinger, con `nodemailer`) cuando:
- se crea un pedido de contra entrega o BRE-B,
- Mercado Pago confirma un pago por primera vez,
- el barrido de abandonados encuentra un pago aprobado que el webhook nunca reportó.

Si las variables de SMTP no están configuradas, el envío se omite silenciosamente (solo queda un log) y el checkout nunca falla por esto.

---

## Manejo de imágenes y videos

- Se sirven desde `/api/imagenes/[id]` y `/api/videos/[id]`, leyendo el BLOB directamente de MySQL.
- Ambos endpoints envían `Cache-Control: public, max-age=31536000, immutable` (un año) — por eso nunca se edita una imagen/video existente en el lugar, siempre se reemplaza por una fila nueva.
- El endpoint de video soporta `Range requests`, necesario para que el navegador pueda buscar/adelantar dentro del video.
- Contenido antiguo sigue sirviéndose como archivo estático desde `public/Imagenes/...`; solo lo subido desde el panel usa este sistema de BLOBs.

---

## Variables de entorno

| Variable | Uso |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Conexión a MySQL. |
| `SESSION_SECRET` | Firma de las cookies de sesión del panel admin. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | Envío del correo de agradecimiento (SMTP de Hostinger). |
| `MERCADOPAGO_ACCESS_TOKEN` | Crear preferencias de pago y verificar pagos contra la API de MP. |
| `MERCADOPAGO_WEBHOOK_SECRET` | Validar la firma HMAC de las notificaciones de MP. |
| `NEXT_PUBLIC_SITE_URL` | URL base del sitio (usada para las URLs de retorno de Mercado Pago). |
| `ADDI_PUBLIC_KEY` | Llave pública de ADDI (sin efecto mientras el método esté deshabilitado). |

Ninguna de estas variables ni sus valores deben compartirse en el repositorio: se configuran en `.env.local` para desarrollo local y directamente en el panel de variables de entorno de Hostinger en producción.

---

## Instalación y desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Necesitas un archivo `.env.local` con al menos las variables de base de datos para que el sitio cargue contenido.

**Build de producción:**
```bash
npm run build
npm run start
```

---

## Notas de despliegue (Hostinger)

- El filesystem no persiste entre despliegues → todo lo subido desde el panel (imágenes, videos, precios, contenido) se guarda en MySQL, nunca en disco.
- Todas las páginas se sirven con `Cache-Control: no-store` (el CDN de Hostinger no purga automáticamente al desplegar), salvo las rutas de medios por ID y los assets estáticos de `_next`, que sí se cachean de forma inmutable.
- No hay cron job configurado: el barrido de pedidos abandonados corre bajo demanda, cada vez que alguien abre `/admin/ventas`.

---

## Contacto

**WhatsApp:** +57 316 371 3928
**Email:** ventas@nuevowevo.com
**Sitio:** https://nuevowevo.com

---

Proyecto propietario de **Nuevo Wevo** © 2026. Todos los derechos reservados.
Desarrollado por Juan Esteban León Padilla.
