import { useNavigate } from "react-router-dom";
import { Bot, CalendarClock, FileText, Workflow } from "lucide-react";
import { USER } from "@/lib/profile";

const capabilities = [
  {
    icon: Bot,
    title: "Build AI Agents",
    desc: "Create custom agents that handle repetitive tasks automatically.",
    route: "/agent-playground",
  },
  {
    icon: Workflow,
    title: "Automate Workflows",
    desc: "Connect tools and actions into workflows that run without manual effort.",
    route: "/app-builder",
  },
  {
    icon: FileText,
    title: "Generate Reports",
    desc: "Turn your agent activity into clear, actionable performance reports.",
    route: "/analytics",
  },
  {
    icon: CalendarClock,
    title: "Schedule Tasks",
    desc: "Plan and delegate recurring work to your agents on autopilot.",
    route: "/history",
  },
];

function greetingForNow(): string {
  const h = new Date().getHours();

  if (h >= 5 && h < 12) return "Good Morning";
  if (h >= 12 && h < 17) return "Good Afternoon";
  if (h >= 17 && h < 22) return "Good Evening";

  return "Good Night";
}

/** Greeting with background watermark */
export function ChatEmptyState() {
  const firstName = USER.name.split(" ")[0];

  return (
    <div className="relative flex flex-col items-center text-center select-none w-full">
      {/* Nudged down slightly: top-[-220px] / sm:top-[-240px] */}
      <div className="absolute top-[-220px] sm:top-[-240px] left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
        <img
          src="/watermark.png"
          alt=""
          className="
            w-[780px] h-[780px]
            sm:w-[880px] sm:h-[880px]
            max-w-none
            object-contain
            opacity-[0.025]
          "
        />
      </div>

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center -translate-y-8">
        {/* Ambient Glow */}
        <div className="relative mb-6 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,0,0.05) 0%, rgba(255,107,0,0.015) 50%, transparent 80%)",
            }}
          />
        </div>

        {/* Tagline */}
        <p className="text-[13px] font-semibold tracking-[0.25em] text-muted-foreground/60 uppercase mb-3">
          Think • Research • Build • With AI
        </p>

        {/* Greeting */}
        <h1 className="text-4xl sm:text-[50px] font-bold text-foreground tracking-tight leading-tight mb-2">
          {greetingForNow()},{" "}
          <span className="text-[#FF6B00]">{firstName}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-muted-foreground font-normal tracking-normal">
          How can I help you today?
        </p>
      </div>
    </div>
  );
}

/** Four capability cards under the prompt box. */
export function CapabilityCards() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
      {capabilities.map((c) => (
        <button
          key={c.title}
          onClick={() => navigate(c.route)}
          className="surface-interactive-hover text-left p-4 rounded-2xl group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-accent border border-glass flex items-center justify-center mb-3">
            <c.icon
              className="w-4 h-4 text-[#FF6B00]"
              strokeWidth={1.8}
            />
          </div>

          <p className="text-[15px] font-semibold text-foreground/90 leading-snug group-hover:text-[#FF6B00] transition-colors">
            {c.title}
          </p>

          <p className="text-[13px] text-muted-foreground/65 mt-1 leading-relaxed">
            {c.desc}
          </p>
        </button>
      ))}
    </div>
  );
}

export default ChatEmptyState;