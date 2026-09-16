import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/landing/ScrollReveal";

interface Props {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  kicker?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  divider?: boolean;
}

export default function Section({
  id,
  eyebrow,
  title,
  kicker,
  children,
  className,
  align = "left",
  divider,
}: Props) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto max-w-7xl px-5 lg:px-8 py-20 lg:py-24", className)}
    >
      {divider && (
        <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
      )}
      {(eyebrow || title || kicker) && (
        <div
          className={cn(
            "mb-12 max-w-3xl",
            align === "center" && "mx-auto text-center",
          )}
        >
          {eyebrow && (
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50 mb-4">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] font-semibold tracking-tight leading-[1.04]">
              {title}
            </h2>
          )}
          {kicker && (
            <p className="mt-4 text-[15px] lg:text-[17px] text-foreground/65 leading-relaxed">
              {kicker}
            </p>
          )}
        </div>
      )}
      <ScrollReveal>{children}</ScrollReveal>
    </section>
  );
}
