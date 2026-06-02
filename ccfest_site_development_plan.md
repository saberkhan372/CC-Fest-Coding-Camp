# CC Fest Coding Camp Tools - Site Development Plan

*Last updated: 2026-06-02*

This document captures the development roadmap for the Creative Coding Tools website, grounded in Saber Khan's design practice, the CC Fest aesthetic tradition, and the current state of the codebase.

The plan prioritizes **visible, useful navigation and teaching improvements** without letting metadata, cross-linking, or infrastructure become a rabbit hole.

## Completed in the 2026-05-26 build session

- Repo workflow cleaned up: READMEs now explain source vs. `docs/`, and `deploy.sh` syncs nested site directories from `cc-fest-coding-camp-pages/` to `docs/`.
- Relationship data shipped: priority bridges now have authored `try-next` and `teaching-note` panels; starter sketch metadata and related-resource fallbacks are in place.
- Homepage orientation shipped: JS-driven "Where to start" path, "Best first" row, footer language, local About page, and Sessions link.
- Teaching/copy pass shipped: teacher move panels, selective "Break it on purpose" prompts, and two batches of static tool subtitle rewrites with review fixes.
- Shared CSS layer shipped: `site-components.css` carries reusable components; JS-rendered tool pages link it directly.
- Phase 10 shipped: local `about.html` and footer polish.
- Phase 11 shipped: `/sessions/` listing renders cards from `SESSIONS`, `/sessions/template/` generates editable p5.js posters, and `deploy.sh` syncs sessions.
- The placeholder Camp Archive strip was removed. Phase 9 now waits on real, permission-safe images.

Core direction:

- Cross-links across **Bridges -> Tools -> Sketches** are the highest-value change.
- Start with 5-6 complete examples, then expand.
- Keep "Teacher move" and "Break it on purpose" tightly scoped.
- Add the hero maker-credit immediately.
- Treat homepage and representative page templates as parallel work.
- Keep the Camp Archive image fill scoped as a content/design phase; the generative poster engine now has a working v1.

---

## What the site is now vs. what it could become

The current site has strong bones: paper texture, Fraunces headlines, hard offset shadows, a cream-and-ink palette, a tool-specific care strip, bridge rhythm strips, and consistent tool/starter learning rhythms.

The next step is not to make it more polished. The next step is to make it more connected and more obviously useful:

- A first-time visitor should know where to begin.
- A learner should see how an idea becomes a tool and then a remix.
- A teacher should see how to turn a tool into a classroom prompt.
- The site should feel like CC Fest: poster-bright, human-first, beginner-safe, artifact-rich, and open to remix.

The site should become a learning network, not just a catalog.

---

## Phase 1 - Foundation cleanup ✅ Done

**Status: Complete — shipped 2026-05-26**

Three tasks: rhythm rollout, count audit, maker-credit.

### Rhythm rollout

All 110 tool and seed pages have rhythm strips:

- 55 static HTML tool pages: `tool-rhythm` hardcoded in HTML
- 11 JS-rendered workshop tool pages: `tool-rhythm` injected by `workshop-tool-pages.js`
- 44 JS-rendered starter sketch pages: `seed-rhythm` (See it / Change it / Remix it / Teach it) injected by `starter-seed-pages.js`

Seed rhythm is 4-column with pastel bands, matching the visual language of `tool-rhythm`. CSS in `starter-sketch.css`. Responsive at 960px (2-col) and 720px (1-col).

### Resource count audit

Corrected all stale counts from the old 60/40 figures to the actual library state:

| Location | Was | Now |
|----------|-----|-----|
| Meta description | 60 tools, 40 sketches | 66 tools, 44 sketches |
| og:description | 60 tools, 40 sketches | 66 tools, 44 sketches |
| twitter:description | 60 tools, 40 sketches | 66 tools, 44 sketches |
| Hero summary cards | 60, 40 | 66, 44 |
| Lede link | "40 starter sketches" | "44 starter sketches" |
| Gallery headers | already correct (66, 44) | unchanged |
| Footer | already good | unchanged |

Actual library at time of Phase 1: **21 bridges · 66 workshop tools · 44 starter sketches · 5 sessions**

Current library (after Phases 14–18): **21 bridges · 70 workshop tools · 44 starter sketches · 5 sessions**

(66 = 55 static + 11 JS-rendered workshop pages. 44 = all pages using `renderStarterSeedPage`.)

### Maker-credit

Added `<p class="maker-credit">CC Fest · 2026</p>` to the hero, positioned bottom-right. 11px DM Mono, `ink-light`, no pointer-events. Matches the CC Fest poster tradition of crediting the visual in the corner. CSS class added to `site.css`.

### Hero background

Replaced the Perlin-noise canvas (which had timing bugs and felt cliché) with a pure CSS offset dot-grid pattern: SVG background, 20×20px tile, dots at `(2,2)` and `(12,12)`, 9% opacity. Dot-grid notebook register — workshop surface, not digital polish. Zero JS, no timing risk.

### Archive slots

The placeholder archive strip was removed from the homepage after Phase 10/11 review. Phase 9 should return only when real, permission-safe images are available, using the `.poster-proof` component rather than dashed placeholders.

---

## Phase 2A - Homepage signal

**Status: ✅ Done — folded into Phases 1, 5, 10, and 11**

This track handled fast homepage improvements that make the page feel more like a CC Fest poster and less like a product index.

### Hero maker-credit ✅ Done

`<p class="maker-credit">CC Fest · 2026</p>` — bottom-right of the hero, 11px DM Mono, `ink-light`. Shipped in Phase 1.

### Reframe "What this site is" as optional and restrained

The three-line framing stayed optional and was not added as a feature row. Orientation moved into the hero, the "Where to start" path, the "Best first" row, and the About page.

If included, style it as a tight horizontal strip like the current `.hero-steps`, not as cards:

- A free workshop archive.
- A tool shelf for learning p5.js.
- A place to remix and teach from.

Do not repeat the hero lede. Do not turn it into SaaS-style value props.

### Footer language

The footer now says something real and short:

> CC Fest is a free creative coding community for educators and learners. Sessions happen throughout the year.

Links are direct: About this site, CC Fest, Spring 2026 Camp, Session Tools, Cohort Roadmap, GitHub.

