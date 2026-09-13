import { useParams, Link, useNavigate } from "react-router-dom";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import { getItem, MARKET_ITEMS } from "@/lib/marketplaceData";
import { useCart } from "@/hooks/useCart";
import ItemCard from "@/components/marketplace/ItemCard";
import {
  Star,
  Download,
  Github,
  Shield,
  Calendar,
  HardDrive,
  Heart,
  Share2,
  ShoppingCart,
  ArrowLeft,
  Check,
} from "lucide-react";
import { useState } from "react";

const MarketplaceItem = () => {
  const { id = "" } = useParams();
  const item = getItem(id);
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === id);
  const navigate = useNavigate();
  const [tab, setTab] = useState<"overview" | "files" | "reviews" | "versions">("overview");

  if (!item) {
    return (
      <MarketplaceLayout>
        <div className="p-10 text-center text-muted-foreground">Item not found.</div>
      </MarketplaceLayout>
    );
  }

  const related = MARKET_ITEMS.filter((i) => i.type === item.type && i.id !== item.id).slice(0, 4);

  const handleAdd = () => {
    add({
      id: item.id,
      title: item.title,
      price: item.price,
      type: item.type,
      author: item.author,
    });
  };

  return (
    <MarketplaceLayout>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <Link
          to={`/marketplace/c/${item.type === "dataset" ? "datasets" : item.type === "model" ? "models" : item.type === "agent" ? "agents" : "tools"}`}
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground/70 hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to {item.type}s
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* Left */}
          <div>
            <div
              className={`relative rounded-3xl overflow-hidden aspect-[16/7] bg-gradient-to-br ${item.gradient} mb-5`}
            >
              <div className="absolute inset-0 [background-image:radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(0,0,0,0.18),transparent_45%)]" />
            </div>

            <div className="flex flex-wrap items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/70 uppercase tracking-wider font-semibold mb-1.5">
                  <span className="capitalize">{item.type}</span>
                  <span>·</span>
                  <span>{item.category}</span>
                  {item.badge && (
                    <span className="ml-1 px-2 py-0.5 rounded-full bg-foreground text-background normal-case tracking-normal text-[10px]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h1 className="text-[28px] font-semibold tracking-tight">{item.title}</h1>
                <p className="text-[14px] text-muted-foreground/80 mt-1">{item.tagline}</p>
                <div className="mt-3 flex items-center gap-3 text-[12px] text-muted-foreground/75">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                    {item.rating} rating
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {item.downloads.toLocaleString()} downloads
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    Updated {item.updatedAt}
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button className="h-9 w-9 rounded-full glass border border-glass flex items-center justify-center hover:bg-accent/60">
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <button className="h-9 w-9 rounded-full glass border border-glass flex items-center justify-center hover:bg-accent/60">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-glass mt-5">
              {(["overview", "files", "reviews", "versions"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 h-9 text-[12.5px] capitalize border-b-2 -mb-px transition-colors ${
                    tab === t
                      ? "border-foreground text-foreground font-medium"
                      : "border-transparent text-muted-foreground/70 hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="py-5">
              {tab === "overview" && (
                <div className="space-y-5">
                  <p className="text-[13.5px] leading-relaxed text-foreground/85">{item.description}</p>
                  <div>
                    <h3 className="text-[12px] font-semibold uppercase tracking-wider text-foreground/70 mb-2">
                      What you get
                    </h3>
                    <ul className="text-[13px] space-y-1.5 text-foreground/80">
                      {[
                        "Full source assets with commercial-ready license",
                        "Quick-start guide and example notebooks",
                        "Author Q&A within 48 hours",
                        "Free minor-version updates for a year",
                      ].map((l) => (
                        <li key={l} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 mt-0.5 text-emerald-500 shrink-0" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full bg-accent/60 text-[11.5px] text-foreground/70"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {tab === "files" && (
                <div className="rounded-xl border border-glass divide-y divide-glass">
                  {["README.md", "data/train.parquet", "data/eval.parquet", "examples/quickstart.ipynb"].map((f) => (
                    <div key={f} className="flex items-center justify-between px-4 py-2.5 text-[12.5px]">
                      <span className="font-mono text-foreground/80">{f}</span>
                      <span className="text-muted-foreground/60">— preview locked until purchase</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === "reviews" && (
                <div className="space-y-3">
                  {[
                    { name: "Maya R.", text: "Top quality, dropped right into our pipeline. Saved us weeks." },
                    { name: "Daniel K.", text: "Documentation is sharp. Author replied within hours." },
                  ].map((r) => (
                    <div key={r.name} className="rounded-xl glass border border-glass p-4">
                      <div className="flex items-center gap-2 text-[12px] font-medium mb-1">
                        <div className="w-6 h-6 rounded-full gradient-accent" />
                        {r.name}
                        <span className="ml-auto flex items-center gap-0.5 text-amber-500 text-[11px]">
                          <Star className="w-3 h-3 fill-current" /> 5.0
                        </span>
                      </div>
                      <p className="text-[12.5px] text-foreground/75">{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab === "versions" && (
                <div className="space-y-2">
                  {["3.1.0", "3.0.2", "2.9.0"].map((v, i) => (
                    <div key={v} className="flex items-center justify-between px-4 py-2.5 rounded-xl glass border border-glass text-[12.5px]">
                      <span className="font-mono">v{v}</span>
                      <span className="text-muted-foreground/60">{i === 0 ? "latest · " + item.updatedAt : `${i + 1} months ago`}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right purchase panel */}
          <aside className="lg:sticky lg:top-3 h-fit">
            <div className="rounded-2xl glass border border-glass p-5">
              <div className="flex items-baseline gap-2">
                <span className="text-[28px] font-semibold">
                  {item.price === 0 ? "Free" : `$${item.price}`}
                </span>
                {item.price > 0 && <span className="text-[12px] text-muted-foreground/60">one-time</span>}
              </div>
              <p className="text-[11.5px] text-muted-foreground/65 mt-1">
                Licensed for commercial use · Includes updates
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {item.price === 0 ? (
                  <button className="h-10 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition flex items-center justify-center gap-2">
                    <Download className="w-3.5 h-3.5" /> Download now
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        if (!inCart) handleAdd();
                        navigate("/marketplace/checkout");
                      }}
                      className="h-10 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition"
                    >
                      Buy now
                    </button>
                    <button
                      onClick={handleAdd}
                      disabled={inCart}
                      className="h-10 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      {inCart ? "In your cart" : "Add to cart"}
                    </button>
                  </>
                )}
              </div>

              <div className="border-t border-glass mt-5 pt-4 space-y-2.5 text-[12px]">
                <Meta icon={<Shield className="w-3.5 h-3.5" />} label="License" value={item.license ?? "Open"} />
                {item.size && (
                  <Meta icon={<HardDrive className="w-3.5 h-3.5" />} label="Size" value={item.size} />
                )}
                <Meta icon={<Calendar className="w-3.5 h-3.5" />} label="Updated" value={item.updatedAt} />
                <Meta icon={<Github className="w-3.5 h-3.5" />} label="Source" value="GitHub linked" />
              </div>

              <div className="border-t border-glass mt-5 pt-4">
                <p className="text-[11px] uppercase tracking-wider text-foreground/45 font-semibold mb-2">Author</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-primary-foreground text-[11px] font-semibold">
                    {item.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium">{item.author}</p>
                    <p className="text-[11px] text-muted-foreground/65">{item.authorHandle}</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-[16px] font-semibold mb-4">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((r) => (
                <ItemCard key={r.id} item={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </MarketplaceLayout>
  );
};

const Meta = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="flex items-center gap-1.5 text-muted-foreground/70">
      {icon}
      {label}
    </span>
    <span className="font-medium text-foreground/85">{value}</span>
  </div>
);

export default MarketplaceItem;
