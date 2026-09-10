import { Link } from "react-router-dom";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const MarketplaceCart = () => {
  const { items, remove, setQty, subtotal, clear } = useCart();
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <MarketplaceLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6">
        <h1 className="text-[26px] font-semibold tracking-tight mb-1">Your cart</h1>
        <p className="text-[13px] text-muted-foreground/70 mb-6">
          {items.length === 0 ? "Nothing here yet." : `${items.length} item${items.length > 1 ? "s" : ""} ready for checkout.`}
        </p>

        {items.length === 0 ? (
          <div className="rounded-2xl glass border border-glass p-12 text-center">
            <ShoppingBag className="w-7 h-7 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-[13.5px] font-medium">Your cart is empty</p>
            <p className="text-[12px] text-muted-foreground/65 mt-1 mb-4">
              Find datasets, models, agents and tools made for builders.
            </p>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-foreground text-background text-[12.5px] font-medium hover:opacity-90"
            >
              Browse marketplace <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6">
            <div className="rounded-2xl glass border border-glass divide-y divide-glass overflow-hidden">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3 p-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-300/60 via-pink-300/50 to-purple-400/50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/marketplace/item/${it.id}`} className="text-[13.5px] font-medium hover:underline line-clamp-1">
                      {it.title}
                    </Link>
                    <p className="text-[11.5px] text-muted-foreground/65 capitalize">
                      {it.type} · {it.author}
                    </p>
                  </div>
                  <div className="flex items-center rounded-full border border-glass h-8">
                    <button
                      onClick={() => setQty(it.id, it.qty - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-accent/60 rounded-l-full"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-[12px]">{it.qty}</span>
                    <button
                      onClick={() => setQty(it.id, it.qty + 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-accent/60 rounded-r-full"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="w-20 text-right text-[13px] font-semibold">
                    ${(it.price * it.qty).toFixed(2)}
                  </div>
                  <button
                    onClick={() => remove(it.id)}
                    className="w-8 h-8 rounded-full hover:bg-accent/60 flex items-center justify-center text-muted-foreground/60 hover:text-foreground"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex justify-between items-center p-3">
                <button onClick={clear} className="text-[12px] text-muted-foreground/70 hover:text-foreground">
                  Clear cart
                </button>
                <Link to="/marketplace" className="text-[12px] hover:underline">
                  ← Continue browsing
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl glass border border-glass p-5 h-fit lg:sticky lg:top-3">
              <h2 className="text-[14px] font-semibold mb-3">Order summary</h2>
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Estimated tax" value={`$${tax.toFixed(2)}`} />
              <div className="border-t border-glass my-3" />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />
              <Link
                to="/marketplace/checkout"
                className="mt-4 h-10 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                Proceed to checkout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-[11px] text-muted-foreground/60 mt-3 text-center">
                Secure checkout · 30-day refund window
              </p>
            </aside>
          </div>
        )}
      </div>
    </MarketplaceLayout>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`flex items-center justify-between py-1 text-[13px] ${bold ? "font-semibold text-[14px]" : "text-foreground/80"}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default MarketplaceCart;
