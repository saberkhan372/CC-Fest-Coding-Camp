# CC Fest Redesign Implementation Plan

This plan translates the `newdesignideas` explorations into a practical path for the existing CC Fest Coding Camp site.

The goal is not a React rewrite. The current site is a static GitHub Pages project with standalone HTML tools, shared CSS/JS, and `cc-fest-coding-camp-pages/` as the source of truth. The redesign should improve information architecture, browsing, and page clarity while preserving the working tool pages and the CC Fest teaching voice.

---

## Task ownership conventions

Every phase task is labeled:

- **Codex** — mechanical implementation: generating files, wiring JS, writing CSS, bulk edits, running scripts.
- **Claude** — judgment and authorship: design decisions, copy writing, metadata authoring, visual QA, CC Fest voice checks.
- **Both** — tasks that need a handoff: Codex builds the mechanism, Claude reviews and signs off.

---

## Design Decisions to Carry Forward

### 1. Catalog, Not Just Gallery

The strongest design direction is **B - Catalog**: calm, scannable, structured, and curriculum-aware. It makes the library feel like a teaching catalog rather than a pile of unrelated cards.

Carry forward:

- Hairline rules, tabular rhythm, large count numerals, restrained accent color.
- Clear top-level counts: 21 concept bridges, 70 workshop tools, 44 starter sketches.
- Search and filters as a first-class catalog tool.
- Session-aware browsing as a way into the library.

Do not blindly carry forward:

- Prototype counts that say 66 tools.
- React/Babel implementation details.
- Mojibake/glyph encoding from exported files.

### 2. Medium Content-Type Cards

Use the **Medium** treatment from `Content Types.html`.

All cards should share one family grammar:

- Type/kind lockup.
- Title.
- Short description.
- Anatomy cue (type-specific).
- Clear action verb.

Each type gets one distinctive cue:

- **Concept Bridge:** `idea -> function/pattern` crossing.
- **Workshop Tool:** slider/control strip cue.
- **Starter Sketch:** one-line code peek with the editable value highlighted.

This makes bridge/tool/sketch instantly distinguishable without making the grid noisy.

### 3. Shelves → Lens & Refine

The current homepage filter model uses stacked chip rows. The design exploration recommends replacing that with a learner-friendly browsing model:

- **Shelves landing:** curated browse rows for newcomers and common intents.
- **Lens & Refine catalog:** one primary organizing lens plus search/refinement.
- **Live counts and active tokens:** borrowed from the Faceted Rail prototype.

**Important:** Shelves and Lens & Refine are meant to *replace* the existing stacked chip rows, not add to them. See the Legacy Navigation Removal Plan below.

Primary facets:

- Type: Bridge, Tool, Sketch.
- Suit/category: Marks, Motion, Systems, Data, Open, Support.
- Level: Beginner, Extension, Capstone.
- Pathway: First time, Animation, Data, Games, Stuck, Final project.
- Session: 01–05, plus cross-session support.

### 4. Session Arc as Wayfinding Spine

The session arc should help people understand where a resource fits in the workshop journey without preventing nonlinear browsing.

Use it as:

- A catalog/session filter.
- A session landing page structure.
- A compact orientation strip on detail pages.

Avoid making it the only navigation model. The site should still say, "jump in anywhere."

---

## Plan Amendments (2026-06-02 review)

The following structural issues were identified in a code and plan review. Each is addressed in the updated phases below.

### A. Homepage navigation accumulation

Adding Phases 0–3 on top of existing navigation creates seven overlapping surfaces. The plan now includes explicit **Legacy Navigation Removal** tasks in Phases 2 and 3. Nothing ships publicly without a corresponding removal of what it replaces.

### B. Bridge metadata was incomplete at Phase 0

All 21 bridges were generated with empty `suit`, `level`, and `pathways` fields. This blocked Phases 2 and 3 from working correctly for bridges. Codex has added bridge metadata overrides to the generator (see log). This is now a **Phase 0 completion requirement** that must pass before Phase 2 shelves are deployed publicly.

### C. Typography scope is constrained

Phase 5 now specifies that any font change is **catalog-surface-only** and must be reviewed against the CC Fest design language guide before implementation. Inter Tight is a candidate for narrow catalog labels only — not headlines or body copy, which stay Fraunces/DM Sans.

### D. Phase 4 (Session Arc) moved earlier

Sessions are a live content gap: the sessions page shows only a template, but the homepage promises "5 sessions." Phase 4 is now sequenced after Phase 3 and before Phase 5, since it addresses a real visitor problem and doesn't depend on the visual polish work.

### E. Phase 6 broken into sub-phases

Phase 6 was scoped to touch 160+ pages at once. It is now broken into 6a–6d with explicit page counts and a staged rollout.

### F. Catalog regeneration rule added to deployment

`scripts/generate-catalog-data.mjs` must be run as part of the deploy workflow whenever `index.html` changes. Added to Deployment Notes.

### G. Design quality gate added to all phases

Every phase acceptance checklist now includes a CC Fest voice check drawn from the design language guide.

---

## Legacy Navigation Removal Plan

Before the redesign is complete, the homepage will temporarily have overlapping navigation. This table tracks what each legacy component becomes and when it is removed.

| Legacy component | Status | Replaced by | Remove in |
|---|---|---|---|
| `.beginner-path` 6-entry path | Keep for now — useful orientation | Shelf "First time with p5" + Phase 4 session arc | Phase 2 completion |
| `.best-first` row | Keep — 4 curated cards | Elevated first shelf in Phase 2 | Phase 2 completion |
| Suit chip row (`.suit-filter-bar`) | Keep during Phase 3 | Lens bar + suit facet inside Lens & Refine | Phase 3 completion |
| Pathway chip row (`.pathway-filter-bar`) | Keep during Phase 3 | Shelf "Show all" + pathway facet | Phase 3 completion |
| Difficulty chip row (`.difficulty-filter-bar`) | Keep during Phase 3 | Level facet inside Lens & Refine | Phase 3 completion |

**Rule:** No new navigation surface ships publicly until the legacy surface it replaces is removed from the same deploy. Intermediate states with both surfaces visible are acceptable in source during development, but not in a public deploy.

---

## Implementation Strategy

Implement in phases. Each phase should be shippable on its own and synced from `cc-fest-coding-camp-pages/` into `docs/` before publish.

---

## Phase 0 — Foundation and Inventory

**Status: ✅ Complete.**

Purpose: establish a reliable data model before touching the visual system.

### Codex tasks

