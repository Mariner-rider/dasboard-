import { AlertTriangle, RotateCw, SearchX, SlidersHorizontal } from "lucide-react";

export const CardSkeleton = () => (
  <div className="rounded-2xl glass border border-glass overflow-hidden flex flex-col">
    <div className="aspect-[16/10] bg-gradient-to-br from-muted/60 to-muted/30 animate-pulse" />
    <div className="p-3.5 space-y-2">
      <div className="h-3 w-3/4 rounded bg-muted/60 animate-pulse" />
      <div className="h-2.5 w-full rounded bg-muted/40 animate-pulse" />
      <div className="h-2.5 w-2/3 rounded bg-muted/40 animate-pulse" />
      <div className="flex items-center justify-between pt-1.5">
        <div className="h-2.5 w-16 rounded bg-muted/40 animate-pulse" />
        <div className="h-3 w-10 rounded bg-muted/50 animate-pulse" />
      </div>
    </div>
  </div>
);

export const CardGridSkeleton = ({
  count = 6,
  className = "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
}: {
  count?: number;
  className?: string;
}) => (
  <div className={className} aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const CategoryTileSkeleton = () => (
  <div className="rounded-2xl glass border border-glass p-5">
    <div className="w-10 h-10 rounded-xl bg-muted/50 animate-pulse mb-3" />
    <div className="h-3.5 w-24 rounded bg-muted/60 animate-pulse mb-2" />
    <div className="h-2.5 w-full rounded bg-muted/40 animate-pulse" />
    <div className="h-2.5 w-2/3 rounded bg-muted/40 animate-pulse mt-1.5" />
  </div>
);

export const FilterPanelSkeleton = () => (
  <aside className="w-60 shrink-0 rounded-2xl glass border border-glass p-4 h-fit hidden lg:block space-y-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="h-2.5 w-20 rounded bg-muted/60 animate-pulse" />
        <div className="h-7 w-full rounded bg-muted/40 animate-pulse" />
      </div>
    ))}
  </aside>
);

export const ErrorState = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div
    role="alert"
    className="rounded-2xl glass border border-glass p-10 text-center flex flex-col items-center"
  >
    <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-3">
      <AlertTriangle className="w-5 h-5 text-destructive" />
    </div>
    <p className="text-[14px] font-semibold">Something went wrong</p>
    <p className="text-[12.5px] text-muted-foreground/70 mt-1 max-w-sm">{message}</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-5 h-9 px-4 rounded-full bg-foreground text-background text-[12.5px] font-medium inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-primary/40 focus:outline-none"
    >
      <RotateCw className="w-3.5 h-3.5" /> Try again
    </button>
  </div>
);

export const EmptyResults = ({
  hasFilters,
  onReset,
}: {
  hasFilters: boolean;
  onReset: () => void;
}) => (
  <div className="rounded-2xl glass border border-glass p-12 text-center flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-accent/60 flex items-center justify-center mb-3">
      <SearchX className="w-5 h-5 text-muted-foreground/70" />
    </div>
    <p className="text-[14px] font-semibold">No matches found</p>
    <p className="text-[12.5px] text-muted-foreground/70 mt-1 max-w-sm">
      {hasFilters
        ? "Your filters don't match any listings in this category yet."
        : "Nothing to show here right now. Check back soon or explore another category."}
    </p>
    {hasFilters && (
      <button
        type="button"
        onClick={onReset}
        className="mt-5 h-9 px-4 rounded-full glass border border-glass text-[12.5px] font-medium inline-flex items-center gap-1.5 hover:bg-accent/60 transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus:outline-none"
      >
        <SlidersHorizontal className="w-3.5 h-3.5" /> Reset filters
      </button>
    )}
  </div>
);
