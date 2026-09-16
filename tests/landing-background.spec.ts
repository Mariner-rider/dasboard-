import { test, expect } from "../playwright-fixture";

/**
 * Screenshot regression test for the landing page background gradients.
 * Guards against accidental regressions to the soft aurora background
 * (white bloom top-center, cool blue left, pink/lavender right).
 *
 * If an intentional design change updates the background, re-run with
 * `--update-snapshots` to refresh the baseline.
 */
test.describe("Landing page background", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("body::before gradient stack is intact", async ({ page }) => {
    await page.goto("/");
    const bg = await page.evaluate(() => {
      const s = getComputedStyle(document.body, "::before");
      return { background: s.background, backgroundImage: s.backgroundImage };
    });
    // Expect five radial glows + a linear base gradient
    const radialCount = (bg.backgroundImage.match(/radial-gradient/g) || []).length;
    expect(radialCount).toBe(5);
    expect(bg.backgroundImage).toContain("linear-gradient");
    // Base gradient anchor colors
    expect(bg.backgroundImage).toMatch(/rgb\(238,\s*237,\s*243\)/);
    expect(bg.backgroundImage).toMatch(/rgb\(233,\s*232,\s*239\)/);
    expect(bg.backgroundImage).toMatch(/rgb\(231,\s*230,\s*238\)/);
  });

  test("visual snapshot of the hero background", async ({ page }) => {
    await page.goto("/");
    // Hide dynamic/animated content that would cause flake
    await page.addStyleTag({
      content: `
        *, *::before, *::after { animation: none !important; transition: none !important; }
      `,
    });
    await page.waitForLoadState("networkidle");
    const shot = await page.screenshot({
      clip: { x: 0, y: 0, width: 1280, height: 600 },
    });
    expect(shot).toMatchSnapshot("landing-hero-background.png", {
      maxDiffPixelRatio: 0.02,
    });
  });
});