- [x] Create `scripts/generate-catalog-data.mjs`.
- [x] Generate `cc-fest-coding-camp-pages/catalog-data.js` with all 135 items: 21 bridges, 70 tools, 44 sketches.
- [x] Add `suit`, `level`, `pathways`, `session`, `summary`, `tags`, `group` fields to every item.
- [x] Add bridge metadata overrides so all 21 bridges have non-empty `suit`, `level`, `pathways`.
- [x] Fix sketch group assignments (derive from suit, not last-seen station heading).
- [x] Replace placeholder `codePeek` values (`"agents = changeMe;"` style) with real examples or tag-/suit-specific fallbacks.
- [x] Add static audit checks for catalog counts, required metadata, learning metadata, and broken catalog URLs.
- [x] Add audit check that blocks placeholder `changeMe`-style peeks.
- [x] Load `catalog-data.js` on the source homepage.
- [x] Add `node scripts/generate-catalog-data.mjs` to the deploy workflow so catalog-data.js never drifts from index.html.
- [x] **Bug fix:** `lerp-follow-seed` appears in the catalog as both a tool (titled "How Does It Grow?") and a sketch ("lerp() Follow Seed"). The tool entry has the wrong title and likely the wrong URL. Investigate the homepage card — the `how-does-it-grow` tool card may have an incorrect href pointing to `tools/lerp-follow-seed/` instead of `tools/how-does-it-grow/`. Fix both the HTML card and the generated catalog.
- [x] Apply 3 bridge pathway corrections from Claude's review (see Claude tasks below) by updating the override map in `generate-catalog-data.mjs` and regenerating.

### Claude tasks

- [x] Review all 21 bridge `suit`, `level`, and `pathways` assignments. **Approved with 3 corrections:**
  - `arrays-one-thing-to-many-things`: pathways `[first-time, data]` → `[first-time, animation]`. Arrays are foundational everywhere; data work is the data-as-argument bridge's territory.
  - `world-vs-local-coordinates`: pathways `[first-time, animation]` → `[animation]`. Coordinate transforms/push/pop are not truly first-time concepts; keep only animation.
  - `conditionals-code-makes-choices`: pathways `[stuck, games]` → `[first-time, stuck, games]`. if/else is fundamental enough to appear on the first-time shelf.
  - All other 18 bridge assignments: **approved as generated.**
- [x] Review sketch `codePeek` values for the 12 priority sketches. **Approved.** Real, specific code for all priority entries: `gameState = 'play'`, `particles.push(new Particle(mouseX, mouseY))`, `let d = dist(mouseX, mouseY, x, y)`, `x += speedX`, `x = cos(angle) * radius`, `x += keyIsDown(RIGHT_ARROW) ? speed : 0`, etc. Minor: two sketches share `points.push(createVector(mouseX, mouseY))` — acceptable for now, worth diversifying in a later content pass.
- [x] **Decide on catalog regeneration:** Automatic on every deploy via `deploy.sh`. Codex has already implemented this. Decision documented in Deployment Notes.

### Acceptance criteria

- `node scripts/audit-static.mjs` passes with 21/70/44 split.
- No bridge item has empty `suit`, `level`, or `pathways`.
- No sketch item has a `changeMe`-pattern `codePeek`.
- `catalog-data.js` regeneration is covered by a documented rule.
- CC Fest voice check: the catalog data structure is invisible to visitors — no gate needed here.

---

## Phase 1 — Medium Card System

**Status: ✅ Complete. Browser QA passed 2026-06-03.**

Purpose: improve card readability and make content types distinct-but-related.

### Codex tasks

- [x] Add `catalog-card`, `catalog-card--bridge`, `catalog-card--tool`, `catalog-card--sketch` class hooks at runtime.
- [x] Inject anatomy cue per card type: bridge crossing, tool slider strip, sketch code peek.
- [x] Update CTA language: Bridge → "Understand the idea", Tool → "Play before you read", Sketch → "Change one value".
- [x] Add cue styles to `site.css`.
- [x] Add suit CSS variables (`--suit-color`, `--suit-border`, `--suit-bg`) to each `.suit-*` rule so tool cue track and dots use the correct suit color instead of defaulting to `--accent` red.

### Claude tasks

- [x] Browser QA: open the homepage, verify that bridge/tool/sketch cues are visually distinct and readable at card density.
- [x] Check that cue language and anatomy feel workshop-like, not tech-catalog. Ask: does a beginner understand what the cue is telling them?
- [x] Sign off on sketch code peeks for 5 representative sketches from different suits.

### Acceptance criteria

- Bridge, tool, and sketch cards are visually distinguishable by cue alone in a 3-column grid scan.
- Suit cue track color matches the card's suit (not all red).
- CTA text is correct per type.
- Keyboard and screen-reader behavior does not regress.
- Static link audit still passes.
- CC Fest voice check: cues feel like workshop handout labels, not database fields.

---

## Phase 2 — Shelves Landing

**Status: ✅ Complete. Browser QA passed 2026-06-03. Legacy navigation removed and deployed.**

Purpose: give newcomers a browse-first entry point before asking them to operate filters.

**Prerequisite: Phase 0 bridge metadata review (Claude task) must be complete.**

### Codex tasks

- [x] Render "Browse by goal" shelves from `window.CCFestCatalog` pathway metadata.
- [x] Each shelf shows up to 4 resources (1 bridge, 1 tool, 1 sketch + 1 extra if available).
- [x] "Show all" shelf buttons activate the existing pathway filter and scroll to the catalog.
- [x] Responsive shelf grid: 2-column → 1-column at 640px.
- [x] Once Claude approves Phase 2 removal plan: remove `.beginner-path` and `.best-first` from the homepage and their rendering code from `site.js`.

### Claude tasks

- [x] Browser QA: verify that each shelf shows at least one bridge (requires bridge pathway metadata to be correct), at least one tool, and at least one sketch.
- [x] Check shelf labels and notes — do they sound like CC Fest invitations or like filter labels? Rewrite any that sound like database categories.
- [x] Decide: does "Browse by goal" fully replace the existing "Where to start" path and "Best first" row, or does one of them stay in a different form? Document the decision and schedule the removal.
- [x] Review "Browse by goal" heading — is there a warmer phrase that fits CC Fest voice? (e.g. "What do you want to make?" or "Start with a goal.")

### Acceptance criteria

- Every active pathway shelf includes at least one bridge item.
- "Show all" activates the correct pathway filter.
- `.beginner-path` and `.best-first` are removed before public deploy (or removal is explicitly scheduled with a rationale for keeping them temporarily).
- Mobile: shelves stack cleanly, no horizontal overflow.
- CC Fest voice check: shelf headings sound like teaching prompts, not navigation labels.

---

## Phase 3 — Lens & Refine Catalog

**Status: ✅ Complete. Browser QA passed 2026-06-03. Chip rows removed and deployed.**

Purpose: replace stacked chip rows with a coherent catalog interaction.

### Codex tasks

- [x] Add live filter status row with resource count and removable active-filter tokens.
- [x] Add "Organize by" lens bar: Type, Category, Session, Level, Goal.
- [x] Render grouped catalog panel from `window.CCFestCatalog` respecting active filters.
- [x] Lens panel shows up to 6 items per group with "+ N more" footer.
- [x] Add `scripts/audit-catalog-lens.mjs` to smoke-test grouping logic.
- [x] Make the lens panel default to collapsed / hidden on page load. Show only when a lens button is clicked or a filter is active. This avoids an overwhelming 135-item dump on first visit.
- [x] Once Claude approves Phase 3 removal plan: remove the suit, pathway, and difficulty chip rows from `index.html` and their button-rendering code from `site.js`. The lens bar and token row become the single filter surface.

