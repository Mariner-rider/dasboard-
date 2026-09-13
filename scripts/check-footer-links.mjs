#!/usr/bin/env node
// Build-time guard: every internal `to` in the Rivinity footer must resolve
// to a real route registered in src/AppRoutes.tsx. Also verifies hash links
// point at an existing `id="…"` on the landing page. Fails the build (exit 1)
// with a readable list of offenders if not.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

const routesSrc = read("src/AppRoutes.tsx");
const footerSrc = read("src/components/landing/footer-links.ts");
const landingSrc = read("src/pages/Landing.tsx");

// Extract registered route paths.
const routePaths = new Set(
  [...routesSrc.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]),
);

// Extract footer `to` values.
const footerTos = [...footerSrc.matchAll(/to:\s*"([^"]+)"/g)].map((m) => m[1]);

// Extract landing section anchors: `id="…"`.
const landingIds = new Set(
  [...landingSrc.matchAll(/id="([a-zA-Z0-9_-]+)"/g)].map((m) => m[1]),
);

const routeMatches = (to) => {
  // Split off hash — hash-only paths resolve on the landing page.
  const [pathPart, hash] = to.split("#");
  const path = pathPart || "/";
  if (!routePaths.has(path)) return `no route registered for "${path}"`;
  if (hash && path === "/" && !landingIds.has(hash))
    return `landing page has no id="${hash}"`;
  return null;
};

const broken = [];
for (const to of footerTos) {
  const reason = routeMatches(to);
  if (reason) broken.push({ to, reason });
}

if (broken.length > 0) {
  console.error("\n✗ Rivinity footer contains broken links:\n");
  for (const { to, reason } of broken) {
    console.error(`  • ${to}  →  ${reason}`);
  }
  console.error(
    "\nFix them in src/components/landing/footer-links.ts, or add the route to src/AppRoutes.tsx.\n",
  );
  process.exit(1);
}

console.log(`✓ Footer link check: ${footerTos.length} links resolve to registered routes.`);