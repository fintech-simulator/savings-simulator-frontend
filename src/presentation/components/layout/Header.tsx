"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { name: "Productos", href: "/products" },
  { name: "Simulador", href: "/simulator" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
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
                "text-sm font-semibold transition-colors hover:text-primary",
                pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-slate-600"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/onboarding"
            className="rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-secondary/90 active:scale-95"
          >
            Abrir Cuenta
          </Link>
        </nav>

        {/* Mobile menu toggle could go here */}
      </div>
    </header>
  );
}
