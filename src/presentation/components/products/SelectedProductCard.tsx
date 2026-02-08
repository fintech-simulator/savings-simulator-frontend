import { Card, CardContent } from "@/presentation/components/ui/card";
import { ProductTypeIcon } from "./ProductTypeIcon";
import { ProductTypeBadge } from "./ProductTypeBadge";
import { X } from "lucide-react";

type ProductType = "Ahorro" | "Programado" | "Inversión";

interface SelectedProductCardProps {
  productName: string;
  productType: ProductType;
  onDismiss?: () => void;
}

export function SelectedProductCard({ productName, productType, onDismiss }: SelectedProductCardProps) {
  return (
    <Card className="border-2 border-secondary/20 bg-gradient-to-br from-blue-50 to-slate-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <ProductTypeIcon type={productType} />
            <div className="flex-1">
              <p className="text-xs text-secondary uppercase font-bold mb-1">Producto Seleccionado</p>
              <h3 className="text-base font-bold text-primary leading-tight mb-2">{productName}</h3>
              <ProductTypeBadge type={productType} />
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
