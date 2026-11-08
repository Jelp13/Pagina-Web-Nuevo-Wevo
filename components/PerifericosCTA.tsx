import { WHATSAPP_LINK } from '@/lib/config';

export default function PerifericosCTA({
  title = 'Te cotizamos el periférico que necesitas.',
  subtitle = 'Dinos qué accesorio estás buscando y te conseguimos la mejor opción para tu setup.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mt-16 rounded-[32px] border border-cyan-400/10 bg-white/5 p-10 text-center">
      <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">¿No encuentras lo que buscas?</p>
      <h2 className="mt-4 text-2xl font-bold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-400">{subtitle}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-green-400/40 bg-green-500/20 px-8 py-3 text-sm font-semibold text-green-300 hover:bg-green-500/30 transition-colors"
        >
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
