# CC Fest Coding Camp Tools — Site Development Plan

*Last updated: 2026-05-25*

This document captures the detailed development roadmap for the Creative Coding Tools website, grounded in Saber Khan's design practice, the CC Fest aesthetic tradition, and the current state of the codebase.

---

## What the site is now vs. what it could become

The current site is a well-structured tool index with solid bones: the paper texture, Fraunces headlines, hard offset shadows, and cream-ink palette are all working. The Care Callout is tool-specific. The bridge rhythm strip exists on 21 concept bridges. The tool page template has a consistent rhythm (Open it / Change it / Predict it / Remix it / Teach it).

But it reads more like a polished catalog than a place. CC Fest was never a catalog — it was a room where something was happening. The development plan below is about making the site feel like you walked into that room.

---

## Phase 1 — Complete the rhythm (infrastructure work)

**Status: Not started**

61 missing rhythm strips. The workshop tool rhythm (Open it / Change it / Predict it / Remix it / Teach it) exists in 49 of 110 tool pages. The 30 seed pages have none. The remaining 31 non-seed tool pages have none.

The work here is not design work — it's templating. Every tool page needs the same five-column grid, same pastel-banded cards, same uppercase labels. Build a CLI script or sed-based batch that injects the rhythm HTML block above `.tool-layout` in every tool page that's missing it.

The seed pages need a slightly different rhythm because their pedagogical role is different — they're starting points, not deep dives. For seeds: **See it / Change it / Remix it / Teach it** (four columns, not five). Add a `.seed-rhythm` class and four pastel bands.

**Why this first:** The rhythm strip is the single most important learning-design element on the site. A visitor landing on a page with no rhythm strip gets no scaffold.

---

## Phase 2 — The homepage as a poster (visual design)

**Status: Not started**

The CC Fest poster tradition (2017–2020, all formats) is always: **the generative sketch IS the visual.** The poster doesn't decorate around the artwork — the artwork IS the poster. Apply this to the hero.

### Proposed hero redesign

The hero background should be a live p5.js sketch running behind the headline — not a video, not a static image, but actual code executing. The sketch should be simple enough that a beginner reading the page source could understand it. A Perlin noise field drawing thin lines in ink color on cream is the right register: it references `thing.pde`, references `perlin.vcv`, references the generative aesthetic without being showy.

The H1 floats over the sketch in Fraunces 900 italic, large, with a cream background-color on the text itself (not a full box — just enough padding to make it legible against the animation). The sketch should pause on `prefers-reduced-motion`.

This is also a teaching moment in itself: the site's own hero is a sketch. That's CC Fest.

The lede paragraph should not change: *"Open to anyone curious about creative code — you don't need to be a programmer to start."*

---

## Phase 3 — Camp Archive wall (content + design, ongoing)

**Status: Slots exist with visitor-facing labels, no real images yet**

Five artifact slots exist. They need real content.

### Immediate fills available

- CC Fest posters from 2017–2020 are in the archive on Desktop. Four (NYC 2017, LA 2018, SF 2019, Virtual 2020) can go directly into the wall as `<img>` elements with the existing `.artifact-frame` border treatment.
- The ethicalCS poster/animation assets (found in `ethicalCS/images/`) could fill a fifth slot as documentation of the broader program lineage.

### Design for the wall

The artifact frame hover state (border-style solid, translateY -2px) is correct. Add a caption below each frame in DM Sans 12px ink-light: the visitor-facing label plus the year. On click, open a lightbox (simple CSS-only or minimal JS) showing the full image.

**Longer term:** As each camp cohort completes, a new slot fills in. The grid grows. The wall becomes a record.

---

## Phase 4 — Concept bridge pages as full experiences (design)

**Status: 21 bridges have rhythm strips and CSS tokens; depth varies**

### What's missing

1. **A live sketch panel.** Every bridge should have a p5.js embed in the left column — the actual sketch the bridge is teaching, running, interactive. The "Change it" rhythm step implies a live canvas. Audit all 21 and confirm every bridge has an actual running sketch.

2. **Code with commentary.** The code panel should not be a dump of raw JavaScript. Annotate: key lines highlighted, `// ← this is the part that matters` comments inline. This is Coding the Canvas's ONBOARDING.md practice applied to a UI element.

3. **The "Go next" rhythm card should link somewhere.** Currently the fifth rhythm card has a label but no link. It should point to the next bridge in a suggested sequence, or to a tool page that uses the concept. This makes the site a network instead of a list.

4. **Bridge index page needs sequence logic.** The bridge index currently lists all bridges. It should suggest an entry point sequence — five or six bridges in a recommended order for a first-time visitor. Displayed as a numbered list in Fraunces italic, not a grid. *"If you're new, start here."*

---

## Phase 5 — Tool page depth tier (content strategy, ongoing)

**Status: All pages currently treated equally**

### Proposed tier system

- **Tier 1 — Seed pages (30):** Minimal. Four-column rhythm. One sketch. One paragraph. Links to related bridges.
- **Tier 2 — Standard tools (most of the 80):** Current template. Five-column rhythm. Live sketch. Controls grid. Two or three stat rows.
- **Tier 3 — Featured tools (8–10):** Full page treatment. Multiple sketches showing variations. Detailed annotation. "Made with this tool" section showing real student/participant work from camp.

The Tier 3 pages are the site's case for itself. A visitor who lands on a deep-tier page for `noise()` or `map()` and sees actual work made in camp — with a photo of the session, a participant's sketch, the context of when it was taught — understands immediately what CC Fest is and why it matters.

---

## Phase 6 — Voice and copy (ongoing)

**Status: 6 bridge cards rewritten; tool subtitles not yet addressed**

