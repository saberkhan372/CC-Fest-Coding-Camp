# CC Fest Coding Camp Tools — Site Development Plan

*Last updated: 2026-05-25*

This document captures the detailed development roadmap for the Creative Coding Tools website, grounded in Saber Khan's design practice, the CC Fest aesthetic tradition, and the current state of the codebase.

---

## What the site is now vs. what it could become

The current site is a well-structured tool index with solid bones: the paper texture, Fraunces headlines, hard offset shadows, and cream-ink palette are all working. The Care Callout is tool-specific. All 110 tool and seed pages now have rhythm strips. The hero has a live Perlin-flow sketch as its background.

But it reads more like a polished catalog than a place. CC Fest was never a catalog — it was a room where something was happening. The development plan below is about making the site feel like you walked into that room.

---

## Site purpose (three lines)

These three framings should stay visible somewhere near the top of the homepage:

- *A free workshop archive.*
- *A tool shelf for learning p5.js.*
- *A place to remix and teach from.*

Not a product. Not a curriculum. An archive and a toolkit.

---

## Phase 1 — Complete the rhythm ✅ Done

**Status: Complete — shipped 2026-05-25**

All 110 tool and seed pages now have rhythm strips:
- 55 static HTML pages: `tool-rhythm` hardcoded
- 11 workshop pages: `tool-rhythm` injected by `workshop-tool-pages.js`
- 44 seed pages: `seed-rhythm` (See it / Change it / Remix it / Teach it) injected by `starter-seed-pages.js`

`.seed-rhythm` uses the same 4-column pastel-band visual language as `.tool-rhythm`. CSS in `starter-sketch.css`. Responsive: 2-col at 960px, 1-col at 720px.

---

## Phase 2 — The homepage as a poster ✅ Done

**Status: Complete — shipped 2026-05-25**

`hero-sketch.js` (139 lines, plain canvas 2D, no library): a Perlin-style flow field using layered sine functions. 140 particles follow smooth noise vectors, drawing thin ink-on-cream strokes. Canvas fades with `rgba(250,246,240,0.055)` each tick — dissolves old trails rather than clearing, matching `thing.pde`. Pauses off-screen via `IntersectionObserver`. Static tick-mark grid on `prefers-reduced-motion`.

CSS: `#hero-canvas` is `position:absolute; inset:0; z-index:0`. `.hero-grid` and `.hero-steps` sit at `z-index:1`. H1 and lede get `background:var(--cream)` with `box-decoration-break:clone` so each text line has its own cream backing over the sketch.

### Still to do in Phase 2

- **Maker-credit line.** Add `<p class="maker-credit">drawn with noise() · p5.js</p>` in the bottom-right corner of the hero. CC Fest posters always credited the generative work. One CSS class, immediate. Use `position:absolute; bottom:12px; right:16px; z-index:1` inside `.hero`.
- **"What this site is" band.** A tight horizontal strip (styled like `hero-steps`, not a card) directly after the hero with the three purpose lines above. Only build this if visitor testing reveals confusion about the site's purpose — it risks being redundant with a clear hero.
- **Resource count audit.** Confirm the visible counts (21 bridges, 60 tools, 40 sketches, 5 sessions) match actual library state across: meta tags, hero summary cards, stat bars, and gallery section headers. Search for `31`, `40`, `60`, `66` and confirm all are intentional.

---

## Phase 3 — Camp Archive wall (content + design, ongoing)

**Status: Slots exist with visitor-facing labels, no real images yet**

Five artifact slots exist in the homepage Camp Arc section. They need real content.

### Immediate fills available

- CC Fest posters 2017–2020 are in the archive on Desktop. Four (NYC 2017, LA 2018, SF 2019, Virtual 2020) can go directly in as `<img>` elements with the existing `.artifact-frame` border treatment.
- ethicalCS poster/animation assets (in `ethicalCS/images/`) as a fifth slot documenting the broader program lineage.

### Artifact metadata shape

Each artifact slot needs a small metadata record. Keep it as a JS object alongside the existing render data:

```js
{
  era: "Fall 2024",
  title: "Art + Code / Teacher Camp",
  type: "event flyer",           // flyer | poster | session-work | participant-work
  imagePath: "assets/artifacts/fall-2024-flyer.jpg",
  credit: "Saber Khan",
  permission: "public",          // public | with-permission | placeholder
  caption: "Art + Code / Teacher Camp · event flyer"
}
```

Store all artifact images under `docs/assets/artifacts/`. No server requirement. GitHub Pages compatible.

