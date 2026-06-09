'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useCartStore, formatCOP, getCartTotal, getCartItemCount } from '@/lib/cart-store';
import { ROUTES } from '@/lib/config';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);
  const total = getCartTotal(items);
  const itemCount = getCartItemCount(items);

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel del carrito */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-slate-950 shadow-2xl border-l border-cyan-400/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-400/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">Carrito</span>
            {itemCount > 0 && (
              <span className="rounded-full bg-cyan-300/15 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 hover:border-cyan-300/40 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-4xl">
                🛒
              </div>
              <p className="text-slate-400">Tu carrito está vacío</p>
              <button
                onClick={closeCart}
                className="rounded-full bg-cyan-300/15 px-6 py-2.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-300/25 transition-colors"
              >
                Explorar productos
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-cyan-400/10 bg-white/5 p-4"
                >
                  {/* Ícono del producto */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-2xl">
                    🖥️
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <span className="text-xs uppercase tracking-wider text-cyan-300">
                      {item.category}
                    </span>
                    <p className="truncate text-sm font-semibold text-white">{item.name}</p>

                    {/* Precio */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-cyan-300">
                        {formatCOP(item.price)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-xs text-slate-500 line-through">
                          {formatCOP(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Controles de cantidad */}
                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Reducir cantidad"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Aumentar cantidad"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors"
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Eliminar producto"
                        className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="shrink-0 text-right">
                    <span className="text-sm font-bold text-white">
                      {formatCOP(item.price * item.quantity)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer con total y botones */}
        {items.length > 0 && (
          <div className="border-t border-cyan-400/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Envío</span>
              <span className="text-green-400 font-semibold">Por calcular</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-white">Total</span>
              <span className="text-xl font-black text-cyan-300">{formatCOP(total)}</span>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href={ROUTES.checkout}
                onClick={closeCart}
                className="block rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3 text-center text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
              >
                Pagar ahora
              </Link>
              <Link
                href={ROUTES.cart}
                onClick={closeCart}
                className="block rounded-full border border-cyan-400/20 bg-white/5 py-3 text-center text-sm font-semibold text-slate-100 hover:bg-white/10 transition-colors"
              >
                Ver carrito completo
              </Link>
            </div>

            <p className="text-center text-xs text-slate-500">
              Pago 100% seguro · SSL encriptado
            </p>
          </div>
        )}
      </div>
    </>
  );
}