### Claude tasks

- [x] Browser QA: click through all 5 lens views (Type / Category / Session / Level / Goal). Verify each one groups items sensibly and no group is empty or misleadingly named (e.g. "Uncategorized" after bridge metadata fix).
- [x] Browser QA: activate filters from the chip rows, then from shelf "Show all" buttons, confirm tokens appear and removal works.
- [x] Decide: what does the lens panel look like when nothing is filtered — should it show a summary row (counts only) rather than full item grids? Or stay hidden until activated?
- [x] Approve or revise the chip-row removal. Confirm the lens bar genuinely replaces all three chip rows before they are removed.
- [x] CC Fest voice check on group labels: "Uncategorized", "Unleveled", "No goal tag" are fallback strings that should never be visible to a visitor after bridge metadata is complete. Verify they don't appear.

### Acceptance criteria

- Lens panel is hidden on page load; visible only after user interaction or active filter.
- All 5 lens views show meaningful groups with no empty-label fallback text visible.
- Filter tokens appear and clear correctly for suit, pathway, difficulty, and search.
- Suit chip row, pathway chip row, and difficulty chip row are removed before public deploy (or removal is explicitly scheduled).
- Mobile: filter status row and lens bar wrap cleanly, no overflow.
- CC Fest voice check: lens panel feels like a teaching catalog, not a database query interface.

---

## Phase 4 — Session Arc

**Status: ✅ Complete. Browser QA passed 2026-06-03. Embed strip fix deployed.**

Purpose: make the five-session curriculum visible across the site and build real session pages.

The homepage says "5 SESSIONS." The sessions page currently shows only a template. This phase builds the actual session catalog.

### Authored session metadata (Claude — complete)

Use this as the `SESSIONS` array in `sessions/index.html`. The extended fields (`suitGlyph`, `suitId`, `anchorBridge`, `featuredTools`, `featuredSketches`) are new — Codex should add them to the data object and use them to render session card detail and the catalog "In this session" strips.

```javascript
const SESSIONS = [
  {
    id: '01',
    href: '01/',
    label: 'Session 01',
    title: 'Your Canvas, Your Voice',
    subtitle: 'Make your first marks and find your canvas voice.',
    topic: 'Your Canvas,\nYour Voice',
    date: '— 2026 —',
    accent: '#f5a800',   // --gold
    seed: 1001,
    suitGlyph: '✦',
    suitId: 'marks',
    anchorBridge: 'color-numbers-become-feeling',
    featuredTools: ['coordinate-system-explorer', 'interactive-shape-explorer', 'shape-and-color-explorer'],
    featuredSketches: ['draw-your-name-seed', 'hsb-color-seed', 'code-postcard-from-my-world']
  },
  {
    id: '02',
    href: '02/',
    label: 'Session 02',
    title: 'Things That Move, Things That Listen',
    subtitle: 'Build things that move, react, and respond.',
    topic: 'Things That Move,\nThings That Listen',
    date: '— 2026 —',
    accent: '#e07a5f',   // --highlight
    seed: 1002,
    suitGlyph: '◎',
    suitId: 'motion',
    anchorBridge: 'how-p5-thinks-about-time',
    featuredTools: ['animation-explorer', 'map-explorer', 'if-else-decision-studio'],
    featuredSketches: ['bouncing-ball-starter', 'lerp-follow-seed', 'framecount-animation-seed']
  },
  {
    id: '03',
    href: '03/',
    label: 'Session 03',
    title: 'Patterns, Systems, and What They Say',
    subtitle: 'Let the code repeat, branch, and think for itself.',
    topic: 'Patterns, Systems,\nand What They Say',
    date: '— 2026 —',
    accent: '#7f9d7a',   // --success
    seed: 1003,
    suitGlyph: '⬡',
    suitId: 'systems',
    anchorBridge: 'noise-smooth-randomness',
    featuredTools: ['for-loop-stepper', 'noise-lab', 'rows-and-columns'],
    featuredSketches: ['generative-tile-pattern-seed', 'wander-agent-seed', 'noise-walker']
  },
  {
    id: '04',
    href: '04/',
    label: 'Session 04',
    title: 'Data as Material',
    subtitle: 'Turn numbers into pictures that mean something personal.',
    topic: 'Data as\nMaterial',
    date: '— 2026 —',
    accent: '#49627a',   // --slate
    seed: 1004,
    suitGlyph: '▦',
    suitId: 'data',
    anchorBridge: 'data-as-argument',
    featuredTools: ['bar-chart-studio', 'data-mapper', 'csv-loadtable-data-explorer'],
    featuredSketches: ['hover-data-bar-chart-seed', 'data-self-portrait-seed', 'parallel-arrays-bar-chart-seed']
  },
  {
    id: '05',
    href: '05/',
    label: 'Session 05',
    title: 'Open Studio',
    subtitle: 'Remix, share, reflect, teach.',
    topic: 'Open\nStudio',
    date: '— 2026 —',
    accent: '#7a5ea8',   // --purple
    seed: 1005,
    suitGlyph: '☽',
    suitId: 'open',
    anchorBridge: 'state-machines-sketches-have-modes',
    featuredTools: ['image-remix-studio', 'game-state-studio', 'pixel-webcam-remix-studio'],
    featuredSketches: ['game-state-starter', 'particle-system-seed', 'wander-agent-seed']
  },
  {
    id: 'template',
    href: 'template/',
    label: 'Template',
    title: 'Session Template',
    subtitle: 'Start here to build a new session →',
    topic: 'Your Session\nTopic Here',
    date: 'Month DD, YYYY',
    accent: '#c8391d',
    seed: 42
  }
];
```

**Notes for Codex when implementing:**
- Create `sessions/01/` through `sessions/05/` by copying and hardcoding from the template. Each session gets its own poster page.
- The `topic` field uses `\n` for a line break inside the poster canvas — preserve this.
- `anchorBridge`, `featuredTools`, `featuredSketches` are new fields. Use them to render the session card detail panel and the "In this session" strip. They do not need to be passed to the p5 poster sketch.
- Date is intentionally a placeholder (`'— 2026 —'`) until real session dates are confirmed. Keep it short enough to fit the poster.
- The template entry stays in the array last so the listing shows real sessions before the template.

### Codex tasks

- [x] Replace the current single-entry `SESSIONS` array in `sessions/index.html` with the 6-entry array above.
- [x] Create `sessions/01/` through `sessions/05/` directories, each with an `index.html` that hardcodes the session's data fields and renders the p5 poster.
- [x] Update the session listing card to show: session number, title, focus line (`subtitle`), anchor bridge pill, and featured tool/sketch pills — using the new metadata fields.
- [x] Add session filters to the homepage catalog "Session" lens view — wire to the session facets already in `CATALOG_FACETS`.
- [x] Add a compact "In this session" strip to tool/bridge pages that have a matching `session` field in the catalog — injected at page load from `window.CCFestCatalog`.
- [x] Add previous/next session navigation on each real session page (01→02→03→04→05, not the template).
- [x] Bump `sessions.css` cache key and add sessions directories to `deploy.sh` sync.

