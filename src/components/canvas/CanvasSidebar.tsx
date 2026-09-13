
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

function groupConversations(
  conversations: Conversation[],
): DayGroup[] {
  const startToday = new Date();
  startToday.setHours(0, 0, 0, 0);

  const startYesterday = new Date(startToday);
  startYesterday.setDate(startYesterday.getDate() - 1);

  const buckets: DayGroup[] = [
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

  return buckets.filter((b) => b.items.length > 0);
}

function HistoryList({ query }: { query: string }) {
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
    selectConversation(id);
    navigate("/app");
  };

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

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteConversation(c.id);
          }}
          aria-label="Delete chat"
          className="w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-700 transition-all cursor-pointer"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    );
  };

  if (q) {
    return (
      <div className="space-y-0.5">
        {filtered.map(row)}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {groups.map((g) => {
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
          </div>
        );
      })}
    </div>
  );
}

export const RecentChatsPanel = () => (
  <HistoryList query="" />
);

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
    );
  };

  return (
    <>
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
          </div>
        </div>
      </aside>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </>
  );
};

export default CanvasSidebar;
