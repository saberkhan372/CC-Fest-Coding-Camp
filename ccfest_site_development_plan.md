# CC Fest Coding Camp Tools - Site Development Plan

*Last updated: 2026-05-25*

This document captures the development roadmap for the Creative Coding Tools website, grounded in Saber Khan's design practice, the CC Fest aesthetic tradition, and the current state of the codebase.

The plan prioritizes **visible, useful navigation and teaching improvements** without letting metadata, cross-linking, or infrastructure become a rabbit hole.

Core direction:

- Cross-links across **Bridges -> Tools -> Sketches** are the highest-value change.
- Start with 5-6 complete examples, then expand.
- Keep "Teacher move" and "Break it on purpose" tightly scoped.
- Add the hero maker-credit immediately.
- Treat homepage and representative page templates as parallel work.
- Keep the Camp Archive image fill and generative poster engine in the roadmap, but scoped separately.

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

Five artifact slots exist in the Camp Arc section with visitor-facing labels. HTML comment is internal-only. No authoring language visible to visitors. Real images to be added in Phase 9.

---

## Phase 2A - Homepage signal

**Status: Next**

This track handles fast homepage improvements that make the page feel more like a CC Fest poster and less like a product index.

### Hero maker-credit ✅ Done

`<p class="maker-credit">CC Fest · 2026</p>` — bottom-right of the hero, 11px DM Mono, `ink-light`. Shipped in Phase 1.

### Reframe "What this site is" as optional and restrained

The three-line framing is useful only if it helps first-time visitors who arrive confused. Do not add it as a feature row.

If included, style it as a tight horizontal strip like the current `.hero-steps`, not as cards:

- A free workshop archive.
- A tool shelf for learning p5.js.
- A place to remix and teach from.

Do not repeat the hero lede. Do not turn it into SaaS-style value props.

### Footer language

The footer should say something real and short:

> CC Fest is a free creative coding community for educators and learners. Sessions happen throughout the year.

Keep links direct: CC Fest, Notion, GitHub, contact/sign-up if available.

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

**Status: After Phase 3**

Use tags as a fallback so every page can suggest something useful without hand-authoring every relationship.

Behavior:

- Show hand-authored links first.
- If no hand-authored links exist, show resources that share tags.
- Keep recommendations short: 3-5 items is enough.
- Do not show huge auto-generated lists.

Implementation direction:

- Extend existing JS data objects rather than creating a separate data system.
- Keep data co-located with rendering logic in `workshop-tool-pages.js` and `starter-seed-pages.js`.
- Add equivalent bridge metadata only where bridge rendering needs it.

Fields to add where useful:

```js
relatedBridges: []
relatedTools: []
relatedSketches: []
firstChangePrompt: ""
teachingPrompt: ""
```

A separate JSON file is not necessary unless the current JS object structure becomes painful to maintain.

---

## Phase 5 - Bridge index "Start here" and homepage "Best first"

**Status: After representative templates**

### Bridge index "Start here" pathway

Keep this from the original development plan.

Add a recommended first path of 5-6 concept bridges. Display it as a numbered Fraunces list, not another grid.

Use copy like:

> If you're new, start here.

Each item should link to:

- The bridge.
- One matching tool.
- One matching starter sketch when available.

Store the list as one editable JS array of slugs, not embedded throughout HTML.

### Homepage "Best first" row

Add a small curated beginner entry point near the resource sections.

Rules:

- Store as one editable array of 5-6 slugs.
- Put the array near the top of `site.js` or in a small `curated.js`.
- Render one "Best first" row.
- Do not hard-code the same list in multiple HTML locations.

This is a small feature with high orientation value.

---

## Phase 6 - Teacher move panels

**Status: Expand after templates prove the pattern**

Add to bridge pages and featured/standard tool pages, but keep the scope strict.

Each panel has exactly three items:

- **Prompt:** one classroom prompt.
- **Misconception:** one likely confusion.
- **Ask:** one question to ask students.

Do not expand this into a full curriculum block. If it gets bigger than three items, it becomes a different product.

Good example:

- **Prompt:** Make the ball stop, then make it start again.
- **Misconception:** Students may think speed is the object instead of a value controlling position.
- **Ask:** What number changed, and what did your eye notice first?

