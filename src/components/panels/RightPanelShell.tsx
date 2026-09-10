import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** Panel width — defaults to 260px (used by every module except the canvas AI-chat panel which uses 240px). */
  width?: number;
  gap?: 5 | 6;
  className?: string;
  /** When true, uses `h-screen` (canvas) instead of `h-full` (modules embedded in a layout). */
  fullScreen?: boolean;
}

/**
 * Shared right-panel <aside>. Every module (Canvas, App Builder, Audio Lab,
 * RivinityLM, Image Enhancer) mounts the same shell so vertical rhythm,
 * width, padding, and scroll behavior stay identical.
 */
const RightPanelShell = ({
  children,
  width = 260,
  gap = 6,
  className,
  fullScreen = false,
}: Props) => (
  <aside
    style={{ width }}
    className={cn(
      "flex-col py-6 px-4 shrink-0 hidden xl:flex overflow-y-auto",
      fullScreen ? "h-screen" : "h-full",
      gap === 5 ? "gap-5" : "gap-6",
      className,
    )}
  >
    {children}
  </aside>
);

export default RightPanelShell;