### Claude tasks

- [x] Author canonical session metadata for all 5 sessions — complete, see above.
- [x] Review first built session page (01): does it feel like a CC Fest workshop handout, not an event schedule?
- [x] Decide: do session pages link to the poster generator template, or is the poster only in `template/`? *(Decision: each real session links to its own poster; template stays in `template/` only.)*
- [x] Write "In this session" strip copy pattern — 1 sentence that orients a tool user ("Part of Session 03 — Patterns, Systems, and What They Say") without crowding the tool. Keep it link-only, not a full block.

### Acceptance criteria

- Sessions listing shows all 5 real sessions, not the template placeholder.
- Homepage count "5 SESSIONS" accurately reflects 5 real session pages.
- "Session" lens view groups resources into the correct 5 sessions.
- "In this session" strips are present on tools that have session metadata in the catalog.
- No session page is a dead end — each links back to the tool library.
- CC Fest voice check: sessions feel like a workshop arc, not a product launch timeline.

---

## Phase 5 — Catalog Visual Polish

**Status: ✅ Complete. Deployed and browser QA passed 2026-06-03.**

Purpose: move the visual language closer to Direction B while keeping CC Fest warmth.

**Typography constraint:** The Fraunces / DM Sans / DM Mono combination is the CC Fest identity. Do not replace it. Any typographic changes in this phase must be additive — new scales, tighter spacing, weight adjustments — not font substitutions. Inter Tight may only be considered for narrow catalog utility labels (e.g. facet count badges) with Claude sign-off, not for headlines, body, or card titles.

### Codex tasks

- [x] Implement spacing and density changes per Claude's direction — tighter vertical rhythm in catalog grids, larger count numerals in lens group headers.
- [x] Reduce visual weight of decorative card elements (border radii, shadows) in the catalog sections where they interfere with scanning.
- [x] Review every responsive breakpoint in `site.css` and `tool-page.css` — fix any layout where the catalog surfaces clip, overflow, or collapse awkwardly.
- [x] Run mobile smoke test (390px) on homepage, a representative bridge, a static tool, a JS-rendered tool, and the sessions page.

### Claude tasks

- [x] In the browser: mark up what feels too heavy, too decorative, or too generic about the current catalog surfaces. Write specific CSS notes rather than vague direction.
- [x] Font decision: Inter Tight removed from consideration permanently. Fraunces / DM Sans / DM Mono only. No catalog utility text exception needed.
- [x] Check that the homepage still reads as a CC Fest workshop archive at the end of this phase — not as a polished ed-tech catalog with CC Fest branding applied.

### Acceptance criteria

- Homepage/catalog sections feel calmer and more scannable than before.
- Tool pages retain workshop-friendly weight and warmth.
- No text overlap on mobile or desktop.
- Cards remain readable at dense grid sizes.
- Fraunces headlines and DM Sans body are unchanged. Any new font usage is documented and scoped.
- CC Fest voice check: the page still looks handmade and workshop-warm, not product-polished.

---

## Phase 6a — Detail Pages: JS-Rendered Workshop Tools (11 pages)

**Status: ✅ Complete. Browser QA passed 2026-06-03.**

Purpose: give the 11 JS-rendered workshop tools a consistent metadata block.

These share a single shell pattern via `workshop-tool-pages.js`, so one change covers all 11.

### Codex tasks

- [x] Add a metadata strip to the `workshop-tool-pages.js` rendered shell: type pill, suit glyph, level, session number, and pathway tags — drawn from `window.CCFestCatalog` if the item is found.
- [x] Add a "Related resources" go-next block at the bottom of each rendered page using the `relatedBridges`, `relatedTools`, `relatedSketches` fields already in the tool data.
- [x] Verify `?embed=1` mode still hides the metadata strip.

### Claude tasks

- [x] Browser QA on all 11 JS-rendered tools: metadata strip is correct, go-next links are accurate, embed mode is clean.
- [x] Check that the metadata strip doesn't crowd the tool itself — tools are the primary thing, metadata is secondary.

### Acceptance criteria

- All 11 JS-rendered tools show type, suit, level, session, and at least one pathway tag.
- Embed mode hides the metadata strip.
- Related resources section has no broken links.
- CC Fest voice check: metadata feels like a workshop label, not a database record.

---

## Phase 6b — Detail Pages: Static Workshop Tools (all 59 pages)

**Status: ✅ Complete. Full rollout deployed 2026-06-03, commit b479d99.**

Purpose: extend metadata blocks to static tool pages. Started with a 10-tool representative sample; expanded to all 59 in the same deploy as Phase 6c.

**Scope:** All 59 static workshop tool pages.

### Codex tasks

- [x] Identify 10 representative static tools (one or two per suit, covering both old `.top` and new `.tool-topbar` nav patterns).
- [x] Add a metadata strip and go-next block to each selected page, using `site-components.css` classes so the style is shared.
- [x] Report which static tool pages have the `.top` nav pattern vs `.tool-topbar` pattern — this affects where the metadata strip is placed.

### Claude tasks

- [x] **10 representative tools selected** — one or two per suit, covering both `.top` and `.tool-topbar` nav patterns, anchored to the sessions and concept map:
  - `noise-lab` (systems · `.top` nav · Session 03) — most-linked tool from concept map
  - `map-explorer` (motion · `.top` nav · Session 02) — priority bridge cross-link
  - `rgb-hsb-color-lab` (marks · static · Session 01)
  - `animation-explorer` (motion · `.tool-topbar` · Session 02)
  - `if-else-decision-studio` (systems · static · Session 03)
  - `simple-array-explorer` (systems · static · Session 03)
  - `for-loop-stepper` (systems · static · Session 03)
  - `bar-chart-studio` (data · static · Session 04)
  - `bounce-logic-explainer` (motion · `.top` nav · Session 02) — has old `.top` pattern
  - `image-remix-studio` (open · static · Session 05)
- [x] Browser QA the 10 pages: metadata strip correct, position correct, embed mode clean.
- [x] Decide whether to expand to all 59 static tools or a larger sample after reviewing the 10. **Decision: expand to all 59 — shipped in Phase 6c deploy.**

### Acceptance criteria

- All 59 static tools have metadata strips that match the JS-rendered tool pattern.
- No layout breakage on desktop or mobile.
- Static audit detects the same metadata fields on the sample pages.

---

## Phase 6c — Detail Pages: Concept Bridge Pages (21 pages)

**Status: ✅ Complete. Deployed 2026-06-03, commit b479d99. Teaching-note gap logged as Phase 6e.**

Purpose: add consistent metadata and go-next to all 21 bridge pages.

### Codex tasks

- [x] Add a metadata strip (type: Concept Bridge, suit, session, level) to each bridge page using `catalog-meta-strip.js` (updated to support both tools and concept-bridges).
- [x] Verify the 12 bridges that already have try-next panels are not duplicated — the new go-next block should complement, not repeat.
- [x] The 9 bridges with no try-next panels get a minimal auto-generated go-next block from catalog data.

