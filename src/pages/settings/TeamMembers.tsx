import { useState, useRef, useEffect } from "react";
import {
  UserPlus,
  Mail,
  MoreHorizontal,
  Search,
  Check,
  X,
  Trash2,
  UserCheck,
} from "lucide-react";
import SettingsPageLayout from "@/components/settings/SettingsPageLayout";

type Role = "Owner" | "Admin" | "Editor" | "Viewer";
type Status = "Active" | "Invited" | "Suspended";

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
  initials: string;
  status: Status;
  joinedDate: string;
};

const initialMembers: Member[] = [
  { id: "m1", name: "Tushar Trivedi", email: "tushar@rivinity.ai", role: "Owner", initials: "TT", status: "Active", joinedDate: "Jan 10, 2025" },
  { id: "m2", name: "Aarav Mehta", email: "aarav@rivinity.ai", role: "Admin", initials: "AM", status: "Active", joinedDate: "Feb 01, 2025" },
  { id: "m3", name: "Sana Iqbal", email: "sana@rivinity.ai", role: "Editor", initials: "SI", status: "Active", joinedDate: "Mar 14, 2025" },
  { id: "m4", name: "Marcus Ford", email: "marcus@rivinity.ai", role: "Editor", initials: "MF", status: "Active", joinedDate: "Jun 20, 2025" },
  { id: "m5", name: "Yuki Tanaka", email: "yuki@rivinity.ai", role: "Viewer", initials: "YT", status: "Invited", joinedDate: "Pending" },
  { id: "m6", name: "Elena Ruiz", email: "elena@rivinity.ai", role: "Viewer", initials: "ER", status: "Active", joinedDate: "Aug 05, 2025" },
];

const roleBadgeStyles: Record<Role, string> = {
  Owner: "bg-primary/10 text-primary border-primary/20",
  Admin: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Editor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Viewer: "bg-muted text-muted-foreground border-border/60",
};

