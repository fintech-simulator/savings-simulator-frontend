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
    <Card className="border-2 border-secondary/20 bg-gradient-to-br from-blue-50 to-slate-50 shadow-sm">
      <CardContent className="px-3 py-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 flex-1">
            <ProductTypeIcon type={productType} />
            <div className="flex-1">
              <p className="text-[10px] text-secondary uppercase font-bold">Producto Seleccionado</p>
              <h3 className="text-sm font-bold text-primary leading-tight">{productName}</h3>
              <ProductTypeBadge type={productType} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