### Claude tasks

- [x] Review the 9 bare bridges (no teaching panels currently): `arrays-loops-as-system`, `data-as-argument`, `data-in-drawing-out`, `modulo-counting-in-cycles`, `objects-data-plus-behavior`, `pixels-pictures-are-data`, `triangle-circle-wave-explorer`, `vectors-arrows-that-store-motion`, `world-vs-local-coordinates`.

  Decision: catalog-driven go-next blocks are sufficient for this phase. All 9 bridges have an authored `.pathways` "What's next" section with Practice / Remix / Related links. The absent `.teaching-note` sections (Prompt / Misconception / Ask) are a genuine gap but are authoring-heavy (9 x 3 cards). Logged as a future content pass — see Phase 6e below.

### Acceptance criteria

- All 21 bridges have a metadata strip. ✅
- None of the 12 bridges with existing try-next panels have duplicated sections. ✅
- The 9 bare bridges have at least a catalog-driven go-next block. ✅
- CC Fest voice check: bridge metadata strips are unobtrusive — they don't compete with the interactive bridge tool above them.

---

## Phase 6d — Detail Pages: Starter Sketches, About, Sessions

**Status: In progress.**

Purpose: complete the detail page system across remaining page types.

### Codex tasks

- [ ] Add metadata to JS-rendered starter sketch pages via `starter-seed-pages.js` (one change covers all 44).
- [x] Decide with Claude whether starter sketches get `p5-export-helper.js` injected from `starter-seed-pages.js` (the B7 open audit item). **Decision: do not inject the global helper. Add a sketch-canvas-only 2-button action bar: Save Image and Fullscreen. Keep the existing single p5 Editor button in the editor chrome; do not add a duplicate p5 Editor button to the canvas bar.**
- [ ] Update About page: verify topbar has Sessions and Map (already fixed in audit), add a short "What you'll find" summary card that reflects the current library counts from `window.CCFestCatalog`.
- [ ] Update sessions page to reflect Phase 4 real session data.

### Claude tasks

- [x] **Decide B7**: Starter sketch pages get a canvas-only action bar with **Save Image** and **Fullscreen**. No global `p5-export-helper.js` injection, no Copy link, and no duplicate p5 Editor button.
- [ ] Review About page copy — does it still reflect the current state of the site after the redesign?

### Acceptance criteria

- All 44 starter sketch pages have a metadata strip.
- B7 decision is made and documented. ✅
- About page reflects current library state.
- Sessions page reflects Phase 4 real session data.
- CC Fest voice check: sketch metadata is minimal — it helps learners know what kind of thing they opened, not categorize it.

---

## Phase 6e — Teaching Notes: Bare Bridge Content Pass (9 pages)

**Status: Not started. Blocked on authoring.**

Purpose: add `.teaching-note` sections (Prompt / Misconception / Ask) to the 9 concept bridges that have interactive tools but no facilitator guidance:
`arrays-loops-as-system`, `data-as-argument`, `data-in-drawing-out`, `modulo-counting-in-cycles`, `objects-data-plus-behavior`, `pixels-pictures-are-data`, `triangle-circle-wave-explorer`, `vectors-arrows-that-store-motion`, `world-vs-local-coordinates`

### Claude tasks

- [ ] Author 3 teaching-note cards (Prompt / Misconception / Ask) per bridge — 27 cards total. Write them like workshop handout callouts, not lesson plans.

### Codex tasks

- [ ] Once Claude authors the cards: add `.teaching-note` section HTML to each bridge page, matching the pattern in `noise-smooth-randomness/index.html:686–702`.
- [ ] Optionally upgrade `.pathways` "What's next" links to authored `.try-next` named tool/sketch lists if Claude provides specific resource lists per bridge.

### Acceptance criteria

- All 9 bridges have a `.teaching-note` section visible after the interactive canvas.
- Cards are warm and workshop-specific — no generic advice.
- CC Fest voice check: notes read like a facilitator whispering a move, not a teacher's edition footnote.

---

## Phase 7 — Filter Live Counts & Facet Upgrades (Direction 1)

**Status: Not started.**

Source spec: `newdesignideas/Filter Spec.html` and `Filter Spec.md`.

Purpose: bring the Phase 3 filter up to the full Direction 1 spec. The current filter has the lens bar, global search, removable tokens, and result count — but lacks live counts *on each facet chip* and the explicit AND-across / OR-within facet logic.

**What Phase 3 already delivered:** lens grouping, global search, active-filter tokens, result total, lens panel hidden on load.

**What this phase adds:**
- Live count badge on every facet chip ("Motion · 47") — the number shown is always *what you'll actually get*, not a static total. Options that would yield 0 results are disabled, preventing dead ends.
- AND across facets, OR within a facet — e.g. Marks *or* Motion, *and* Beginner.
- `data-type`, `data-category`, `data-level`, `data-session`, `data-tags`, `data-name` stamped as attributes on each card `<article>` element in `index.html` so the filter reads HTML directly rather than relying solely on the JS catalog object.

### Codex tasks

- [ ] Stamp `data-type`, `data-category`, `data-level`, `data-session`, `data-tags`, `data-name` on every `.tool-card` in `index.html` (can be generated from `catalog-data.js` values by the generator script).
- [ ] Update `countFor(key, value)` logic in the lens filter: for each chip, count how many cards match if that value is also selected, holding all other active facets fixed.
- [ ] Disable (not hide) chips whose count would be 0.
- [ ] Render live count as a badge inside each chip label.
- [ ] Verify AND-across-facets / OR-within-facet semantics are correct — run `audit-catalog-lens.mjs` after.

### Claude tasks

- [ ] Browser QA: activate two facets from different groups (e.g. Motion + Beginner) — confirm intersection logic. Activate two chips from the same group (e.g. Marks + Motion) — confirm union logic.
- [ ] Check that 0-result chip disabling is clear to a visitor ("this is unavailable" vs "this is broken").
- [ ] Confirm live counts feel like a teaching signal, not database noise. Would a beginner find them helpful or confusing?

### Acceptance criteria

- Every active chip shows a live count badge.
- Chips that would return 0 results are visually disabled and cannot be clicked.
- AND/OR facet logic is correct and matches user expectation.
- No performance regression — rendering stays fast with ~135 cards.
- CC Fest voice check: the filter still feels like a browse tool, not a search engine.

---

## Phase 8 — Session Spine Wayfinding (Direction 3)

**Status: Not started.**

Source spec: `newdesignideas/Session Spine Spec.html` and `Session Spine Spec.md`.

Purpose: give the five-session arc a persistent, navigable spine — a metro-style rail on the sessions index, and a compact you-are-here strip + sibling-tool rail on each tool page.

**Relationship to Phase 4:** Phase 4 built the session pages, the sessions listing, and the slim "In this session" strip. This phase adds the *navigational chrome* that lets visitors feel the arc and move within it. The two strips serve different jobs — the Phase 4 strip says "you're in session 3"; the spine strip shows all five stops and lets you jump.

