"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSimulation } from "@/application/simulator/useSimulation";
import { Button } from "@/presentation/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { NumericInput } from "@/presentation/components/ui/numeric-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Calculator, TrendingUp, DollarSign, Calendar, ArrowRight, Loader2, ChevronLeft, Percent } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SelectedProductCard } from "@/presentation/components/products/SelectedProductCard";
import { useProductSelection } from "@/shared/stores/useProductSelection";

const formSchema = z.object({
  initialAmount: z.coerce.number().min(10000, "El monto inicial debe ser al menos $10.000"),
  monthlyContribution: z.coerce.number().min(0, "El aporte mensual no puede ser negativo"),
  months: z.coerce.number().min(1, "El plazo mínimo es 1 mes").max(120, "El plazo máximo es 120 meses"),
  annualInterestRate: z.coerce.number().min(0.01, "La tasa debe ser mayor a 0").max(0.40, "La tasa no puede exceder el 40%"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SimulatorPage() {
  const [result, setResult] = useState<{ estimatedProfit: number; totalBalance: number } | null>(null);
  const { selectedProduct, clearSelectedProduct } = useProductSelection();
  const simulation = useSimulation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      initialAmount: 1000000,
      monthlyContribution: 100000,
      months: 12,
      annualInterestRate: 0.12,
    },
  });

  // Pre-fill form from selected product
  useEffect(() => {
    if (selectedProduct) {
      form.setValue("annualInterestRate", selectedProduct.interestRate);
      form.setValue("initialAmount", selectedProduct.minAmount);
    }
  }, [selectedProduct, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await simulation.mutateAsync(values);
      setResult(data);
    } catch (error) {
      console.error("Simulation failed", error);
    }
  }

  return (
    <div className="container mx-auto py-3 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-4 md:mb-0">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-secondary transition-colors group">
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Volver a Productos
          </Link>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">Simulador de Ahorro</h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-medium">Calcula tu rentabilidad con la solidez y tecnología de Banco Belolli.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Side */}
          <div className="space-y-4">
            {/* Selected Product Card */}
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SelectedProductCard
                  productName={selectedProduct.name}
                  productType={selectedProduct.type}
                  onDismiss={clearSelectedProduct}
                />
              </motion.div>
            )}
            <Card className="border-slate-200 shadow-lg rounded-2xl overflow-hidden bg-white">
              <CardHeader className="bg-primary text-white p-3">
                <div className="flex items-center gap-1">
                  <Calculator className="w-6 h-6 text-accent" />
                  <CardTitle className="text-xl font-bold">Tus Datos</CardTitle>
                </div>
                <CardDescription className="text-blue-100 text-sm font-medium">Completa el formulario para realizar el cálculo proyectado.</CardDescription>
              </CardHeader>
              <CardContent className="p-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="initialAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary" /> Monto inicial
                          </FormLabel>
                          <FormControl>
                            <NumericInput formatAsCurrency placeholder="Ej: 1000000" {...field} className="h-12" />
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
                            <NumericInput formatAsCurrency placeholder="Ej: 100000" {...field} className="h-12" />
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
                              <NumericInput placeholder="Ej: 12" {...field} className="h-12" />
                            </FormControl>
                            <FormDescription className="text-[10px]">Plazo del ahorro (1-120)</FormDescription>
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
                              <Percent className="w-4 h-4 text-primary" /> Tasa E.A.
                            </FormLabel>
                            <FormControl>
                              <NumericInput allowDecimal placeholder="Ej: 0.12" {...field} className="h-12" />
                            </FormControl>
                            <FormDescription className="text-[10px]">Expresado en decimal (0.12 = 12%)</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 rounded-xl shadow-lg transition-all active:scale-95" disabled={simulation.isPending}>
                      {simulation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Calcular Rentabilidad"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Results Side */}
          <div>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl"
                >
                  <Calculator className="w-16 h-16 text-slate-300 mb-4" />
                  <h3 className="text-lg font-bold text-slate-400">Sin resultados aún</h3>
                  <p className="text-xs text-slate-400">Completa el simulador para ver tu proyección de ganancias.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-2 h-full flex flex-col justify-between"
                >
                  <Card className="border-2 border-secondary/20 bg-white overflow-hidden rounded-2xl  shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100  flex items-center pt-2">
                      <CardTitle className="text-secondary text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-x-2 p-0">
                        <TrendingUp className="w-4 h-4" />
                        Interés Generado
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-3xl font-black text-secondary">
                        ${result.estimatedProfit.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-slate-500 mt-3 font-medium flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent"></span>
                        Tasa E.A. aplicada: {(form.getValues().annualInterestRate * 100).toFixed(1)}%
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-gradient-to-br from-primary via-primary to-[#002850] text-white overflow-hidden shadow-2xl rounded-2xl relative group">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
                    <CardHeader className="border-b border-white/10 pt-2 relative z-10">
                      <CardTitle className="text-accent text-xs uppercase tracking-[0.25em] font-bold flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Saldo Total Proyectado
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-2 pb-2 relative z-10">
                      <div className="mb-1">
                        <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">Tu inversión crecerá a</span>
                      </div>
                      <p className="text-4xl font-black text-white tracking-tight flex gap-x-2">
                        ${result.totalBalance.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        <span className="text-accent/90 text-base font-semibold">COP</span>
                      </p>
                      <div className="mt-2 pt-2 border-t border-white/20 bg-white/5 -mx-6 px-6 py-2 rounded-t-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-100 text-xs font-medium">Inversión total:</span>
                          <span className="font-bold text-white text-lg">${(Number(form.getValues().initialAmount) + (Number(form.getValues().monthlyContribution) * Number(form.getValues().months))).toLocaleString('es-CO')}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-100 text-xs font-medium">Ganancia neta:</span>
                          <span className="font-bold text-accent text-lg">+${result.estimatedProfit.toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="p-5 bg-gradient-to-br from-blue-50 to-slate-50 border-2 border-secondary/20 rounded-2xl">
                    <p className="text-primary font-bold mb-4 text-center text-sm">¿Te gustan estos resultados? Empieza a ahorrar hoy con la solidez de Banco Belolli.</p>
                    <Button asChild className="w-full bg-secondary text-white hover:bg-secondary/90 transition-all font-bold h-12 rounded-xl shadow-md hover:shadow-lg">
                      <Link href="/onboarding">Solicitar Producto Ahora <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center text-[10px] text-slate-400 uppercase tracking-widest">
          * Los valores mostrados son proyecciones informativas y pueden variar según condiciones del mercado.
        </div>
      </motion.div>
    </div>
  );
}
