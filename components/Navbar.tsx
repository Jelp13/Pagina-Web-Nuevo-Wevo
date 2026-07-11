'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES, SITE_NAME } from '@/lib/config';
import { useCartStore, getCartItemCount } from '@/lib/cart-store';

const navigation = [
  { label: 'Inicio', href: ROUTES.home },
  { label: 'Torres', href: ROUTES.torres },
  { label: 'Tu Pc', href: ROUTES.quiz },
  { label: 'Periféricos', href: ROUTES.peripherals },
  { label: 'Mantenimientos', href: ROUTES.mantenimientos },
];

function CartButton() {
  const { openCart, items } = useCartStore();
  const count = getCartItemCount(items);

  return (
    <button
      onClick={openCart}
      aria-label={`Carrito de compras${count > 0 ? ` (${count} productos)` : ''}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-300/60 hover:text-cyan-300 transition-colors"
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 text-[10px] font-black text-slate-950">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-400/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1180px] grid-cols-[auto_1fr_auto] items-center px-6 py-2.5">

        <Link href={ROUTES.home} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/Imagenes/Group.png"
            alt={`${SITE_NAME} - Logo`}
            width={160}
            height={48}
            priority
            className="h-14 w-auto md:h-14"
          />
        </Link>

        <div className="hidden items-center justify-center gap-8 text-xl text-slate-400 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-cyan-300 transition-colors">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <CartButton />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-300 md:hidden"
            aria-expanded={isOpen}
            aria-label="Abrir menú"
            onClick={() => setIsOpen((c) => !c)}
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

      {isOpen && (
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
            <Link
              href={ROUTES.cart}
              className="block rounded-2xl border border-cyan-400/20 bg-cyan-300/10 px-4 py-3 text-center font-semibold text-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Ver carrito
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