The bridge copy rewrite established a pattern: lead with a learner experience or a core insight, not "A bridge for X."

### Tool page subtitles

Every tool page subtitle currently reads as a function description. It should read as a claim about what you can do.

- **Before:** "Controls how opacity is applied to a shape"
- **After:** "Change how visible anything is — 0 is invisible, 255 is solid, and everything in between is yours."

### About page (build if it doesn't exist)

One page, no tools, no grid. Just: what is CC Fest, who is this for, what happens in a session, how do you join. Written in first person from Saber's perspective, not in third-person institutional voice. Fraunces headline. One photo from a session (if available with permission). A link to sign up or contact.

### Footer

Should not be generic. Should say something real: *"CC Fest is a free creative coding community for educators and learners. Sessions happen throughout the year."* Link to wherever signups happen.

---

## Phase 7 — The handmade quality (aesthetic finishing)

**Status: Not started**

The 1960s teach-in flyer shared the same DNA as CC Fest: activist ephemera, info in three columns, event-as-invitation. The site should feel like it was made by a person, not produced by a system.

### Specific interventions

1. **Ink texture on cards on hover.** When a tool card is hovered, very slightly increase the paper texture opacity on that card's background — makes it feel like you just picked something up.

2. **Fraunces for primary section labels.** Section headers (`CONCEPT BRIDGES`, `WORKSHOP TOOLS`) are currently uppercase DM Sans. Primary section headers on the homepage should be Fraunces 700 italic — the way the poster tradition uses the event name in a heavy display face.

3. **Gold as signal, not decoration.** `--gold:#f5a800` appears in the norms strip background. It should also appear on "new" or "recently updated" items — a thin gold left border on a tool card, like a bookmark. Disappears after 30 days via a CSS class toggled by a data attribute.

4. **Hand-drawn rhythm connectors (SVG).** Between the five rhythm cards on a bridge page, very thin SVG arrows (not CSS borders) connecting card to card — like handwriting connecting steps. Echoes the poster tradition of drawing connecting lines between elements.

5. **Error/empty state design.** When a sketch fails to load or a canvas is empty, the placeholder should not be a broken box. It should be a simple p5.js "Hello" sketch — the classic first sketch, running — with a note "the real sketch goes here." Honest and warm rather than broken.

---

## Phase 8 — Generative poster engine (advanced)

**Status: Not started — aspirational**

The CC Fest poster for every event was a generative sketch that became the visual identity of that event. The aspiration: **every CC Fest session gets a generated poster page on the site, and the poster is produced by a p5.js sketch that runs in the browser.**

### Implementation

- A `/sessions/` directory
- Each session has an `index.html` with: date, location, facilitator, topic, and a `sketch.js` that is the session's generative poster
- The session listing page shows all sessions as a grid — each tile is a thumbnail of its generative poster, a still frame captured from the sketch
- Sessions link to the tools and bridges used in that session
- A Save button calls `saveCanvas()` so facilitators can download and use it as an actual event flyer

This closes the loop from the 2017 poster tradition to the 2026 web tool.

---

## What not to build

- **User accounts.** Not right for this community or this tool.
- **CMS or backend.** All static. The handmade quality comes partly from the HTML being legible and editable by the people who made it.
- **Analytics dashboard.** Simple Plausible or Fathom embed if any — not Google Analytics.
- **Dark mode toggle.** The cream-and-ink palette is the aesthetic; dark mode would require a full redesign that hasn't been thought through for this context.
- **Social sharing buttons.** If the work is worth sharing, people will share it. The buttons cheapen the visual.

---

## Sequenced roadmap

| Week | Work | Status |
|------|------|--------|
| 1 | Complete rhythm rollout — all 110 tool pages + 30 seed pages | ⬜ Not started |
| 2 | Hero redesign with live Perlin noise sketch | ⬜ Not started |
| 3 | Camp Archive wall — fill first 4 slots with actual poster images | ⬜ Not started |
| 4–5 | Audit all 21 bridge pages for live canvas + Go next links | ⬜ Not started |
| 6 | Bridge index sequence logic + "start here" pathway | ⬜ Not started |
| 7 | Copy pass — all tool subtitles rewritten as capability claims | ⬜ Not started |
| 8 | About page — first-person, no template | ⬜ Not started |
| 9 | Tier 3 deep pages — pick 3 tools to build to full depth | ⬜ Not started |
| 10+ | Sessions directory + generative poster engine | ⬜ Not started |

The first three weeks produce visible improvement that a visitor would notice immediately. Weeks 4–8 deepen the teaching quality. Week 9+ moves toward the poster-engine aspiration that would make this site unlike any other creative coding resource on the web.

---

## Key design references (for agents picking up this work)

- `ccfest_design_language_agent_guide.md` — full design language spec, CSS tokens, component anatomy, aesthetic principles, and archive evidence
- `docs/site.css` — main stylesheet (synced twin at `cc-fest-coding-camp-pages/site.css`)
- `docs/tool-page.css` — tool page template stylesheet
- `docs/concept-bridges/concept-bridge.css` — bridge page stylesheet
- CC Fest poster archive: `/Users/saberkhan/Desktop/CC Fest/` — 2017–2020 NYC, LA, SF, Virtual posters; generative sketch IS the visual in all of them
- Coding the Canvas: sibling project; Inter/Caveat/JetBrains Mono, terracotta accent `#ef4b3f`, Caveat for "creative coding for all" as handwritten whisper
- `thing.pde` (Processing sketch on Desktop): personal exploratory mode — Perlin noise, iteration, no decoration
- VCV Rack patches (`perlin.vcv`, `three piece kit.vcv`): Perlin noise as aesthetic value across media
