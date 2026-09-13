
import { useState, useRef, useEffect } from "react";
import {
  PanelLeft,
  X,
  Moon,
  ChevronDown,
  Search,
  Bell,
} from "lucide-react";

import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasMain from "@/components/canvas/CanvasMain";
import { USER } from "@/lib/profile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isMobileSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isMobileSearchOpen]);

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <div className="relative flex h-full w-full overflow-hidden">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 h-full shrink-0 overflow-hidden transition-all duration-300 ease-in-out md:static ${
            sidebarOpen
              ? "w-[310px] translate-x-0"
              : "-translate-x-full md:w-[68px] md:translate-x-0"
          }`}
        >
          <CanvasSidebar
            open={sidebarOpen}
            onToggle={() => setSidebarOpen((value) => !value)}
            onCollapse={() => setSidebarOpen(false)}
            searchQuery={searchQuery}
          />
        </div>

        {/* Main content */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="relative flex h-16 shrink-0 items-center justify-between gap-3 bg-transparent px-4 sm:h-20 sm:px-8">
            {/* Left section */}
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              {/* Mobile sidebar button */}
              <button
                type="button"
                onClick={() => setSidebarOpen((value) => !value)}
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 md:hidden"
                aria-label="Toggle sidebar"
              >
                <PanelLeft
                  className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                  strokeWidth={2}
                />
              </button>

              {/* Desktop / tablet search */}
              <div className="hidden w-full max-w-[420px] items-center sm:flex">
                <div
                  className={`relative flex items-center transition-all duration-300 ease-out ${
                    searchQuery
                      ? "w-[340px]"
                      : "w-11 hover:w-[340px] focus-within:w-[340px]"
                  }`}
                >
                  <Search
                    className="pointer-events-none absolute left-3.5 z-10 h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                    strokeWidth={2}
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search chats, tools, agents..."
                    className="
                      h-11
                      w-full
                      cursor-pointer
                      rounded-full
                      border
                      border-transparent
                      bg-transparent
                      pl-11
                      pr-9
                      text-[13.5px]
                      text-[#1C1C1C]
                      outline-none
                      placeholder:text-gray-400
                      hover:border-black/10
                      focus:cursor-text
                      focus:border-black/10
                      focus:bg-white
                      focus:ring-2
                      focus:ring-black/5
                      dark:text-white
                      dark:hover:border-white/10
                      dark:focus:border-white/10
                      dark:focus:bg-zinc-900
                    "
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Clear search"
                    >
                      <X
                        className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                        strokeWidth={2}
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Mobile search */}
              <div className="flex items-center sm:hidden">
                {!isMobileSearchOpen ? (
                  <button
                    type="button"
                    onClick={() => setIsMobileSearchOpen(true)}
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-transparent"
                    aria-label="Open search"
                  >
                    <Search
                      className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                      strokeWidth={2}
                    />
                  </button>
                ) : (
                  <div className="absolute left-3 right-3 top-3.5 z-30 flex items-center rounded-full border border-black/10 bg-white px-3.5 py-2 shadow-md dark:bg-zinc-900">
                    <Search
                      className="mr-2 h-5 w-5 shrink-0 text-[#1C1C1C] dark:text-zinc-200"
                      strokeWidth={2}
                    />

                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search chats, tools, agents..."
                      className="w-full bg-transparent text-[13.5px] text-[#1C1C1C] outline-none dark:text-white"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setIsMobileSearchOpen(false);
                      }}
                      className="cursor-pointer p-1"
                      aria-label="Close search"
                    >
                      <X
                        className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right section */}
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <button
                type="button"
                className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white shadow-sm transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                aria-label="Notifications"
              >
                <Bell
                  className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                  strokeWidth={2}
                />

                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#FF5500] ring-2 ring-white dark:ring-zinc-900" />
              </button>

              {/* Theme */}
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white shadow-sm transition-all hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                aria-label="Toggle theme"
              >
                <Moon
                  className="h-5 w-5 text-[#1C1C1C] dark:text-zinc-200"
                  strokeWidth={2}
                />
              </button>

              {/* Profile */}
              <div className="flex h-11 shrink-0 cursor-pointer items-center gap-3 rounded-full border border-black/5 bg-white pl-1.5 pr-3 shadow-sm transition-colors hover:bg-gray-50/80 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:pr-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF5500] text-[12px] font-bold text-white shadow-sm">
                  {USER.initials}
                </div>

                <div className="hidden text-left leading-tight md:block">
                  <p className="text-[13px] font-semibold tracking-tight text-[#1C1C1C] dark:text-white">
                    {USER.name}
                  </p>

                  <p className="text-[11px] font-normal text-gray-500 dark:text-gray-400">
                    {USER.plan}
                  </p>
                </div>

                <ChevronDown
                  className="hidden h-4 w-4 shrink-0 text-[#1C1C1C] dark:text-zinc-200 md:block"
                  strokeWidth={2}
                />
              </div>
            </div>
          </header>

          {/* Main */}
          <CanvasMain />
        </div>
      </div>
    </div>
  );
};

export default Index;


