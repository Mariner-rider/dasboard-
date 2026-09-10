import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

import { useConversations, type Conversation } from "@/hooks/useConversations";
import { USER } from "@/lib/profile";


import rivinityLogo from "@/assets/rivinity-logo.png.asset.json";
import {
  LayoutGrid, MessageSquare, BarChart3, History, Store, Wallet, Users, Settings,
  PanelLeft, ChevronDown, KeyRound, UserPlus, ShieldCheck, Moon, Sun, Layers,
  GraduationCap, Sparkles, AudioWaveform, Bot, Clapperboard, Globe, Database,
  Image as ImageIcon, Layout, Plus, X as XIcon,
} from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;

type NavChild = { id: string; label: string; icon: IconType; path?: string };
type NavItem = {
  id: string;
  label: string;
  icon: IconType;
  path?: string;
  badge?: string;
  children?: NavChild[];
};

const menuItems: NavItem[] = [
  { id: "chat", label: "Chat", icon: MessageSquare, path: "/app" },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { id: "agents", label: "Agents", icon: Bot, path: "/agent-playground" },
  { id: "website", label: "Website", icon: Globe, path: "/" },
  { id: "analytics", label: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "marketplace", label: "Marketplace", icon: Store, path: "/marketplace" },
  { id: "history", label: "History", icon: History, path: "/history" },
];

const productItems: NavItem[] = [
  { id: "rivinity-lm", label: "RivinityLM", icon: GraduationCap, path: "/rivinity-lm" },
  { id: "image-enhancer", label: "Image Enhancer", icon: Sparkles, path: "/image-enhancer" },
  { id: "audio-lab", label: "Audio Lab", icon: AudioWaveform, path: "/audio-lab" },
  { id: "app-builder", label: "App Builder", icon: Layers, path: "/app-builder" },
  { id: "prompt-to-video", label: "Prompt to Video", icon: Clapperboard, path: "/prompt-to-video" },
];

const managementItems: NavItem[] = [
  { id: "earnings", label: "Earnings & Billing", icon: Wallet, path: "/earnings" },
  {
    id: "team",
    label: "Team",
    icon: Users,
    children: [
      { id: "team-members", label: "Members", icon: UserPlus },
      { id: "team-roles", label: "Roles & access", icon: ShieldCheck },
      { id: "team-api-keys", label: "API Keys", icon: KeyRound },
    ],
  },
  { id: "settings", label: "Settings", icon: Settings },
];


function findActiveId(pathname: string): string {
  const all: { id: string; path?: string }[] = [
    ...menuItems,
    ...productItems,
    ...managementItems,
    ...managementItems.flatMap((i) => i.children ?? []),
  ];
  const hit = all.find((n) => n.path && n.path === pathname);
  if (hit) return hit.id;
  if (pathname.startsWith("/marketplace")) return "marketplace";
  if (pathname.startsWith("/agent-playground")) return "agents";
  return "";
}

/* ---------- grouped chat history ---------- */

type DayGroup = { key: string; label: string; items: Conversation[] };

function groupConversations(conversations: Conversation[]): DayGroup[] {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);
  const startYesterday = new Date(startToday);
  startYesterday.setDate(startYesterday.getDate() - 1);

  const buckets: DayGroup[] = [
    { key: "today", label: "Today", items: [] },
    { key: "yesterday", label: "Yesterday", items: [] },
    { key: "earlier", label: "Earlier", items: [] },
  ];
  for (const c of conversations) {
    const d = new Date(c.updatedAt);
    if (d >= startToday) buckets[0].items.push(c);
    else if (d >= startYesterday) buckets[1].items.push(c);
    else buckets[2].items.push(c);
  }
  return buckets.filter((b) => b.items.length > 0);
}

