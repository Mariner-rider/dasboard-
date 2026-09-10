import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  children: ReactNode;
  className?: string;
}

/** Small uppercase section label + body. Used across every right panel. */
const PanelSection = ({ label, children, className }: Props) => (
  <div className={className}>
    <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">
      {label}
    </p>
    {children}
  </div>
);

export default PanelSection;