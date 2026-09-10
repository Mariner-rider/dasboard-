import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu } from "lucide-react";
import MagneticButton from "@/components/landing/MagneticButton";
import RivinityFooter from "@/components/landing/RivinityFooter";
import rivinityLogo from "@/assets/rivinity-logo.png.asset.json";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const logo = rivinityLogo.url;

// All `to` values MUST resolve to a route registered in AppRoutes.
// The `#…` entries are anchors on the landing page — verified by
// scripts/check-footer-links.mjs and the footer-links vitest suite.
const NAV = [
  { label: "Platform", to: "/agent-playground" },
  { label: "Products", to: "/app" },
  { label: "Solutions", to: "/trust" },
  { label: "Enterprise", to: "/security" },
  { label: "Developers", to: "/docs" },
  { label: "Academy", to: "/academy" },
  { label: "About", to: "/about" },
  { label: "Pricing", to: "/#pricing" },
];

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function MarketingLayout({ title, description, children }: Props) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", description);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description, pathname]);

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-4">
          <div className="glass-strong border border-glass rounded-2xl shadow-float flex items-center justify-between h-14 px-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Rivinity" className="h-6 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-1 text-[13px] text-foreground/70">
              {NAV.map((n) => {
                const routePath = n.to.split("#")[0] || "/";
                const isActive =
                  routePath !== "/" && pathname.startsWith(routePath);
                return (
                  <Link
                    key={n.label}
                    to={n.to}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-3 h-8 rounded-full flex items-center transition-colors",
                      isActive
                        ? "bg-foreground/[0.08] text-foreground font-medium"
                        : "text-foreground/65 hover:text-foreground hover:bg-foreground/[0.04]",
                    )}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <Link
                to="/app"
                className="hidden sm:inline-flex text-[13px] font-medium text-foreground/70 hover:text-foreground px-3 h-9 items-center"
              >
                Sign in
              </Link>
              <MagneticButton href="/app" className="cta-pill">
                Open Rivinity <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Menu"
                    className="md:hidden w-9 h-9 rounded-full glass border border-glass flex items-center justify-center"
                  >
                    <Menu className="w-4 h-4" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <nav className="flex flex-col gap-1 pt-8">
                    {NAV.map((n) => {
                      const routePath = n.to.split("#")[0] || "/";
                      const isActive =
                        routePath !== "/" && pathname.startsWith(routePath);
                      return (
                        <Link
                          key={n.label}
                          to={n.to}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "px-3 py-3 rounded-lg text-[14px]",
                            isActive
                              ? "bg-accent text-foreground font-medium"
                              : "hover:bg-accent",
                          )}
                        >
                          {n.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">{children}</main>

      <RivinityFooter />
    </div>
  );
}
