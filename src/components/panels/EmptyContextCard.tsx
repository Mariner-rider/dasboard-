import { FolderOpen } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
}

/** Empty "no files attached" context card used by Canvas & App Builder panels. */
const EmptyContextCard = ({
  title = "No files attached",
  subtitle = "Drop files for context",
}: Props) => (
  <div className="glass rounded-2xl p-5 border border-glass flex flex-col items-center text-center">
    <FolderOpen className="w-7 h-7 text-muted-foreground/25 mb-1.5" />
    <p className="text-[11px] text-muted-foreground/50">{title}</p>
    <p className="text-[10px] text-muted-foreground/30 mt-0.5">{subtitle}</p>
  </div>
);

export default EmptyContextCard;