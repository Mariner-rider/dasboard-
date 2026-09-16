import { test, expect } from "../playwright-fixture";

/**
 * Screenshot regression for the WhyRivinity ecosystem-map section
 * (the second-after-hero block: central Rivinity pill, four side pills
 * with orthogonal connectors, and three feature cards fanned below).
 *
 * If an intentional design change updates the section, re-run with
 * `--update-snapshots` to refresh the baseline.
 */
test.describe("WhyRivinity ecosystem map", () => {
  test.use({ viewport: { width: 1280, height: 1800 } });

  test("structure is intact", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('[data-testid="why-rivinity"]')).toBeVisible();
    await expect(page.locator('[data-testid="ecosystem-map"]')).toBeVisible();
    await expect(page.locator('[data-testid="rivinity-center-pill"]')).toBeVisible();
    // Four side pills
    for (const name of ["AI Chat", "App Builder", "RivinityLM", "Agents"]) {
      await expect(
        page.locator('[data-testid="ecosystem-map"]').getByText(name, { exact: true }),
      ).toBeVisible();
    }
    // Three feature cards
    for (const title of ["Unified workspace", "Persistent memory", "Autonomous workflows"]) {
      await expect(page.getByRole("heading", { name: title })).toBeVisible();
    }
    // Connector SVGs — one for pills row, one for trunk
    const svgCount = await page.locator('[data-testid="ecosystem-map"] svg').count();
    expect(svgCount).toBeGreaterThanOrEqual(2);
  });

  test("visual snapshot", async ({ page }) => {
    await page.goto("/");
    await page.addStyleTag({
      content: `*, *::before, *::after { animation: none !important; transition: none !important; }`,
    });
    await page.waitForLoadState("networkidle");
    const section = page.locator('[data-testid="why-rivinity"]');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const shot = await section.screenshot();
    expect(shot).toMatchSnapshot("why-rivinity.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});
