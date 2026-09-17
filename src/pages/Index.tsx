import React, { useState, useRef, useEffect } from "react";
import {
  PanelLeft,
  X,
  Moon,
  ChevronDown,
  Search,
  Bell,
  Share,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";

import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasMain from "@/components/canvas/CanvasMain";
import { USER } from "@/lib/profile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile, sidebar component handles desktop layout state
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [isBigDataActive, setIsBigDataActive] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  useEffect(() => {
    const handleChatEvent = (e: Event) => {
      const ce = e as CustomEvent<{
        isStarted?: boolean;
        isSplit?: boolean;
      }>;
      if (typeof ce.detail?.isSplit === "boolean") {
        setIsBigDataActive(ce.detail.isSplit);
      }
      if (typeof ce.detail?.isStarted === "boolean") {
        setIsChatActive(ce.detail.isStarted);
      }
    };

    const checkStatus = () => {
      const isDashboardPresent =
        document.querySelector("[data-split-view='true']") !== null ||
        document.body.innerText.includes("D&I Department Feasibility Analysis");

      setIsBigDataActive(Boolean(isDashboardPresent));

      const hasChatMessages =
        document.querySelector(".break-words") !== null ||
        document.querySelector("[title='Regenerate']") !== null;

      setIsChatActive(Boolean(hasChatMessages));
    };

    window.addEventListener("chat-state-change", handleChatEvent);

    const observer = new MutationObserver(checkStatus);
    observer.observe(document.body, { childList: true, subtree: true });

    checkStatus();

    return () => {
      window.removeEventListener("chat-state-change", handleChatEvent);
      observer.disconnect();
    };
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Rivinity AI Chat",
          text: "Check out this conversation on Rivinity AI",
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Chat link copied to clipboard!");
    }
  };

  const sidebarWidth = sidebarOpen ? 340 : 88;

  // Exact Original Profile Pill
  const profilePill = (
    <div className="flex h-[40px] sm:h-[46px] shrink-0 cursor-pointer items-center gap-2 sm:gap-3 rounded-full border border-gray-200/80 bg-white pl-1.5 pr-2.5 sm:pr-4 shadow-xs transition-colors hover:bg-gray-50/85 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800">
      <div className="flex h-7 w-7 sm:h-9 sm:w-9 min-w-[28px] sm:min-w-[36px] min-h-[28px] sm:min-h-[36px] shrink-0 items-center justify-center rounded-full bg-[#FF5500] text-[11px] sm:text-[13px] font-bold text-white shadow-xs">
        {USER.initials}
      </div>

      <div className="hidden text-left leading-none md:block">
        <p className="text-[14.5px] font-semibold text-[#1C1C1C] dark:text-white truncate max-w-[110px] xl:max-w-none">
          {USER.name}
        </p>
        <p className="text-[12px] font-normal text-gray-500 dark:text-gray-400 mt-1">
          {USER.plan || "Pro Workspace"}
        </p>
      </div>

      <ChevronDown
        className="hidden h-4.5 w-4.5 shrink-0 text-gray-500 dark:text-zinc-400 md:block ml-0.5"
        strokeWidth={2}
      />
    </div>
  );

  return (
    <div className="h-screen h-[100dvh] w-full overflow-hidden bg-background">
      <div className="relative flex h-full w-full overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar wrapper */}
        <div
          className={`fixed inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out md:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
          style={{ width: `${sidebarWidth}px` }}
        >
          <CanvasSidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen((value) => !value)}
            onCollapse={() => setSidebarOpen(false)}
            searchQuery={searchQuery}
          />
        </div>

        {/* Main Content Area */}
        <div className="relative flex min-w-0 flex-1 flex-col h-full overflow-hidden">
          {/* Header */}
          {!isBigDataActive && (
            <header className="relative flex h-[64px] sm:h-[72px] shrink-0 items-center justify-between px-3 sm:px-6 md:px-8 bg-transparent z-10 select-none gap-2">
              <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
                {/* Mobile sidebar toggle */}
                <button
                  type="button"
                  onClick={() => setSidebarOpen((value) => !value)}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/5 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-900 md:hidden"
                  aria-label="Toggle sidebar"
                >
                  <PanelLeft className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                </button>

                {/* Desktop search */}
                <div className="hidden sm:flex items-center">
                  <div
                    className={`group relative flex items-center overflow-hidden rounded-full transition-all duration-300 ease-out ${
                      searchQuery ? "w-[380px]" : "w-11 hover:w-[380px] focus-within:w-[380px]"
                    }`}
                  >
                    <Search className="pointer-events-none absolute left-3.5 z-10 h-5 w-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search chats, tools, agents..."
                      className="h-11 w-full cursor-pointer rounded-full border border-transparent bg-transparent pl-11 pr-10 text-[15px] text-[#1C1C1C] outline-none placeholder:text-gray-400 hover:border-gray-200/80 hover:bg-white/70 focus:cursor-text focus:border-gray-200 focus:bg-white focus:shadow-xs dark:text-white dark:placeholder:text-zinc-500 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/70 dark:focus:border-zinc-700 dark:focus:bg-zinc-900 transition-all duration-200"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 z-10 flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Mobile search toggle trigger */}
                <div className="flex items-center sm:hidden">
                  {!isMobileSearchOpen ? (
                    <button
                      type="button"
                      onClick={() => setIsMobileSearchOpen(true)}
                      className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#1C1C1C] dark:text-zinc-200"
                      aria-label="Open search"
                    >
                      <Search className="h-5 w-5" strokeWidth={2} />
                    </button>
                  ) : (
                    <div className="absolute inset-x-2 top-2.5 z-30 flex items-center rounded-full border border-black/10 bg-white px-3.5 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                      <Search className="mr-2.5 h-4.5 w-4.5 shrink-0 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={2} />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search chats..."
                        className="w-full bg-transparent text-[14px] text-[#1C1C1C] outline-none dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("");
                          setIsMobileSearchOpen(false);
                        }}
                        className="cursor-pointer p-1 text-gray-500 hover:text-gray-800 dark:text-zinc-400"
                        aria-label="Close search"
                      >
                        <X className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Controls */}
              <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3">
                <button
                  type="button"
                  className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/70 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  aria-label="Notifications"
                >
                  <Bell className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={1.9} />
                  <span className="absolute right-2 top-2 sm:right-2.5 sm:top-2.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#FF5500]" />
                </button>

                <button
                  type="button"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-200/70 bg-white shadow-xs transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                  aria-label="Toggle theme"
                >
                  <Moon className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#1C1C1C] dark:text-zinc-200" strokeWidth={1.9} />
                </button>

                {!isChatActive ? (
                  profilePill
                ) : (
                  <div className="flex items-center gap-1 transition-all duration-200">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-full text-[#1C1C1C] hover:bg-black/5 dark:text-zinc-100 dark:hover:bg-white/10 text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer"
                    >
                      <Share className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} />
                      <span className="hidden xs:inline">Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toast("More options")}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 hover:bg-black/5 dark:text-zinc-300 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      aria-label="More options"
                    >
                      <MoreHorizontal className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
                    </button>
                  </div>
                )}
              </div>
            </header>
          )}

          {/* Main Chat/Canvas View */}
          <CanvasMain 
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
            isSidebarOpen={sidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;