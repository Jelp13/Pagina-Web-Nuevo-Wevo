'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useCartStore, formatCOP, getCartTotal } from '@/lib/cart-store';
import { ROUTES } from '@/lib/config';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const subtotal = getCartTotal(items);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="min-h-screen bg-[#05080f]">
      <Navbar />

      <div className="mx-auto max-w-[1180px] px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Mi compra</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Carrito de compras
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-slate-500 hover:text-red-400 transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        {items.length === 0 ? (
          /* Estado vacío */
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/5 text-6xl">
              🛒
            </div>
            <h2 className="text-2xl font-bold text-white">Tu carrito está vacío</h2>
            <p className="max-w-sm text-slate-400">
              Agrega productos desde nuestra tienda y aparecerán aquí.
            </p>
            <Link
              href={ROUTES.home}
              className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            {/* Lista de productos */}
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const discount = item.originalPrice
                  ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                  : null;

                return (
                  <div
                    key={item.id}
                    className="flex gap-5 rounded-[24px] border border-cyan-400/10 bg-white/5 p-5 transition hover:border-cyan-300/20"
                  >
                    {/* Imagen */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-4xl">
                      🖥️
                    </div>

                    {/* Info principal */}
                    <div className="flex flex-1 flex-col gap-2 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-xs uppercase tracking-wider text-cyan-300">
                            {item.category}
                          </span>
                          <h3 className="mt-0.5 truncate text-base font-bold text-white">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Eliminar producto"
                          className="shrink-0 rounded-full p-1.5 text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Precio con descuento */}
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-cyan-300">{formatCOP(item.price)}</span>
                        {item.originalPrice && (
                          <>
                            <span className="text-sm text-slate-500 line-through">
                              {formatCOP(item.originalPrice)}
                            </span>
                            <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-xs font-bold text-red-300">
                              -{discount}%
                            </span>
                          </>
                        )}
                      </div>

                      {/* Cantidad + subtotal */}
                      <div className="flex items-center justify-between">
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            aria-label="Reducir cantidad"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            aria-label="Aumentar cantidad"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:text-white transition-colors"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <span className="text-base font-black text-white">
                          {formatCOP(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Panel de resumen */}
            <div className="h-fit rounded-[28px] border border-cyan-400/10 bg-white/5 p-6 lg:sticky lg:top-24">
              <h2 className="mb-6 text-lg font-bold text-white">Resumen del pedido</h2>

              <div className="space-y-3 border-b border-cyan-400/10 pb-5 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-slate-400">
                    <span className="truncate pr-4">
                      {item.name}{' '}
                      <span className="text-slate-500">×{item.quantity}</span>
                    </span>
                    <span className="shrink-0">{formatCOP(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-5 text-sm border-b border-cyan-400/10">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío</span>
                  <span className="text-green-400 font-semibold">Por calcular</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>IVA incluido en el precio</span>
                </div>
              </div>

              <div className="flex justify-between py-5 text-white">
                <span className="text-base font-semibold">Total</span>
                <span className="text-2xl font-black text-cyan-300">{formatCOP(subtotal)}</span>
              </div>

              <Link
                href={ROUTES.checkout}
                className="block rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 py-3.5 text-center text-sm font-bold text-slate-950 shadow-lg hover:opacity-90 transition-opacity"
              >
                Proceder al pago →
              </Link>

              <Link
                href={ROUTES.home}
                className="mt-3 block text-center text-sm text-slate-500 hover:text-cyan-300 transition-colors"
              >
                ← Seguir comprando
              </Link>

              {/* Sellos de seguridad */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-cyan-400/10 pt-5">
                {['SSL', 'MERCADO PAGO', 'NEQUI', 'PSE'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-slate-600">
                Pago 100% seguro y encriptado
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
