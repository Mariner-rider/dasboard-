import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

/**
 * FlowHover — wraps content with a subtle flowing gradient underline that
 * animates on hover using the Intelligence Flow palette.
 */
const FlowHover = ({ children, className = "" }: Props) => (
  <span className={`group relative inline-flex items-center ${className}`}>
    {children}
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[1.5px] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
      style={{
        background:
          "linear-gradient(90deg,#FD881F 0%,#F5A9D0 35%,#D8A5F2 70%,#BFA7F8 100%)",
      }}
    />
  </span>
);

export default FlowHover;
