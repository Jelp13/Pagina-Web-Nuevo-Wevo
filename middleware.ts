import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // El rol "ventas" solo puede ver /admin y /admin/ventas — todo lo demás
  // (gestión de productos, precios, imágenes, stock, descuentos) es solo admin.
  const esRutaSoloAdmin = pathname.startsWith('/admin/productos');
  if (esRutaSoloAdmin && session.role !== 'admin') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
