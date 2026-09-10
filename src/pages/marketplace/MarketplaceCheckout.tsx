import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import { useCart } from "@/hooks/useCart";
import { CreditCard, Lock, Check, ShieldCheck } from "lucide-react";

const MarketplaceCheckout = () => {
  const { items, subtotal, clear } = useCart();
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  const [method, setMethod] = useState<"card" | "paypal" | "crypto">("card");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clear();
  };

  if (done) {
    return (
      <MarketplaceLayout>
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <div className="w-14 h-14 rounded-full gradient-accent flex items-center justify-center mx-auto mb-5">
            <Check className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight">Order confirmed</h1>
          <p className="text-[13.5px] text-muted-foreground/75 mt-2">
            We sent your receipt and download links to your inbox. You can also access purchases from your library.
          </p>
          <div className="mt-6 flex gap-2 justify-center">
            <Link to="/marketplace" className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90">
              Back to marketplace
            </Link>
            <button
              onClick={() => navigate("/app")}
              className="h-10 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60"
            >
              Open workspace
            </button>
          </div>
        </div>
      </MarketplaceLayout>
    );
  }

  if (items.length === 0) {
    return (
      <MarketplaceLayout>
        <div className="max-w-xl mx-auto px-6 py-16 text-center">
          <p className="text-[13.5px]">Your cart is empty.</p>
          <Link to="/marketplace" className="inline-block mt-4 text-[13px] underline">Continue shopping</Link>
        </div>
      </MarketplaceLayout>
    );
  }

  return (
    <MarketplaceLayout>
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-6">
        <h1 className="text-[26px] font-semibold tracking-tight">Checkout</h1>
        <p className="text-[12.5px] text-muted-foreground/70 mb-6 flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> 256-bit encrypted · powered by Rivinity Pay
        </p>

        <form onSubmit={submit} className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-5">
            {/* Contact */}
            <Section title="Contact">
              <Field label="Email" type="email" placeholder="you@studio.com" required />
            </Section>

            {/* Billing */}
            <Section title="Billing details">
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Address" required />
              <div className="grid grid-cols-3 gap-3">
                <Field label="City" required />
                <Field label="State / Region" required />
                <Field label="ZIP" required />
              </div>
            </Section>

            {/* Payment */}
            <Section title="Payment method">
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["card", "paypal", "crypto"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`h-9 rounded-lg text-[12px] capitalize border transition-colors ${
                      method === m
                        ? "bg-foreground text-background border-foreground"
                        : "border-glass hover:bg-accent/60"
                    }`}
                  >
                    {m === "card" ? "Card" : m === "paypal" ? "PayPal" : "Crypto"}
                  </button>
                ))}
              </div>
              {method === "card" && (
                <>
                  <Field label="Card number" placeholder="4242 4242 4242 4242" icon={<CreditCard className="w-3.5 h-3.5" />} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Expiry" placeholder="MM / YY" required />
                    <Field label="CVC" placeholder="123" required />
                  </div>
                </>
              )}
              {method === "paypal" && (
                <p className="text-[12.5px] text-muted-foreground/75">You'll be redirected to PayPal to complete payment.</p>
              )}
              {method === "crypto" && (
                <p className="text-[12.5px] text-muted-foreground/75">We accept USDC, ETH and BTC. A pay-in address will be generated next.</p>
              )}
            </Section>
          </div>

          {/* Summary */}
          <aside className="rounded-2xl glass border border-glass p-5 h-fit lg:sticky lg:top-3">
            <h3 className="text-[13px] font-semibold mb-3">Order summary</h3>
            <div className="space-y-2 mb-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-start gap-2 text-[12.5px]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-300/60 via-pink-300/50 to-purple-400/50 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium line-clamp-1">{it.title}</p>
                    <p className="text-[11px] text-muted-foreground/60">Qty {it.qty}</p>
                  </div>
                  <span className="font-medium">${(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-glass pt-3 space-y-1 text-[12.5px]">
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />
              <Row label="Total" value={`$${total.toFixed(2)}`} bold />
            </div>
            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-full bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Pay ${total.toFixed(2)}
            </button>
            <p className="text-[11px] text-muted-foreground/60 mt-3 text-center">
              By paying you agree to the marketplace terms and refund policy.
            </p>
          </aside>
        </form>
      </div>
    </MarketplaceLayout>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl glass border border-glass p-5">
    <h3 className="text-[13px] font-semibold mb-3">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({
  label,
  type = "text",
  placeholder,
  required,
  icon,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
}) => (
  <label className="block">
    <span className="text-[11px] uppercase tracking-wider text-foreground/55 font-semibold">{label}</span>
    <div className="mt-1 relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">{icon}</span>}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full h-10 rounded-lg bg-background/60 border border-glass text-[13px] outline-none focus:border-foreground/30 transition ${
          icon ? "pl-9 pr-3" : "px-3"
        }`}
      />
    </div>
  </label>
);

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className={`flex items-center justify-between ${bold ? "font-semibold text-[13.5px] pt-1" : "text-foreground/80"}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default MarketplaceCheckout;
