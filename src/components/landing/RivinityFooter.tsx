import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram, Twitter, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { FOOTER_COLUMNS } from "./footer-links";

interface RivinityFooterProps {
  showPrimaryNav?: boolean;
}
const COLUMNS = FOOTER_COLUMNS;

function TrustBadge({
  label,
  sub,
  tone,
}: {
  label: string;
  sub: string;
  tone: "outline" | "blue" | "black";
}) {
  const toneCls =
    tone === "blue"
      ? "bg-[#0b2a6b] text-white"
      : tone === "black"
      ? "bg-black text-white"
      : "bg-background border border-foreground/25 text-foreground/80";
  return (
    <div
      className={cn(
        "flex h-14 w-14 flex-col items-center justify-center rounded-full text-[9px] font-bold leading-tight",
        toneCls,
      )}
    >
      <span className="tracking-wide">{label}</span>
      <span className="text-[8px] font-semibold opacity-90">{sub}</span>
    </div>
  );
}

export default function RivinityFooter(_: RivinityFooterProps) {
  return (
    <footer className="relative mx-auto max-w-7xl px-5 lg:px-8 pb-4 pt-16">
      <div className="relative glass border border-glass rounded-3xl shadow-float">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 p-8 md:p-12">
          {/* Brand + support */}
          <div className="md:col-span-3 space-y-6">
            <div className="flex items-center gap-2 text-[13px] text-foreground/70">
              <span>A product by</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-[#FD881F] to-[#F5A9D0]" />
                BharatTech
              </span>
            </div>

            <div>
              <div className="text-[12px] font-bold tracking-[0.06em] uppercase text-foreground mb-3">
                Support Inquiries:
              </div>
              <a
                href="mailto:support@rivinity.in"
                className="inline-flex items-center gap-2 text-[13.5px] text-foreground/70 hover:text-foreground transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/20">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                support@rivinity.in
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <TrustBadge label="ISO" sub="9001" tone="outline" />
              <TrustBadge label="GDPR" sub="★★★★★" tone="blue" />
              <TrustBadge label="AICPA" sub="SOC 2" tone="black" />
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-foreground mb-5">
                  {col.title}
                </div>
                <ul className="flex flex-col gap-3">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      {it.to ? (
                        <Link
                          to={it.to}
                          className="text-[13.5px] text-foreground/65 hover:text-foreground transition-colors duration-300"
                        >
                          {it.label}
                        </Link>
                      ) : (
                        <a
                          href={it.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13.5px] text-foreground/65 hover:text-foreground transition-colors"
                        >
                          {it.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Get in touch */}
          <div className="md:col-span-3 space-y-5">
            <div className="text-[12px] font-bold tracking-[0.08em] uppercase text-foreground">
              Get in Touch
            </div>
            <p className="text-[13px] text-foreground/60 leading-relaxed">
              We don't send spam so don't worry.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center rounded-full border border-foreground/20 bg-background/40 backdrop-blur-sm h-11 pl-5 pr-1"
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-foreground/45 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FD881F] via-[#F5A9D0] to-[#BFA7F8] text-white hover:opacity-90 transition-opacity"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center gap-3 pt-2">
              {[
                { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GiantWordmark />

      <div className="relative z-10 text-center text-[13px] text-foreground/60 pb-6">
        © {new Date().getFullYear()} BharatTech Origin Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}

function GiantWordmark() {
  return (
    <div
      aria-hidden
      className="group relative select-none overflow-hidden -my-2 md:-my-6"
    >
      <div className="relative w-full text-center leading-[0.85]">
        {/* Base soft watermark — matches the pale aurora tint in the reference:
            cool blue-lavender left → near-white center → warm peach/pink right */}
        <span
          className="block font-sans font-black tracking-[0.02em] bg-clip-text text-transparent transition-opacity duration-700 group-hover:opacity-0"
          style={{
            fontSize: "clamp(4.5rem, 21vw, 19rem)",
            backgroundImage:
              "linear-gradient(90deg, rgba(191,167,248,0.22) 0%, rgba(210,224,250,0.20) 25%, rgba(245,245,250,0.18) 50%, rgba(245,201,196,0.22) 78%, rgba(253,136,31,0.22) 100%)",
          }}
        >
          RIVINITY
        </span>
        {/* Hover — vibrant brand gradient */}
        <span
          className="pointer-events-none absolute inset-0 block font-sans font-black tracking-[0.02em] bg-clip-text text-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            fontSize: "clamp(4.5rem, 21vw, 19rem)",
            backgroundImage:
              "linear-gradient(90deg, #BFA7F8 0%, #F5A9D0 50%, #FD881F 100%)",
          }}
        >
          RIVINITY
        </span>
      </div>
    </div>
  );
}