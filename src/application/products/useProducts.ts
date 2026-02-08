import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { productRepository } from "../../infrastructure/http/product.api";

export function useProducts(
  initialFilters: { name?: string; type?: string } = {},
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

  return {
    ...query,
    filters,
    setFilters,
  };
}
