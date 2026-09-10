import { Link } from "react-router-dom";
import { Star, Download } from "lucide-react";
import type { MarketItem } from "@/lib/marketplaceData";

const ItemCard = ({ item }: { item: MarketItem }) => {
  return (
    <Link
      to={`/marketplace/item/${item.id}`}
      className="group rounded-2xl glass border border-glass hover:shadow-float transition-all duration-200 hover:-translate-y-0.5 overflow-hidden flex flex-col"
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br ${item.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-50 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.4),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.2),transparent_45%)]" />
        {item.badge && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur text-[10px] font-semibold tracking-wide uppercase">
            {item.badge}
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur text-[10px] font-medium capitalize">
          {item.type}
        </span>
      </div>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <h3 className="text-[13.5px] font-semibold leading-tight line-clamp-1">{item.title}</h3>
        <p className="text-[11.5px] text-muted-foreground/80 line-clamp-2 leading-snug">{item.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5 text-[10.5px] text-muted-foreground/70">
            <span className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-current text-amber-500" />
              {item.rating}
            </span>
            <span className="flex items-center gap-0.5">
              <Download className="w-3 h-3" />
              {item.downloads > 1000 ? `${(item.downloads / 1000).toFixed(1)}k` : item.downloads}
            </span>
          </div>
          <span className="text-[12px] font-semibold">
            {item.price === 0 ? <span className="text-emerald-600">Free</span> : `$${item.price}`}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
