'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2 text-sm font-semibold text-slate-300 hover:border-red-400/40 hover:text-red-300 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}
