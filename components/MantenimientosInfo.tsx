import { WHATSAPP_LINK } from '@/lib/config';

const STEPS = [
  {
    num: 1,
    label: 'Recepción del equipo',
    desc: 'Recibimos tu dispositivo y registramos su estado inicial con un inventario detallado.',
  },
  {
    num: 2,
    label: 'Diagnóstico técnico',
    desc: 'Evaluamos el estado general con herramientas especializadas para detectar cualquier anomalía.',
  },
  {
    num: 3,
    label: 'Aprobación del cliente',
    desc: 'Te informamos los hallazgos y aprobas el servicio antes de que iniciemos cualquier intervención.',
  },
  {
    num: 4,
    label: 'Mantenimiento o reparación',
    desc: 'Nuestros técnicos realizan el servicio aprobado con componentes y materiales de calidad.',
  },
  {
    num: 5,
    label: 'Pruebas de funcionamiento',
    desc: 'Verificamos que todo opere correctamente bajo condiciones de carga real antes de la entrega.',
  },
  {
    num: 6,
    label: 'Entrega del equipo',
    desc: 'Devolvemos tu equipo en perfectas condiciones con garantía de servicio incluida.',
  },
];

const INCLUDES = [
  { icon: '🧹', text: 'Limpieza interna especializada' },
  { icon: '🌡️', text: 'Cambio de pasta térmica (cuando aplique)' },
  { icon: '💨', text: 'Limpieza de ventiladores' },
  { icon: '⚙️', text: 'Optimización del sistema operativo' },
  { icon: '🌡️', text: 'Revisión y monitoreo de temperaturas' },
  { icon: '🔍', text: 'Verificación de todos los componentes' },
  { icon: '💾', text: 'Revisión del estado del almacenamiento' },
  { icon: '✅', text: 'Pruebas de funcionamiento completas' },
];

const BENEFITS = [
  { icon: '⏳', text: 'Mayor vida útil del equipo' },
  { icon: '⚡', text: 'Mejor rendimiento en el día a día' },
  { icon: '❄️', text: 'Menores temperaturas de operación' },
  { icon: '🛡️', text: 'Reducción del riesgo de fallos inesperados' },
  { icon: '🌬️', text: 'Menor acumulación de polvo y suciedad' },
  { icon: '💰', text: 'Prevención de daños costosos a futuro' },
];

export default function MantenimientosInfo() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-24 space-y-6">

      {/* Label */}
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Nuestro servicio</p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Todo lo que necesitas saber.</h2>
      </div>

      {/* Top row — Process + CTA */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Process card */}
        <div className="flex flex-col gap-6 rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Paso a paso</p>
            <h3 className="mt-2 text-xl font-bold text-white">¿Cómo funciona nuestro servicio?</h3>
          </div>
          <ol className="flex flex-col gap-5">
            {STEPS.map((step) => (
              <li key={step.num} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-sm font-black text-cyan-300">
                  {step.num}
                </span>
                <div>
                  <p className="font-semibold text-white text-sm">{step.label}</p>
                  <p className="mt-0.5 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA card */}
        <div className="flex flex-col justify-between gap-8 rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Agenda ahora</p>
            <h3 className="mt-2 text-xl font-bold text-white">Solicita tu mantenimiento</h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Agenda el mantenimiento preventivo de tu equipo y permite que nuestros especialistas
              lo revisen para mantener su rendimiento y prolongar su vida útil. Atención personalizada
              y garantía de servicio incluida.
            </p>

            {/* Trust points */}
            <ul className="mt-6 flex flex-col gap-3">
              {['Diagnóstico inicial sin costo', 'Garantía en todos los servicios', 'Técnicos certificados', 'Entrega en el tiempo acordado'].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <svg className="h-4 w-4 shrink-0 text-cyan-400" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <a
              href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hola, quiero solicitar un mantenimiento para mi equipo.')}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-full border border-green-400/40 bg-green-500/20 px-6 py-4 text-sm font-semibold text-green-300 transition-colors hover:bg-green-500/30 hover:border-green-400/60"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.103 1.508 5.834L.057 23.321a.75.75 0 00.917.91l5.638-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.75 9.75 0 1112 2.25 9.75 9.75 0 0112 21.75z"/>
              </svg>
              Solicitar por WhatsApp
            </a>
            <a
              href="tel:+573163713928"
              className="flex items-center justify-center gap-2.5 rounded-full border border-cyan-400/20 bg-white/5 px-6 py-4 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:border-cyan-400/40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              Llamar ahora · 316 3713928
            </a>
          </div>
        </div>
      </div>

      {/* Bottom row — Includes + Benefits */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* What's included */}
        <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Detalle del servicio</p>
          <h3 className="mt-2 text-xl font-bold text-white">¿Qué incluye un mantenimiento preventivo?</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {INCLUDES.map((item) => (
              <li key={item.text} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-base">
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Why maintenance */}
        <div className="rounded-[28px] border border-cyan-400/10 bg-white/5 p-7 transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.07]">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Beneficios</p>
          <h3 className="mt-2 text-xl font-bold text-white">¿Por qué realizar mantenimiento preventivo?</h3>
          <ul className="mt-6 flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b.text} className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-xl">
                  {b.icon}
                </span>
                <span className="text-sm text-slate-300">{b.text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
