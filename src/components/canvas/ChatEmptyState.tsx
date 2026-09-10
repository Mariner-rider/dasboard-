import { useNavigate } from "react-router-dom";
import { Bot, CalendarClock, FileText, Workflow } from "lucide-react";
import RivinityLogoTimeline from "@/components/rivinity/RivinityLogoTimeline";
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
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

/** Orb + time-aware greeting (top of the empty chat state). */
export function ChatEmptyState() {
  const firstName = USER.name.split(" ")[0];
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-5">
        <div
          className="absolute inset-0 -m-8 rounded-full blur-3xl pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle, hsla(245,75%,65%,0.28), hsla(330,85%,75%,0.14) 55%, transparent 78%)",
            animationDuration: "3.4s",
          }}
        />
        <RivinityLogoTimeline mode="float" size={84} />
      </div>
      <h1 className="text-3xl sm:text-[40px] font-semibold text-foreground/90 tracking-tight leading-tight">
        {greetingForNow()}, {firstName}
      </h1>
      <p className="text-[13.5px] text-muted-foreground/70 mt-2">How can I help you today?</p>
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
            <c.icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
          </div>
          <p className="text-[13px] font-semibold text-foreground/90 leading-snug">{c.title}</p>
          <p className="text-[11px] text-muted-foreground/65 mt-1 leading-relaxed">{c.desc}</p>
        </button>
      ))}
    </div>
  );
}

export default ChatEmptyState;