---

## Phase 2B - Representative page templates

**Status: ✅ Done — shipped 2026-05-26**

Three representative pages — one of each type — now carry the full template pattern: `try-next` cross-links + `teaching-note` (teacher move panel). These are the templates to scale from.

### Pages updated

**Concept bridge — `noise-smooth-randomness`**
- Replaced generic `.pathways` section with proper `try-next` (3-column grid: Workshop Tools, Starter Sketches, Related Bridge).
- Added `teaching-note` with 3 cards: Prompt (scale slider), Misconception (same input = same output), Ask (noise(x) vs noise(x+0.001)).

**Workshop tool — `noise-lab` (static HTML)**
- Added `teaching-note` CSS classes to `tool-page.css` (ported from `concept-bridge.css`, using tool-page tokens).
- Added `try-next` + `teaching-note` before `</body>` in `noise-lab/index.html`.
- Includes a "Break it on purpose" note: set scale to max, observe the loss of smoothness.

**Starter sketch — `mini-generative-poster-seed`**
- Added `relatedBridges: ["random-controlled-surprise", "noise-smooth-randomness"]`, `relatedTools: ["noise-lab", "noise-vs-random-explorer"]`, `relatedSketches: ["generative-tile-pattern-seed", "wander-agent-seed"]` to the seed data object in `starter-seed-pages.js`.

### What `try-next` looks like

Three `.related-group` columns inside `.related-grid` inside `.try-next`. Each group has a muted uppercase label and `.related-link` cards (type span + title). Links are relative paths so they work on both local and GitHub Pages.

### What `teaching-note` looks like

`.teaching-note` container → `.teaching-note-grid` (3-col, collapses to 1-col at 860px) → three `.teaching-note-card` cells with `<strong>` label + `<span>` text. Optional "Break it on purpose" paragraph below the grid.

---

## Phase 3 - Resource relationships v1

**Status: ✅ Done — shipped 2026-05-26**

All 6 priority bridges now have `try-next` (3-column: Workshop Tools / Starter Sketches / Related Bridge) and `teaching-note` (Prompt / Misconception / Ask) panels. Starter seed `relatedBridges` and `relatedTools` metadata added for all linked sketches.

### Bridges completed

| Bridge | Tools linked | Sketches linked | Bridge linked |
|--------|-------------|-----------------|---------------|
| Noise: Smooth Randomness | noise-lab, noise-walker, noise-vs-random-explorer | wander-agent-seed, generative-tile-pattern-seed, mini-generative-poster-seed | map-range-translator |
| How p5.js Thinks About Time | animation-explorer, framerate-visualizer, framecount-animation-seed | — | events-sketches-listen |
| Color: Numbers Become Feeling | rgb-hsb-color-lab, color-blend-modes-explorer, shape-and-color-explorer | hsb-color-seed, color-from-position, code-postcard-from-my-world | map-range-translator |
| map() Range Translator | map-explorer, dist-map-lerp-chain, lerp-explorer | color-from-position, dist-proximity-seed, lerp-follow-seed | noise-smooth-randomness, distance-becomes-behavior |
| Arrays: One Thing to Many Things | simple-array-explorer, for-loop-stepper, polished-array-explorer | click-to-create-shapes, array-position-dot-field, particle-system-seed | arrays-loops-as-system |
| State Machines: Sketches Have Modes | game-state-studio, if-else-decision-studio | game-state-starter, state-machine-game-seed, keyboard-controlled-character | events-sketches-listen |

### Also fixed

- Corrected broken `../../starter-sketches/` paths in the noise bridge (all sketches are under `../../tools/`).
- Added `relatedBridges` + `relatedTools` metadata to 9 starter sketches in `starter-seed-pages.js`.

---

## Phase 4 - Tag-based related-resource fallback

**Status: ✅ Done — shipped 2026-05-26**

Tag-based fallback is live in both `workshop-tool-pages.js` and `starter-seed-pages.js`. When no hand-authored `relatedBridges`, `relatedTools`, or `relatedSketches` are present, each renderer finds up to 4 resources sharing tags from the same data object and renders a "Similar tools/sketches" card. `RESOURCE_LINKS` lookup tables expanded to cover 15–17 slugs in each renderer so titles display correctly instead of falling through to `titleize()`.

---

## Phase 5 - Bridge index "Start here" and homepage "Best first"

**Status: ✅ Done — shipped 2026-05-26**

`CURATED` constant added to `site.js` holding 6 bridge entries (each with paired tool + sketch slug) and 4 `bestFirst` entries. An IIFE renders `.beginner-path` and `.best-first-links` from `CURATED` at page load. Hardcoded `<li>` items removed from `index.html`; `.beginner-path` CSS grid changed from `repeat(5,…)` to `repeat(3,…)` for a clean 2×3 layout with 6 entries. All edits are in one place in `site.js`.

---

## Phase 6 - Teacher move panels

**Status: ✅ Done — shipped 2026-05-26**

Teacher move panels were expanded without turning them into full curriculum blocks.

Each panel has exactly three items:

- **Prompt:** one classroom prompt.
- **Misconception:** one likely confusion.
- **Ask:** one question to ask students.

Do not expand this into a full curriculum block. If it gets bigger than three items, it becomes a different product.

Shipped:

- Teaching-note panels added to the remaining 7 JS-rendered workshop tools, bringing all 11 JS-rendered tools to coverage.
- Teaching-note panels added to 6 foundational bridge pages: events, distance, random, conditionals, functions, and variable scope.
- All panels keep the same three-part structure: Prompt / Misconception / Ask.

---

## Phase 7 - Tool copy pass and selective "Break it on purpose"

**Status: ✅ Done — shipped 2026-05-26**

### Tool subtitles

Static tool subtitles were rewritten in careful batches so they make a claim about what the learner can do, not just what the function is.

- **Before:** Controls how opacity is applied to a shape.
- **After:** Change how visible anything is - 0 is invisible, 255 is solid, and everything in between is yours.

Coverage shipped:

- 12 highly visible static tool subtitles in the first batch.
- 10 additional static tool subtitles in the second batch.
- 4 follow-up subtitle fixes where review found copy that referenced non-existent controls or modes.
- 11 JS-rendered workshop tool pages handled through `workshop-tool-pages.js` teaching/copy patterns.

