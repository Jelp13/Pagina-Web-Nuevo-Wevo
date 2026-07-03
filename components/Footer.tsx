import { SITE_NAME, ROUTES, WHATSAPP_LINK } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/10 bg-slate-950/70 px-6 py-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="text-xl font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            {SITE_NAME}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Tienda</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><a href="https://nuevowevo.com/shop/?categories=computadores" target="_blank" rel="noreferrer" className="hover:text-cyan-300">Computadores</a></li>
              <li><a href={ROUTES.torres} className="hover:text-cyan-300">Torres</a></li>
              <li><a href={ROUTES.peripherals} className="hover:text-cyan-300">Periféricos</a></li>
              <li><a href={ROUTES.brands} className="hover:text-cyan-300">Marcas</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Legal</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><a href="/legal/terminos" className="hover:text-cyan-300 transition-colors">Términos</a></li>
              <li><a href="/legal/datos-personales" className="hover:text-cyan-300 transition-colors">Datos personales</a></li>
              <li><a href="/legal/politica-privacidad" className="hover:text-cyan-300 transition-colors">Política de privacidad</a></li>
              <li><a href="/legal/eliminacion-datos" className="hover:text-cyan-300 transition-colors">Eliminación de datos</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="hover:text-cyan-300">WhatsApp</a></li>
              <li><a href="mailto:contact@nuevowevo.com" className="hover:text-cyan-300">contact@nuevowevo.com</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">Ayuda</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><a href="/contacto" className="hover:text-cyan-300">Contacto</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1180px] border-t border-cyan-400/10 pt-6 text-sm text-slate-500">
        © 2026 {SITE_NAME}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
