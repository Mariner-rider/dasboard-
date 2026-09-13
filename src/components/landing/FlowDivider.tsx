import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
  /** Height in px */
  height?: number;
  variant?: "divider" | "hover" | "transition";
}

/**
 * FlowDivider — a thin, single-wave gradient line that carries the
 * "Intelligence Flow" language between sections. Reuses the wave palette.
 */
const FlowDivider = ({ className = "", height = 48, variant = "divider" }: Props) => {
  const reduce = useReducedMotion();
  const duration = variant === "transition" ? 1.2 : 4.5;

  return (
    <div
      aria-hidden
      className={`w-full pointer-events-none ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="flow-divider-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FD881F" />
            <stop offset="35%" stopColor="#F5A9D0" />
            <stop offset="70%" stopColor="#D8A5F2" />
            <stop offset="100%" stopColor="#BFA7F8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 24 C 200 4, 400 44, 600 24 S 1000 4, 1200 24"
          fill="none"
          stroke="url(#flow-divider-grad)"
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0, opacity: 0.35 }}
          whileInView={{ pathLength: 1, opacity: 0.7 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default FlowDivider;
