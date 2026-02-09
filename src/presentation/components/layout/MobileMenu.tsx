"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/presentation/components/ui/sheet";
import { cn } from "@/shared/utils/cn";

const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Productos", href: "/products" },
    { name: "Simulador", href: "/simulator" },
];

export function MobileMenu() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button
                    className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
                    aria-label="Abrir menú"
                >
                    <Menu className="h-5 w-5 text-slate-700" />
                </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col">
                <SheetHeader className="border-b border-slate-100 pb-4">
                    <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                    <div className="relative h-10 w-40">
                        <Image
                            src="/banco_belolli_logo.png"
                            alt="Banco Belolli"
                            fill
                            className="object-contain"
                        />
                    </div>
                </SheetHeader>

                <nav className="flex flex-col gap-2 py-6 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-semibold transition-all",
                                pathname === item.href
                                    ? "bg-secondary/10 text-secondary border-l-4 border-secondary"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-slate-100 pt-4">
                    <Link
                        href="/onboarding"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center w-full rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-secondary/90 hover:shadow-lg active:scale-[0.98]"
                    >
                        Abrir Cuenta
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}
