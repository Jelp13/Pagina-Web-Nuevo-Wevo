'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, SITE_NAME } from '@/lib/config';

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
          </div>
        </div>
      ) : null}
    </nav>
  );
}
