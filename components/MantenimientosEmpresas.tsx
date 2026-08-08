import { WHATSAPP_LINK } from '@/lib/config';

export default function MantenimientosEmpresas() {
  const waEmpresas = `${WHATSAPP_LINK}?text=${encodeURIComponent(
    'Hola, quiero información sobre el servicio de mantenimiento para empresas.',
  )}`;

  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

        {/* Texto */}
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Empresas</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            A las empresas tampoco las dejamos por fuera.
          </h2>
          <p className="mt-4 max-w-xl text-slate-400">
            Ofrecemos planes de mantenimiento preventivo y correctivo para equipos
            de oficina, salas de cómputo y flotas de portátiles. Coordinamos
            visitas periódicas, diagnósticos y soporte prioritario para que la
            operación de tu empresa no se detenga.
          </p>

          <div className="mt-8">
            <a
              href={waEmpresas}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-opacity hover:opacity-90"
            >
              Cotiza el mantenimiento para tu empresa
            </a>
          </div>
        </div>

        {/* Espacio para video */}
        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300/10 text-2xl">
              ▶️
            </span>
            <p className="text-sm text-slate-500">Video próximamente</p>
          </div>
        </div>

      </div>
    </section>
  );
}
