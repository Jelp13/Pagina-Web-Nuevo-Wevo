import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const isApiRoute = pathname.startsWith('/api/');

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    if (isApiRoute) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // El editor de videos sigue siendo exclusivo de admin.
  const esRutaVideos = pathname.startsWith('/admin/videos') || pathname.startsWith('/api/admin/videos');

  // Ventas puede ver y editar productos (precio, imágenes, textos, specs,
  // descuentos), pero no crear ni eliminar productos. El cambio de
  // disponibilidad (stock) se restringe dentro del propio handler PATCH,
  // ya que ahí sí se le permite editar el resto del producto.
  const esCrearProducto =
    pathname === '/admin/productos/nuevo' || (pathname === '/api/admin/productos' && method === 'POST');
  const esEliminarProducto = /^\/api\/admin\/productos\/[^/]+$/.test(pathname) && method === 'DELETE';

  const esRutaSoloAdmin = esRutaVideos || esCrearProducto || esEliminarProducto;
  if (esRutaSoloAdmin && session.role !== 'admin') {
    if (isApiRoute) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/productos',
    '/api/admin/productos/:path*',
    '/api/admin/videos',
    '/api/admin/videos/:path*',
  ],
};