### Design

- Caption below each frame: DM Sans 12px, `ink-light`, visitor-facing label + year.
- On click: lightbox (minimal JS, no library).
- Hover: `border-style:solid`, `translateY(-2px)` — already in CSS.
- Add `.artifact-caption` CSS class to the utility sheet (see Phase 5 visual utilities).

**Longer term:** As each camp cohort completes, a new slot fills in. The grid grows. The wall becomes a record.

---

## Phase 4 — Resource navigation: connect bridges, tools, and starters

**Status: Not started — highest-value navigation change**

The three resource types currently exist as separate lists. They should function as a single learning path:

- **Concept Bridges** → understand the idea
- **Workshop Tools** → try the idea
- **Starter Sketches** → remix into a project

### Cross-links

Add to each resource type:

| Resource | Links to add |
|----------|-------------|
| Concept bridge | 2–4 related tools, 1–3 related starter sketches |
| Workshop tool | its concept bridge, 1–2 related starter sketches |
| Starter sketch | the concept/tool ideas it builds from |

**Implementation approach — two-tier linking:**

1. **Tag-based auto-links (default fallback):** Resources sharing tags get auto-linked in a "Related" sidebar. This keeps authoring burden low and scales automatically.
2. **Hand-authored curated links (priority):** For the 5–6 most-used bridges, explicitly author the `relatedTools` and `relatedSketches` arrays in the JS data objects. Ship these first. Fill in the rest incrementally.

Add to the JS data objects in `workshop-tool-pages.js` and `starter-seed-pages.js`:

```js
{
  // existing fields...
  relatedBridges: ["how-p5-thinks-about-time", "random-unpredictability"],
  relatedTools: ["noise-lab", "noise-walker"],
  relatedSketches: ["mini-generative-poster-seed"]
}
```

Do not create a separate JSON file — keep data co-located with rendering logic. GitHub Pages compatible.

### "Best first" curated row

A row of 5–6 hand-picked tools near the top of the homepage for first-time visitors. Editable from one JS array in `site.js`:

```js
const BEST_FIRST = [
  "draw-loop-visualizer",
  "shape-and-color-explorer",
  "noise-lab",
  "animation-explorer",
  "map-explorer"
];
```

Label it plainly: **"Start here."** Not "Featured" or "Recommended" or "Popular." One label. No persona selection. No onboarding flow.

### Bridge index "start here" pathway

The bridge index currently lists all 21 bridges as a grid. Add a numbered sequence of 5–6 bridges at the top, displayed as a Fraunces italic numbered list (not a grid):

```
1. How p5.js Thinks About Time
2. World Coordinates
3. Random and Unpredictability
4. Arrays
5. Noise
6. Pixels
```

Label: *"New here? Start with these."* Visitors can jump in anywhere; this just gives a thread.

---

## Phase 5 — Page template pass (bridges, tools, and seeds)

**Status: Not started — run in parallel with Phase 3**

Don't finish the homepage before touching page templates. Bridge and tool pages are where visitors spend most time.

### Concept bridge pages

Keep the existing Fuzzy idea / See it / Change it / Code idea / Go next rhythm strip.

**Add "Teacher move" panel** (near bottom of each bridge page):
- One classroom prompt
- One likely misconception
- One question to ask students

Three items, no more. If it grows beyond three it becomes curriculum documentation, which is a different product.

**Add "Try next" panel**:
- Related workshop tools (2–3)
- Related starter sketches (1–2)
- One remix challenge

**"Go next" rhythm card must link somewhere.** Currently it has a label but no destination. Point it to the first tool in the bridge's related-tools list, or to the next bridge in the suggested sequence.

**Every bridge page needs:**
- A visible p5.js concept label (already exists on most as a `.tool-pill`)
- A beginner-safe "what to try first" instruction
- A "what breaks?" edge-case prompt where there's a counterintuitive result

### Workshop tool pages

Already standardized around Open it / Change it / Predict it / Remix it / Teach it.

**Add "Break it on purpose" prompt** — only where there's a surprising or counterintuitive result. Not on every tool. Examples:
- *Set speed to 0. What stops? What doesn't?*
- *Make alpha 0. Where does the shape go?*
- *Push the range past 100. What breaks first?*
- *Remove randomness entirely. What do you get?*

Keep prompt short: one sentence + one question. Style as `.teaching-note`.

**Add "Workshop Station" section** (reusable card component):
- **See:** what changes on canvas
- **Code idea:** the p5.js concept in one sentence
- **Try:** one concrete slider or value change
- **Teach:** one classroom adaptation

