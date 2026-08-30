import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
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

  // El editor de videos sigue siendo exclusivo de admin. Ventas tiene
  // acceso completo a productos (crear, editar, eliminar, stock).
  const esRutaSoloAdmin = pathname.startsWith('/admin/videos') || pathname.startsWith('/api/admin/videos');
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
