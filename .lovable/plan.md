# Fix, unify, and level-up inner surfaces

You're right — several pages I promised are either missing, half-wired, or visually inconsistent with the rest of the site. Here is exactly what I'll ship, in one continuous pass, no sugarcoating.

## 1. Fix broken / missing pages (make them real, not stubs)

**Rivinity Cloud under Marketplace**
- Currently only linked from footer as `/rivinity-cloud`. Add a **Marketplace → Cloud Services** entry in the marketplace sidebar and a proper `/marketplace/cloud` route that mirrors the same layout language as `AgentAsAService.tsx` (hero + service grid + CTA), reusing the existing cloud content so it lives inside the Marketplace shell instead of orphaned in the footer.

**Team Members / Roles & Access / API Keys**
- Pages exist (`/settings/team-members`, `/settings/roles-access`, `/settings/api-keys`) but they're bare tables with no shell — they don't share the Settings chrome, so they look "shattered."
- Wrap all three in a shared `SettingsPageLayout` (sidebar with the three tabs + breadcrumb + header) so navigating between them feels like one product area. Match the glass-on-canvas tokens used elsewhere.

**History**
- Currently only a dialog (`HistoryDialog`). Promote it to a real `/history` page with the same three-pane canvas shell (sidebar + nav + right panel), tabs for All / By Tool / By Date / Favorites, and card grid of activity items. Keep the dialog for quick access from the sidebar but make the dedicated page the source of truth.

## 2. New: Skills Library (`/skills`)

- New route `/skills` in the canvas shell.
- Left: category tree (Writing, Code, Research, Data, Design, Ops, …).
- Center: searchable, filterable grid of skill cards. Each card shows name, one-line description, tags, "used by N", and a status badge (Installed / Not installed).
- Right panel: selected skill preview — renders the SKILL.md frontmatter + body in the existing `ChatMarkdown` component.
- Two primary actions on each card and in the preview: **Add to AI** (primary) and **Remove from AI** (ghost, disabled unless installed).
- Data: seeded from a local `src/lib/skillsCatalog.ts` with ~120 representative entries + a "91,000+ skills available" counter in the header. Real backend catalog is a follow-up — I'll wire the UI so swapping the source to an API later is a one-line change.
- Sidebar gets a new "Skills" nav item under Main.

## 3. Inner tool pages — real polish, not paint

Every inner tool currently has the same shape: left rail of features, big empty center, thin right panel. That's why they feel shattered. I'll upgrade each with concrete additions (no layout rewrites, no copy churn):

- **AI Chat** — sticky conversation header with model picker + token/context meter; message action row (copy, regenerate, branch, save-to-history) on hover; empty-state suggestion chips grouped by intent.
- **Web Search / Research** — result cards with source favicon, domain, snippet, and inline "cite" button that pushes the citation into the active chat.
- **App Builder** — preview/code toggle in the workbench header, file tree collapsible groups, and a live "build status" pill (idle / thinking / streaming / error) in the top-right.
- **Audio Lab** — waveform placeholder component for TTS/STT views, voice-preset chips, and a shared transport bar (play/pause/scrub/download) instead of per-view custom controls.
- **RivinityLM** — module cards get progress rings, streak flames stay, add a "Continue where you left off" hero row above the module grid.
- **Image Enhancer** — before/after slider for the Upscale/Restore/Background views (single reusable component), plus drag-and-drop upload target.
- **Prompt to Video** — storyboard strip under the prompt (auto-generated scene thumbnails), duration slider, aspect-ratio chips.

All of these reuse existing tokens, `data-reveal-group`, and `data-hover-lift` so they inherit the sitewide scroll-reveal and hover motion automatically.

## 4. Visual consistency pass

- Every inner page gets the same top-bar treatment (breadcrumb + page title + primary action slot) via a new `InnerPageHeader` component so no page floats without context.
- Right panels share a common `RightPanelSection` primitive (title + subtitle + slot) so the different tools stop each inventing their own.
- All new pages register in `APP_ROUTES` so the footer-link build check keeps passing.

## Technical notes

- New files: `src/pages/marketplace/CloudServices.tsx`, `src/pages/History.tsx`, `src/pages/Skills.tsx`, `src/components/skills/*`, `src/components/settings/SettingsPageLayout.tsx`, `src/components/inner/InnerPageHeader.tsx`, `src/components/shared/BeforeAfterSlider.tsx`, `src/lib/skillsCatalog.ts`.
- Edits: `AppRoutes.tsx`, `CanvasSidebar.tsx`, `MarketplaceLayout.tsx`, the three settings pages, each inner tool's Main + RightPanel.
- No backend changes; skill catalog is a typed local module with a documented swap point for the future API.
- No changes to landing page, hero animations, or footer routing.

## Out of scope (call these out honestly)

- Real 91,000-entry skill index — needs a backend/CDN feed. I'm shipping the UI and a seed catalog.
- Actual audio waveform rendering from a live buffer — placeholder visualization only until an audio pipeline exists.
- Live video generation in Prompt to Video — storyboard is UI scaffolding.

If this scope looks right, I'll execute it end-to-end in the next turn.
