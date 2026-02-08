import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold text-primary mb-4">Banco Belolli</h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Mas de 110 años acompañando el progreso de los colombianos.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-wider uppercase">Accesos Rápidos</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/products" className="hover:text-primary">Productos de Ahorro</Link></li>
              <li><Link href="/simulator" className="hover:text-primary">Simulador de Rentabilidad</Link></li>
              <li><Link href="/onboarding" className="hover:text-primary">Solicitud de Apertura</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 tracking-wider uppercase">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Terminos y Condiciones</li>
              <li>Protección de Datos</li>
              <li>Tasas y Tarifas</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Banco Belolli SA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
