interface Props {
  label: string;
  value: string | number;
  /** Percentage 0-100 for the fill bar. */
  percent: number;
  caption: string;
}

/** Reusable credits / usage card pinned to the bottom of a right panel. */
const CreditsCard = ({ label, value, percent, caption }: Props) => (
  <div className="mt-auto">
    <div className="glass rounded-2xl p-4 border border-glass">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-medium text-foreground/70">{label}</p>
        <p className="text-[11px] font-semibold text-primary">{value}</p>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full gradient-accent"
          style={{ width: `${Math.max(0, Math.min(100, percent))}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground/40 mt-2">{caption}</p>
    </div>
  </div>
);

export default CreditsCard;