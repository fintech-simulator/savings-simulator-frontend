"use client";

import { useProducts } from "@/application/products/useProducts";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { ProductSkeleton } from "@/presentation/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search, Info, Home } from "lucide-react";
import { Product } from "@/domain/entities";
import Link from "next/link";
import React from "react";
import { ProductTypeIcon } from "@/presentation/components/products/ProductTypeIcon";
import { ProductTypeBadge } from "@/presentation/components/products/ProductTypeBadge";

export default function ProductsPage() {
  const { data: response, isLoading, filters, setFilters, setPage } = useProducts();
  const products = response?.data;
  const meta = response?.meta;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value, page: 1 });
  };

  return (
    <div className="container mx-auto py-12 px-4 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-secondary transition-colors group">
          <Home className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Volver a Inicio
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-3 tracking-tight">Nuestros Productos</h1>
          <p className="text-slate-600 text-lg font-medium">Encuentra la cuenta de ahorros que mejor se adapte a tus metas.</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            className="pl-11 h-14 rounded-xl border-slate-200 focus:ring-secondary focus:border-secondary shadow-sm"
            value={filters.name || ""}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product: Product) => (
              <Card key={product.id} className="group border-2 border-slate-200 transition-all hover:shadow-xl hover:border-secondary/30 rounded-2xl overflow-hidden flex flex-col">
                <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50/20 pb-4 pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <ProductTypeIcon type={product.type as "Ahorro" | "Programado" | "Inversión"} />
                    <ProductTypeBadge type={product.type as "Ahorro" | "Programado" | "Inversión"} />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2 text-slate-600 text-sm">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow pt-5 pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white border border-secondary/10 rounded-lg">
                      <p className="text-[10px] text-secondary uppercase font-bold mb-1.5 tracking-wide">Tasa E.A.</p>
                      <p className="text-xl font-black text-primary">{(product.interestRate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="p-3 bg-white border border-secondary/10 rounded-lg">
                      <p className="text-[10px] text-secondary uppercase font-bold mb-1.5 tracking-wide">Mínimo</p>
                      <p className="text-xl font-black text-primary">${product.minAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-5 px-6">
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold h-12 rounded-xl shadow-md hover:shadow-lg transition-all">
                    <Link href={`/simulator?rate=${product.interestRate}&min=${product.minAmount}&product=${encodeURIComponent(product.name)}`}>
                      Simular Rentabilidad
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-slate-200 hover:bg-slate-50 hover:text-primary shadow-sm active:scale-95 transition-all"
                onClick={() => setPage(Math.max(1, meta.page - 1))}
                disabled={meta.page === 1}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">Página</span>
                <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-secondary text-white font-bold shadow-lg">
                  {meta.page}
                </div>
                <span className="text-sm font-medium text-slate-500">de {meta.totalPages}</span>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-slate-200 hover:bg-slate-50 hover:text-primary shadow-sm active:scale-95 transition-all"
                onClick={() => setPage(Math.min(meta.totalPages, meta.page + 1))}
                disabled={meta.page === meta.totalPages}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </>
      )}

      {!isLoading && products?.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-600">No encontramos productos</h3>
          <p className="text-slate-400">Intenta buscar con otros términos.</p>
        </div>
      )}
    </div>
  );
}