This is the demo-station card a facilitator would hand to a co-teacher.

### Starter sketch pages

Already standardized around See it / Change it / Remix it / Teach it (done in Phase 1).

**Add "Smallest first change" card:**
- One value to change
- One shape/color/text substitution
- One optional stretch goal

**Add "Make it yours" prompts using CC Fest language:**
- *Turn it into a poster.*
- *Make it about your neighborhood.*
- *Make a tiny game.*
- *Make it useful for a class.*

Where possible, include a code excerpt with one highlighted editable line. Use `<mark>` inside `<code>` or a CSS `.editable-line` highlight class.

---

## Phase 6 — Visual system utilities

**Status: Not started**

Add a small `docs/site-components.css` file with reusable semantic CSS classes. Do not touch `site.css`. Use existing tokens only — no new palette.

```css
.poster-proof    /* full-bleed image in the poster tradition */
.maker-credit    /* small attribution line, DM Mono, bottom-right of a visual */
.teaching-note   /* gold-soft background card for teacher prompts */
.try-next        /* linked list of related resources */
.artifact-caption /* caption below an archive artifact frame */
.editable-line   /* highlighted line in a code excerpt */
```

**Gold as signal:** `--gold` currently appears only in the norms strip. Also use it as a thin left border on tool cards for "new" or "recently updated" items. Controlled by a `data-new` attribute toggled in the JS data. Remove the flag after 30 days.

**Primary section headers:** Some `CONCEPT BRIDGES` / `WORKSHOP TOOLS` labels should use Fraunces 700 italic instead of uppercase DM Sans — matching the poster tradition's use of heavy display type for event names. Not all headers; just the primary section titles on the homepage.

---

## Phase 7 — Copy and voice pass

**Status: Partially done — 6 bridge cards rewritten; tool subtitles and seed descriptions not yet addressed**

### Voice rules

**Lead with learner experience or core insight.** Not "A bridge for X." Not "Controls how Y is applied."

**Preferred phrases:**
- *"Change one thing. See what happens."*
- *"The code and the canvas are connected."*
- *"Questions count."*
- *"Unfinished work counts."*
- *"Use this in class by asking…"*

**Phrases to remove on sight:**
- "Robust ecosystem"
- "Differentiated pathways"
- "Technical fluency"
- "Transformational ed-tech"
- Any phrase that sounds like a grant application

**Tool page subtitles** — rewrite as capability claims:
- Before: *"Controls how opacity is applied to a shape"*
- After: *"Change how visible anything is — 0 is invisible, 255 is solid, and everything in between is yours."*

**Make teacher usefulness visible without making the site feel like a curriculum product.** The teaching prompts and "use this in class" language should feel like a workshop facilitator speaking, not like a scope-and-sequence document.

### About page

One page, no tools, no grid. What is CC Fest, who is this for, what happens in a session, how do you join. First person from Saber's perspective. Fraunces headline. One session photo (with permission). Link to signup.

### Footer

Replace generic placeholder with something real: *"CC Fest is a free creative coding community for educators and learners. Sessions happen throughout the year."*

---

## Phase 8 — The handmade quality (aesthetic finishing)

**Status: Not started**

The 1960s teach-in flyer shared the same DNA as CC Fest: activist ephemera, info in three columns, event-as-invitation. The site should feel like it was made by a person, not produced by a system.

1. **Ink texture on cards on hover.** Slightly increase paper texture opacity when a tool card is hovered — makes it feel like you just picked something up.

2. **Hand-drawn rhythm connectors (SVG).** Between the five rhythm cards on a bridge page, very thin SVG arrows (not CSS borders) connecting card to card — like handwriting. Echoes the poster tradition of drawing connecting lines between elements.

3. **Error/empty state design.** When a sketch fails to load, the placeholder should not be a broken box — it should be a simple "Hello" p5.js sketch running with a note "the real sketch goes here." Honest and warm rather than broken.

---

## Phase 9 — Generative poster engine (aspirational)

**Status: Not started — aspirational, separate track**

Every CC Fest session gets a generated poster page. The poster is produced by a p5.js sketch that runs in the browser.

- A `/sessions/` directory
- Each session: `index.html` with date, location, facilitator, topic, and `sketch.js` as the generative poster
- Session listing: grid of thumbnails, each a still frame from its sketch
- Sessions link to the tools and bridges used
- `saveCanvas()` button so facilitators can download and use as an actual event flyer

