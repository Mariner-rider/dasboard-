import { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface Props {
  updated: string;
  version?: string;
  sections: LegalSection[];
  contact?: string;
  history?: { version: string; date: string; note: string }[];
}

export default function LegalDoc({
  updated,
  version = "1.0",
  sections,
  contact = "legal@rivinity.ai",
  history,
}: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const filtered = query
    ? sections.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          (typeof s.body === "string" &&
            (s.body as string).toLowerCase().includes(query.toLowerCase())),
      )
    : sections;

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-24">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[#FD881F] via-[#F5A9D0] to-[#BFA7F8]"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
        <aside className="lg:sticky lg:top-24 h-max">
          <div className="glass border border-glass rounded-2xl p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50 mb-3">
              Contents
            </div>
            <div className="relative mb-3">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections…"
                className="h-9 pl-8 text-[12.5px] bg-transparent"
              />
            </div>
            <nav className="max-h-[60vh] overflow-y-auto pr-1">
              {filtered.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "block py-1.5 px-2 rounded-md text-[12.5px] transition-colors",
                    active === s.id
                      ? "text-foreground bg-accent/60"
                      : "text-foreground/55 hover:text-foreground hover:bg-accent/40",
                  )}
                >
                  <span className="text-foreground/35 tabular-nums mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
          {history && history.length > 0 && (
            <div className="glass border border-glass rounded-2xl p-4 mt-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/50 mb-3">
                Version History
              </div>
              <ul className="space-y-2 text-[12px] text-foreground/60">
                {history.map((h) => (
                  <li key={h.version}>
                    <div className="flex justify-between">
                      <span className="font-medium text-foreground/80">v{h.version}</span>
                      <span className="tabular-nums text-foreground/40">{h.date}</span>
                    </div>
                    <div>{h.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <article className="min-w-0">
          <div className="glass border border-glass rounded-3xl px-6 md:px-10 py-10 md:py-14">
            <div className="flex items-center justify-between text-[12px] text-foreground/50 mb-8">
              <span>Version {version}</span>
              <span>Effective {updated}</span>
            </div>
            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/40 mb-2">
                    Section {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="text-[24px] md:text-[30px] font-semibold tracking-tight mb-4">
                    {s.title}
                  </h2>
                  <div className="prose-legal text-[14.5px] leading-[1.75] text-foreground/75 space-y-4">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
            <div className="mt-14 pt-8 border-t border-glass text-[13px] text-foreground/60">
              Questions about this document? Reach{" "}
              <a href={`mailto:${contact}`} className="text-foreground underline underline-offset-4">
                {contact}
              </a>
              .
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
