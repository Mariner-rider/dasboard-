import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import ItemCard from "@/components/marketplace/ItemCard";
import FilterPanel, { defaultFilters, Filters } from "@/components/marketplace/FilterPanel";
import {
  CardGridSkeleton,
  EmptyResults,
  ErrorState,
  FilterPanelSkeleton,
} from "@/components/marketplace/MarketplaceStates";
import { CATEGORIES } from "@/lib/marketplaceData";
import { useMarketplace } from "@/hooks/useMarketplace";

const MarketplaceCategory = () => {
  const { slug = "datasets" } = useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug) ?? CATEGORIES[0];
  const [params] = useSearchParams();
  const initialQ = params.get("q") ?? "";
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [query, setQuery] = useState(initialQ);
  const { items, loading, error, refetch } = useMarketplace();

  // Reset filters + query when switching categories so stale tags don't
  // produce a confusing empty state.
  useEffect(() => {
    setFilters(defaultFilters);
    setQuery(params.get("q") ?? "");
  }, [slug, params]);

  const inCategory = useMemo(() => items.filter((i) => i.type === cat.type), [items, cat]);

  const filtered = useMemo(() => {
    let list = inCategory;

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.tagline.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (filters.pricing === "free") list = list.filter((i) => i.price === 0);
    if (filters.pricing === "paid") list = list.filter((i) => i.price > 0);
    if (filters.minRating > 0) list = list.filter((i) => i.rating >= filters.minRating);
    if (filters.tags.length > 0) {
      list = list.filter(
        (i) => filters.tags.includes(i.category) || i.tags.some((t) => filters.tags.includes(t)),
      );
    }

    const sorted = [...list];
    switch (filters.sort) {
      case "newest":
        sorted.reverse();
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => b.downloads - a.downloads);
    }
    return sorted;
  }, [inCategory, filters, query]);

  const tagOptions = useMemo(() => {
    const s = new Set<string>();
    inCategory.forEach((i) => {
      s.add(i.category);
      i.tags.forEach((t) => s.add(t));
    });
    return Array.from(s).sort();
  }, [inCategory]);

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.pricing !== "all" ||
    filters.minRating > 0 ||
    query.trim().length > 0;

  const resetAll = () => {
    setFilters(defaultFilters);
    setQuery("");
  };

  return (
    <MarketplaceLayout search={query} onSearch={setQuery}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <header className="mb-6">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/60 font-semibold">Category</p>
          <h1 className="text-[28px] font-semibold tracking-tight mt-1">{cat.label}</h1>
          <p className="text-[13px] text-muted-foreground/75 mt-1 max-w-2xl">{cat.blurb}</p>
        </header>

        <div className="flex gap-6">
          {loading ? (
            <FilterPanelSkeleton />
          ) : (
            <FilterPanel filters={filters} onChange={setFilters} tagOptions={tagOptions} />
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4 min-h-[20px]" aria-live="polite">
              {loading ? (
                <span className="h-3 w-24 rounded bg-muted/50 animate-pulse" aria-hidden="true" />
              ) : error ? (
                <span className="text-[12px] text-muted-foreground/60">—</span>
              ) : (
                <span className="text-[12px] text-muted-foreground/70">
                  {filtered.length} {filtered.length === 1 ? "result" : "results"}
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetAll}
                      className="ml-3 text-[11.5px] text-foreground/70 hover:text-foreground underline underline-offset-2"
                    >
                      Clear all
                    </button>
                  )}
                </span>
              )}
            </div>

            {loading ? (
              <CardGridSkeleton count={6} />
            ) : error ? (
              <ErrorState message={error} onRetry={refetch} />
            ) : filtered.length === 0 ? (
              <EmptyResults hasFilters={hasActiveFilters} onReset={resetAll} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((it) => (
                  <ItemCard key={it.id} item={it} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

export default MarketplaceCategory;
