interface Milestone {
  year: string;
  title: string;
  body: string;
}

export default function TimelineSection({ items }: { items: Milestone[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent md:-translate-x-1/2" />
      <div className="space-y-10">
        {items.map((m, i) => {
          const right = i % 2 === 1;
          return (
            <div
              key={m.year + m.title}
              className={`relative flex md:items-center gap-6 ${
                right ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="hidden md:block flex-1" />
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FD881F] via-[#F5A9D0] to-[#BFA7F8] shadow-[0_0_0_4px_hsl(var(--background))]" />
              </div>
              <div className="flex-1 pl-12 md:pl-0">
                <div className={right ? "md:pr-10" : "md:pl-10"}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
                    {m.year}
                  </div>
                  <div className="mt-1 glass border border-glass rounded-2xl p-5">
                    <div className="text-[17px] font-semibold">{m.title}</div>
                    <p className="mt-2 text-[13.5px] text-foreground/65 leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