### Break it on purpose

These prompts were added only where an edge case teaches something real.

Prompts shipped for:

- `map-explorer`: `map()` does not clamp unless constrained.
- `rgb-hsb-color-lab`: saturation 0 makes hue irrelevant.
- `if-else-decision-studio`: exact-threshold behavior.
- `animation-explorer`: removing `background()` makes frames accumulate.
- `simple-array-explorer`: out-of-bounds array access returns `undefined`.

Rules:

- Keep prompts short and tied to one edge case.
- Do not add one to every tool just to satisfy a pattern.
- Prefer surprising or counterintuitive results.

---

## Phase 8 - Reusable visual components

**Status: ✅ Done — shipped 2026-05-26**

Add a small reusable CSS component layer, preferably `site-components.css`, rather than overloading `site.css`.

Include:

- `.maker-credit`
- `.teaching-note`
- `.try-next`
- `.poster-proof`
- `.artifact-caption`

Rules:

- Use existing tokens from `site.css`.
- Keep hard ink borders and cream surfaces.
- Use gold as signal, not decoration.
- Keep mobile overflow rules explicit.
- Avoid decorative SVG arrows unless they improve readability.
- Keep components portable across homepage, bridge pages, tool pages, and starter pages.

---

## Phase 9 - Camp Archive real-image fill

**Status: Separate content/design phase — blocked on real images**

Keep the Camp Archive image fill in the roadmap, but do not let it block site structure, navigation, or session-poster work.

**Pre-flight checklist before shipping Phase 9:**
- Gather real public or permission-safe event/poster/participant images.
- Bump cache keys on `site.css` and any page CSS touched by the image rollout.
- Use `.poster-proof` (in `site-components.css`) for each filled image.
- Ensure each filled image has a visible `.artifact-caption` with credit or permission-safe context.

The old dashed placeholder strip has been removed. When Phase 9 is ready, add back only real image slots:

- Real image where public/permission status is clear.
- No placeholder slot where the artifact is missing or permission-dependent.
- Visible caption and credit for every real image.

This remains important because CC Fest is artifact-rich, but it is not the bottleneck for the next navigation/design push.

---

## Phase 10 - About page and footer polish

**Status: ✅ Done — shipped 2026-05-26**

The About page now lives in the site itself, with a short CC Fest frame, audience notes, session rhythm, a note from Saber, and direct next-step links back into the tool library.

Shipped:

- Local `about.html` in source and `docs/`.
- Homepage topbar, hero, and footer point to the local About page.
- Footer markup now uses plain text plus direct links, without inline spacing.
- No session image was added; Phase 9 still owns real-image selection and permission-safe fills.

---

## Phase 11 - Generative poster engine

**Status: ✅ Done (v1) — shipped 2026-05-26**

What shipped:

