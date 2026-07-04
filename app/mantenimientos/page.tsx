import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MantenimientosCarousel from '@/components/MantenimientosCarousel';
import ContactoMantenimientos from '@/components/ContactoMantenimientos';

export const metadata = {
  title: 'Mantenimientos | Nuevo Wevo',
  description: 'Servicio de mantenimiento preventivo para computadores, portátiles, consolas y equipos de alto rendimiento en Colombia.',
};

export default function MantenimientosPage() {
  return (
    <main className="min-h-screen bg-[#05080f] text-white">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.10),transparent_60%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100">
            Servicio técnico
          </span>
          <h1 className="mt-6 text-5xl font-black tracking-[-0.03em] text-white sm:text-6xl">
            Mantenimientos
          </h1>
          <p className="mt-4 text-base text-slate-400 sm:text-lg">
            Nos especializamos en mantenimiento preventivo para equipos tecnológicos de toda gama y categoría.
          </p>

          {/* Info banner */}
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-cyan-400/20 bg-cyan-300/5 px-6 py-4">
            <p className="text-sm text-cyan-200/80">
              Realizamos mantenimiento preventivo para computadores, portátiles, consolas y equipos de alto rendimiento. Agenda tu servicio directamente por WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <section className="mx-auto max-w-[1180px] px-6 pb-24">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Categorías</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Selecciona tu tipo de equipo.
          </h2>
          <p className="mt-3 max-w-xl text-slate-400">
            Desliza para explorar todos los equipos que atendemos. Cada categoría incluye los servicios disponibles.
          </p>
        </div>

        <MantenimientosCarousel />
      </section>

      <ContactoMantenimientos />

      <Footer />
    </main>
  );
}
