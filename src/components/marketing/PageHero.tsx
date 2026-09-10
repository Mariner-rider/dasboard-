import { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import ParticleField from "@/components/landing/ParticleField";
import FlowDivider from "@/components/landing/FlowDivider";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  gradientTail?: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
  compact?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  gradientTail,
  subtitle,
  actions,
  meta,
  className,
  compact,
}: Props) {
  return (
    <section
      data-hero
      className={cn(
        "relative mx-auto max-w-7xl px-5 lg:px-8",
        compact ? "pt-14 pb-10" : "pt-20 lg:pt-28 pb-16",
        className,
      )}
    >
      <div className="absolute inset-x-0 -top-10 h-[520px] gradient-mesh pointer-events-none -z-10 opacity-60" />
      <div className="absolute inset-0 pointer-events-none opacity-40 -z-10">
        <ParticleField />
      </div>
      <div className="max-w-4xl">
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-foreground/60 px-3 h-7 rounded-full glass border border-glass mb-6 animate-fade-up">
            <Sparkles className="w-3 h-3" /> {eyebrow}
          </span>
        )}
        <h1
          className={cn(
            "font-semibold tracking-tight leading-[0.98] animate-fade-up",
            compact
              ? "text-[36px] sm:text-[48px] lg:text-[60px]"
              : "text-[44px] sm:text-[64px] lg:text-[80px]",
          )}
        >
          {title}
          {gradientTail && (
            <>
              <br />
              <span className="gradient-accent-text">{gradientTail}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p
            className="mt-6 text-[15px] lg:text-[18px] text-foreground/65 leading-relaxed max-w-2xl animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {subtitle}
          </p>
        )}
        {actions && (
          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.15s" }}
          >
            {actions}
          </div>
        )}
        {meta && (
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {meta}
          </div>
        )}
      </div>
      <FlowDivider className="mt-16" />
    </section>
  );
}
