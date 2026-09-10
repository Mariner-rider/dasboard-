import { useState } from "react";
import { Link } from "react-router-dom";
import MarketplaceLayout from "@/components/marketplace/MarketplaceLayout";
import { Github, Check, Database, Brain, Bot, Wrench, ChevronRight, Sparkles, ArrowLeft } from "lucide-react";

const types = [
  { id: "dataset", label: "Dataset", icon: Database, hint: "Training, eval, or benchmark data" },
  { id: "model", label: "Model", icon: Brain, hint: "Open or commercial weights" },
  { id: "agent", label: "Agent", icon: Bot, hint: "Autonomous or crew-style worker" },
  { id: "tool", label: "Tool", icon: Wrench, hint: "Product or utility for builders" },
];

const MarketplaceUpload = () => {
  const [step, setStep] = useState(1);
  const [connected, setConnected] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [pricingMode, setPricingMode] = useState<"free" | "paid" | "rent">("free");

  return (
    <MarketplaceLayout>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <Link to="/marketplace" className="text-[12px] text-muted-foreground/70 hover:text-foreground inline-flex items-center gap-1.5 mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to marketplace
        </Link>

        <header className="mb-6">
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground/60 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" /> Publish to Marketplace
          </span>
          <h1 className="text-[28px] font-semibold tracking-tight mt-1">Bring your work to builders worldwide.</h1>
          <p className="text-[13px] text-muted-foreground/75 mt-1">Connect GitHub, pick what you're shipping, set pricing — we handle distribution and payouts.</p>
        </header>

        {/* Stepper */}
        <div className="flex items-center gap-2 text-[11.5px] mb-6">
          {["Connect GitHub", "Choose type", "Listing details", "Pricing", "Publish"].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                step > i + 1 ? "bg-emerald-500 text-white" : step === i + 1 ? "bg-foreground text-background" : "bg-accent/70 text-muted-foreground"
              }`}>
                {step > i + 1 ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={step === i + 1 ? "font-medium" : "text-muted-foreground/65"}>{s}</span>
              {i < 4 && <ChevronRight className="w-3 h-3 text-muted-foreground/40" />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl glass border border-glass p-6">
          {step === 1 && (
            <>
              <h2 className="text-[15px] font-semibold mb-1">Connect your GitHub</h2>
              <p className="text-[12.5px] text-muted-foreground/70 mb-5">
                We pull your repos, READMEs, releases, and versions automatically.
              </p>
              {!connected ? (
                <button
                  onClick={() => setConnected(true)}
                  className="h-10 px-5 rounded-full bg-foreground text-background text-[13px] font-medium flex items-center gap-2 hover:opacity-90 transition"
                >
                  <Github className="w-4 h-4" /> Connect GitHub
                </button>
              ) : (
                <div className="flex items-center gap-2 text-[13px] text-emerald-600">
                  <Check className="w-4 h-4" /> Connected as <span className="font-mono">@yourhandle</span>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-[15px] font-semibold mb-1">What are you publishing?</h2>
              <p className="text-[12.5px] text-muted-foreground/70 mb-5">Choose the surface that fits best — you can list more later.</p>
              <div className="grid grid-cols-2 gap-3">
                {types.map((t) => {
                  const Icon = t.icon;
                  const active = picked === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setPicked(t.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        active ? "border-foreground bg-accent/60" : "border-glass hover:bg-accent/40"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-300/40 via-pink-300/30 to-purple-300/30 flex items-center justify-center mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className="text-[13.5px] font-semibold">{t.label}</p>
                      <p className="text-[11.5px] text-muted-foreground/65 mt-0.5">{t.hint}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-[15px] font-semibold mb-4">Listing details</h2>
              <div className="space-y-3">
                <Field label="Title" placeholder="A short, distinctive name" />
                <Field label="Tagline" placeholder="One line that nails the value" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category" placeholder="e.g. Computer Vision" />
                  <Field label="GitHub repo" placeholder="user/repo" />
                </div>
                <label className="block">
                  <span className="text-[11px] uppercase tracking-wider text-foreground/55 font-semibold">Description</span>
                  <textarea
                    rows={4}
                    placeholder="What does it do, what problems does it solve, what's included?"
                    className="mt-1 w-full rounded-lg bg-background/60 border border-glass px-3 py-2 text-[13px] outline-none focus:border-foreground/30 transition resize-none"
                  />
                </label>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-[15px] font-semibold mb-4">Pricing & license</h2>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["free", "paid", "rent"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPricingMode(m)}
                    className={`h-9 rounded-lg text-[12px] capitalize border transition-colors ${
                      pricingMode === m ? "bg-foreground text-background border-foreground" : "border-glass hover:bg-accent/60"
                    }`}
                  >
                    {m === "rent" ? "Rent / subscription" : m}
                  </button>
                ))}
              </div>
              {pricingMode !== "free" && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label={pricingMode === "rent" ? "Monthly price (USD)" : "Price (USD)"} placeholder="49" />
                  <Field label="License" placeholder="Commercial · single seat" />
                </div>
              )}
              {pricingMode === "free" && (
                <p className="text-[12.5px] text-muted-foreground/70">Distributed under the license declared in your repo (MIT, Apache, CC-BY, etc.).</p>
              )}
            </>
          )}

          {step === 5 && (
            <>
              <h2 className="text-[15px] font-semibold mb-2">Ready to publish</h2>
              <p className="text-[12.5px] text-muted-foreground/75 mb-4">
                Your listing will go live after a quick automated review (typically under 10 minutes).
              </p>
              <ul className="text-[12.5px] space-y-1.5 text-foreground/80">
                {["GitHub linked", "Type and category set", "Listing copy ready", "Pricing & license confirmed"].map((l) => (
                  <li key={l} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" /> {l}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="flex items-center justify-between mt-6 pt-5 border-t border-glass">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="h-9 px-4 rounded-full text-[12.5px] text-muted-foreground/70 hover:text-foreground disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              disabled={(step === 1 && !connected) || (step === 2 && !picked)}
              className="h-9 px-5 rounded-full bg-foreground text-background text-[12.5px] font-medium hover:opacity-90 disabled:opacity-50 transition"
            >
              {step === 5 ? "Publish listing" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </MarketplaceLayout>
  );
};

const Field = ({ label, placeholder }: { label: string; placeholder?: string }) => (
  <label className="block">
    <span className="text-[11px] uppercase tracking-wider text-foreground/55 font-semibold">{label}</span>
    <input
      type="text"
      placeholder={placeholder}
      className="mt-1 w-full h-10 rounded-lg bg-background/60 border border-glass px-3 text-[13px] outline-none focus:border-foreground/30 transition"
    />
  </label>
);

export default MarketplaceUpload;
