"use client";

import { useProducts } from "@/application/products/useProducts";
import { Input } from "@/presentation/components/ui/input";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { ProductSkeleton } from "@/presentation/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Search, Info, PiggyBank, Briefcase } from "lucide-react";
import { Product } from "@/domain/entities";
import Link from "next/link";
import React from "react";

export default function ProductsPage() {
  const { data: response, isLoading, filters, setFilters, setPage } = useProducts();
  const products = response?.data;
  const meta = response?.meta;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, name: e.target.value, page: 1 });
  };

  return (
    <div className="container mx-auto py-12 px-4 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Nuestros Productos</h1>
          <p className="text-slate-500">Encuentra la cuenta de ahorros que mejor se adapte a tus metas.</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Buscar por nombre..."
            className="pl-10 h-12 rounded-full border-slate-200 focus:ring-primary shadow-sm"
            value={filters.name || ""}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product: Product) => (
              <Card key={product.id} className="group border-slate-200 transition-all hover:shadow-xl hover:border-accent/50 rounded-2xl overflow-hidden flex flex-col">
                <CardHeader className="bg-slate-50/50 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    {product.type === "Ahorro" ? (
                      <PiggyBank className="w-8 h-8 text-primary" />
                    ) : (
                      <Briefcase className="w-8 h-8 text-primary" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {product.type}
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">{product.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Tasa E.A.</p>
                      <p className="text-lg font-bold text-primary">{(product.interestRate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Mínimo</p>
                      <p className="text-lg font-bold text-primary">${product.minAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-6 h-auto">
                  <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 rounded-xl shadow-md">
                    <Link href="/simulator">
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
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-lg">
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
