import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FOOTER_COLUMNS } from "@/components/landing/footer-links";
import { APP_ROUTES } from "@/AppRoutes";
import AppRoutes from "@/AppRoutes";

const internalFooterTos = FOOTER_COLUMNS.flatMap((c) => c.items)
  .map((i) => i.to)
  .filter((t): t is string => !!t);

const registeredPaths = new Set<string>(APP_ROUTES.map((r) => r.path));

describe("Rivinity footer link integrity", () => {
  it("every footer link points to a route registered in AppRoutes", () => {
    const broken = internalFooterTos.filter((to) => {
      const path = to.split("#")[0] || "/";
      return !registeredPaths.has(path);
    });
    expect(broken, `Broken footer routes: ${broken.join(", ")}`).toEqual([]);
  });

  // Rendering each destination for real inside <AppRoutes /> is the closest
  // we can get in unit tests to "click the link and open the page". If the
  // page throws during render, this test fails with the page's stack trace.
  it.each(internalFooterTos)(
    "renders destination page for footer link %s without hitting NotFound or throwing",
    (to) => {
      const path = to.split("#")[0] || "/";
      render(
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>,
      );
      // NotFound page renders a "404" heading — if we see it, routing missed.
      expect(screen.queryByText(/^404$/)).toBeNull();
      cleanup();
    },
  );
});