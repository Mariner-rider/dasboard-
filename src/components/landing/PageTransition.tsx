import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import FlowDivider from "./FlowDivider";

interface Props {
  children: ReactNode;
}

/**
 * PageTransition — reusable page-level wrapper. Fades content in and sweeps
 * a single Intelligence Flow line across the top. Future pages (About,
 * Careers, Blog, Contact, Docs, Trust Center, Privacy) can wrap their root.
 */
const PageTransition = ({ children }: Props) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <FlowDivider variant="transition" height={32} className="opacity-70" />
      {children}
    </motion.div>
  );
};

export default PageTransition;
