import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-100/50 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">Banco Belolli</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto md:mx-0">
              Más de 110 años acompañando el progreso de los colombianos con solidez y tecnología.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 mb-6 tracking-[0.2em] uppercase">Accesos Rápidos</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/products" className="hover:text-secondary transition-colors font-medium">Productos de Ahorro</Link></li>
              <li><Link href="/simulator" className="hover:text-secondary transition-colors font-medium">Simulador de Rentabilidad</Link></li>
              <li><Link href="/onboarding" className="hover:text-secondary transition-colors font-medium">Solicitud de Apertura</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 mb-6 tracking-[0.2em] uppercase">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><button className="hover:text-secondary transition-colors">Términos y Condiciones</button></li>
              <li><button className="hover:text-secondary transition-colors">Protección de Datos</button></li>
              <li><button className="hover:text-secondary transition-colors">Tasas y Tarifas</button></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Banco Belolli SA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
