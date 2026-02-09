"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOnboarding } from "@/application/onboarding/useOnboarding";
import { Button } from "@/presentation/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { NumericInput } from "@/presentation/components/ui/numeric-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { User, FileText, Mail, CheckCircle, Loader2, ChevronLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  document: z.string().min(5, "El documento debe ser válido"),
  email: z.string().email("Correo electrónico inválido"),
  recaptchaToken: z.string().min(1, "Debes completar el captcha"),
});

type FormValues = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  const [successData, setSuccessData] = useState<{ id: string } | null>(null);
  const onboarding = useOnboarding();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      email: "",
      recaptchaToken: "OK", // Pre-filled for simulated reCAPTCHA
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await onboarding.mutateAsync(values);
      setSuccessData({ id: data.id });
    } catch {
      form.setError("recaptchaToken", {
        type: "manual",
        message: "Token de recaptcha inválido. Simulación: Usa 'OK' para éxito."
      });
    }
  }

  if (successData) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <div className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-2xl border-2 border-secondary/20">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-primary mb-4">¡Solicitud Exitosa!</h1>
          <p className="text-slate-600 mb-8 font-medium">
            Hemos registrado tu interés. Uno de nuestros asesores se pondrá en contacto contigo pronto.
          </p>
          <div className="p-5 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl border-2 border-secondary/20 mb-8">
            <p className="text-xs text-secondary uppercase font-bold mb-2 tracking-wider">Código de Solicitud</p>
            <p className="text-2xl font-mono font-black text-primary">{successData.id}</p>
          </div>
          <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-14 rounded-xl shadow-lg">
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (<div className="container mx-auto py-12 px-4 lg:px-8">
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-secondary transition-colors group">
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver a Productos
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-primary mb-3 tracking-tight">Abre tu cuenta</h1>
        <p className="text-slate-600 text-lg font-medium">Únete al banco que apoya tus sueños. Proceso 100% digital.</p>
      </div>

      <Card className="border-2 border-slate-200 shadow-xl rounded-3xl overflow-hidden">
        <CardHeader className="bg-primary text-white text-center pb-8 pt-8">
          <CardTitle className="text-2xl font-bold mb-2">Información Personal</CardTitle>
          <CardDescription className="text-blue-100 font-medium">Solo necesitaremos unos datos básicos para empezar.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-primary font-bold">
                      <User className="w-4 h-4 text-secondary" /> Nombre Completo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Perez" {...field} className="h-14 border-slate-200 focus:ring-secondary focus:border-secondary" />
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
                    <FormLabel className="flex items-center gap-2 text-primary font-bold">
                      <FileText className="w-4 h-4 text-secondary" /> Documento de Identidad
                    </FormLabel>
                    <FormControl>
                      <NumericInput placeholder="C.C. o C.E." {...field} className="h-14 border-slate-200 focus:ring-secondary focus:border-secondary" />
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
                    <FormLabel className="flex items-center gap-2 text-primary font-bold">
                      <Mail className="w-4 h-4 text-secondary" /> Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@correo.com" {...field} className="h-14 border-slate-200 focus:ring-secondary focus:border-secondary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Hidden Recaptcha Token - Pre-filled with "OK" for simulation */}
              <FormField
                control={form.control}
                name="recaptchaToken"
                render={({ field }) => (
                  <FormItem className="hidden">
                    <FormControl>
                      <Input type="hidden" {...field} value="OK" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-16 rounded-xl shadow-lg hover:shadow-xl transition-all" disabled={onboarding.isPending}>
                {onboarding.isPending ? <Loader2 className="animate-spin mr-2" /> : "Iniciar Apertura Ahora"}
              </Button>

              <p className="text-center text-[10px] text-slate-400 px-8">
                Al hacer clic en &quot;Iniciar Apertura Ahora&quot;, aceptas nuestra política de tratamiento de datos y los términos del simulador.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  </div>
  );
}
