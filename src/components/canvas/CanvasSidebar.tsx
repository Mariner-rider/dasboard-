import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

import { useConversations, type Conversation } from "@/hooks/useConversations";
import { USER } from "@/lib/profile";

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
  path?: string;
  badge?: string;
  children?: NavChild[];
};

const menuItems: NavItem[] = [
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
  {
    id: "team",
    label: "Team",
    icon: Users,
    path: "/team",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

function findActiveId(pathname: string): string {
  const all: { id: string; path?: string }[] = [
    ...menuItems,
    ...productItems,
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
    if (d >= startToday) {
      buckets[0].items.push(c);
    } else if (d >= startYesterday) {
      buckets[1].items.push(c);
    } else {
      buckets[2].items.push(c);
    }
  }

  return buckets.filter((b) => b.items.length > 0);
}

function HistoryList({ query }: { query: string }) {
  const { conversations, activeId, selectConversation, deleteConversation } =
    useConversations();
  const navigate = useNavigate();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      q
        ? conversations.filter((c) => c.title.toLowerCase().includes(q))
        : conversations,
    [conversations, q]
  );

  const groups = useMemo(() => groupConversations(filtered), [filtered]);

  const openChat = (id: string) => {
    selectConversation(id);
    navigate("/app");
  };

  if (filtered.length === 0) return null;

  const row = (c: Conversation) => {
    const isActive = c.id === activeId;
    return (
      <div
        key={c.id}
        className={`group flex items-center gap-1 pr-1.5 rounded-xl transition-colors ${
          isActive
            ? "bg-[#FFF4EC] dark:bg-orange-950/30 text-[#FF5500] font-semibold"
            : "hover:bg-gray-100/80 dark:hover:bg-zinc-800 text-[#374151] dark:text-zinc-300"
        }`}
      >
        <button
          onClick={() => openChat(c.id)}
          className="flex-1 min-w-0 text-left px-3 py-1.5 text-[15px] truncate cursor-pointer font-medium"
        >
          {c.title}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteConversation(c.id);
          }}
          aria-label="Delete chat"
          className="w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 dark:hover:text-zinc-200 transition-all cursor-pointer"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (q) {
    return <div className="space-y-1">{filtered.map(row)}</div>;
  }

  return (
    <div className="space-y-1.5">
      {groups.map((g) => {
        const isOpen = openGroups[g.key] ?? g.key === "today";
        return (
          <div key={g.key}>
            <button
              onClick={() =>
                setOpenGroups((p) => ({ ...p, [g.key]: !isOpen }))
              }
              className="w-full flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-zinc-400 hover:text-[#1F2937] dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "" : "-rotate-90"
                }`}
              />
              {g.label}
            </button>
            {isOpen && <div className="space-y-1 mt-0.5">{g.items.map(row)}</div>}
          </div>
        );
      })}
    </div>
  );
}

export const RecentChatsPanel = () => <HistoryList query="" />;

export interface CanvasSidebarProps {
  open?: boolean;
  onToggle?: () => void;
  onCollapse?: () => void;
  searchQuery?: string;
}

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

  const [selectedId, setSelectedId] = useState<string>(routeActiveId);
  const isChatRoute = location.pathname === "/app" || selectedId === "chat";

  const [internalOpen, setInternalOpen] = useState(true);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    products: true,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

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

  const handleLogoClick = () => {
    if (!isOpen) {
      handleActionToggle();
    }
  };

  const closeOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
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
    createNew();
    navigate("/app");
    closeOnMobile();
  };

  const renderNavButton = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = selectedId === item.id;

    const onClick = () => {
      setSelectedId(item.id);
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
      <button
        key={item.id}
        onClick={onClick}
        title={!isOpen ? item.label : undefined}
        className={`flex items-center rounded-xl font-medium transition-all duration-150 cursor-pointer ${
          isOpen
            ? "w-full px-4 py-3 gap-3.5 text-[16px]"
            : "w-12 h-12 mx-auto justify-center p-0"
        } ${
          isActive
            ? "bg-[#FFF4EC] dark:bg-orange-950/30 text-[#FF5500] font-semibold"
            : "text-[#374151] dark:text-zinc-300 hover:bg-gray-100/70 dark:hover:bg-zinc-800 hover:text-[#111827] dark:hover:text-white"
        }`}
        style={{ fontSize: isOpen ? "16px" : undefined }}
      >
        <Icon
          className={`shrink-0 transition-colors w-[22px] h-[22px] ${
            isActive ? "text-[#FF5500]" : "text-[#4B5563] dark:text-zinc-400"
          }`}
          strokeWidth={isActive ? 2.2 : 1.9}
        />
        {isOpen && (
          <span className="truncate flex-1 text-left font-medium">
            {item.label}
          </span>
        )}
      </button>
    );
  };

  return (
    <>
      <aside
        className={`sticky top-0 h-screen max-h-screen flex flex-col shrink-0 bg-white dark:bg-zinc-900 border-r border-[#E5E7EB] dark:border-zinc-800 select-none transition-all duration-300 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] z-30 ${
          isOpen ? "w-[340px] px-5 py-5" : "w-[88px] py-4 px-2 items-center"
        }`}
        style={{ width: isOpen ? "340px" : "88px" }}
      >
        <div className="flex flex-col justify-between min-h-full w-full">
          {/* Main Top + Navigation Section */}
          <div className="flex flex-col w-full flex-1">
            {/* Logo Header */}
            <div
              className={`mb-6 pt-1 ${
                isOpen ? "px-0.5" : "flex justify-center"
              }`}
            >
              {!isOpen ? (
                <div
                  onClick={handleLogoClick}
                  className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-orange-50 rounded-xl transition-all duration-200 select-none"
                  role="button"
                  tabIndex={0}
                >
                  <div
                    className="relative shrink-0 flex items-center justify-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <img
                      src={rivinityLogo}
                      onError={(e) => {
                        e.currentTarget.src = "/watermark.png";
                      }}
                      alt="Rivinity"
                      className="w-[40px] h-[40px] object-contain select-none shrink-0 drop-shadow-[0_2px_8px_rgba(255,90,31,0.25)]"
                      draggable={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col min-w-0 w-full text-left">
                  <div className="flex items-center justify-between w-full h-[40px]">
                    <div className="flex items-center gap-2.5 h-[40px]">
                      <div className="relative shrink-0 flex items-center justify-center w-[40px] h-[40px]">
                        <img
                          src={rivinityLogo}
                          onError={(e) => {
                            e.currentTarget.src = "/watermark.png";
                          }}
                          alt="Rivinity"
                          className="w-[40px] h-[40px] object-contain select-none shrink-0 drop-shadow-[0_2px_8px_rgba(255,90,31,0.25)]"
                          draggable={false}
                        />
                      </div>
                      <span
                        className="font-black text-[#0F172A] dark:text-white tracking-tight leading-none flex items-center"
                        style={{ fontSize: "36px", height: "40px" }}
                      >
                        Rivinity
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleActionToggle}
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-[#4B5563] dark:text-zinc-400 hover:text-[#111827] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                      aria-label="Collapse sidebar"
                      title="Collapse sidebar"
                    >
                      <PanelLeft className="w-5.5 h-5.5" strokeWidth={2} />
                    </button>
                  </div>

                  <span
                    className="text-[#64748B] dark:text-zinc-400 font-semibold tracking-normal mt-1.5 leading-none whitespace-nowrap pl-0.5"
                    style={{ fontSize: "12.5px" }}
                  >
                    Research • Build • Together
                  </span>
                </div>
              )}
            </div>

            {/* New Chat Button */}
            <div className="mb-5 w-full">
              <button
                onClick={newChat}
                title={!isOpen ? "New Chat" : undefined}
                className={`flex items-center justify-center gap-2.5 bg-[#FF5500] hover:bg-[#E64D00] text-white font-semibold rounded-xl shadow-xs transition-all cursor-pointer ${
                  isOpen ? "w-full h-12 px-4" : "w-12 h-12 mx-auto p-0"
                }`}
                style={{ fontSize: isOpen ? "16px" : undefined }}
              >
                <Plus className="w-4.5 h-4.5 stroke-[2.2]" />
                {isOpen && <span>New Chat</span>}
              </button>
            </div>

            {/* Chat History */}
            {isOpen && isChatRoute && conversations.length > 0 && (
              <div className="mb-3.5">
                <span className="px-3.5 text-[12px] font-bold text-[#6B7280] dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                  Chats
                </span>
                <HistoryList query={searchQuery} />
              </div>
            )}

            {/* Navigation Groups Container */}
            <div className="flex flex-col gap-4 flex-1 w-full">
              {/* Main Menu */}
              <nav className="flex flex-col gap-1 w-full">
                {menuItems.map(renderNavButton)}
              </nav>

              {/* PRODUCTS */}
              <div className="w-full">
                {isOpen && (
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((p) => ({ ...p, products: !p.products }))
                    }
                    className="w-full flex items-center justify-between px-3.5 py-1.5 text-[12px] font-bold text-[#6B7280] dark:text-zinc-400 uppercase tracking-wider hover:text-gray-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <span>Products</span>
                    <ChevronRight
                      className={`w-4.5 h-4.5 transition-transform duration-200 ${
                        openGroups.products ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                )}
                {isOpen && openGroups.products && (
                  <nav className="flex flex-col gap-1 w-full mt-1">
                    {productItems.map(renderNavButton)}
                  </nav>
                )}
              </div>

              {/* WORKSPACE */}
              <div className="w-full">
                {isOpen && (
                  <span className="px-3.5 text-[12px] font-bold text-[#6B7280] dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Workspace
                  </span>
                )}
                <nav className="flex flex-col gap-1 w-full">
                  {workspaceItems.map(renderNavButton)}
                </nav>
              </div>
            </div>
          </div>

          {/* Bottom Section - Badges */}
          <div className="flex flex-col gap-3 pt-3.5 mt-auto w-full shrink-0">
            {/* Upgrade to Pro */}
            {isOpen ? (
              <div className="bg-[#FFF5ED] dark:bg-orange-950/20 border border-[#FEE6D8] dark:border-orange-900/30 rounded-xl px-3.5 py-3 flex items-center justify-between cursor-pointer hover:border-[#FDCBAF] transition-all w-full shadow-xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-[#FFE1D0] dark:border-orange-900/40 shadow-xs">
                    <Zap className="w-6 h-6 text-[#FF5500] fill-[#FF5500]" />
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[15px] font-bold text-[#FF5500] leading-tight">
                      Upgrade to Pro
                    </span>
                    <span className="text-[12px] text-[#6B7280] dark:text-zinc-400 font-medium leading-tight mt-1">
                      More power & possibilities
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#FF7043] shrink-0 ml-1" />
              </div>
            ) : (
              <div
                className="w-12 h-12 mx-auto rounded-xl bg-[#FFF5ED] dark:bg-orange-950/30 border border-[#FEE6D8] dark:border-orange-900/40 flex items-center justify-center text-[#FF5500] hover:bg-[#FFEADA] transition-colors cursor-pointer"
                title="Upgrade to Pro"
              >
                <Zap className="w-6 h-6 fill-[#FF5500]" />
              </div>
            )}

            {/* User Profile */}
            {isOpen ? (
              <div className="bg-white dark:bg-zinc-900 border border-[#E5E7EB] dark:border-zinc-800 rounded-xl px-3.5 py-3 flex items-center justify-between shadow-xs hover:bg-gray-50/70 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-[#FF5500] text-white flex items-center justify-center text-[15px] font-bold shrink-0 shadow-xs">
                    {USER.initials}
                  </div>
                  <div className="flex flex-col min-w-0 text-left">
                    <span className="text-[15.5px] font-bold text-[#111827] dark:text-white truncate leading-tight">
                      {USER.name}
                    </span>
                    <span className="text-[12px] text-[#6B7280] dark:text-zinc-400 font-medium truncate leading-tight mt-1">
                      {USER.plan || "Pro Workspace"}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4.5 h-4.5 text-[#9CA3AF] dark:text-zinc-400 shrink-0 ml-1" />
              </div>
            ) : (
              <div
                className="w-12 h-12 mx-auto rounded-full bg-[#FF5500] text-white flex items-center justify-center text-[15px] font-bold shadow-xs cursor-pointer"
                title={`${USER.name} (${USER.plan || "Pro Workspace"})`}
              >
                {USER.initials}
              </div>
            )}
          </div>
        </div>
      </aside>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </>
  );
};

export default CanvasSidebar;