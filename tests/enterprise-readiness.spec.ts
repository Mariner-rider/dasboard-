import { test, expect } from "../playwright-fixture";

/**
 * Visual regression for the EnterpriseReadiness ("Everything You Need.
 * One Intelligent Platform.") section across breakpoints.
 *
 * Baselines are generated from the current render. Re-run with
 * `--update-snapshots` after intentional design changes.
 */
const VIEWPORTS = [
  { name: "mobile-390", width: 390, height: 1600 },
  { name: "tablet-768", width: 768, height: 1600 },
  { name: "desktop-1280", width: 1280, height: 1400 },
  { name: "wide-1536", width: 1536, height: 1400 },
] as const;

test.describe("EnterpriseReadiness section", () => {
  for (const vp of VIEWPORTS) {
    test(`structure is intact @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      const section = page.locator('[data-testid="enterprise-readiness"]');
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      await expect(section.getByText("Everything You Need.")).toBeVisible();
      await expect(section.getByText("Intelligent Platform.")).toBeVisible();
      // Semi-globe SVG + at least one connector pill SVG
      expect(await section.locator("svg").count()).toBeGreaterThanOrEqual(2);
    });

    test(`visual snapshot @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      // Freeze animations/transitions so the pulsing orb is deterministic.
      await page.addStyleTag({
        content: `*, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
        /* Pause inline SVG SMIL <animate> elements at t=0 */
        svg animate, svg animateTransform, svg animateMotion { begin: indefinite !important; }`,
      });
      await page.evaluate(() => {
        document.querySelectorAll("svg").forEach((svg) => {
          // @ts-expect-error SVGSVGElement.pauseAnimations exists in browsers
          svg.pauseAnimations?.();
          // @ts-expect-error setCurrentTime exists on SVGSVGElement
          svg.setCurrentTime?.(0);
        });
      });
      const section = page.locator('[data-testid="enterprise-readiness"]');
      await section.scrollIntoViewIfNeeded();
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(250);
      const shot = await section.screenshot();
      expect(shot).toMatchSnapshot(`enterprise-readiness-${vp.name}.png`, {
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});