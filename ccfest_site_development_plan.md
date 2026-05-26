# CC Fest Coding Camp Tools - Site Development Plan

*Last updated: 2026-05-26*

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

Actual library: **21 bridges · 66 workshop tools · 44 starter sketches · 5 sessions**

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

The major site-improvement arc is now complete. The only remaining roadmap item is Phase 9, which is content/design work rather than site infrastructure.

---

## Next work plan

### Repo hygiene

- Keep the repo synced with `origin/main` before starting the next site pass.
- Leave `.claude/` uncommitted unless it becomes an intentional part of the workflow.
- After future edits, verify that `cc-fest-coding-camp-pages/` and `docs/` still match everywhere they are meant to match.

### Phase 9 prep: Camp Archive

- Treat Phase 9 as the only open roadmap phase.
- Do not rebuild the archive strip until real, permission-safe images are available.
- For each candidate image, collect a title, date or session, credit, permission context, caption, and source file.
- Use `.poster-proof` and visible `.artifact-caption` styles when the archive returns.

### Sessions system next step

- Add future sessions by appending entries to the existing `SESSIONS` array in `/sessions/index.html`.
- Create each real session page by copying `sessions/template/` into a session-specific directory.
- Replace template resource links with the relevant tools, concept bridges, and starter sketches for that session.

### Public link QA

- Verify the Notion footer links are public before treating them as finished public navigation.
- Replace private or brittle Notion links with public share URLs, local site pages, or no link until the resource is ready.
- Check homepage, About, Sessions, concept bridge, tool, and starter sketch links after each public navigation pass.

### Final polish pass

- Bump CSS or JS cache keys whenever public-facing CSS or JavaScript changes.
- Smoke test the local site before pushing and the GitHub Pages site after pushing.
- Prioritize visible regressions, broken links, mobile overflow, and confusing public copy over new feature work.

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
