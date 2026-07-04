import { WHATSAPP_LINK, SOCIAL_MEDIA } from '@/lib/config';

export default function ContactoMantenimientos() {
  const waAgenda = `${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, quiero agendar una cita para mantenimiento de mi equipo.')}`;

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-24">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Contáctanos</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Información de contacto.</h2>
        <p className="mt-3 max-w-xl text-slate-400">
          Comunícate con nosotros para recibir asesoría personalizada y agendar tu servicio.
        </p>
      </div>

      {/* Top row */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Horarios */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-xl">🕐</span>
            <h3 className="text-lg font-bold text-white">Horarios de atención</h3>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p className="font-semibold text-slate-200">Lunes a viernes:</p>
              <p className="text-slate-400">9:00 am a 12:00 pm</p>
              <p className="text-slate-400">1:00 pm a 6:00 pm</p>
            </div>
            <div>
              <p className="font-semibold text-slate-200">Sábados:</p>
              <p className="text-slate-400">9:00 am a 1:00 pm</p>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href={waAgenda}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
            >
              📅 Agenda tu cita
            </a>
            <p className="text-center text-xs text-slate-500">
              Los servicios de mantenimiento se atienden únicamente con cita previa.
            </p>
          </div>
        </div>

        {/* Google Maps */}
        <div className="overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 transition duration-300 hover:border-cyan-300/20">
          <div className="flex items-center gap-3 px-7 py-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-xl">📍</span>
            <div>
              <h3 className="text-lg font-bold text-white">Dirección</h3>
              <p className="text-sm text-slate-400">Cra. 67 #43-35, Bogotá, Cundinamarca</p>
            </div>
          </div>
          <iframe
            title="Ubicación Nuevo Wevo"
            src="https://maps.google.com/maps?q=Carrera+67+%2343-35,+Bogota,+Colombia&z=15&output=embed"
            className="h-64 w-full border-0 lg:h-72"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        {/* Teléfono */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-xl">📱</span>
            <h3 className="text-lg font-bold text-white">Teléfono</h3>
          </div>
          <p className="text-2xl font-bold text-white">+57 316 3713928</p>
          <a
            href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, quiero información sobre los servicios de mantenimiento.')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full border border-green-400/40 bg-green-500/20 px-6 py-3.5 text-sm font-semibold text-green-300 transition-colors hover:bg-green-500/30 hover:border-green-400/60"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.508 5.834L.057 23.321a.75.75 0 00.917.91l5.638-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1112 2.25 9.75 9.75 0 0112 21.75z"/>
            </svg>
            Escríbenos ahora
          </a>
        </div>

        {/* Redes sociales */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-xl">🤍</span>
            <h3 className="text-lg font-bold text-white">Redes sociales</h3>
          </div>
          <p className="text-sm text-slate-400">Síguenos para estar al tanto de novedades, promociones y contenido exclusivo.</p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/nuevowevo"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a
              href={SOCIAL_MEDIA.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/10 bg-white/5 text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
