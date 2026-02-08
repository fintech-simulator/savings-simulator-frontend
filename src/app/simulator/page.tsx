"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSimulation } from "@/application/simulator/useSimulation";
import { Button } from "@/presentation/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  initialAmount: z.coerce.number().min(10000, "El monto inicial debe ser al menos $10.000"),
  monthlyContribution: z.coerce.number().min(0, "El aporte mensual no puede ser negativo"),
  months: z.coerce.number().min(1, "El plazo mínimo es 1 mes").max(120, "El plazo máximo es 120 meses"),
  annualInterestRate: z.coerce.number().min(0.01, "La tasa debe ser mayor a 0").max(0.40, "La tasa no puede exceder el 40%"),
});

export default function SimulatorPage() {
  const [result, setResult] = useState<{ estimatedProfit: number; totalBalance: number } | null>(null);
  const simulation = useSimulation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialAmount: 1000000,
      monthlyContribution: 100000,
      months: 12,
      annualInterestRate: 0.12,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await simulation.mutateAsync(values);
      setResult(data);
    } catch (error) {
      console.error("Simulation failed", error);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">Simulador de Ahorro</h1>
          <p className="text-slate-500">Calcula cuánto dinero podrías ganar con nuestros productos financieros.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Side */}
          <Card className="border-slate-200 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-primary text-white pb-8">
              <div className="flex items-center gap-3 mb-2">
                <Calculator className="w-6 h-6 text-accent" />
                <CardTitle>Tus Datos</CardTitle>
              </div>
              <CardDescription className="text-blue-100">Completa el formulario para realizar el cálculo proyectado.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="initialAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-primary" /> Monto inicial
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej: 1000000" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthlyContribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-primary" /> Aporte mensual
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Ej: 100000" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="months"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" /> Meses
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Ej: 12" {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="annualInterestRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            % Tasa E.A.
                          </FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="Ej: 0.12" {...field} className="h-12" />
                          </FormControl>
                          <FormDescription className="text-[10px]">Expresado en decimal (0.12 = 12%)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 shadow-lg" disabled={simulation.isPending}>
                    {simulation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Calcular Rentabilidad"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Results Side */}
          <div className="space-y-6">
            {!result ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                <Calculator className="w-16 h-16 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-400">Sin resultados aún</h3>
                <p className="text-sm text-slate-300">Completa el simulador para ver tu proyección de ganancias.</p>
              </div>
            ) : (
              <>
                <Card className="border-accent bg-accent/5 overflow-hidden rounded-2xl">
                  <CardHeader className="border-b border-accent/10 pb-4">
                    <CardTitle className="text-primary text-sm uppercase tracking-widest font-bold">Interés Generado</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-4xl font-extrabold text-primary">
                      ${result.estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-sm text-slate-500 mt-2 italic">Basado en una tasa anual del {(form.getValues().annualInterestRate * 100).toFixed(1)}%</p>
                  </CardContent>
                </Card>

                <Card className="border-primary bg-primary text-white overflow-hidden shadow-2xl rounded-2xl">
                  <CardHeader className="border-b border-white/10 pb-4">
                    <CardTitle className="text-accent text-sm uppercase tracking-widest font-bold">Saldo Total Proyectado</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-8 pb-10">
                    <p className="text-5xl font-extrabold text-white">
                      ${result.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-blue-100 text-sm">
                      <span>Total invertido:</span>
                      <span className="font-bold">${(form.getValues().initialAmount + (form.getValues().monthlyContribution * form.getValues().months)).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <p className="text-slate-600 text-sm mb-4">¿Te gustan estos resultados? Empieza a ahorrar con nosotros hoy mismo.</p>
                  <Button asChild variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/5 font-bold h-11 rounded-xl">
                    <Link href="/onboarding">Solicitar este producto <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 text-center text-[11px] text-slate-400 uppercase tracking-widest">
          * Los valores mostrados son proyecciones informativas y pueden variar según condiciones del mercado.
        </div>
      </div>
    </div>
  );
}
