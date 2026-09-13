import { useState } from "react";
import { Filter, X } from "lucide-react";

export type Filters = {
  pricing: "all" | "free" | "paid";
  minRating: number;
  sort: "trending" | "newest" | "rating" | "price-asc" | "price-desc";
  tags: string[];
};

export const defaultFilters: Filters = {
  pricing: "all",
  minRating: 0,
  sort: "trending",
  tags: [],
};

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  tagOptions: string[];
}

const FilterPanel = ({ filters, onChange, tagOptions }: Props) => {
  const setF = (p: Partial<Filters>) => onChange({ ...filters, ...p });
  const toggleTag = (t: string) =>
    setF({ tags: filters.tags.includes(t) ? filters.tags.filter((x) => x !== t) : [...filters.tags, t] });

  return (
    <aside className="w-60 shrink-0 rounded-2xl glass border border-glass p-4 h-fit sticky top-3 hidden lg:block">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-3.5 h-3.5 text-muted-foreground/70" />
        <h4 className="text-[12px] font-semibold uppercase tracking-wider text-foreground/70">Filters</h4>
        {(filters.tags.length > 0 || filters.pricing !== "all" || filters.minRating > 0) && (
          <button
            onClick={() => onChange(defaultFilters)}
            className="ml-auto text-[11px] text-muted-foreground/70 hover:text-foreground flex items-center gap-0.5"
          >
            <X className="w-3 h-3" /> reset
          </button>
        )}
      </div>

      <Section title="Pricing">
        <div className="flex gap-1.5">
          {(["all", "free", "paid"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setF({ pricing: p })}
              className={`flex-1 h-7 rounded-md text-[11.5px] capitalize transition-colors ${
                filters.pricing === p ? "bg-foreground text-background" : "bg-accent/60 hover:bg-accent"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Minimum rating">
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating}
          onChange={(e) => setF({ minRating: parseFloat(e.target.value) })}
          className="w-full accent-foreground"
        />
        <div className="flex justify-between text-[10.5px] text-muted-foreground/60 mt-1">
          <span>Any</span>
          <span>{filters.minRating.toFixed(1)}★</span>
        </div>
      </Section>

      <Section title="Sort by">
        <select
          value={filters.sort}
          onChange={(e) => setF({ sort: e.target.value as Filters["sort"] })}
          className="w-full h-8 rounded-md bg-accent/60 px-2 text-[12px] outline-none border border-glass"
        >
          <option value="trending">Trending</option>
          <option value="newest">Newest</option>
          <option value="rating">Highest rated</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </Section>

      <Section title="Tags">
        <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
          {tagOptions.map((t) => {
            const active = filters.tags.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-2 py-0.5 rounded-full border text-[11px] transition-colors ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "border-glass text-foreground/70 hover:bg-accent/60"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </Section>
    </aside>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-4">
    <p className="text-[10.5px] uppercase tracking-wider text-foreground/45 font-semibold mb-2">{title}</p>
    {children}
  </div>
);

export default FilterPanel;
