<<<<<<< HEAD

=======
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

import { useConversations, type Conversation } from "@/hooks/useConversations";
import { USER } from "@/lib/profile";

<<<<<<< HEAD
// Lucide Icons
import {
  PanelLeft,
  MessageSquare,
  LayoutDashboard,
  Bot,
  Box,
  Store,
  BarChart2,
  History,
  Users,
  Settings,
  Layers,
  GraduationCap,
  Sparkles,
  AudioWaveform,
  Clapperboard,
  Plus,
  Zap,
  ChevronRight,
  ChevronDown,
  X as XIcon,
} from "lucide-react";

import rivinityLogo from "@/assets/Rivinity Logo.png";

type LucideIconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & {
    size?: number | string;
  }
>;

type NavChild = {
  id: string;
  label: string;
  icon: LucideIconType;
  path?: string;
};

type NavItem = {
  id: string;
  label: string;
  icon: LucideIconType;
=======

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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  path?: string;
  badge?: string;
  children?: NavChild[];
};

const menuItems: NavItem[] = [
<<<<<<< HEAD
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "chat",
    label: "Chat",
    icon: MessageSquare,
    path: "/app",
  },
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    path: "/agent-playground",
  },
  {
    id: "knowledge-base",
    label: "Knowledge Base",
    icon: Box,
    path: "/knowledge-base",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: Store,
    path: "/marketplace",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/analytics",
  },
  {
    id: "history",
    label: "History",
    icon: History,
    path: "/history",
  },
];

const productItems: NavItem[] = [
  {
    id: "rivinity-lm",
    label: "RivinityLM",
    icon: GraduationCap,
    path: "/rivinity-lm",
  },
  {
    id: "image-enhancer",
    label: "Image Enhancer",
    icon: Sparkles,
    path: "/image-enhancer",
  },
  {
    id: "audio-lab",
    label: "Audio Lab",
    icon: AudioWaveform,
    path: "/audio-lab",
  },
  {
    id: "app-builder",
    label: "App Builder",
    icon: Layers,
    path: "/app-builder",
  },
  {
    id: "prompt-to-video",
    label: "Prompt to Video",
    icon: Clapperboard,
    path: "/prompt-to-video",
  },
];

const workspaceItems: NavItem[] = [
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  {
    id: "team",
    label: "Team",
    icon: Users,
<<<<<<< HEAD
    path: "/team",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

=======
    children: [
      { id: "team-members", label: "Members", icon: UserPlus },
      { id: "team-roles", label: "Roles & access", icon: ShieldCheck },
      { id: "team-api-keys", label: "API Keys", icon: KeyRound },
    ],
  },
  { id: "settings", label: "Settings", icon: Settings },
];


>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
function findActiveId(pathname: string): string {
  const all: { id: string; path?: string }[] = [
    ...menuItems,
    ...productItems,
<<<<<<< HEAD
    ...workspaceItems,
  ];

  const hit = all.find((n) => n.path && n.path === pathname);

  if (hit) return hit.id;

  if (pathname === "/app" || pathname.startsWith("/chat")) {
    return "chat";
  }

  if (pathname.startsWith("/marketplace")) {
    return "marketplace";
  }

  if (pathname.startsWith("/agent-playground")) {
    return "agents";
  }

  return "chat";
}

type DayGroup = {
  key: string;
  label: string;
  items: Conversation[];
};

function groupConversations(
  conversations: Conversation[],
): DayGroup[] {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);

=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  const startYesterday = new Date(startToday);
  startYesterday.setDate(startYesterday.getDate() - 1);

  const buckets: DayGroup[] = [
<<<<<<< HEAD
    {
      key: "today",
      label: "Today",
      items: [],
    },
    {
      key: "yesterday",
      label: "Yesterday",
      items: [],
    },
    {
      key: "earlier",
      label: "Earlier",
      items: [],
    },
  ];

  for (const c of conversations) {
    const d = new Date(c.updatedAt);

    if (d >= startToday) {
      buckets[0].items.push(c);
    } else if (d >= startYesterday) {
      buckets[1].items.push(c);
    } else {
      buckets[2].items.push(c);
    }
  }

=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  return buckets.filter((b) => b.items.length > 0);
}

function HistoryList({ query }: { query: string }) {
<<<<<<< HEAD
  const {
    conversations,
    activeId,
    selectConversation,
    deleteConversation,
  } = useConversations();

  const navigate = useNavigate();

  const [openGroups, setOpenGroups] = useState<
    Record<string, boolean>
  >({});

  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      q
        ? conversations.filter((c) =>
            c.title.toLowerCase().includes(q),
          )
        : conversations,
    [conversations, q],
  );

  const groups = useMemo(
    () => groupConversations(filtered),
    [filtered],
  );

  const openChat = (id: string) => {
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
    selectConversation(id);
    navigate("/app");
  };