### The config (`CCS_SESSIONS`)

One shared JS config feeds both renderers. Fields per session: `id`, `glyph` (✦ ◎ ⬡ ▦ ☽), `title`, `focus`, `bridge` (label + href), `tools` (array of [label, href] pairs). Pre-filled with real session 1–5 data from `sessions-data.js` — Codex should derive from that rather than re-author.

### Codex tasks

- [ ] Create `spine.css` and `spine.js` in `cc-fest-coding-camp-pages/assets/` (or inline on target pages).
- [ ] Derive `CCS_SESSIONS` from existing `sessions-data.js` — map `suitGlyph`, `title`, `focus` (`subtitle`), `anchorBridge` + `featuredTools` to the spine config format.
- [ ] Add `renderSideRail('#spine', currentIndex)` to `sessions/index.html` — mount the metro spine above or alongside the session card grid.
- [ ] Add `autoToolPage('#spine', '#stations')` (or `renderCompactStrip` + `renderStationRail`) to the tool page template. Wire `data-session` and `data-tool` from the catalog at render time.
- [ ] The compact strip prev/next must disable (`aria-disabled`) at the arc ends (Session 01 has no prev; Session 05 has no next).

### Claude tasks

- [ ] Review the side rail on the sessions index: does it add useful wayfinding or compete with the session card grid? Decide where it lives (sidebar, top of page, or collapsed by default).
- [ ] Review the compact strip on a tool page: does it crowd the tool header? Is the you-are-here position clear without reading the text?
- [ ] Decide whether the sibling-tool station rail belongs on all tool pages or only session-core tools (the ~15 per session that are explicitly listed in `featuredTools`).
- [ ] CC Fest voice check: does the spine feel like a workshop map or like a product tour?

### Acceptance criteria

- Sessions index shows the metro rail with 5 labeled stops; current session (if any) is visually distinguished.
- Connector segments above the current stop render in accent color (done); future stops are outline.
- Tool pages show the compact strip with correct session highlighted and functional prev/next.
- Station rail highlights the current tool's entry.
- Works without JS for navigation (plain `<a href>` links).
- No layout breakage on mobile.
- CC Fest voice check: spine is orientation, not decoration.

---



Run after each phase:

```sh
node scripts/generate-catalog-data.mjs
node scripts/audit-static.mjs
node scripts/audit-catalog-lens.mjs
node --check cc-fest-coding-camp-pages/site.js
node --check cc-fest-coding-camp-pages/p5-export-helper.js
git diff --check
```

Manual/browser checks:

- Homepage desktop and mobile (390px).
- Search + filter combinations — verify intersection, not union.
- Empty result states — no blank page, clear "nothing found" message.
- Bridge / tool / sketch card distinction — are the three types visually identifiable?
- Session page — is it a real session or still a template?
- Representative tool page.
- Representative bridge page.
- `?embed=1` on one JS-rendered tool and one static tool with `.top` nav pattern.

**CC Fest voice check (run on every phase before public deploy):**

Ask these questions from the design language guide. A "no" on any two or more is a hold.

1. Does this feel free and friendly?
2. Would a beginner feel invited rather than judged?
3. Is the copy plainspoken and warm?
4. Does it feel like CC Fest (workshop archive) rather than generic ed-tech?
5. Does it avoid generic SaaS polish or AI-gradient aesthetics?
6. Is interactivity used only when it helps learning or navigation?
7. Are legacy navigation surfaces removed before new ones ship publicly?

---

## Deployment Notes

Source edits should happen in `cc-fest-coding-camp-pages/`.

Before pushing public changes:

1. Regenerate catalog data if `index.html` changed:
   ```sh
   node scripts/generate-catalog-data.mjs
   ```
2. Run the full validation checklist.
3. Sync source into `docs/`:
   ```sh
   ./deploy.sh "Describe the update"
   ```
4. Verify `docs/index.html`, `docs/site.js`, `docs/catalog-data.js`, shared CSS, `tools/`, `concept-bridges/`, and `sessions/` are updated.

The existing `deploy.sh` handles the sync, commit, and push. On Windows, run it through Git Bash.

**Catalog-data.js freshness rule:** `catalog-data.js` is generated from `index.html`. Any time a tool card, bridge card, or sketch card is added, edited, or removed from `index.html`, run `generate-catalog-data.mjs` before the next deploy. The `audit-static.mjs` script checks counts but does not catch stale metadata — regeneration is the only guarantee.

---

## Recommended First Implementation Batch

Now that Phases 0–3 are started:

1. ✅ Create `catalog-data.js` with all homepage items and metadata.
2. ✅ Update the audit script to detect missing metadata.
3. ✅ Add Medium card anatomy for homepage cards.
4. ✅ Codex: add suit CSS variables to make tool cue tracks suit-colored.
5. ✅ Codex: make lens panel default to collapsed on page load.
6. ✅ Claude: author Phase 4 session metadata — complete, in the Phase 4 section above.
7. ✅ Codex: Fix `lerp-follow-seed` / `how-does-it-grow` catalog title/URL mismatch.
8. ✅ Codex: Apply 3 bridge pathway corrections and regenerate catalog-data.js.
9. ✅ Codex: Build Phase 4 session pages from the authored metadata above.
10. ✅ Claude: Browser QA Phases 1–4 on live GitHub Pages — all passed.
11. ✅ Both: Legacy Navigation Removal complete; chip rows and beginner/best-first removed and deployed (commit 20b0366).
12. ✅ Codex: Embed mode hides `.cc-session-strip`; final deploy pushed.
13. ✅ Claude: Phase 5 direction notes written — 5 specific changes, no new fonts, no card restructure.
14. ✅ Codex: Phase 5 implemented in source — session h1, shelves heading, hairline rules, lens buttons, tool card padding.
15. ✅ Codex: Phase 5 deployed — `site.css?v=20260603-phase5-direction` confirmed live.
16. ✅ Claude: Phase 5 browser QA passed — all 5 checks green on live GitHub Pages.
17. ✅ Both: Phase 6a complete — metadata strip on all 11 JS-rendered tools, embed-mode hiding confirmed, related resources intact. Commit 2104d04 + fix deploy.
18. ✅ Both: Phase 6b complete — metadata strip on 10 representative static tools, both nav patterns confirmed, embed mode clean. Commit e62d638.
19. ✅ Both: Phase 6c complete — metadata strip on all 21 bridges. Phase 6b also expanded to all 59 static tools. Commit b479d99.
20. ✅ **Claude:** Reviewed 9 bare bridges in Phase 6c — pathways sufficient, teaching-note sections logged as Phase 6e authoring pass.
21. **Current — Both:** Phase 6d — starter sketches (44 pages), About page, sessions page detail pass. B7 decision is made: sketch canvas gets Save Image + Fullscreen only.
22. After 6d — Phase 7: filter live counts and facet upgrade (`newdesignideas/Filter Spec`).
23. After 7 — Phase 8: session spine wayfinding rail (`newdesignideas/Session Spine Spec`).

