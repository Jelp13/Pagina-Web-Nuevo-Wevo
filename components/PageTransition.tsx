'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type Phase = 'hidden' | 'entering' | 'visible' | 'leaving';

export default function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('hidden');
  const shownAt = useRef(0);
  const prevPathname = useRef(pathname);
  const safetyTimer = useRef<ReturnType<typeof setTimeout>>();

  const hide = useCallback(() => {
    setPhase('leaving');
    setTimeout(() => setPhase('hidden'), 480);
  }, []);

  // Cuando cambia la ruta → ocultar overlay (con tiempo mínimo de 520ms)
  useEffect(() => {
    if (pathname === prevPathname.current) return;
    prevPathname.current = pathname;
    clearTimeout(safetyTimer.current);

    const elapsed = Date.now() - shownAt.current;
    const remaining = Math.max(0, 520 - elapsed);
    setTimeout(hide, remaining);
  }, [pathname, hide]);

  // Interceptar clics en enlaces internos
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      const target = anchor.getAttribute('target') ?? '';

      // Ignorar: vacío, hash, nueva pestaña, mailto, tel, WhatsApp, externos
      if (!href || href.startsWith('#') || target === '_blank') return;
      if (href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if (href.includes('wa.me') || href.includes('whatsapp')) return;
      if (href.startsWith('http') && !href.includes(window.location.hostname)) return;

      // Ignorar si ya estamos en esa página
      const destPath = href.startsWith('http') ? new URL(href).pathname : href;
      if (destPath === window.location.pathname) return;

      // Prevenir navegación inmediata
      e.preventDefault();

      shownAt.current = Date.now();
      setPhase('entering');

      // Doble rAF para que el CSS capture el cambio de opacidad
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase('visible'))
      );

      // Navegar después de 2 segundos
      clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => {
        router.push(href);
      }, 800);
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      clearTimeout(safetyTimer.current);
    };
  }, [hide, router]);

  if (phase === 'hidden') return null;

  const opacity = phase === 'visible' ? 1 : 0;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#05080f]"
      style={{ opacity, transition: 'opacity 0.42s ease' }}
    >
      <div
        className="flex flex-col items-center"
        style={{
          animation: phase === 'visible' ? 'wevoBreath 2.6s ease-in-out infinite' : 'none',
        }}
      >
        <Image
          src="/Imagenes/logo-wevo-solo.png"
          alt="Nuevo Wevo"
          width={60}
          height={5}
          priority
          style={{ filter: 'drop-shadow(0 0 18px rgba(93, 213, 255, 0.28))' }}
        />
      </div>
    </div>
  );
}