- `/sessions/index.html` — listing page. Cards are fully generated from a `SESSIONS` JS array (id, href, label, title, subtitle, topic, date, accent, seed). To add a session: append one object to the array and create its directory. No HTML changes needed.
- `/sessions/template/index.html` — poster page with live-editable fields (session #, topic, date, location, accent color), a p5.js sketch that redraws on every change, a "Shuffle design" seed randomizer, and a `saveCanvas()` download button. Sketch is inline; no separate `sketch.js` file.
- `/sessions.css` — session-specific styles (listing and poster layouts).
- `deploy.sh` updated to sync `sessions/` alongside `tools/` and `concept-bridges/`.
- Homepage topbar gains a Sessions link.

**Poster design:** cream background, double-offset dot grid, accent top bar with DM Mono label, Fraunces headline with auto-scaling, ink rule, two seeded rows of circles (accent-filled and outline), DM Mono date/location, maker credit bottom right. Fonts loaded via Google Fonts; sketch waits on `document.fonts.ready`.

**To extend:** add an entry to `SESSIONS` in `sessions/index.html`, create `sessions/[slug]/index.html` by copying the template and hardcoding the session data.

---

## What not to build

- **User accounts.** Not right for this community or this tool.
- **CMS or backend.** Keep the site static and GitHub Pages-compatible.
- **Analytics dashboard.** Keep analytics lightweight if used at all.
- **Dark mode toggle.** The cream-and-ink palette is the aesthetic.
- **Social sharing buttons.** They cheapen the visual and are not needed.
- **Full curriculum system.** Teacher moves should stay compact; full curriculum docs belong elsewhere.
- **All-at-once metadata migration.** Start with a small authored set and tag fallback.

---

## Revised roadmap

| Phase | Work |
|---|---|
| 1 ✅ | Rhythm rollout (110 pages), count audit (66/44), maker-credit, dot-grid hero background. |
| 2A ✅ | Homepage signal: maker-credit, orientation through path/rows/About, footer language. |
| 2B ✅ | Representative templates: noise-smooth-randomness bridge, noise-lab tool, mini-generative-poster-seed — all with try-next cross-links and teaching-note panels. |
| 3 ✅ | Resource relationships v1: 6 complete bridge-to-tool-to-sketch paths. |
| 4 ✅ | Tag-based related-resource fallback using existing metadata. |
| 5 ✅ | Bridge index "Start here" pathway and homepage "Best first" curated row. |
| 6 ✅ | Teacher move panels across foundational bridges and all JS-rendered workshop tools. |
| 7 ✅ | Tool copy pass and selective "Break it on purpose" prompts. |
| 8 ✅ | Reusable visual components in a small component CSS layer. |
| 9 | Camp Archive real-image fill, blocked on permission-safe images. |
| 10 ✅ | About page and footer polish. |
| 11 ✅ | Generative poster engine — /sessions/ listing + template poster page. |

Both improvement arcs are now complete. The only remaining open item is Phase 9, which is content/design work blocked on real, permission-safe images.

The second improvement arc (Phases 12–20), drawn from patterns in A2 Playgrounds and a joint Claude + Codex analysis, shipped 2026-06-02: filter system, preview curation, four new tools (70 total), concept map, tool presentation utilities, and shareable URL state for all 11 JS-rendered tools.

---

## Definition of done — Phases 12–20

Every phase is complete only when all of the following are true:

- Source edited in `cc-fest-coding-camp-pages/` only. Run `./deploy.sh` only when ready to sync to `docs/`, commit, and push.
- If a tool was added: tool count updated in meta description, OG description, Twitter description, hero summary card, and gallery header. (Phase 1 documented the exact locations.)
- If a tool was added: homepage tool card added manually in `index.html` with correct suit CSS class (`suit-marks`, `suit-motion`, etc. on the `<article>`), `data-pathway`, `data-difficulty`, and tag row. Note: suit is expressed as a CSS class, not a `data-suit` attribute — `data-suit` lives on the `.station` wrapper, not on individual cards.
- If a tool was added: `preview-sketches.js` registration added or intentionally noted as deferred.
- `try-next` links resolve to real pages.
- Mobile smoke test: homepage and the new tool page have no horizontal overflow.
- Suit, pathway, and difficulty filters all compose correctly, and the suit "All" button resets all three filter states.
- CSS and JS cache keys bumped for any touched files.

---

## Phase 12 — Filter system: pathway + difficulty

**Status: Ready to build · Owner: Codex**

**Context — live bug:** The `.pathway-filter-bar` has been in `index.html` since it was written, but `site.js` has no handler for `.pathway-btn` clicks. Pathway filters have never worked on the live site. This phase fixes that and adds difficulty filtering in the same pass, building one shared filter-state object that suit, pathway, and difficulty all write to.

The three difficulty values in the data are `beginner`, `extension`, and `capstone` (22 cards use capstone, concentrated in ⬡ Systems and ☽ Open suits). Add all three as filter buttons.

**Codex tasks:**

- Audit all `data-difficulty` values in `index.html` to confirm the full set (`beginner`, `extension`, `capstone`).
- Replace the separate suit-filter IIFE in `site.js` with a single shared `filterState = { suit: "all", pathway: "all", difficulty: "all" }` object. Write one `applyFilters()` function that computes the intersection: a card is shown only if it matches all three active filters (or the filter is set to "all").
- Wire `.suit-btn` clicks to update `filterState.suit`, `.pathway-btn` clicks to update `filterState.pathway`, and `.difficulty-btn` clicks to update `filterState.difficulty`. Each click calls `applyFilters()`.
- Add a `.difficulty-filter-bar` to `index.html` with four buttons: All / Beginner / Extension / Capstone.
- The suit "All" button should reset all three filter states, not just suit — it is the full-reset entry point.
- Bump `site.js` cache key.

**Do not:**

- Add difficulty labels to the cards themselves; the filter bar is enough.
- Touch any tool card HTML. The data attributes are already correct.

---

## Phase 13 — Preview curation and performance polish

**Status: Scope correction — partly already built · Owner: Codex**

**Context:** `preview-sketches.js:1289` already calls `createPreview` on every `.tool-card` with a registered slug, using `IntersectionObserver`. Previews already run for tools that have a registered sketch. The work here is not building previews from scratch — it is curation, performance hardening, and extending coverage to the new tools added in Phases 14, 15, and 18.

**Codex tasks:**

- Audit which of the 66 tool cards have a registered slug in `preview-sketches.js` and which do not. Produce a short list of the gaps.
- For the "Best first" row (4 cards): confirm their slugs are registered and previews are working. Fix any that are missing.
- Review the `createPreview` pause/resume logic. Confirm that previews stop running when scrolled out of view (IntersectionObserver threshold) and do not run on mobile widths below 640px.
- After Phases 14, 15, and 18 ship, add preview sketch registrations for each new tool.

**Do not:**

- Rewrite the preview system architecture; it works.
- Add previews to every card; keep the opt-in pattern.

---

## Phase 14 — "How does it grow?" comparison tool

**Status: Ready to build · Owner: Codex**

A new ◎ Motion tool. A single canvas shows five quantities animating simultaneously: `frameCount` (linear), `frameCount²` (quadratic), `sin(frameCount * 0.05)` (oscillating), `noise(frameCount * 0.01)` (smooth drift), and `lerp(prev, target, 0.05)` (easing). The goal is to make the *personality* of each quantity visible before a learner has to read code.

**Pattern: static HTML page.** Do not register in `workshop-tool-pages.js`. Add a homepage card manually in `index.html`.

**Codex tasks:**

- Create `cc-fest-coding-camp-pages/tools/how-does-it-grow/index.html` using the existing static tool page template (`tool-page.css`, standard rhythm strip). Reference an existing static tool page for the correct shell structure.
- Canvas: five labeled horizontal tracks. Each track shows a moving marker driven by one quantity, normalized to canvas height. Color each track using existing suit-motion CSS token colors.
- Controls: play/pause, speed multiplier (×0.5 / ×1 / ×2), toggle to show/hide the code expression driving each track.
- Break-it note: set speed to ×2 and observe that the `sin()` track wraps while others diverge.
- `teaching-note` panel (Prompt / Misconception / Ask) and `try-next` cross-links to: `lerp-explorer`, `sine-cosine-motion-explorer`, `animation-explorer`; starter sketch `lerp-follow-seed`; bridge `how-p5-thinks-about-time`.
- Add homepage card to `index.html`: `<article class="tool-card suit-motion"` with `data-pathway="animation final"` `data-difficulty="extension"` and tags `motion comparison lerp sin noise frameCount`. Place it inside the `#station-motion` station div.
- Update tool count from 66 to 67 in all count locations (see Phase 1 for the full list of locations).
- Run `./deploy.sh`.

**Pairs with:** `lerp-explorer`, `sine-cosine-motion-explorer`, `noise-vs-random-explorer`

---

## Phase 15 — Bezier curve sculptor

**Status: Ready to build · Owner: Codex**

A new ✦ Marks tool. Users drag anchor and control points; the Bezier curve updates live; `bezierVertex()` code generates below. No existing tool covers curved drawing paths.

**Pattern: static HTML page.** Do not register in `workshop-tool-pages.js`. Add a homepage card manually. Use plain Canvas 2D (not p5.js) for the tool's own rendering — same pattern as `layering-visualizer`. Generate p5.js code in the output panel.

### Canvas interaction spec

Four named points: `P0` (start anchor), `P1` (start control), `P2` (end control), `P3` (end anchor). Start positions:

```js
const pts = [
  { x: 100, y: 300, label: "P0", kind: "anchor" },
  { x: 200, y: 100, label: "P1", kind: "control" },
  { x: 350, y: 100, label: "P2", kind: "control" },
  { x: 450, y: 300, label: "P3", kind: "anchor" }
];
```

**Drag logic (mousedown / mousemove / mouseup + touch equivalents):**

```js
let dragging = null;
const HIT = 12; // hit radius px

canvas.addEventListener("mousedown", e => {
  const { x, y } = canvasXY(e);
  // test in reverse so top-painted points win
  for (let i = pts.length - 1; i >= 0; i--) {
    if (Math.hypot(pts[i].x - x, pts[i].y - y) < HIT) {
      dragging = i; break;
    }
  }
});
canvas.addEventListener("mousemove", e => {
  if (dragging === null) return;
  const { x, y } = canvasXY(e);
  pts[dragging].x = x;
  pts[dragging].y = y;
  render(); updateCode();
});
canvas.addEventListener("mouseup", () => dragging = null);
```

`canvasXY` maps a MouseEvent to canvas pixel coords accounting for `getBoundingClientRect()` and `devicePixelRatio`.

**Render order per frame:**
1. Clear canvas
2. Dashed lines: P0→P1, P2→P3 (`setLineDash([5,4])`, `--ink-light` color)
3. Bezier curve: `ctx.bezierCurveTo(P1.x, P1.y, P2.x, P2.y, P3.x, P3.y)`, `--accent` stroke, 2.5px
4. Control points (P1, P2): open circle, `--ink-light` fill, 8px radius
5. Anchor points (P0, P3): filled circle, `--accent` fill, 10px radius
6. Labels: DM Mono 11px above each point

**"Add another curve" mechanic:**

Adds a second `bezierVertex()` segment. The new segment's start is the previous P3 (shared, not duplicated in the point array). Append three new points — new P1, P2, P3:

```js
// after "Add curve" click:
const last = pts[pts.length - 1]; // current P3 becomes shared anchor
pts.push(
  { x: last.x + 80,  y: last.y - 120, label: "P" + pts.length,     kind: "control" },
  { x: last.x + 200, y: last.y - 120, label: "P" + (pts.length+1), kind: "control" },
  { x: last.x + 280, y: last.y,       label: "P" + (pts.length+2), kind: "anchor"  }
);
```

Limit to 3 total curves (10 points max) before disabling the button.

### Code generation format

Output panel shows valid p5.js using `beginShape()` / `vertex()` / `bezierVertex()`. Coordinates rounded to integers:

```js
function generateCode(pts) {
  const r = v => Math.round(v);
  let out = "beginShape();\n";
  out += `vertex(${r(pts[0].x)}, ${r(pts[0].y)});\n`;
  for (let i = 1; i < pts.length; i += 3) {
    out += `bezierVertex(${r(pts[i].x)}, ${r(pts[i].y)}, `;
    out +=              `${r(pts[i+1].x)}, ${r(pts[i+1].y)}, `;
    out +=              `${r(pts[i+2].x)}, ${r(pts[i+2].y)});\n`;
  }
  out += "endShape();";
  return out;
}
```

Coordinates use top-left origin (canvas default), matching what `createCanvas()` produces in p5.js.

### Codex tasks

- Create `cc-fest-coding-camp-pages/tools/bezier-curve-sculptor/index.html` using the static tool page template (reference `layering-visualizer` for shell structure).
- Implement canvas drag interaction and code generation per specs above.
- Break-it note: drag a control point far off-canvas — the curve follows because bezier handles extend infinitely.
- `teaching-note` (Prompt / Misconception / Ask) and `try-next` to: `transformations-explorer`, `push-pop-scope-visualizer`; starter sketch `generative-tile-pattern-seed`; bridge `world-vs-local-coordinates`.
- Add homepage card: `<article class="tool-card suit-marks"` with `data-pathway="final"` `data-difficulty="extension"` and tags `bezier curves shapes vertex code-generation`. Place inside `#station-marks` station div.
- Update tool count from 67 to 68 in all count locations (see Phase 1 for full list).
- Add preview registration to `preview-sketches.js` and bump its cache key.
- Run `./deploy.sh`.

---

## Phase 16 — Distribution visualizer (randomness in aggregate)

**Status: Needs design decision before building · Owner: Codex after design sign-off**

A new ⬡ Systems tool. Shows what `random()`, `randomGaussian()`, and `noise()` produce over 1000+ calls. Extends the random/noise conceptual territory into aggregate behavior — no current tool covers this.

**Design decision — falling dots.** Each call produces a dot that falls and lands in a pile. Partial transparency (alpha ~60) prevents the Gaussian center from becoming muddy. Histogram bars were considered but are too static — watching the pile build over 1000 calls makes the process visible, not just the result. Fits the "change one thing, watch what happens" CC Fest ethos.

**Pattern: static HTML page.**

**Codex tasks (after design decision):**

- Create `cc-fest-coding-camp-pages/tools/distribution-visualizer/index.html`.
- Three side-by-side panels: `random(0, width)`, `randomGaussian(width/2, width/6)`, `noise()` sampled across a range.
- Controls: run/pause, reset, speed.
- Running mean and range annotations as the distribution fills in.
- `try-next` to: `noise-vs-random-explorer`, `noise-lab`; bridges `noise-smooth-randomness`, `random-controlled-surprise`.
- Add homepage card: `<article class="tool-card suit-systems"` with `data-pathway="data final"` `data-difficulty="extension"` and tags `random noise probability distribution statistics`. Place it inside the `#station-systems` station div.
- Update tool count in all count locations.
- Run `./deploy.sh`.

---

## Phase 17 — Concept map / relationship graph page

**Status: Needs design decision before building · Owner: Claude (data + spec) + Codex (rendering)**

A spatial navigation page rendering the existing bridge→tool→sketch relationship data as a visual graph. The hand-authored `try-next` cross-links from Phase 3 are the data source — no new authoring required for the initial version.

**Status: ✅ Done 2026-06-02 — Claude (data + spec) + Claude (renderer)**

Graph data audited from all 6 priority bridge pages. Full node/edge object written to `cc-fest-coding-camp-pages/concept-map-data.js`. Copy to `docs/` at deploy time.

**Node counts:** 6 priority bridges · 3 referenced bridges · 16 tools · 16 sketches = 41 nodes · 44 edges

**One shared node:** `color-from-position` (sketch) is linked from both `color-numbers-become-feeling` (col 3) and `map-range-translator` (col 4). It carries `col: 3.5` and `shared: true` in the data. Position it centered between those two columns in the layout.

**Node visual vocabulary:**
- Bridge (priority): bold hexagon, `--accent` red border, Fraunces label
- Bridge (ref): small hexagon, `--ink-light` border, lighter weight
- Tool: rounded rectangle card, left border colored by suit token
- Sketch: circle, filled with suit token color at 30% opacity, suit token border

**Suit token colors** (from `site.css`):
- marks `✦` → `--gold` (#f5a800)
- motion `◎` → `--highlight` (#e07a5f)
- systems `⬡` → `--success` (#7f9d7a)
- open `☽` → `--purple` (#7a5ea8)

**Edge styles:**
- `rel: "tool"` or `rel: "sketch"` → solid line, `--line` color, arrow at target
- `rel: "bridge"` → dashed line, `--accent` color, arrow at target

**Layout recommendation — swimlane grid (hand-positioned):**

Three horizontal bands, 6 columns. Column order matches the data's `col` field (1–6):

```
Band 1 (top):    BRIDGES   ⬡ ⬡ ⬡ ⬡ ⬡ ⬡
Band 2 (middle): TOOLS     ▭ ▭ ▭ ▭ ▭ ▭
Band 3 (bottom): SKETCHES  ◉ ◉ ◉ ◉ ◉ ◉
```

Referenced bridges (events-sketches-listen, distance-becomes-behavior, arrays-loops-as-system) appear as small hexagons anchored outside the 6-column grid — left of col 1, right of col 6, or below their primary bridge — connected by dashed lines.

`color-from-position` sits at col 3.5 in band 3, straddling cols 3 and 4.

Bridge-to-bridge cross-links (e.g., noise → map, color → map) run horizontally across band 1 as dashed arcs above the hexagons.

Rationale: swimlane makes the pedagogical sequence spatially legible (bridge teaches → tool practices → sketch remixes), fits a poster/poster-grid register, and is straightforward to implement in SVG without a physics library. Force-directed was rejected — it would cluster by edge density (noise and map are heavily connected) and break the left-to-right camp-arc order.

**Codex tasks (after spec — spec is done):**

- Load `concept-map-data.js` (already in source root, synced to `docs/` by `deploy.sh`).
- Create `cc-fest-coding-camp-pages/concept-map.html`. Static SVG render. No D3.
- Render swimlane layout: 3 bands × 6 columns. Node positions derived from each node's `col` and `type` fields. `color-from-position` uses `col: 3.5`.
- Draw edges as SVG `<line>` or `<path>` elements before nodes so nodes paint on top. Solid lines for tool/sketch edges, dashed for bridge edges.
- Each node is an `<a href="...">` wrapping an SVG shape. Bridge = hexagon (`<polygon>`). Tool = rounded rect (`<rect rx>`). Sketch = circle (`<circle>`). Hovering shows a `<title>` tooltip with the full title.
- Referenced bridges render outside the 6-column grid at reduced opacity.
- Mobile (≤720px): hide SVG, show a plain `<ul>` fallback listing each bridge with its linked tools and sketches.
- Add a topbar link "Concept Map" to `index.html` alongside Sessions and About.
- Add `concept-map-data.js` to the source and run `./deploy.sh`.

---

## Phase 18 — Unit Circle Wave Sync tool

**Status: ✅ Done 2026-06-02**

A new ◎ Motion tool: a point orbits the unit circle while sine and cosine waves draw to the right in real-time sync. CC Fest has the Triangle-to-Circle-to-Wave bridge (concept) and the Sine + Cosine Motion Explorer (tool), but not the live synchronized animation joining them.

**Pattern: static HTML page.**

**Codex tasks:**

- Create `cc-fest-coding-camp-pages/tools/unit-circle-wave-sync/index.html`.
- Left panel: unit circle with orbiting point. Right panel: sine and cosine waves drawing live, with a vertical "now" cursor synchronized to the circle angle.
- Controls: speed, pause/play, toggle for angle value and coordinate readout.
- `teaching-note` and `try-next` to: `sine-cosine-motion-explorer`, `animation-explorer`; bridge `triangle-circle-wave-explorer`.
- Add homepage card: `<article class="tool-card suit-motion"` with `data-pathway="animation final"` `data-difficulty="extension"` and tags `sin cos unit-circle waves animation`. Place it inside the `#station-motion` station div.
- Update tool count in all count locations.
- Run `./deploy.sh`.

---

---

## Phase 19 — Tool presentation utilities (embed, save image, fullscreen, copy link)

**Status: ✅ Done 2026-06-02**

Four small, independent improvements to how tools behave in classroom settings. All behavior is delivered through `p5-export-helper.js` and a CSS addition to `tool-page.css`. No semantic per-tool HTML edits are required, but cache-busting the helper requires a mechanical script-tag version update across tool pages.

### 19a — Embed / projection mode

`?embed=1` in the URL adds a CSS class to `<body>` that strips everything except the canvas and its controls. Teachers project the embed URL; students use the normal URL.

**Codex tasks:**

- In `p5-export-helper.js` (or a new inline script in the tool page template): on `DOMContentLoaded`, check `new URLSearchParams(location.search).get('embed')`. If truthy, add `embed-mode` to `document.body.classList`.
- Add to `tool-page.css` (and the `<style>` block in `p5-export-helper.js` for tools that don't load `tool-page.css`):

```css
.embed-mode .tool-topbar,
.embed-mode .top,
.embed-mode .tool-rhythm,
.embed-mode .teaching-note,
.embed-mode .try-next,
.embed-mode .tool-footer { display: none !important; }
```

Note the two nav variants: `.tool-topbar` (JS-rendered and newer static tools) and `.top` (older static tools, sometimes on a `<nav>`, sometimes on a `<div>`). Both must be covered.

### 19b — Canvas action bar (Save Image + Fullscreen)

The existing `.p5-export-bar` attaches near code blocks. Canvas actions belong near the canvas. Add a separate `.canvas-action-bar` that attaches before or after the first visible `<canvas>` element on the page — independently of whether a code block is found.

**Codex tasks:**

- In `p5-export-helper.js`, after the existing `insertBar()` logic, add `insertCanvasBar()`:
  - Find the first visible `<canvas>` on the page. Do not use the first canvas blindly if it has zero layout size.
  - Create a `.canvas-action-bar` div with two buttons: "Save Image" and "⛶ Fullscreen."
  - Insert it `afterend` relative to the canvas (or its immediate wrapper if the canvas is inside `.card` or `.panel`).
- **Save Image** button: `canvas.toDataURL('image/png')` → `a.download = 'cc-fest-tool.png'; a.href = dataURL; a.click()`. Label: "Save Image."
- If `toDataURL()` throws because a canvas is tainted by external images/video/webcam data, show a short failure label ("Cannot save this canvas") and leave the page usable.
- **Copy link** button: use the existing `copyText()` helper already defined inside `p5-export-helper.js` (line 63). It has a `textarea` fallback for non-secure contexts. Do not call `navigator.clipboard.writeText` directly — reuse the helper.
- **Fullscreen** button: `canvas.requestFullscreen()`. Handle the case where the canvas is inside a wrapper — prefer `wrapper.requestFullscreen()` if the canvas is the only child of a `.card` or `.panel`. Label: "⛶ Fullscreen." On fullscreen exit (via `fullscreenchange` event), restore the button label.
- Style `.canvas-action-bar` to match `.p5-export-bar`: same font, border, pill-button shape. Position it flush right, same visual weight.
- Skip `insertCanvasBar()` if the page already has a `.canvas-action-bar` (idempotency guard).

### 19c — Copy page link

Add a "Copy link" button to the `.canvas-action-bar` (not the code bar). For now this copies the plain page URL with no state encoded — just `location.href`. The button label resets to "Copy link" after 2 seconds.

Once the canvas bar exists, this should call the existing `copyText(location.href)` helper so the same clipboard fallback is used everywhere.

**Do not** implement URL state encoding in this phase. That is Phase 20. The "Copy link" button here copies the bare page URL only.

### Phase 19 deploy

- Edit `p5-export-helper.js` in source (`cc-fest-coding-camp-pages/`).
- **Cache busting is a non-trivial mechanical task.** All 66 source tool pages currently load `p5-export-helper.js?v=20260505-workshop-export`. Update the version string with a scripted regex pass across `cc-fest-coding-camp-pages/tools/`:
  ```sh
  find cc-fest-coding-camp-pages/tools -name "index.html" \
    -exec sed -i '' 's/p5-export-helper\.js?v=[^""]*/p5-export-helper.js?v=20260619-presentation/g' {} \;
  ```
  Verify the count matches (should update 66 files) before running `./deploy.sh`.
- Smoke-test embed mode on: one JS-rendered tool (`animation-explorer`), one older static tool (`noise-lab`), one tool with a `.top` wrapper (`assets-preload-helper`).
- Smoke-test Save Image and Fullscreen on a p5 canvas tool and a plain `<canvas>` tool.

---

## Phase 20 — Shareable tool state (URL-encoded slider values)

**Status: ✅ Done 2026-06-02**

Encode named control values (sliders, selects, checkboxes) into the URL so a specific tool configuration can be shared as a link. A teacher sets up a demo, clicks "Copy link," and pastes the URL into their session notes. Students open it pre-configured.

**Implementation constraints (from code review):**

- Use `history.replaceState()`, not `location.hash` assignment. Direct hash assignment creates a browser-history entry per slider change — 50 slider moves = 50 back-button presses. `history.replaceState(null, '', '#' + params)` replaces the current history entry silently.
- Debounce state writes. On `input` events, wait 300ms before writing to the URL. Do not write on every `mousemove`.
- Preserve the `?embed=1` query param alongside the hash state. When building the URL to write, use `location.search` + `'#' + encodedState` so embed mode survives a shared link.
- Namespace keys. Use short but non-colliding key names per tool (e.g., `speed`, `hue`, `cells`). Do not use generic names like `v1`, `v2`.

**Scope: JS-rendered workshop tools first.**

The 11 JS-rendered tools have their controls generated from a single data structure in `workshop-tool-pages.js`. Instrumenting one place wires up all 11. Static tools require per-file edits and are out of scope for v1.

**Codex tasks:**

- Create `cc-fest-coding-camp-pages/tool-state-utils.js` as a **plain script (not a module)**. Existing tool scripts are IIFEs; do not use `export`/`import`. Expose a global: `window.CCFestToolState = { syncToURL, loadFromURL }`.
  - `syncToURL(inputs)` — takes a NodeList or array of named form controls. On `input` event (debounced 300ms), serializes `{ name: value }` pairs into a hash string using `URLSearchParams`. Calls `history.replaceState(null, '', location.search + '#' + params.toString())`.
  - `loadFromURL(inputs)` — reads `location.hash`, parses it as `URLSearchParams`, sets each matching named control's value. Dispatches an `input` event on each changed control so the tool redraws.
- `deploy.sh` syncs all root `*.js` files automatically — no deploy script changes needed. Verify the file appears in `docs/` after the first deploy.
- In `workshop-tool-pages.js`, after controls are rendered, call `CCFestToolState.loadFromURL(...)` then `CCFestToolState.syncToURL(...)`. Add `<script src="../../tool-state-utils.js?v=20260619-state"></script>` to the 11 JS-rendered workshop tool shell pages (or load it dynamically from `workshop-tool-pages.js` before the render function runs).
- Update the "Copy link" button added in Phase 19c so it now copies `location.href` after state has been synced (no change to the button logic — the URL already contains the state because `syncToURL` runs on every control change).
- After Phases 14, 15, 16, and 18 ship their static tools, add the `tool-state-utils.js` script tag and wire their named controls individually.

**Do not:**

- Instrument all 66 static tools in one pass. That becomes a maintenance swamp.
- Use `localStorage` for state. State belongs in the URL, which is shareable. `localStorage` is per-device and invisible.
- Add state sync to concept bridge pages or starter sketch pages. Tools only.

---

## Revised roadmap (full)

| Phase | Work |
|---|---|
| 1 ✅ | Rhythm rollout (110 pages), count audit (66/44), maker-credit, dot-grid hero background. |
| 2A ✅ | Homepage signal: maker-credit, orientation through path/rows/About, footer language. |
| 2B ✅ | Representative templates: noise-smooth-randomness bridge, noise-lab tool, mini-generative-poster-seed — all with try-next cross-links and teaching-note panels. |
| 3 ✅ | Resource relationships v1: 6 complete bridge-to-tool-to-sketch paths. |
| 4 ✅ | Tag-based related-resource fallback using existing metadata. |
| 5 ✅ | Bridge index "Start here" pathway and homepage "Best first" curated row. |
| 6 ✅ | Teacher move panels across foundational bridges and all JS-rendered workshop tools. |
| 7 ✅ | Tool copy pass and selective "Break it on purpose" prompts. |
| 8 ✅ | Reusable visual components in a small component CSS layer. |
| 9 | Camp Archive real-image fill, blocked on permission-safe images. |
| 10 ✅ | About page and footer polish. |
| 11 ✅ | Generative poster engine — /sessions/ listing + template poster page. |
| 12 ✅ | Filter system: pathway + difficulty — fixes live bug (pathway never worked), adds difficulty (beginner/extension/capstone), builds shared filter state. |
| 13 ✅ | Preview curation polish — audit coverage gaps, harden pause/resume, extend to new tools from 14/15/18. |
| 14 ✅ | "How does it grow?" — static ◎ Motion tool comparing 5 quantity types side-by-side. |
| 15 ✅ | Bezier curve sculptor — static ✦ Marks tool, drag control points + code generation. |
| 16 ✅ | Distribution visualizer — falling-dots accumulation for `random()` / `randomGaussian()` / `noise()`. |
| 17 ✅ | Concept map — swimlane SVG graph, 41 nodes, 44 edges, mobile list fallback. |
| 18 ✅ | Unit Circle Wave Sync — orbiting point + live sin/cos waves, synchronized. |
| 19 ✅ | Tool presentation utilities — `?embed=1`, canvas Save Image / Fullscreen / Copy link via `p5-export-helper.js`. |
| 20 ✅ | Shareable tool state — `tool-state-utils.js`, URL hash sync via `history.replaceState()`, 11 JS-rendered tools. |
| 20 | Shareable tool state — `tool-state-utils.js`, URL hash encoding via `history.replaceState()`, debounced. 11 JS-rendered tools first. **Codex.** |

---

## Next work plan

*Updated 2026-06-02 — both improvement arcs are complete.*

### The only open roadmap phase

Phase 9 is the only item left. It is purely a content/design task:

- Do not rebuild the archive strip until real, permission-safe images are available.
- For each candidate image, collect a title, date or session, credit, permission context, caption, and source file.
- Use `.poster-proof` and visible `.artifact-caption` styles from `site-components.css` when the archive returns.
- No placeholder slots — only add a slot when the real image is in hand.

### New tools (Phases 21+)

When adding new workshop tools beyond the current 70:

- Use the static HTML page pattern (reference `bezier-curve-sculptor` or `unit-circle-wave-sync` as templates).
- Add `p5-export-helper.js?v=...` for the canvas action bar and code export.
- Add `tool-state-utils.js?v=...` if the tool has named range or select controls worth sharing.
- Add the homepage card inside the correct station div with `suit-*` CSS class, `data-pathway`, `data-difficulty`.
- Update tool count in all 6 locations (meta, OG, Twitter, hero strong, stat bar, gallery header).
- Register a preview slug in `preview-sketches.js`.
- Run `./deploy.sh`.

### Sessions system

- Add future sessions by appending entries to the existing `SESSIONS` array in `/sessions/index.html`.
- Create each real session page by copying `sessions/template/` into a session-specific directory.
- Wire the relevant tools, concept bridges, and starter sketches for that session.

### Concept map extensions

- Phases 14–18 tools are NOT yet in `concept-map-data.js` — they were added after the map data was authored.
- When the map is next revisited, add the four new tools (how-does-it-grow, bezier-curve-sculptor, distribution-visualizer, unit-circle-wave-sync) as nodes to `concept-map-data.js` and link them from the appropriate bridge nodes.

### Ongoing hygiene

- Keep `cc-fest-coding-camp-pages/` and `docs/` in sync via `./deploy.sh` — never edit `docs/` directly for normal changes.
- Bump JS/CSS cache keys whenever a shared file changes.
- Smoke test on desktop and mobile after any push.
- Leave `.claude/` uncommitted.

---

## Test plan

Before treating this plan as current, verify:

- The plan no longer contains outdated rhythm-strip counts or statuses that conflict with current work.
- Cross-link work is explicitly incremental, not all-or-nothing.
- No recommendation requires a backend, CMS, user account system, or non-static infrastructure.
- The "What this site is" band is optional and strip-like, not a SaaS feature row.
- `maker-credit`, teacher move, break-it prompts, best-first row, and tag fallback recommendations are all present.
- Camp Archive image fill remains in the plan but is scoped separately and depends on real permission-safe images.

When implementing site changes from this plan, also verify:

- Homepage works at desktop and mobile widths.
- One bridge, one tool, and one starter page render the new template patterns correctly.
- Search and filters still work.
- Related-resource links resolve.
- No horizontal overflow appears on mobile.
- Copy remains plainspoken, beginner-safe, and teacher-useful.

---

## Key design references

- `ccfest_design_language_agent_guide.md` - full design language spec, CSS tokens, component anatomy, aesthetic principles, and archive evidence.
- `docs/site.css` - main homepage/shared stylesheet.
- `docs/tool-page.css` - tool page template stylesheet.
- `docs/concept-bridges/concept-bridge.css` - bridge page stylesheet.
- `docs/workshop-tool-pages.js` - generated workshop tool data/rendering.
- `docs/starter-seed-pages.js` - generated starter sketch data/rendering.
- CC Fest poster archive - public/event posters show the core rule: the generative sketch is the visual, and maker credits matter.