---

## Implementation Log

### 2026-06-02 — Phase 0 Started

- Added `scripts/generate-catalog-data.mjs`.
- Generated `cc-fest-coding-camp-pages/catalog-data.js` from the existing homepage cards and concept bridge pages.
- Reconciled catalog metadata counts to 135 total items: 21 concept bridges, 70 workshop tools, 44 starter sketches.
- Added static audit checks for catalog counts, required metadata, learning metadata, and broken catalog URLs.
- Loaded `catalog-data.js` on the source homepage so Phase 1 can reuse `window.CCFestCatalog`.

### 2026-06-02 — Phase 1 Started

- Added runtime homepage card enhancement in `site.js` using `window.CCFestCatalog`.
- Added Medium card anatomy cues: bridge `idea -> concept` crossing, tool slider strip, sketch code peek.
- Updated primary card CTA labels by content type: Bridge → "Understand the idea", Tool → "Play before you read", Sketch → "Change one value".
- Added cue styles in `site.css`.
- Browser QA still needed.

### 2026-06-02 — Phase 2 Started

- Added a `catalog-shelves` placeholder inside the existing Where to start homepage section.
- Rendered Browse by goal shelves from `window.CCFestCatalog` pathway metadata.
- Each shelf shows up to four relevant resources from the canonical catalog.
- Added Show all shelf buttons that activate the existing pathway filter and scroll to the tool catalog.
- Added responsive shelf styles in `site.css`.

### 2026-06-02 — Phase 3 Started

- Added a live filter status row with resource count and removable active-filter tokens.
- Shelf Show all actions feed into the status/token loop.
- Added Organize by lens bar: Type, Category, Session, Level, Goal.
- Added grouped catalog panel powered by `window.CCFestCatalog`.
- Added `scripts/audit-catalog-lens.mjs`.
- Fixed homepage/content mismatch: `arrays-loops-as-system` was missing from the homepage bridge cards.

### 2026-06-03 — Phase 6a complete (Codex + Claude QA)

**What shipped:**
- `renderCatalogMeta(slug)` added to `workshop-tool-pages.js` — looks up suit/level/pathways from `window.CCFestCatalog` by slug.
- Strip injected after `.tool-subtitle`, before `.tool-tags` in the rendered header.
- `setTimeout(0)` deferred re-render so catalog-data.js loads first.
- `.catalog-meta-strip` / `.meta-pill` styles in `tool-page.css`.
- Embed mode hides `.catalog-meta-strip` via `p5-export-helper.js`.
- Deployed as commit 2104d04 + fix commit.

**QA results (Claude, live GitHub Pages):**
- All 11 JS-rendered tools: strip present, 5 pills (suit + level + 3 pathways) ✓
- Position: between subtitle and tags ✓
- Pill styles: suit cream, level gold-soft, pathway outline ✓
- Related resources (authored): bridge + sketches showing correctly on gravity tool ✓
- Session strip coexists alongside metadata strip ✓
- Embed mode: nav, rhythm, meta strip all `display:none` ✓

**Phase 6b:** 10 representative static tools selected (see Phase 6b Claude tasks).

### 2026-06-03 — Phase 5 built in source (Claude direction + Codex implementation)

**Claude direction notes:**
- No new fonts. Fraunces / DM Sans / DM Mono only. Inter Tight removed from consideration permanently.
- Five specific changes: session page h1, shelves section heading, filter count, lens bar, tool card padding.
- Defined what to leave alone: card borders/shadows, tool norms, hero, cue sizes, session card listing.
- Full notes recorded in Phase 5 section above.

**Codex implementation:**
- `sessions.css`: Session page h1 → Fraunces `clamp(36px, 5vw, 52px)` / weight 800.
- `index.html` + `site.css`: "Browse by goal" section gets "Where to start" label, Fraunces 24px heading, hairline separator above.
- `site.css`: Filter count → 13px DM Mono. Lens bar → `border-top: 1px solid var(--line)`, buttons → 12px. Tool cards → uniform 22px padding.
- Cache keys bumped for homepage and session pages.
- Validation passed. Not yet deployed — browser QA pending.

### 2026-06-03 — Phases 1–4 complete, deployed (Claude QA + Codex)

**Browser QA results (Claude, live GitHub Pages):**
- Card anatomy cues: 24 bridge + 73 tool + 44 sketch rendering correctly. All three types visually distinct.
- CTA verbs confirmed: "Understand the idea / Play before you read / Change one value".
- Lens panel hidden on load; appears on lens button click. Type lens shows 21/70/44 groups correctly.
- Filter composition (B11 fix): motion → 47 cards; motion + beginner → 27 cards. Intersection, not union. ✓
- All 6 shelves render with 4 items each. Every shelf includes at least one bridge (bridge metadata fix confirmed).
- Sessions listing: 5 real sessions + template; anchor bridge and resource pills on all 5.
- Session 01 page: poster canvas renders, 7 resources correct, arc nav (prev empty, next → Session 02).
- Session strip on static tool (noise-lab): correct text, correct session link, CSS self-injected.
- Session strip on JS-rendered tool (atan2): correct session link.
- Session strip on bridge (noise-smooth-randomness): present and correct.
- Embed mode: nav hidden, rhythm hidden, session strip now hidden. ✓
- Mobile breakpoints: all shelf/lens responsive rules confirmed in CSS.
- **Bug found and fixed:** Session strip was visible in `?embed=1` — added `.embed-mode .cc-session-strip { display: none !important; }` to p5-export-helper.js.

**Legacy nav removal (Codex):**
- Suit, pathway, difficulty chip rows removed from index.html and site.js.
- `.beginner-path` and `.best-first` removed from index.html and site.js.
- Search, shelves, filter status, and lens panel remain as the single filter surface.

**Deployed:** commit 20b0366 — "Phase 3+4 complete: card cues, shelves, lens panel, sessions, strip — legacy nav removed"

### 2026-06-03 — Phase 0 complete, Phase 4 metadata authored (Claude)

- Reviewed all 21 bridge `suit`, `level`, `pathways` assignments. Approved with 3 corrections:
  - `arrays-one-thing-to-many-things`: pathways `[first-time, data]` → `[first-time, animation]`
  - `world-vs-local-coordinates`: pathways `[first-time, animation]` → `[animation]`
  - `conditionals-code-makes-choices`: pathways `[stuck, games]` → `[first-time, stuck, games]`
- Reviewed sketch `codePeek` values for 12 priority sketches. Approved. Real code confirmed for all priority entries.
- Confirmed catalog regeneration decision: automatic on every deploy via `deploy.sh`.
- Authored full Phase 4 session metadata: all 5 sessions with `id`, `title`, `subtitle`, `topic`, `accent`, `seed`, `suitGlyph`, `suitId`, `anchorBridge`, `featuredTools`, `featuredSketches`. Ready for Codex to build.
- Flagged data bug: `lerp-follow-seed` appears in catalog as both a tool ("How Does It Grow?") and a sketch — title/URL mismatch requires Codex investigation in `index.html`.
- Phase 0 Claude tasks marked complete. Phase 0 status updated to ✅.

