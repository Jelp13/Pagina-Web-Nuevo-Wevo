'use client';

/**
 * Componente Navbar - Navegación principal
 * Usado en: home page, quiz page
 * Características:
 * - Logo con imagen (clickeable → home)
 * - Links internos y externos
 * - Botón de asesoría (WhatsApp)
 * - Responsive design (hidden en móvil, visible en desktop)
 */

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, WHATSAPP_LINK, SITE_NAME } from '@/lib/config';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
        {/* Logo - Clickeable para ir a home */}
        <Link href={ROUTES.home} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/Imagenes/Group.png"
            alt={`${SITE_NAME} - Logo`}
            width={160}
            height={48}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        {/* Enlaces de navegación (desktop only) */}
        <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
          <a href={ROUTES.products} className="hover:text-cyan-300 transition-colors">
            Torres
          </a>
          <a href={ROUTES.quiz} className="hover:text-cyan-300 transition-colors">
            Quiz
          </a>
          <a href={ROUTES.peripherals} className="hover:text-cyan-300 transition-colors">
            Periféricos
          </a>
          <a href={ROUTES.brands} className="hover:text-cyan-300 transition-colors">
            Marcas
          </a>
        </div>

        {/* Botón de asesoría (WhatsApp) */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors shadow-lg"
          aria-label="Contactar por WhatsApp"
        >
          Asesoría
        </a>
      </div>
    </nav>
  );
}
