import { Globe, UserX, Languages } from "lucide-react";

/**
 * IndiaTrustStrip — a thin, muted trust strip below the hero that speaks
 * directly to Indian users: data residency, no human-in-the-loop, and a
 * Hindi example alongside English.
 */
const IndiaTrustStrip = () => (
  <div className="w-full border-y border-glass bg-foreground/[0.02]">
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-2.5">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] font-medium text-foreground/55">
        <span className="inline-flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-foreground/45" strokeWidth={1.75} />
          Data stays in your chosen region
        </span>
        <span className="inline-flex items-center gap-1.5">
          <UserX className="w-3.5 h-3.5 text-foreground/45" strokeWidth={1.75} />
          No human reviews your prompts
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Languages className="w-3.5 h-3.5 text-foreground/45" strokeWidth={1.75} />
          English or हिंदी — “इस रिपोर्ट का सारांश दें”
        </span>
      </div>
    </div>
  </div>
);

export default IndiaTrustStrip;