### 2026-06-03 — Mechanical items (Codex)

- Updated `deploy.sh` to run `node scripts/generate-catalog-data.mjs` before syncing.
- Made lens panel hidden on page load; appears only after a lens click or active filter.
- Confirmed suit CSS variables in `site.css` for all six suit classes.
- Marked Codex tasks complete in the plan.

### 2026-06-02 — Feedback Pass (Codex fixes)

- Added bridge metadata overrides in `scripts/generate-catalog-data.mjs` so all 21 bridges now have suit, level, pathway, session, and group metadata.
- Fixed starter sketch grouping by deriving groups from suit metadata instead of the last-seen station heading in the homepage scrape.
- Replaced placeholder sketch code peeks (`"agents = changeMe;"` style) with real ID-specific examples or tag/suit-specific cues.
- Added a static audit section to block `changeMe`-style peeks from creeping back in.
- Confirmed suit CSS variables are already defined in `site.css` for all six suit classes.
- Regenerated `cc-fest-coding-camp-pages/catalog-data.js` after generator changes.

### 2026-06-02 — Plan Updated

- Added Codex/Claude task ownership labels to all phases.
- Added Legacy Navigation Removal Plan table.
- Added Plan Amendments section documenting structural feedback.
- Resequenced Phase 4 (Session Arc) to come before Phase 5.
- Split Phase 6 into 6a–6d with explicit page counts and staged rollout.
- Added catalog-data.js regeneration rule to Deployment Notes.
- Added CC Fest voice check gate to the Validation Checklist.
- Constrained Phase 5 font changes to utility labels only; Fraunces/DM Sans stay.

### 2026-06-03 — Codex Mechanical Follow-up

- Added `node scripts/generate-catalog-data.mjs` to `deploy.sh` before source files are synced into `docs/`.
- Confirmed the Phase 1 suit CSS variable task is complete in `site.css`.
- Made the Phase 3 lens panel hidden on initial page load. It now appears only after a lens click or when search/refinement filters are active.

### 2026-06-03 — Claude Review Follow-up (Codex)

- Fixed catalog identity extraction in `scripts/generate-catalog-data.mjs` so homepage cards prefer the primary `.tool-actions` link instead of an earlier paired-resource link.
- Regenerated `catalog-data.js`; `how-does-it-grow` is now the workshop tool entry and `lerp-follow-seed` is only the starter sketch entry.
- Applied Claude's three bridge pathway corrections for `arrays-one-thing-to-many-things`, `world-vs-local-coordinates`, and `conditionals-code-makes-choices`.
- Added a static audit check for duplicate catalog IDs.
- Sanity-checked the Phase 4 authored session metadata: all anchor bridge, featured tool, and featured sketch slugs exist in the catalog.

### 2026-06-03 — Phase 4 Session Build (Codex)

- Added shared `sessions-data.js` with the five authored sessions plus the template entry.
- Rebuilt `sessions/index.html` so it renders 5 real session cards plus the template, with anchor bridge and featured resource pills.
- Created `sessions/01/` through `sessions/05/`, each with hardcoded session data and a p5 poster page.
- Added `sessions/session-page.js` to render poster resources and previous/next session arc navigation.
- Added the compact "In this session" strip hook in `site.js` and loaded catalog/session/site runtime scripts on tool and concept bridge detail pages.
- Updated `sessions.css` for session resource pills, real session cards, and arc navigation.
- Updated static audit session counting to read from `sessions-data.js` and verify real session pages exist.

### 2026-06-03 — Phase 6c complete + Phase 6b full rollout (Codex)

**Commit b479d99:** "Phase 6c + 6b full rollout: catalog metadata strip on all 21 bridges and all 59 static tools"

**What shipped:**
- `catalog-meta-strip.js` updated to support both `tools/` and `concept-bridges/` pages — strip placement lands after `.tool-subtitle` or `.subtitle`, with `h1`/`h2` fallback.
- Strip added to all 21 concept bridge pages.
- Strip added/bumped across all 59 static tool pages (Phase 6b expanded from the original 10-tool sample to the full set in the same commit).
- JS-rendered shells, starter pages, and sketch pages left untouched — those are Phase 6d.

**Validation passed:** `node --check catalog-meta-strip.js`, `node scripts/audit-static.mjs`, `git diff --check`.

**Claude review closed:** the 9 bare bridges can ship with catalog-driven go-next blocks for Phase 6c. Fuller teaching-note sections are a future content pass, not a Phase 6c blocker.

### 2026-06-03 — Phase 6c closed; Phase 6e stubbed (Claude)

- Reviewed all 9 bare bridges (`arrays-loops-as-system`, `data-as-argument`, `data-in-drawing-out`, `modulo-counting-in-cycles`, `objects-data-plus-behavior`, `pixels-pictures-are-data`, `triangle-circle-wave-explorer`, `vectors-arrows-that-store-motion`, `world-vs-local-coordinates`).
- Decision: catalog-driven go-next is sufficient. All 9 have authored `.pathways` "What's next" sections with Practice / Remix / Related links. No dead ends.
- `.teaching-note` sections are a genuine P2 gap (27 cards to author) — logged as Phase 6e, blocked on authoring.
- Phase 6c status updated to ✅ Complete.

### 2026-06-03 — newdesignideas design spec review (Claude)

Reviewed all three drop-in spec documents in `newdesignideas/` and reconciled against current site state:

- **Direction 2 (Card Anatomy / `Card Anatomy Spec.md`):** Already implemented in Phase 1. The `catalog-card-cue` system in `site.js` is functionally identical to the spec's `cca-*` enhancer — bridge crossing, tool slider strip, sketch code peek. No action needed.
- **Direction 1 (Filter Refine Bar / `Filter Spec.md`):** Phase 3 delivered the lens bar, search, tokens, and result count. The spec adds live counts on each facet chip and explicit AND/OR facet semantics. Added as **Phase 7**.
- **Direction 3 (Session Spine / `Session Spine Spec.md`):** Not yet implemented. Adds a metro-style side rail to the sessions index and a compact you-are-here strip + sibling-tool station rail to tool pages, all driven by a single `CCS_SESSIONS` config. Builds on Phase 4's session data. Added as **Phase 8**.

All completed task checkboxes updated across Phases 1–6b. Phase 4 session-page decisions and strip copy pattern marked complete per QA log.

### 2026-06-03 — Phase 4 Review Fixes (Codex)

- Extracted the "In this session" strip out of homepage `site.js` and into standalone `session-strip.js`.
- `session-strip.js` self-injects its own CSS so the strip is styled on both tool pages and bridge pages.
- Replaced the full homepage runtime on 135 detail pages with the slim strip runtime.
- Updated strip copy to `Part of Session XX · Title →`.
- Updated real session dates to `\u2014 2026 \u2014`.
- Added static audit guards for detail pages missing `session-strip.js` and detail pages still loading the Phase 4 homepage runtime.
