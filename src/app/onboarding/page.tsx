"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOnboarding } from "@/application/onboarding/useOnboarding";
import { Button } from "@/presentation/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { User, FileText, Mail, Shield, CheckCircle, ArrowRight, Loader2, RefreshCcw } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  document: z.string().min(5, "El documento debe ser válido"),
  email: z.string().email("Correo electrónico inválido"),
  recaptchaToken: z.string().min(1, "Debes completar el captcha"),
});

export default function OnboardingPage() {
  const [successData, setSuccessData] = useState<{ id: string } | null>(null);
  const onboarding = useOnboarding();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      email: "",
      recaptchaToken: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await onboarding.mutateAsync(values);
      setSuccessData({ id: data.id });
    } catch (error) {
      form.setError("recaptchaToken", {
        type: "manual",
        message: "Token de recaptcha inválido. Simulación: Usa 'OK' para éxito."
      });
    }
  }

  if (successData) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <div className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-2xl border border-blue-50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-primary mb-4">¡Solicitud Exitosa!</h1>
          <p className="text-slate-500 mb-8">
            Hemos registrado tu interés. Uno de nuestros asesores se pondrá en contacto contigo pronto.
          </p>
          <div className="p-4 bg-slate-50 rounded-xl border mb-8">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Código de Solicitud</p>
            <p className="text-lg font-mono font-bold text-primary">{successData.id}</p>
          </div>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-2">Abre tu cuenta</h1>
          <p className="text-slate-500">Únete al banco que apoya tus sueños. Proceso 100% digital.</p>
        </div>

        <Card className="border-slate-200 shadow-2xl rounded-3xl overflow-hidden p-2">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Información Personal</CardTitle>
            <CardDescription>Solo necesitaremos unos datos básicos para empezar.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-slate-700 font-semibold">
                        <User className="w-4 h-4 text-primary" /> Nombre Completo
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Juan Perez" {...field} className="h-12 bg-slate-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-slate-700 font-semibold">
                        <FileText className="w-4 h-4 text-primary" /> Documento de Identidad
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="C.C. o C.E." {...field} className="h-12 bg-slate-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-slate-700 font-semibold">
                        <Mail className="w-4 h-4 text-primary" /> Correo Electrónico
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="tu@correo.com" {...field} className="h-12 bg-slate-50/50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Simulated Recaptcha */}
                <Card className="bg-slate-50 border-slate-200 rounded-2xl overflow-hidden">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-blue-500" />
                      <div>
                        <p className="text-sm font-bold text-slate-700 leading-tight">Verificación</p>
                        <p className="text-[10px] text-slate-400 font-medium">Protegido por reCAPTCHA</p>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="recaptchaToken"
                      render={({ field }) => (
                        <FormItem className="space-y-0">
                          <FormControl>
                            <div className="flex flex-col items-end gap-1">
                              <Input
                                placeholder="Escribe 'OK'"
                                {...field}
                                className={cn(
                                  "w-32 h-10 text-center font-bold uppercase tracking-wider",
                                  field.value === "OK" ? "border-green-500 bg-green-50 text-green-700" : ""
                                )}
                              />
                              <FormMessage className="text-[10px]" />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-14 rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={onboarding.isPending}>
                  {onboarding.isPending ? <Loader2 className="animate-spin mr-2" /> : "Iniciar Apertura Ahora"}
                </Button>

                <p className="text-center text-[10px] text-slate-400 px-8">
                  Al hacer clic en "Iniciar Apertura Ahora", aceptas nuestra política de tratamiento de datos y los términos del simulador.
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
