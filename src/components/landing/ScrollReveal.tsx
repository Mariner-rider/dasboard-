import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export const ScrollReveal = ({ children, className, depth = 1 }: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [18 * depth, -18 * depth]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.985, 1, 0.985]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [2, 0, 0, 1]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      ref={ref}
      style={{ y, scale, filter }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