---

## Phase 7 - Tool copy pass and selective "Break it on purpose"

**Status: Ongoing**

### Tool subtitles

Rewrite tool subtitles so they make a claim about what the learner can do, not just what the function is.

- **Before:** Controls how opacity is applied to a shape.
- **After:** Change how visible anything is - 0 is invisible, 255 is solid, and everything in between is yours.

### Break it on purpose

Add these prompts only where an edge case teaches something real.

Good prompts:

- "Set speed to 0. What stops? What doesn't?"
- "Make alpha 0. Is the shape gone, or just invisible?"
- "Reverse the map range. What flips?"

Rules:

- Keep prompts short and tied to one edge case.
- Do not add one to every tool just to satisfy a pattern.
- Prefer surprising or counterintuitive results.

---

## Phase 8 - Reusable visual components

**Status: Low-scope, high reuse**

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

**Status: Separate content/design phase**

Keep the Camp Archive image fill in the roadmap, but do not let it block cross-linking and template improvements.

The current artifact slots can be filled with real public/event poster images when ready. Use the existing archive-wall pattern:

- Real image where public/permission status is clear.
- Labeled dashed slot where the artifact is missing or permission-dependent.
- Visible caption and credit for every real image.

This remains important because CC Fest is artifact-rich, but it is not the bottleneck for the next navigation/design push.

---

## Phase 10 - About page and footer polish

**Status: Lower priority than cross-links and representative templates**

The About page is still worth building, but it should not outrank the relationship/template work.

About page direction:

- One page.
- No tool grid.
- First-person from Saber's perspective when appropriate.
- What CC Fest is.
- Who it is for.
- What happens in a session.
- How to join or follow along.
- One public/permission-safe session image if available.

Footer polish remains a low-scope improvement:

- Plain language.
- Useful links.
- No generic brand boilerplate.

---

## Phase 11 - Generative poster engine

**Status: Aspirational and separate**

The long-term aspiration remains strong: every CC Fest session can have a generated poster page, and the poster is produced by a p5.js sketch that runs in the browser.

Possible implementation:

- A `/sessions/` directory.
- Each session has an `index.html` with date, location, facilitator, topic, and a `sketch.js`.
- The session listing page shows session tiles as generated poster thumbnails.
- Sessions link to the tools and bridges used.
- A Save button calls `saveCanvas()` so facilitators can download an event flyer.

Keep this separate from the near-term site improvement work. It should not delay resource relationships, page templates, or homepage orientation.

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
| 2A | Homepage: optional "What this site is" strip if needed; footer already done. |
| 2B ✅ | Representative templates: noise-smooth-randomness bridge, noise-lab tool, mini-generative-poster-seed — all with try-next cross-links and teaching-note panels. |
| 3 | Resource relationships v1: 5-6 complete bridge-to-tool-to-sketch paths. |
| 4 | Tag-based related-resource fallback using existing metadata. |
| 5 | Bridge index "Start here" pathway and homepage "Best first" curated row. |
| 6 | Expand relationships and teaching panels across remaining high-value pages. |
| 7 | Tool copy pass and selective "Break it on purpose" prompts. |
| 8 | Reusable visual components in a small component CSS layer. |
| 9 | Camp Archive real-image fill, kept as its own content/design phase. |
| 10 | About page and footer polish. |
| 11 | Generative poster engine, aspirational/separate. |

The first visible improvements should be: hero maker-credit, one complete bridge/tool/starter relationship path, and one representative page template of each type. That proves the direction before scaling it across the full library.

---

## Test plan

Before treating this plan as current, verify:

- The plan no longer contains outdated rhythm-strip counts or statuses that conflict with current work.
- Cross-link work is explicitly incremental, not all-or-nothing.
- No recommendation requires a backend, CMS, user account system, or non-static infrastructure.
- The "What this site is" band is optional and strip-like, not a SaaS feature row.
- `maker-credit`, teacher move, break-it prompts, best-first row, and tag fallback recommendations are all present.
- Camp Archive image fill and generative poster engine remain in the plan but are scoped separately.

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