<<<<<<< HEAD
  if (filtered.length === 0) return null;

  const row = (c: Conversation) => {
    const isActive = c.id === activeId;

    return (
      <div
        key={c.id}
        className={`group flex items-center gap-1 pr-1 rounded-xl transition-colors ${
          isActive
            ? "bg-[#FFF4EC] text-[#FF5A1F] font-semibold"
            : "hover:bg-gray-100/80 text-[#374151]"
        }`}
      >
        <button
          onClick={() => openChat(c.id)}
          className="flex-1 min-w-0 text-left px-3 py-1.5 text-[13.5px] truncate cursor-pointer font-medium"
        >
          {c.title}
        </button>

=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteConversation(c.id);
          }}
          aria-label="Delete chat"
<<<<<<< HEAD
          className="w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
        >
          <XIcon className="w-4 h-4" />
=======
          className="w-5 h-5 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 text-muted-foreground/60 hover:text-foreground transition-all cursor-pointer"
        >
          <XIcon className="w-3 h-3" />
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
        </button>
      </div>
    );
  };

<<<<<<< HEAD
  if (q) {
    return (
      <div className="space-y-0.5">
        {filtered.map(row)}
      </div>
    );
  }
=======
  // While searching, show a flat list
  if (q) return <div className="space-y-0.5">{filtered.map(row)}</div>;
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2

  return (
    <div className="space-y-1">
      {groups.map((g) => {
<<<<<<< HEAD
        const isOpen =
          openGroups[g.key] ?? g.key === "today";

        return (
          <div key={g.key}>
            <button
              onClick={() =>
                setOpenGroups((p) => ({
                  ...p,
                  [g.key]: !isOpen,
                }))
              }
              className="w-full flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#4B5563] hover:text-[#1F2937] transition-colors cursor-pointer"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "" : "-rotate-90"
                }`}
              />

              {g.label}
            </button>

            {isOpen && (
              <div className="space-y-0.5">
                {g.items.map(row)}
              </div>
            )}
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
          </div>
        );
      })}
    </div>
  );
}

<<<<<<< HEAD
export const RecentChatsPanel = () => (
  <HistoryList query="" />
=======
/** Kept for compatibility with any page still importing it. */
export const RecentChatsPanel = () => <HistoryList query="" />;

/* ---------- sidebar ---------- */

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="px-2 mb-1.5 text-[10.5px] font-bold uppercase tracking-widest text-muted-foreground/60">
    {children}
  </div>
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
);

export interface CanvasSidebarProps {
  open?: boolean;
<<<<<<< HEAD
  onToggle?: () => void;
=======
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
  onCollapse?: () => void;
  searchQuery?: string;
}

<<<<<<< HEAD
const CanvasSidebar = ({
  open: controlledOpen,
  onToggle,
  onCollapse,
  searchQuery = "",
}: CanvasSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { createNew, conversations } = useConversations();

  const routeActiveId = findActiveId(location.pathname);

  const [selectedId, setSelectedId] =
    useState<string>(routeActiveId);

  const isChatRoute =
    location.pathname === "/app" || selectedId === "chat";

  const [internalOpen, setInternalOpen] =
    useState(true);

  const isOpen =
    controlledOpen !== undefined
      ? controlledOpen
      : internalOpen;

  const [openGroups, setOpenGroups] = useState<
    Record<string, boolean>
  >({
    products: false,
  });

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  /*
   * Sidebar only opens/closes on click.
   * Hover does NOT open the sidebar.
   */
  const handleActionToggle = () => {
    if (onToggle) {
      onToggle();
      return;
    }

    if (onCollapse) {
      onCollapse();
      return;
    }

    setInternalOpen((prev) => !prev);
  };

  /*
   * Collapsed state:
   * Clicking the Rivinity logo opens the sidebar.
   */
  const handleLogoClick = () => {
    if (!isOpen) {
      handleActionToggle();
    }
  };

  const closeOnMobile = () => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      if (onCollapse) {
        onCollapse();
      } else if (onToggle) {
        onToggle();
      } else {
        setInternalOpen(false);
      }
    }
  };

  const newChat = () => {
    setSelectedId("chat");
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
    createNew();
    navigate("/app");
    closeOnMobile();
  };

  const renderNavButton = (item: NavItem) => {
    const Icon = item.icon;
<<<<<<< HEAD

    const isActive = selectedId === item.id;

    const onClick = () => {
      setSelectedId(item.id);

=======
    const hasChildren = !!item.children?.length;
    const isOpen = openGroups[item.id] ?? false;
    const isActive = activeId === item.id && !hasChildren;

    const onClick = () => {
      if (hasChildren) {
        setOpenGroups((p) => ({ ...p, [item.id]: !isOpen }));
        return;
      }
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
      if (item.id === "settings") {
        setSettingsOpen(true);
        return;
      }
<<<<<<< HEAD

=======
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
      if (item.path) {
        navigate(item.path);
        closeOnMobile();
      }
    };

    return (
<<<<<<< HEAD
      <button
        key={item.id}
        onClick={onClick}
        title={!isOpen ? item.label : undefined}
        className={`flex items-center rounded-2xl font-semibold transition-all duration-150 cursor-pointer ${
          isOpen
            ? "w-full px-3.5 py-2.5 gap-3.5 text-[14px]"
            : "w-12 h-12 mx-auto justify-center p-0"
        }`}
        style={{
          background: isActive
            ? "linear-gradient(to right, #FFF2E8, #FFF8F4)"
            : "transparent",
          color: isActive
            ? "#FF5C00"
            : "#1F2937",
        }}
      >
        <Icon
          className={`shrink-0 transition-colors w-[22px] h-[22px] ${
            isActive
              ? "text-[#FF5C00]"
              : "text-[#374151]"
          }`}
          strokeWidth={isActive ? 2.3 : 2.0}
        />

        {isOpen && (
          <span className="truncate flex-1 text-left">
            {item.label}
          </span>
        )}
      </button>
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
    );
  };

  return (
    <>
<<<<<<< HEAD
      <aside
        className={`h-full flex flex-col shrink-0 bg-white border-r border-[#E5E7EB] select-none transition-all duration-300 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isOpen
            ? "w-[305px] px-4 py-5"
            : "w-[80px] py-5 px-2 items-center"
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col w-full">

          {/* Rivinity Logo Header */}
          <div
            className={`flex items-center mb-5 ${
              isOpen
                ? "justify-between px-1"
                : "justify-center"
            }`}
          >
            <button
              type="button"
              onClick={handleLogoClick}
              disabled={isOpen}
              title={
                !isOpen
                  ? "Open sidebar"
                  : undefined
              }
              aria-label={
                !isOpen
                  ? "Open sidebar"
                  : "Rivinity"
              }
              className={`
                flex items-center gap-3
                bg-transparent border-none
                p-0 focus:outline-none
                rounded-xl
                transition-all duration-200
                ${
                  !isOpen
                    ? `
                      w-[52px] h-[52px]
                      justify-center
                      cursor-pointer
                      hover:bg-orange-50
                      hover:scale-[1.04]
                      active:scale-95
                    `
                    : "cursor-default"
                }
              `}
            >
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <img
                  src={rivinityLogo}
                  alt="Rivinity"
                  className="
                    w-12 h-12
                    object-contain
                    select-none
                    shrink-0
                    drop-shadow-[0_2px_4px_rgba(255,90,31,0.22)]
                    transition-transform duration-200
                  "
                  style={{
                    filter:
                      "brightness(0.96) saturate(2.4) hue-rotate(-8deg) contrast(1.1)",
                  }}
                  draggable={false}
                />
              </div>

              {isOpen && (
                <div className="flex flex-col min-w-0 justify-center text-left">
                  <span className="font-extrabold text-[21px] text-[#0F172A] tracking-[-0.03em] leading-tight">
                    Rivinity
                  </span>

                  <span className="text-[10px] text-[#64748B] font-bold tracking-normal mt-0.5 leading-none whitespace-nowrap">
                    Research • Build • Together
                  </span>
                </div>
              )}
            </button>

            {/* PanelLeft Toggle */}
            {isOpen && (
              <button
                type="button"
                onClick={handleActionToggle}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4B5563] hover:text-[#111827] hover:bg-gray-100 transition-colors cursor-pointer shrink-0"
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
              >
                <PanelLeft
                  className="w-5 h-5"
                  strokeWidth={2.0}
                />
              </button>
            )}
          </div>

          {/* New Chat */}
          <div className="mb-4 w-full">
            <button
              onClick={newChat}
              title={!isOpen ? "New Chat" : undefined}
              className={`flex items-center justify-center gap-2 bg-[#FF5C00] hover:bg-[#E05200] text-white font-semibold rounded-2xl shadow-[0_4px_14px_rgba(255,92,0,0.3)] transition-all cursor-pointer ${
                isOpen
                  ? "w-full py-2.5 px-4 text-[14px]"
                  : "w-12 h-12 mx-auto p-0"
              }`}
            >
              <Plus className="w-5 h-5 shrink-0 stroke-[2.4]" />

              {isOpen && (
                <span>New Chat</span>
              )}
            </button>
          </div>

          {/* Chat History */}
          {isOpen &&
            isChatRoute &&
            conversations.length > 0 && (
              <div className="mb-3">
                <span className="px-3 text-[10.5px] font-bold text-[#4B5563] uppercase tracking-widest block mb-1.5">
                  Chats
                </span>

                <HistoryList
                  query={searchQuery}
                />
              </div>
            )}

          {/* Main Navigation */}
          <nav className="flex flex-col gap-1 w-full">
            {menuItems.map(renderNavButton)}
          </nav>

          {/* Products */}
          <div className="mt-3.5 w-full">
            {isOpen ? (
              <div>
                <button
                  onClick={() =>
                    setOpenGroups((p) => ({
                      ...p,
                      products: !p.products,
                    }))
                  }
                  className="w-full flex items-center justify-between px-3 mb-1 text-[10.5px] font-bold text-[#4B5563] uppercase tracking-widest hover:text-[#1F2937] transition-colors cursor-pointer"
                >
                  <span>Products</span>

                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openGroups.products
                        ? ""
                        : "-rotate-90"
                    }`}
                  />
                </button>

                {openGroups.products && (
                  <nav className="flex flex-col gap-1 w-full">
                    {productItems.map(
                      renderNavButton,
                    )}
                  </nav>
                )}
              </div>
            ) : (
              <nav className="flex flex-col gap-1 w-full">
                {productItems.map(
                  renderNavButton,
                )}
              </nav>
            )}
          </div>

          {/* Workspace */}
          <div className="mt-3.5 w-full">
            {isOpen && (
              <span className="px-3 text-[10.5px] font-bold text-[#4B5563] uppercase tracking-widest block mb-1">
                Workspace
              </span>
            )}

            <nav className="flex flex-col gap-1 w-full">
              {workspaceItems.map(
                renderNavButton,
              )}
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-2 pt-2 mt-2 w-full border-t border-[#E5E7EB]">

            {/* Upgrade to Pro */}
            {isOpen ? (
              <div
                className="relative bg-gradient-to-r from-[#FFF5ED] via-[#FFF8F2] to-[#FFF5ED] border border-[#FEE6D8] rounded-2xl pl-2.5 pr-6 py-2 flex items-center cursor-pointer hover:border-[#FDCBAF] transition-all w-full"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs border border-[#FFE1D0]">
                    <Zap className="w-4 h-4 text-[#FF5C00] fill-[#FF5C00]" />
                  </div>

                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[13px] font-bold text-[#FF5C00] leading-tight">
                      Upgrade to Pro
                    </span>

                    <span className="text-[10px] text-[#4B5563] font-semibold leading-tight mt-0.5 whitespace-nowrap">
                      More power. Greater possibilities.
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#FF7043] shrink-0 absolute right-2.5 top-1/2 -translate-y-1/2" />
              </div>
            ) : (
              <div
                className="w-12 h-12 mx-auto rounded-xl bg-[#FFF5ED] border border-[#FEE6D8] flex items-center justify-center text-[#FF5C00] hover:bg-[#FFEADA] transition-colors cursor-pointer"
                title="Upgrade to Pro"
              >
                <Zap className="w-5 h-5 fill-[#FF5C00]" />
              </div>
            )}

            {/* User Profile */}
            {isOpen ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl px-2.5 py-2 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#FF5C00] text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                    {USER.initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[12.5px] font-bold text-[#111827] truncate leading-tight">
                      {USER.name}
                    </span>

                    <span className="text-[11px] text-[#4B5563] font-semibold truncate leading-tight mt-0.5">
                      {USER.plan ||
                        "Pro Workspace"}
                    </span>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-[#4B5563] shrink-0 ml-1" />
              </div>
            ) : (
              <div
                className="w-9 h-9 mx-auto rounded-full bg-[#FF5C00] text-white flex items-center justify-center text-[11px] font-bold"
                title={`${USER.name} (${
                  USER.plan ||
                  "Pro Workspace"
                })`}
              >
                {USER.initials}
              </div>
            )}
=======
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
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
          </div>
        </div>
      </aside>

<<<<<<< HEAD
      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
=======
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2
    </>
  );
};

<<<<<<< HEAD
export default CanvasSidebar;
=======
export default CanvasSidebar;
>>>>>>> 340ab9aefea4281b639b7db1d5362b97991789b2

