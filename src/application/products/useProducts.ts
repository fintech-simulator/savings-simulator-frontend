import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { productRepository } from "../../infrastructure/http/product.api";

export interface ProductFilters {
  name?: string;
  type?: string;
  page?: number;
  limit?: number;
}

export function useProducts(
  initialFilters: ProductFilters = { page: 1, limit: 10 },
) {
  const [filters, setFilters] = useState(initialFilters);
  const [debouncedFilters, setDebouncedFilters] = useState(initialFilters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [filters]);

  const query = useQuery({
    queryKey: ["products", debouncedFilters],
    queryFn: () => productRepository.getProducts(debouncedFilters),
  });

  const setPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setFilters((prev) => ({ ...prev, limit, page: 1 }));
  };

  return {
    ...query,
    filters,
    setFilters,
    setPage,
    setLimit,
  };
}
