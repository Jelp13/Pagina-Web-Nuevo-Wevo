# 📱 Nuevo Wevo - Tienda Gaming Minimalista

Proyecto de ecommerce moderno construido con **Next.js 14**, **React 18**, **TypeScript 5** y **Tailwind CSS 3**.

---

## 🏗️ Estructura del Proyecto

```
proyecto/
├── app/
│   ├── layout.tsx          # Root layout: metadata, SEO JSON-LD
│   ├── page.tsx            # Página principal (home)
│   ├── quiz/
│   │   └── page.tsx        # Página de recomendador inteligente
│   └── globals.css         # Estilos globales y Tailwind
├── components/
│   ├── Navbar.tsx          # Barra de navegación reutilizable
│   └── Quiz.tsx            # Componente quiz con soporte multi-select
├── lib/
│   ├── config.ts           # Configuración centralizada (URLs, metadata)
│   └── constants.ts        # Datos estáticos (productos, features)
├── .env.local              # Variables de entorno
├── package.json            # Dependencias del proyecto
├── tsconfig.json           # Configuración TypeScript
├── tailwind.config.js      # Configuración Tailwind CSS
└── README.md               # Este archivo
```

---

## 🚀 Empezando

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Producción
```bash
npm run build
npm run start
```

---

## 📋 Archivos Clave

### `lib/config.ts` - Configuración
Centraliza todas las constantes de configuración:
- URLs de la aplicación
- Metadata y palabras clave SEO
- Información de la empresa
- Rutas internas

**Uso:**
```tsx
import { SITE_NAME, SITE_URL, ROUTES } from '@/lib/config';
```

### `lib/constants.ts` - Datos Estáticos
Define todos los datos que se muestran en la aplicación:
- Características principales (features)
- Catálogo de productos
- Periféricos
- Marcas
- Preguntas del quiz

**Uso:**
```tsx
import { PRODUCTS, QUIZ_QUESTIONS } from '@/lib/constants';
```

### `components/Navbar.tsx` - Navegación Reutilizable
Componente de barra de navegación usado en todas las páginas. 

**Ventajas:**
- DRY (Don't Repeat Yourself)
- Cambios consistentes en todas las páginas
- Fácil de mantener

**Uso:**
```tsx
import Navbar from '@/components/Navbar';

// En tu página
<Navbar />
```

### `components/Quiz.tsx` - Recomendador Inteligente
Componente interactivo con lógica de:
- Preguntas simples y múltiples select
- Progreso visual
- Motor de recomendación
- Navegación atrás/adelante

**Props:**
```tsx
<Quiz 
  questions={quizQuestions}      // Array de preguntas
  getResult={getQuizResult}      // Función que retorna recomendación
  title="Título opcional"        // Título del quiz (opcional)
  subtitle="Subtítulo"           // Subtítulo (opcional)
/>
```

---

## 🎨 Estilos y Tailwind

Tailwind CSS está configurado para modo oscuro por defecto.

### Colores principales
- **Primario (Cyan):** `from-cyan-300 to-blue-500`
- **Fondo:** `#05080f` (almost-black)
- **Texto:** `#eef4ff` (almost-white)

### Clases reutilizables
Las clases de Tailwind están inline en los componentes. Para clases comunes:
```css
/* app/globals.css */
@apply transition duration-200 ease-out;
```

---

## 🔍 SEO - Optimizaciones Implementadas

### 1. **Metadata Completa** (`app/layout.tsx`)
- ✅ Título y descripción
- ✅ Open Graph (redes sociales)
- ✅ Twitter Card
- ✅ Keywords
- ✅ Canonical URL

### 2. **JSON-LD Schema** (Estruturado)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nuevo Wevo",
  "description": "...",
  "url": "https://nuevowevo.com",
  ...
}
```
Esto ayuda a Google a entender mejor el sitio y mejorar snippets en búsqueda.

### 3. **Semantic HTML**
- ✅ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ✅ Headings correctos (H1 en hero, H2 en secciones)
- ✅ `role="img"` en iconos decorativos
- ✅ `aria-label` en elementos accesibles

### 4. **Links Internos**
- ✅ Navegación clara entre secciones
- ✅ Rutas internas desde `ROUTES` const

### 5. **Performance**
- ✅ Preconnect a dominios externos
- ✅ DNS prefetch
- ✅ Image optimization (Tailwind+Next.js)

---

## 📝 Guía de Contribución

### Agregar un nuevo producto
1. Abre `lib/constants.ts`
2. Agrega al array `PRODUCTS`:
```tsx
{
  badge: 'Nuevo',
  category: 'Gaming',
  name: 'Mi Torre',
  specs: 'Especificaciones',
  price: '$ X.XXX.XXX',
  url: 'https://...',
}
```

### Agregar una pregunta al quiz
1. Abre `lib/constants.ts`
2. Agrega al array `QUIZ_QUESTIONS`:
```tsx
{
  q: '¿Tu pregunta aquí?',
  opts: ['Opción 1', 'Opción 2', 'Opción 3'],
  multiple: false,  // true si permite múltiples respuestas
}
```

### Actualizar metadata SEO
1. Abre `lib/config.ts`
2. Modifica las constantes relevantes (SITE_DESCRIPTION, SITE_KEYWORDS, etc.)

---

## 🛠️ Herramientas y Tecnologías

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| **Next.js** | 14.2.5 | Framework React con SSR/SSG |
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.5.4 | Type-safe development |
| **Tailwind CSS** | 3.4.4 | Utility-first styling |
| **PostCSS** | 8.4.35 | CSS transformations |

---

## 🔒 Variables de Entorno

`.env.local` (requiere crear):
```env
NEXT_PUBLIC_SITE_URL=https://nuevowevo.com
NEXT_PUBLIC_API_URL=https://api.nuevowevo.com
```

Las variables con `NEXT_PUBLIC_` están disponibles en el cliente.

---

## 📱 Responsive Design

El proyecto está optimizado para:
- 📱 Mobile (< 640px)
- 📊 Tablet (640px - 1024px)
- 🖥️ Desktop (> 1024px)

Usa clases de Tailwind: `sm:`, `md:`, `lg:`, `xl:`

---

## 🐛 Debugging

### Errores comunes

**Error: "Module has no exported member"**
→ Verifica que el import sea desde el archivo correcto
→ Comprueba que la exportación existe en el archivo

**Error de compilación TypeScript**
→ Ejecuta `npm run build` para ver errores completos
→ Verifica tipos en archivos `.ts` y `.tsx`

---

## 📞 Contacto y Soporte

**WhatsApp:** +57 310 305 0607  
**Email:** contact@nuevowevo.com  
**Website:** https://nuevowevo.com

---

## 📄 Licencia

Proyecto propietario de **Nuevo Wevo** © 2026. Todos los derechos reservados.

---

## ✅ Checklist de Calidad

- ✅ TypeScript con tipos completos
- ✅ SEO optimizado (metadata, JSON-LD, semantic HTML)
- ✅ Accesibilidad (WCAG 2.1 level AA)
- ✅ Código limpio con comentarios
- ✅ Componentes reutilizables
- ✅ Configuración centralizada
- ✅ Responsive design
- ✅ Performance optimizado

---

**Último update:** Junio 2026
