"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Package, Calculator, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Productos", href: "/products", icon: Package },
  { name: "Simulador", href: "/simulator", icon: Calculator },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          <Link href="/" className="flex items-center gap-4 transition-opacity hover:opacity-90">
            <div className="relative h-12 w-48">
              <Image
                src="/banco_belolli_logo.png"
                alt="Banco Belolli"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation with Icons */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold tracking-tight transition-colors hover:text-secondary relative group",
                    isActive ? "text-secondary" : "text-slate-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full",
                    isActive && "w-full"
                  )} />
                </Link>
              );
            })}
            <Link
              href="/onboarding"
              className="flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:scale-95"
            >
              <UserPlus className="h-4 w-4" />
              Abrir Cuenta
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 bg-white/80 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-700" />
            ) : (
              <Menu className="h-5 w-5 text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <nav
            className="absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all",
                    isActive
                      ? "bg-secondary/10 text-secondary"
                      : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-4 rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
            >
              <UserPlus className="h-5 w-5" />
              Abrir Cuenta
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
