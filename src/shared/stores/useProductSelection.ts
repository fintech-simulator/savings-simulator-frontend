import { create } from "zustand";

type ProductType = "Ahorro" | "Programado" | "Inversión";

export interface SelectedProduct {
  name: string;
  type: ProductType;
  interestRate: number;
  minAmount: number;
}

interface ProductSelectionStore {
  selectedProduct: SelectedProduct | null;
  setSelectedProduct: (product: SelectedProduct | null) => void;
  clearSelectedProduct: () => void;
}

export const useProductSelection = create<ProductSelectionStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));