const statusBadgeStyles: Record<Status, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Invited: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Suspended: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function TeamMembersSettings() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<Role>("Editor");

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenuId(null);
      }
    };
    if (activeMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenuId]);

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeCount = members.filter((m) => m.status === "Active").length;
  const invitedCount = members.filter((m) => m.status === "Invited").length;

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const initials = inviteName
      .trim()
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newMember: Member = {
      id: `m_${Date.now()}`,
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      initials: initials || "U",
      status: "Invited",
      joinedDate: "Pending",
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("Editor");
    setIsInviteModalOpen(false);
  };

  const updateMemberRole = (id: string, newRole: Role) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m))
    );
    setActiveMenuId(null);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setActiveMenuId(null);
  };

  return (
    <SettingsPageLayout
      title="Team Members"
      description="Manage who has access to this workspace. Invite teammates and assign the least-privilege role they need."
    >
      <div className="mx-auto w-full max-w-6xl space-y-4 sm:space-y-6">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
          <div className="flex flex-col gap-4 border-b border-border/60 p-4 sm:p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary shrink-0">
                <UserCheck className="h-4 w-4" strokeWidth={2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  Workspace Directory
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {members.length} people · {activeCount} active · {invitedCount} pending
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 sm:py-1.5 text-xs font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <UserPlus className="h-3.5 w-3.5 shrink-0" />
              Invite member
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-b border-border/40 bg-muted/10 p-3 sm:px-5">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name or email..."
                className="w-full rounded-md border border-border/60 bg-background/50 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-muted-foreground shrink-0">Filter:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto rounded-md border border-border/60 bg-background/50 px-2.5 py-1.5 sm:py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="All">All Roles</option>
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-fixed text-left text-xs border-collapse">
              <colgroup>
                <col className="w-[32%]" />
                <col className="w-[28%]" />
                <col className="w-[15%]" />
                <col className="w-[15%]" />
                <col className="w-[10%]" />
              </colgroup>
              <thead>
                <tr className="border-b border-border/40 bg-muted/20 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5 text-center">Role</th>
                  <th className="px-5 py-3.5 text-center">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                      No members matched your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((m) => (
                    <tr
                      key={m.id}
                      className="group transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                            {m.initials}
                          </div>
                          <span className="font-medium text-foreground text-[13px] truncate">
                            {m.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-muted-foreground">
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground/70" />
                          <span className="truncate">{m.email}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${roleBadgeStyles[m.role]}`}
                        >
                          {m.role}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeStyles[m.status]}`}
                        >
                          {m.status}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-right relative">
                        <div className="inline-flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === m.id ? null : m.id)
                            }
                            disabled={m.role === "Owner"}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            aria-label="Member options"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </button>

                          {activeMenuId === m.id && (
                            <div
                              ref={menuRef}
                              className="absolute right-5 top-11 z-20 w-44 rounded-lg border border-border/80 bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in zoom-in-95 duration-100"
                            >
                              <div className="px-2 py-1 text-[10px] font-medium uppercase text-muted-foreground tracking-wider">
                                Change Role
                              </div>
                              {(["Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                                <button
                                  key={r}
                                  onClick={() => updateMemberRole(m.id, r)}
                                  className="flex w-full items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-muted text-left transition-colors"
                                >
                                  <span>{r}</span>
                                  {m.role === r && <Check className="h-3 w-3 text-primary" />}
                                </button>
                              ))}
                              <div className="my-1 border-t border-border/60" />
                              <button
                                onClick={() => removeMember(m.id)}
                                className="flex w-full items-center gap-1.5 px-2 py-1.5 text-xs text-destructive rounded hover:bg-destructive/10 transition-colors"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>Remove member</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border/40 md:hidden">
            {filteredMembers.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No members matched your search criteria.
              </div>
            ) : (
              filteredMembers.map((m) => (
                <div key={m.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20">
                        {m.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {m.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5 truncate">
                          <Mail className="h-3 w-3 shrink-0 text-muted-foreground/70" />
                          <span className="truncate">{m.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveMenuId(activeMenuId === m.id ? null : m.id)
                        }
                        disabled={m.role === "Owner"}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        aria-label="Member options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                      {activeMenuId === m.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 top-10 z-20 w-44 rounded-lg border border-border/80 bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in zoom-in-95 duration-100"
                        >
                          <div className="px-2 py-1 text-[10px] font-medium uppercase text-muted-foreground tracking-wider">
                            Change Role
                          </div>
                          {(["Admin", "Editor", "Viewer"] as Role[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => updateMemberRole(m.id, r)}
                              className="flex w-full items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-muted text-left transition-colors"
                            >
                              <span>{r}</span>
                              {m.role === r && <Check className="h-3 w-3 text-primary" />}
                            </button>
                          ))}
                          <div className="my-1 border-t border-border/60" />
                          <button
                            onClick={() => removeMember(m.id)}
                            className="flex w-full items-center gap-1.5 px-2 py-1.5 text-xs text-destructive rounded hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Remove member</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${roleBadgeStyles[m.role]}`}
                    >
                      {m.role}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeStyles[m.status]}`}
                    >
                      {m.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border/40 bg-muted/10 p-3 sm:px-5 text-center sm:text-left text-[11px] text-muted-foreground">
            <span>Workspace owners maintain non-transferable global authorization.</span>
            <span>Showing {filteredMembers.length} of {members.length} members</span>
          </div>
        </div>

        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Invite Teammate
                  </h4>
                </div>
                <button
                  onClick={() => setIsInviteModalOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleInvite} className="p-4 sm:p-5 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Lee"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 sm:py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 sm:py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Role Privilege
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as Role)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 sm:py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Admin">Admin · Full administrative control</option>
                    <option value="Editor">Editor · Can create & modify contents</option>
                    <option value="Viewer">Viewer · Read-only access</option>
                  </select>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="w-full sm:w-auto rounded-lg border border-border px-3.5 py-2 sm:py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto rounded-lg bg-primary px-3.5 py-2 sm:py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </SettingsPageLayout>
  );
}