import { Fragment, useState } from "react";
import { Check, Minus, ShieldCheck } from "lucide-react";
import SettingsPageLayout from "@/components/settings/SettingsPageLayout";

type Level = "full" | "limited" | "none";

const roles = ["Owner", "Admin", "Editor", "Viewer", "Billing"] as const;
type Role = (typeof roles)[number];

const matrix: {
  feature: string;
  group: string;
  access: Record<Role, Level>;
}[] = [
  { group: "Workspace", feature: "View workspace", access: { Owner: "full", Admin: "full", Editor: "full", Viewer: "full", Billing: "full" } },
  { group: "Workspace", feature: "Rename workspace", access: { Owner: "full", Admin: "full", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Workspace", feature: "Delete workspace", access: { Owner: "full", Admin: "none", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Members", feature: "Invite members", access: { Owner: "full", Admin: "full", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Members", feature: "Change roles", access: { Owner: "full", Admin: "limited", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Members", feature: "Remove members", access: { Owner: "full", Admin: "full", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Content", feature: "Create chats & agents", access: { Owner: "full", Admin: "full", Editor: "full", Viewer: "none", Billing: "none" } },
  { group: "Content", feature: "Edit shared content", access: { Owner: "full", Admin: "full", Editor: "full", Viewer: "none", Billing: "none" } },
  { group: "Content", feature: "View shared content", access: { Owner: "full", Admin: "full", Editor: "full", Viewer: "full", Billing: "none" } },
  { group: "Content", feature: "Delete content", access: { Owner: "full", Admin: "full", Editor: "limited", Viewer: "none", Billing: "none" } },
  { group: "Developers", feature: "Manage API keys", access: { Owner: "full", Admin: "full", Editor: "none", Viewer: "none", Billing: "none" } },
  { group: "Developers", feature: "Deploy to production", access: { Owner: "full", Admin: "full", Editor: "limited", Viewer: "none", Billing: "none" } },
  { group: "Billing", feature: "View invoices", access: { Owner: "full", Admin: "full", Editor: "none", Viewer: "none", Billing: "full" } },
  { group: "Billing", feature: "Change plan", access: { Owner: "full", Admin: "none", Editor: "none", Viewer: "none", Billing: "full" } },
];

const groups = Array.from(new Set(matrix.map((m) => m.group)));

const AccessBadge = ({ level, showText = false }: { level: Level; showText?: boolean }) => {
  if (level === "full") {
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        {showText && <span className="text-xs font-medium">Full access</span>}
      </span>
    );
  }

  if (level === "limited") {
    return (
      <span className="inline-flex items-center rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground/85">
        Limited
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground/40">
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted/40">
        <Minus className="h-3 w-3" strokeWidth={2} />
      </span>
      {showText && <span className="text-xs">No access</span>}
    </span>
  );
};

export default function RolesAccessSettings() {
  const [activeMobileRole, setActiveMobileRole] = useState<Role>("Owner");

  return (
    <SettingsPageLayout
      title="Roles Access"
      description="A single, plain-English matrix of what each role can do. Owners can override individual permissions from a member's profile."
    >
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-3.5 border-b border-border/60 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <ShieldCheck className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  Permissions Matrix
                </h3>
                <p className="text-xs text-muted-foreground">
                  Baseline workspace privileges mapped across standard user roles
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground self-start sm:self-auto">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Full
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Limited
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/20" /> None
              </span>
            </div>
          </div>

          <div className="border-b border-border/40 bg-muted/15 p-2 sm:hidden">
            <div className="flex rounded-lg bg-background/60 p-1 border border-border/50 gap-1">
              {roles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setActiveMobileRole(r)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-all ${
                    activeMobileRole === r
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full table-fixed text-left text-xs border-collapse">
              <colgroup>
                <col className="w-1/2" />
                {roles.map((r) => (
                  <col key={r} className="w-[10%]" />
                ))}
              </colgroup>
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Capability</th>
                  {roles.map((r) => (
                    <th key={r} className="px-3 py-3.5 text-center font-medium">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {groups.map((group) => (
                  <Fragment key={group}>
                    <tr className="bg-muted/10">
                      <td
                        colSpan={roles.length + 1}
                        className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/75"
                      >
                        {group}
                      </td>
                    </tr>
                    {matrix
                      .filter((row) => row.group === group)
                      .map((row) => (
                        <tr
                          key={row.feature}
                          className="transition-colors hover:bg-muted/30"
                        >
                          <td className="px-5 py-3 font-medium text-foreground text-[13px] truncate">
                            {row.feature}
                          </td>
                          {roles.map((role) => (
                            <td key={role} className="px-3 py-3 text-center">
                              <div className="flex items-center justify-center">
                                <AccessBadge level={row.access[role]} />
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border/40 sm:hidden">
            {groups.map((group) => (
              <div key={group} className="divide-y divide-border/30">
                <div className="bg-muted/30 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-foreground/80">
                  {group}
                </div>
                {matrix
                  .filter((row) => row.group === group)
                  .map((row) => (
                    <div
                      key={row.feature}
                      className="flex items-center justify-between gap-3 px-4 py-3 bg-card/40"
                    >
                      <span className="text-xs font-medium text-foreground leading-snug">
                        {row.feature}
                      </span>
                      <div className="shrink-0">
                        <AccessBadge
                          level={row.access[activeMobileRole]}
                          showText={true}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          <div className="border-t border-border/40 bg-muted/10 px-4 sm:px-5 py-3 text-[11px] text-muted-foreground">
            Custom granular roles and overrides can be defined under individual enterprise workspace settings.
          </div>
        </div>
      </div>
    </SettingsPageLayout>
  );
}