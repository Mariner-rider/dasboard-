import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { UserPlus, ShieldCheck, KeyRound, ChevronRight } from "lucide-react";
import SidebarShell from "@/components/canvas/SidebarShell";

const tabs = [
  { to: "/settings/team-members", label: "Members", icon: UserPlus },
  { to: "/settings/roles-access", label: "Roles & Access", icon: ShieldCheck },
  { to: "/settings/api-keys", label: "API Keys", icon: KeyRound },
];

interface Props {
  title: string;
  description: string;
  eyebrow?: string;
  children: ReactNode;
}

export default function SettingsPageLayout({
  title,
  description,
  eyebrow = "Workspace settings",
  children,
}: Props) {
  return (
    <SidebarShell>
      <div className="p-6 md:p-10 max-w-6xl w-full mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground/70">
          <span>Settings</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground/80">{title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
              {eyebrow}
            </span>
            <h1 className="text-[28px] font-bold tracking-tight text-foreground mt-1">
              {title}
            </h1>
            <p className="text-[13.5px] text-muted-foreground/80 mt-1 max-w-xl">
              {description}
            </p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-1.5 border-b border-border/40 pb-3">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <NavLink
                key={t.to}
                to={t.to}
                end
                className={({ isActive }) =>
                  `h-8 px-3 rounded-full text-[12.5px] font-medium transition-colors border inline-flex items-center gap-1.5 ${
                    isActive
                      ? "bg-foreground text-background border-foreground"
                      : "border-border/40 text-foreground/70 hover:bg-accent/60"
                  }`
                }
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                {t.label}
              </NavLink>
            );
          })}
        </div>

        {/* Settings view content */}
        <div>{children}</div>
      </div>
    </SidebarShell>
  );
}