import { cn } from "@/shared/utils/cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-slate-100 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

function ProductSkeleton() {
  return (
    <div className="h-80 rounded-2xl bg-slate-100 animate-pulse overflow-hidden border border-slate-200">
      <div className="h-1/3 bg-slate-200/50" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="h-10 bg-slate-200 rounded-xl" />
          <div className="h-10 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>

  );
}

export { Skeleton, ProductSkeleton }
