import React, { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";

interface MarketplaceLayoutProps {
  children: React.ReactNode;
}

export default function MarketplaceLayout({
  children,
}: MarketplaceLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <CanvasSidebar
        open={sidebarOpen}
        onCollapse={() => setSidebarOpen((v) => !v)}
      />

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}