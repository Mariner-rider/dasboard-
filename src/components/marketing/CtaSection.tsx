import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import ParticleField from "@/components/landing/ParticleField";
import MagneticButton from "@/components/landing/MagneticButton";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  gradientTail?: string;
  subtitle?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export default function CtaSection({
  eyebrow,
  title,
  gradientTail,
  subtitle,
  primary = { label: "Open Rivinity", href: "/app" },
  secondary,
}: Props) {
  return (
    <section className="mx-auto max-w-4xl px-5 lg:px-8 py-24 text-center">
      <div className="relative rounded-3xl bg-[hsl(230_25%_10%)] px-8 md:px-10 py-20 md:py-24 overflow-hidden">
        <ParticleField />
        <div className="relative z-10">
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="text-[36px] lg:text-[56px] font-semibold tracking-tight leading-[1.02] text-white">
            {title}
            {gradientTail && (
              <>
                <br />
                <span className="bg-gradient-to-r from-[hsl(245_75%_75%)] via-[hsl(330_85%_75%)] to-[hsl(22_95%_75%)] bg-clip-text text-transparent">
                  {gradientTail}
                </span>
              </>
            )}
          </h2>
          {subtitle && (
            <p className="mt-5 text-[15px] text-white/60 max-w-lg mx-auto">{subtitle}</p>
          )}
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <MagneticButton href={primary.href} className="cta-pill">
              {primary.label} <ArrowRight className="w-3.5 h-3.5" />
            </MagneticButton>
            {secondary && (
              <MagneticButton
                href={secondary.href}
                className="inline-flex items-center h-11 px-5 rounded-full glass border border-glass text-[13px] font-medium hover:bg-accent/60 transition-colors"
              >
                {secondary.label}
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
