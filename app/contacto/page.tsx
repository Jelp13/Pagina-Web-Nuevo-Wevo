'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { WHATSAPP_LINK } from '@/lib/config';

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${form.nombre}`);
    const body = encodeURIComponent(`Nombre: ${form.nombre}\nCorreo: ${form.email}\n\n${form.mensaje}`);
    window.location.href = `mailto:ventas@nuevowevo.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[#05080f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(93,213,255,0.14),transparent_24%),radial-gradient(circle_at_80%_70%,rgba(93,213,255,0.08),transparent_20%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
            Contáctanos
          </span>
          <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl">
            Estamos aquí para ayudarte.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-slate-400 sm:text-lg">
            Escríbenos por WhatsApp, correo o completa el formulario y te respondemos en menos de 2 horas.
          </p>
        </div>
      </section>

      {/* Canales de contacto */}
      <section className="mx-auto max-w-[1180px] px-6 pb-12">
        <div className="grid gap-5 sm:grid-cols-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col gap-3 rounded-[24px] border border-green-400/20 bg-green-500/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-green-500/10"
          >
            <span className="text-3xl">💬</span>
            <p className="font-bold text-white">WhatsApp</p>
            <p className="text-sm text-slate-400">Respuesta inmediata en horario de atención. La forma más rápida de cotizar tu PC.</p>
            <span className="mt-auto text-sm font-semibold text-green-300">316 3713928 →</span>
          </a>

          <a
            href="mailto:ventas@nuevowevo.com"
            className="flex flex-col gap-3 rounded-[24px] border border-cyan-400/20 bg-cyan-300/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-300/10"
          >
            <span className="text-3xl">📧</span>
            <p className="font-bold text-white">Correo electrónico</p>
            <p className="text-sm text-slate-400">Para solicitudes formales, garantías, facturas o consultas que requieran documentos adjuntos.</p>
            <span className="mt-auto text-sm font-semibold text-cyan-300">ventas@nuevowevo.com →</span>
          </a>

          <div className="flex flex-col gap-3 rounded-[24px] border border-cyan-400/10 bg-white/5 p-6">
            <span className="text-3xl">📍</span>
            <p className="font-bold text-white">Ubicación</p>
            <p className="text-sm text-slate-400">Cra. 67 #43-35<br />Bogotá, Cundinamarca<br />Colombia</p>
            <span className="mt-auto text-sm text-slate-500">Atención con cita previa</span>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <div className="rounded-[32px] border border-cyan-400/10 bg-white/5 p-8 sm:p-12">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Formulario</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Envíanos un mensaje</h2>
          <p className="mt-2 text-slate-400">Te respondemos a tu correo en menos de 24 horas hábiles.</p>

          {sent ? (
            <div className="mt-10 rounded-2xl bg-cyan-300/10 border border-cyan-400/20 px-6 py-8 text-center">
              <p className="text-2xl font-bold text-white">¡Mensaje enviado!</p>
              <p className="mt-2 text-slate-400">Abrimos tu cliente de correo. Si no se abrió, escríbenos directamente a <span className="text-cyan-300">ventas@nuevowevo.com</span></p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-400">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Juan Pérez"
                    className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-slate-400">Correo electrónico</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="juan@correo.com"
                    className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400">Mensaje</label>
                <textarea
                  name="mensaje"
                  required
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos en qué podemos ayudarte: cotizaciones, garantías, dudas técnicas..."
                  className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/20 transition-colors resize-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3 text-sm font-semibold text-slate-950 hover:opacity-95 transition-opacity"
                >
                  Enviar mensaje
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
