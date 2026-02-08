import { cn } from "@/shared/utils/cn";

type ProductType = "Ahorro" | "Programado" | "Inversión";

interface ProductTypeBadgeProps {
  type: ProductType;
  className?: string;
}

const BADGE_STYLES = {
  Ahorro: "text-emerald-800 bg-emerald-100",
  Programado: "text-amber-800 bg-amber-100",
  Inversión: "text-purple-800 bg-purple-100",
} as const;

export function ProductTypeBadge({ type, className }: ProductTypeBadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full",
        BADGE_STYLES[type],
        className
      )}
    >
      {type}
    </span>
  );
}