This closes the loop from the 2017 poster tradition to the 2026 web tool.

---

## What not to build

- **User accounts.** Not right for this community or this tool.
- **CMS or backend.** All static. The handmade quality comes partly from the HTML being legible and editable by the people who made it.
- **Analytics dashboard.** Simple Plausible or Fathom if any — not Google Analytics.
- **Dark mode toggle.** The cream-and-ink palette is the aesthetic; dark mode would require a full redesign not yet thought through.
- **Social sharing buttons.** If the work is worth sharing, people will share it. The buttons cheapen the visual.
- **Persona onboarding / "I am a..." flows.** Keep filters simple. One "Start here" curated row. No complex entry paths.
- **Separate data format for resource metadata.** Keep all resource data as JS objects co-located with their render functions. No JSON files, no separate data layer.

---

## Sequenced roadmap

| Phase | Work | Status |
|-------|------|--------|
| 1 | Rhythm strip rollout — all 110 pages | ✅ Done |
| 2 | Hero live sketch + maker-credit line | ✅ Sketch done · Credit line pending |
| 2 cont. | Resource count audit across meta/hero/headers | ⬜ Not started |
| 3 | Camp Archive wall — artifact metadata + real images | ⬜ Not started |
| 4 | Resource cross-links — tag auto-links + 5 hand-authored bridges | ⬜ Not started |
| 4 cont. | "Best first" curated row + bridge index start-here sequence | ⬜ Not started |
| 5 | Page template pass — teacher moves, try-next, break-it prompts | ⬜ Not started |
| 6 | Visual utilities CSS (`site-components.css`) + gold-as-signal | ⬜ Not started |
| 7 | Full copy pass — tool subtitles, seed descriptions, about page, footer | ⬜ Not started |
| 8 | Handmade finishing — hover texture, SVG connectors, empty states | ⬜ Not started |
| 9 | Generative poster engine — sessions directory | ⬜ Not started |

---

## Test checklist (run before any major push)

### Static checks
- Search for stale counts (`31`, `40`, `60`, `66`) and confirm all are intentional
- Search for visible authoring phrases (`Add`, `TODO`, `coming soon`) that would read as internal notes on public pages
- Confirm artifact permission status: `public` artifacts have images; `placeholder` slots have visitor-facing labels, not authoring instructions

### Browser QA
- Homepage at desktop width
- Homepage at mobile width (check: no horizontal overflow, hero sketch renders, buttons fit)
- One concept bridge page
- One JS-rendered workshop tool page
- One static workshop tool page
- One starter sketch page

### Interaction QA
- Hero poster interaction (tilt, drag, remix mode)
- Hero sketch animation (plays, pauses off-screen, static on reduced-motion)
- Global search
- Suit/pathway filters
- Credits toggle
- Tool controls (sliders, color pickers, selects)

### Accessibility
- Buttons have clear labels
- Images have meaningful alt text
- Artifact placeholders are understandable without images
- Color contrast remains strong across cream/ink palette

### Design-language checks
- Real artifacts are doing visual work (not decorative placeholders)
- Maker credits are visible on generative visuals
- Beginner invitation is obvious above the fold
- Teacher usefulness is visible without feeling like a curriculum product
- **The site does not drift into startup/product polish**

---

## Key design references (for agents picking up this work)

- `ccfest_design_language_agent_guide.md` — full design language spec, CSS tokens, component anatomy, aesthetic principles, archive evidence
- `docs/site.css` — main stylesheet (synced twin at `cc-fest-coding-camp-pages/site.css`)
- `docs/tool-page.css` — tool page template stylesheet
- `docs/concept-bridges/concept-bridge.css` — bridge page stylesheet
- `docs/hero-sketch.js` — live Perlin-flow background sketch for the hero
- `docs/starter-seed-pages.js` — JS renderer for all 44 seed pages (contains `seed-rhythm`)
- `docs/workshop-tool-pages.js` — JS renderer for 11 workshop tool pages (contains `tool-rhythm`)
- CC Fest poster archive: `/Users/saberkhan/Desktop/CC Fest/` — 2017–2020 NYC, LA, SF, Virtual posters
- Coding the Canvas: sibling project; Inter/Caveat/JetBrains Mono, terracotta `#ef4b3f`, Caveat for "creative coding for all"
- `thing.pde` (Processing sketch on Desktop): personal exploratory mode — Perlin noise, iteration, no decoration
- VCV Rack patches (`perlin.vcv`, `three piece kit.vcv`): Perlin noise as aesthetic value across media
