"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/products" },
  { name: "Simulador", href: "/simulator" },
];

export function Header() {
  const pathname = usePathname();

  return (
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

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold tracking-tight transition-colors hover:text-secondary relative group",
                pathname === item.href ? "text-secondary" : "text-slate-600"
              )}
            >
              {item.name}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full",
                pathname === item.href && "w-full"
              )} />
            </Link>
          ))}
          <Link
            href="/onboarding"
            className="rounded-lg bg-secondary px-8 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-secondary/90 hover:shadow-md active:scale-95"
          >
            Abrir Cuenta
          </Link>
        </nav>

        {/* Mobile menu toggle could go here */}
      </div>
    </header>
  );
}