function HistoryList({ query }: { query: string }) {
  const { conversations, activeId, selectConversation, deleteConversation } = useConversations();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => (q ? conversations.filter((c) => c.title.toLowerCase().includes(q)) : conversations),
    [conversations, q],
  );
  const groups = useMemo(() => groupConversations(filtered), [filtered]);

  const open = (id: string) => {
    selectConversation(id);
    navigate("/app");
  };

  if (filtered.length === 0) {
    return (
      <div className="px-2.5 py-3 text-[11px] text-muted-foreground/60 leading-relaxed rounded-xl border border-glass bg-muted/30">
        {q ? "No chats match your search." : "No chats yet — start a new conversation."}
      </div>
    );
  }

  const row = (c: Conversation) => {
    const isActive = c.id === activeId;
    return (
      <div
        key={c.id}
        className={`group flex items-center gap-1 pr-1 rounded-lg transition-colors ${
          isActive ? "bg-accent text-foreground" : "hover:bg-muted/50"
        }`}
      >
        <button
          onClick={() => open(c.id)}
          className={`flex-1 min-w-0 text-left px-2 py-1.5 rounded-lg text-[12.5px] truncate ${
            isActive ? "font-semibold text-foreground" : "text-muted-foreground/80"
          }`}
        >
          {c.title}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteConversation(c.id);
          }}
          aria-label="Delete chat"
          className="w-5 h-5 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground/60 hover:text-foreground transition-all cursor-pointer"
        >
          <XIcon className="w-3 h-3" />
        </button>
      </div>
    );
  };

  // While searching, show a flat list
  if (q) return <div className="space-y-0.5">{filtered.map(row)}</div>;

  return (
    <div className="space-y-1">
      {groups.map((g) => {
        const isOpen = openGroups[g.key] ?? g.key === "today";
        return (
          <div key={g.key}>
            <button
              onClick={() => setOpenGroups((p) => ({ ...p, [g.key]: !isOpen }))}
              className="w-full flex items-center gap-1 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-widest text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              {g.label}
            </button>
            {isOpen && <div className="space-y-0.5">{g.items.map(row)}</div>}
          </div>
        );
      })}
    </div>
  );
}

/** Kept for compatibility with any page still importing it. */
export const RecentChatsPanel = () => <HistoryList query="" />;

/* ---------- sidebar ---------- */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-2 mb-1.5 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground/60">
    {children}
  </div>
);

export interface CanvasSidebarProps {
  open?: boolean;
  onCollapse?: () => void;
  searchQuery?: string;
}

