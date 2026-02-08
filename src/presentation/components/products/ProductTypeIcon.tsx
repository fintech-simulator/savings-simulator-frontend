import { PiggyBank, Briefcase } from "lucide-react";

type ProductType = "Ahorro" | "Programado" | "Inversión";

interface ProductTypeIconProps {
  type: ProductType;
  className?: string;
}

const PRODUCT_TYPE_CONFIG = {
  Ahorro: {
    Icon: PiggyBank,
    color: "text-emerald-600",
  },
  Programado: {
    Icon: PiggyBank,
    color: "text-amber-600",
  },
  Inversión: {
    Icon: Briefcase,
    color: "text-purple-600",
  },
} as const;

export function ProductTypeIcon({ type, className = "w-7 h-7" }: ProductTypeIconProps) {
  const config = PRODUCT_TYPE_CONFIG[type];
  const Icon = config.Icon;

  return <Icon className={`${className} ${config.color}`} />;
}
