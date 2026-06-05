'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, WHATSAPP_LINK, SITE_NAME } from '@/lib/config';
import WhatsAppBubble from '@/components/WhatsAppBubble';

const navigation = [
  {label: 'Inicio', href: ROUTES.home},
  { label: 'Torres', href: ROUTES.products },
  { label: ' Tu Pc', href: ROUTES.quiz },
  { label: 'Periféricos', href: ROUTES.peripherals },
  { label: 'Marcas', href: ROUTES.brands },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
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

        <div className="hidden items-center gap-8 text-xl text-slate-400 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-cyan-300 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <WhatsAppBubble />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-300 md:hidden"
            aria-expanded={isOpen}
            aria-label="Abrir menú"
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className="sr-only">Abrir menú</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-cyan-400/10 bg-slate-950/95 px-6 py-4 text-sm text-slate-200 md:hidden">
          <div className="flex flex-col gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-center text-slate-100 hover:bg-slate-900 hover:text-cyan-300"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-600"
            >
              <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.523 5.847L.057 23.57a.5.5 0 0 0 .614.614l5.723-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.516-5.222-1.415l-.374-.222-3.876.993.993-3.876-.222-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