const CanvasSidebar = ({ open = true, onCollapse, searchQuery = "" }: CanvasSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversations, createNew } = useConversations();
  const activeId = findActiveId(location.pathname);
  const isChatRoute = location.pathname === "/app";

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    team: false,
    products: false,
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark"),
  );

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && onCollapse) onCollapse();
  };

  const newChat = () => {
    createNew();
    navigate("/app");
    closeOnMobile();
  };

  const renderNavButton = (item: NavItem) => {
    const Icon = item.icon;
    const hasChildren = !!item.children?.length;
    const isOpen = openGroups[item.id] ?? false;
    const isActive = activeId === item.id && !hasChildren;

    const onClick = () => {
      if (hasChildren) {
        setOpenGroups((p) => ({ ...p, [item.id]: !isOpen }));
        return;
      }
      if (item.id === "settings") {
        setSettingsOpen(true);
        return;
      }
      if (item.path) {
        navigate(item.path);
        closeOnMobile();
      }
    };

    return (
      <div key={item.id}>
        <button
          onClick={onClick}
          className={`w-full h-9 px-3 rounded-xl flex items-center gap-3 text-[13px] font-medium transition-all duration-150 cursor-pointer border ${
            isActive
              ? "bg-accent text-foreground font-semibold border-primary/20"
              : "text-muted-foreground/80 hover:text-foreground hover:bg-muted/50 border-transparent"
          }`}
        >
          <Icon
            className={`w-[17px] h-[17px] shrink-0 ${isActive ? "text-primary" : "text-muted-foreground/60"}`}
            strokeWidth={1.8}
          />
          <span className="truncate flex-1 text-left">{item.label}</span>
          {item.badge && (
            <span className="text-[10px] font-semibold text-muted-foreground/50">{item.badge}</span>
          )}
          {hasChildren && (
            <ChevronDown
              className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform ${isOpen ? "" : "-rotate-90"}`}
              strokeWidth={1.8}
            />
          )}
        </button>

        {hasChildren && (
          <div
            className={`overflow-hidden transition-all duration-200 ${
              isOpen ? "max-h-[400px] opacity-100 mt-0.5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-3 pl-3 border-l border-glass space-y-0.5 py-1">
              {item.children!.map((child) => {
                const CIcon = child.icon;
                const childActive = activeId === child.id;
                return (
                  <button
                    key={child.id}
                    onClick={() => {
                      if (child.path) navigate(child.path);
                      closeOnMobile();
                    }}
                    className={`w-full h-8 px-2.5 rounded-lg flex items-center gap-2.5 text-[12.5px] font-medium transition-colors cursor-pointer ${
                      childActive
                        ? "bg-accent text-foreground font-semibold"
                        : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <CIcon className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60" strokeWidth={1.8} />
                    <span className="truncate flex-1 text-left">{child.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderGroup = (groupId: string, label: string, items: NavItem[]) => {
    const isOpen = openGroups[groupId] ?? false;
    return (
      <div>
        <button
          onClick={() => setOpenGroups((p) => ({ ...p, [groupId]: !isOpen }))}
          className="w-full h-8 px-2 rounded-lg flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
        >
          <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
          {label}
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-0.5 pt-1">{items.map(renderNavButton)}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={onCollapse}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-[288px] h-full flex flex-col bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-r border-glass shrink-0 select-none transition-transform duration-300 ease-in-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="px-4 py-3.5 flex items-center justify-between">
          <img
            src={rivinityLogo.url}
            alt="Rivinity"
            className="h-7 w-auto object-contain select-none"
            draggable={false}
          />
          <button
            onClick={onCollapse}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
            aria-label="Collapse sidebar"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat CTA */}
        <div className="px-3">
          <button
            onClick={newChat}
            className="w-full h-10 rounded-2xl gradient-accent text-primary-foreground text-[13px] font-semibold flex items-center justify-center gap-2 press shadow-glow-accent hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Plus className="w-4 h-4" strokeWidth={2.2} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* Chat history — chat page only */}
          {isChatRoute && (
            <section>
              <SectionLabel>Chats</SectionLabel>
              <HistoryList query={searchQuery} />
            </section>
          )}

          <section>
            <SectionLabel>Menu</SectionLabel>
            <nav className="space-y-0.5">
              {menuItems.map((it) =>
                renderNavButton(it.id === "chat" ? { ...it, badge: String(conversations.length) } : it),
              )}
            </nav>
          </section>

          <section>{renderGroup("products", "Products", productItems)}</section>

          <section>
            <SectionLabel>Management</SectionLabel>
            <nav className="space-y-0.5">{managementItems.map(renderNavButton)}</nav>
          </section>
        </div>

        {/* Bottom: upgrade card + user */}
        <div className="p-3 border-t border-glass space-y-2 shrink-0">
          <button
            onClick={() => navigate("/settings/api-keys")}
            className="w-full rounded-2xl gradient-accent p-3 flex items-center gap-2.5 text-left press hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-[12.5px] font-semibold text-primary-foreground leading-tight">
                Upgrade to Pro
              </p>
              <p className="text-[10.5px] text-primary-foreground/80 leading-tight">
                Every model, every tool, priority routing.
              </p>
            </div>
          </button>

          <div className="flex items-center justify-between p-2 rounded-2xl bg-muted/40 border border-glass">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
                {USER.initials}
              </div>
              <div className="min-w-0">
                <p className="text-[12.5px] font-bold text-foreground truncate leading-tight">
                  {USER.name}
                </p>
                <p className="text-[10px] font-semibold text-primary leading-tight">{USER.plan}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-background transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export default CanvasSidebar;