import Link from "next/link";
import { ArrowRight, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
        <div className="absolute inset-0 metallic-gradient opacity-20" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
                Tu futuro financiero <br />
                <span className="text-accent">empieza hoy</span>
              </h1>
              <p className="text-lg text-blue-100 max-w-xl mx-auto lg:mx-0 mb-10">
                Descubre cómo hacer crecer tus ahorros con las mejores tasas del mercado.
                Simula tu inversión y abre tu cuenta en minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold h-14 px-8 rounded-full shadow-xl">
                  <Link href="/simulator">
                    Simular mi ahorro <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-14 px-8 rounded-full backdrop-blur-sm">
                  <Link href="/products">Ver productos</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative glass-morphism rounded-3xl p-8 border-white/20 shadow-2xl">
                {/* Visual element representing a card or similar */}
                <div className="h-64 flex items-center justify-center">
                  <PiggyBank className="w-32 h-32 text-accent" />
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">¿Por qué ahorrar con nosotros?</h2>
            <p className="text-slate-500">
              Ofrecemos herramientas digitales diseñadas para brindarte seguridad, transparencia y la mejor rentabilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-lg hover:-translate-y-1">
              <TrendingUp className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tasa Competitiva</h3>
              <p className="text-sm text-slate-500">
                Aprovecha las mejores tasas efectivas anuales del mercado para que tus ahorros crezcan más rápido.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-lg hover:-translate-y-1">
              <ShieldCheck className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Seguridad Garantizada</h3>
              <p className="text-sm text-slate-500">
                Tu dinero está protegido por una entidad con más de un siglo de solidez y respaldo financiero.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border transition-all hover:shadow-lg hover:-translate-y-1">
              <ArrowRight className="w-12 h-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">Proceso Digital</h3>
              <p className="text-sm text-slate-500">
                Abre tu cuenta desde cualquier lugar, sin filas ni papeleo innecesario. 100% digital.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
