# CC Fest Coding Camp Audit Findings

This file captures findings from the deep audit. The full task checklist is in `AUDIT_TASKS.md`.

## Audit Status

- Static source audit: **complete**
- Browser/visual audit: **complete** (2026-06-02, Chrome via Claude in Chrome extension)
- Mobile audit: **complete** (390px viewport, Chrome resize)

---

## Summary Table

| ID | Page(s) | Severity | Category | Status |
|----|---------|----------|----------|--------|
| B1 | `tools/noise-lab/` | **P1** | Broken links | Fixed in source |
| B2 | 49 tool pages | **P1** | Stale OG meta | Fixed in source |
| B3 | `tools/distribution-visualizer/` | **P1** | Missing export helper | Fixed in source |
| B4 | All 11 JS-rendered tools | **P1** | Embed mode nav not hidden | Fixed in source; needs live retest |
| B5 | `about.html`, `sessions/index.html` | **P2** | Stale CSS version | Fixed in source |
| B6 | `about.html` | **P2** | Topbar missing Sessions + Map | Fixed in source |
| B7 | All 44 starter sketch pages | **P2** | No p5-export-helper | Open — product decision |
| B8 | `sessions/template/` | **P2** | Controls panel layout broken | Fixed in source; needs live retest |
| B9 | `sessions/index.html` | **P2** | Session card thumbnail overflow | Fixed in source; needs live retest |
| B10 | Static tools mobile | **P2** | Topbar links run together | Fixed in source; needs live retest |
| B11 | Homepage | **P1** | Difficulty filter partial - only Open suit filtered | Fixed in source; needs live retest |
| G1 | 9 bridge pages | **P2** | No teaching-note or try-next | Gap |
| G2 | `sessions/` | **P3** | Only template entry, no real sessions | Content gap |
| G3 | `concept-map-data.js` | **P3** | 4 new tools missing from map | Known gap |
| G4 | `sessions/template/` | **P2** | Resource links show authoring text | Fixed in source |
| G5 | Concept map | **P2** | Referenced bridge labels clipped at viewport edge | Fixed in source; needs live retest |

---

## Fix Pass - 2026-06-02

Implemented in `cc-fest-coding-camp-pages/`:

- B1: corrected the two `noise-lab` starter sketch links to `../../tools/...`.
- B2: replaced stale `31 workshop tools and 26 starter sketches` metadata with `70 workshop tools and 44 starter sketches` across 49 tool pages.
- B3: added `p5-export-helper.js` to `distribution-visualizer`.
- B4: changed embed-mode CSS from `div.tool-topbar` to `.tool-topbar`; bumped helper cache keys to `20260602-audit-fixes`.
- B5: updated About and Sessions to the current `site.css` cache key.
- B6: added Sessions and Map links to the About topbar.
- B8: widened and stabilized the session poster template layout/controls column.
- B9: changed session thumbnails to contain the poster canvas within the card frame.
- B10: added mobile spacing/wrapping for older `.top` tool nav links.
- B11: changed homepage filtering to set both `hidden` and inline `display` for every `.tool-card`.
- G4: replaced session template authoring placeholders with visitor-facing browse labels.
- G5: moved referenced concept-map bridge labels inward from the right SVG edge.

Verification:

- `node scripts/audit-static.mjs` now reports no stale count text, no bad starter-sketch paths, no broken local hrefs, and no workshop tools missing `p5-export-helper.js`.
- Browser retest is still needed for B4, B8, B9, B10, B11, and G5 because those are visual/interactive behaviors.

---

## Confirmed Bugs — Detailed

### B1 — Broken starter-sketch links in noise-lab (P1)

**Page:** `tools/noise-lab/index.html`

**Browser confirmed:** live check showed 2 links with `broken: true`.

The try-next panel links use `../../starter-sketches/` but all sketches live under `../../tools/`.

```
❌  ../../starter-sketches/wander-agent-seed/
❌  ../../starter-sketches/mini-generative-poster-seed/
✅  ../../tools/wander-agent-seed/      ← correct form
✅  ../../tools/mini-generative-poster-seed/
```

The noise bridge page (`concept-bridges/noise-smooth-randomness/`) uses correct `../../tools/` paths — the bug is isolated to `noise-lab`.

**Fix:** 2-line path correction in `cc-fest-coding-camp-pages/tools/noise-lab/index.html`.

---

### B2 — Stale OG/Twitter meta on 49 tool pages (P1)

**Pages:** 49 files under `cc-fest-coding-camp-pages/tools/*/index.html`

OG description and Twitter description still read `"31 workshop tools and 26 starter sketches"` — the pre-Phase 1 count. Current correct counts are **70 tools / 44 sketches**.

**Fix:** regex replace across all 49 files. Pattern:
```
s/31 workshop tools and 26 starter sketches/70 workshop tools and 44 starter sketches/g
```

---

### B3 — `distribution-visualizer` missing p5-export-helper (P1)

**Page:** `tools/distribution-visualizer/index.html`

Static sweep confirmed: this is the only workshop tool among the 70 without `p5-export-helper.js`. The page has a canvas but no Save Image / Fullscreen / Copy link buttons.

**Fix:** Add `<script src="../../p5-export-helper.js?v=20260602-presentation"></script>` before `</body>`.

---

### B4 — Embed mode does not hide nav on JS-rendered tools (P1)

**Pages:** All 11 JS-rendered workshop tools (`atan2-rotation-studio`, `sine-cosine-motion-explorer`, etc.)

**Browser confirmed:** With `?embed=1`, `embedOnBody: true` (class set correctly), but `topbar: "flex"` (nav still visible).

**Root cause:** The embed CSS uses `div.tool-topbar` but JS-rendered tools render their nav as `<nav class="tool-topbar">` — the `div` tag qualifier makes the selector miss.

```css
/* Current — broken for nav.tool-topbar */
.embed-mode div.tool-topbar { display: none !important; }

/* Fix — drop the element qualifier */
.embed-mode .tool-topbar { display: none !important; }
```

The `.top` nav pattern (older static tools like noise-lab) works correctly because it matches `.embed-mode nav.top`.

**Also confirmed working:** URL hash state survives `?embed=1` — `originX=150` was correctly restored alongside embed mode.

**Fix:** Change `div.tool-topbar` → `.tool-topbar` in the injected embed CSS inside `p5-export-helper.js`.

---

### B5 — Stale CSS version on About and Sessions (P2)

**Pages:** `about.html`, `sessions/index.html`

Both load `site.css?v=20260526-phase10` — frozen at Phase 10.  
Homepage and concept map load `site.css?v=20260602-phase12-filters`.

About page is visually functional because Phase 12 additions were filter-specific, but it will drift further as CSS evolves.

**Fix:** Update both pages to `site.css?v=20260602-phase12-filters`.

---

### B6 — About topbar missing Sessions and Map (P2)

**Browser confirmed:** About topbar shows only `Tools · ccfest.rocks · GitHub`.  
Every other main page (homepage, concept map, sessions) shows `ccfest.rocks · Sessions · Map · About · GitHub`.

A visitor landing on About from a search engine or direct link has no direct route to Sessions or the Concept Map.

**Fix:** Add `Sessions` and `Map` links to the About topbar.

---

### B7 — Starter sketches have no p5-export-helper (P2 — product decision needed)

**Pages:** All 44 starter sketch pages.

Starter sketch shells load `starter-seed-pages.js` only. The renderer does not inject `p5-export-helper.js`. No Save Image, Fullscreen, or Copy link buttons appear on any starter sketch page.

A learner who makes something they like has no way to save or share their canvas.

This may be intentional (starter sketches use the p5 Editor for sharing) — but that's not communicated, and the "↗ p5 Editor" button that would serve that function is also absent.

**Decision needed:** Either inject `p5-export-helper.js` from `starter-seed-pages.js`, or add a visible note explaining how to save/share.

---

### B8 — Session template controls panel layout broken (P2)

**Browser confirmed:** The 5 session input fields (`f-session`, `f-topic`, `f-date`, `f-location`, `f-accent`) are in the DOM but rendered as a horizontal strip of tiny inputs at the far right edge of the viewport:

```
f-session:  left=768, width=51px
f-topic:    left=819, width=58px
f-date:     left=877, width=29px   ← 29px wide
f-location: left=906, width=58px
f-accent:   left=964, width=44px
```

The controls are technically present but completely unusable — compressed into a 240px-wide horizontal strip against the right viewport edge. The session template is described as "Edit the fields to customize the poster" but the fields are inaccessible.

Shuffle and Download buttons exist in the DOM but are also not visible in the viewport.

**Fix:** Review and fix the CSS layout for the session template controls panel — fields should stack vertically in a readable right column.

---

### B9 — Sessions listing card thumbnail overflows (P2)

**Browser confirmed:** The session card poster thumbnail bleeds beyond the card boundary on the left side. Text like "NG CAMP" and "Session Here" is clipped, showing only the right portion of the poster canvas.

**Fix:** Add `overflow: hidden` or constrain the canvas size to fit within the card frame.

---

### B10 — Static tool topbar links run together on mobile (P2)

**Browser confirmed at 390px:** The 3-link `.top` nav in older static tools renders as one unbroken string: `"← Back to tool libraryNotion NotesCC Fest on GitHub"` — no visual separator, no spacing.

This affects static tools using the `.top` nav pattern (not the newer `.tool-topbar` tools, which are unaffected).

**Fix:** Add `gap` or spacing to the `.top` flex layout in `tool-page.css`, or ensure `<a>` elements have sufficient margin.

---

### B11 — Homepage difficulty filter only works in the Open suit station (P1)

**Browser confirmed:** With `beginner` difficulty active, 69 non-beginner cards remain fully visible. Only 9 cards (all from `suit-open`) are hidden.

**Root cause:** The difficulty filter correctly iterates cards in the `suit-open` station, but does not iterate cards in the `suit-marks`, `suit-motion`, `suit-systems`, `suit-data`, or `suit-support` stations.

```
motion station: 7 beginner + 12 extension cards
→ With beginner filter active: all 19 still show (12 extension should be hidden)
```

The pathway filter likely has the same issue (same code path).

**Fix:** Review `applyFilters()` in `site.js` — verify that it iterates `.tool-card` elements inside ALL `.station` divs, not just the ones currently expanded or visible.

---

## Visual Passes — What Worked

### Homepage (desktop + mobile)
- Headline, eyebrow, lede: ✓
- Hero poster tiles animate on mouse move: ✓
- Hero tiles flat + no overflow on mobile: ✓
- Maker credit "CC Fest · 2026": ✓
- Topbar (5 links): ✓
- Library summary 21/70/44/5: ✓
- Tool norms strip (5 tool-specific norms): ✓
- "Where to start" — 6 beginner path entries in 2×3 grid: ✓
- "Best first" — 4 cards with live canvas previews: ✓
- Suit filter (7 buttons, filters whole station sections): ✓
- Suit All button resets all three filter states: ✓
- 140 total cards (bridges + tools + sketches): ✓
- No console errors: ✓
- No horizontal overflow at 390px: ✓
- Sequence card rotations flat at mobile: ✓

### About page
- Content: "Creative coding for all, taught through small experiments" headline ✓
- 4 colorful info cards ✓
- Note from Saber ✓
- CTA buttons resolve ✓
- Topbar bug confirmed (B6) ✓

### Concept Map (desktop + mobile)
- SVG renders, 41 clickable link nodes ✓
- 3 swimlane bands (Bridges / Tools / Sketches) ✓
- `color-from-position` between columns 3–4 ✓
- Referenced bridges outside grid at reduced opacity ✓
- Legend present ✓
- No console errors ✓
- Mobile: SVG hidden, "Browse by bridge" list renders with tools + sketches ✓
- **P2**: Referenced bridge labels clipped at viewport right edge

### Concept Bridge — noise-smooth-randomness
- 5-step rhythm strip: ✓
- Live canvas (noise vs random side-by-side): ✓
- 5 tabs (Jitter / Landscape / Flow / Texture / Time): ✓
- "PREDICT BEFORE CHANGING" prompt: ✓
- "⚠ Too jittery" break-it preset: ✓
- Save snapshot button: ✓
- Try-next panel (3 columns): ✓
- All 7 try-next links use correct `../../tools/` paths: ✓
- Teacher move (Prompt / Misconception / Ask): ✓
- Bottom nav (← All bridges + Next bridge →): ✓
- No console errors: ✓
- Mobile: stacks correctly, no overflow ✓

### Workshop tool — noise-lab (static, `.top` nav pattern)
- Animated canvas: ✓
- 5-step rhythm: ✓
- Sliders respond, readouts update: ✓
- Canvas action bar (Save Image / Fullscreen / Copy link): ✓
- Code export bar (Copy Code / ↗ p5 Editor): ✓
- Embed mode `?embed=1`: nav hidden ✓, rhythm hidden ✓, canvas stays ✓
- B1 broken links: confirmed

### Workshop tool — atan2-rotation-studio (JS-rendered, `.tool-topbar` nav)
- Renders from `workshop-tool-pages.js`: ✓
- All controls present: ✓
- Live canvas tracking mouse: ✓
- URL hash updates after slider move (debounced): ✓
- State restores from URL hash on reload (`originX=150`): ✓
- `?embed=1` + hash — state restores but topbar NOT hidden: B4 confirmed
- No console errors: ✓

### Starter sketch — wander-agent-seed
- Renders from `starter-seed-pages.js`: ✓
- 4-step rhythm (SEE IT / CHANGE IT / REMIX IT / TEACH IT): ✓
- CHANGE IT text is specific and teaches something real: ✓
- Code editor visible with full sketch: ✓
- Live canvas running: ✓
- Run / Stop / Reset / p5 Editor buttons: ✓
- No export buttons (B7 confirmed): ✓
- No console errors: ✓

### Sessions
- Listing: renders 1 template card from JS SESSIONS array ✓
- Card thumbnail layout overflow (B9 confirmed)
- Template poster: beautiful — red top bar, dot grid, generative circles, Fraunces headline, maker credit ✓
- Template controls: in DOM but visually inaccessible (B8 confirmed)
- Resource links show "Add a bridge link here" authoring text (G4 confirmed)

### Mobile sweep (390px)
- Homepage: no overflow, transforms flat ✓
- Concept map: SVG hidden, list fallback works ✓
- Noise bridge: stacks to single column, no overflow ✓
- Animation Explorer: no overflow, rhythm stacks ✓, but topbar links run together (B10 confirmed)

---

## Content Gaps

### G1 — Nine bridge pages have no teaching-note or try-next

Bridges: `arrays-loops-as-system`, `data-as-argument`, `data-in-drawing-out`, `modulo-counting-in-cycles`, `objects-data-plus-behavior`, `pixels-pictures-are-data`, `triangle-circle-wave-explorer`, `vectors-arrows-that-store-motion`, `world-vs-local-coordinates`

These 9 bridges are complete interactive tools but have no teacher move or cross-links. They're usable but leave teachers without scaffolding.

### G2 — Sessions listing shows only a template (P3)

The `sessions/index.html` `SESSIONS` array has one entry: the template. The page description ("Each session has a generative poster") implies more. No real session data has been added.

### G3 — Four Phase 14–18 tools missing from concept-map-data.js (P3)

Known gap: `how-does-it-grow`, `bezier-curve-sculptor`, `distribution-visualizer`, `unit-circle-wave-sync` were added after Phase 17. Add to `concept-map-data.js` when revisiting the map.

### G4 — Session template resource links show authoring text (P2)

The right panel of `sessions/template/` shows:
```
CONCEPT BRIDGE    Add a bridge link here
WORKSHOP TOOL     Add a tool link here
STARTER SKETCH    Add a sketch link here
```

Per the design guide: "If placeholders are needed, write them as visitor-facing labels, not authoring notes." These read as internal instructions.

### G5 — Concept map referenced bridge labels clipped at viewport edge (P2)

Referenced bridges (Events Sketches Listen, Distance Becomes Behavior, Arrays Loops as System) render in a narrow strip at the far right of the SVG. Their label text is truncated. On the current viewport the labels show as "Events Sketche Lister" etc.

---

## Recommended Fix Order

1. **B4** — Fix `div.tool-topbar` → `.tool-topbar` in `p5-export-helper.js` (1-line fix, affects all 11 JS-rendered tools)
2. **B1** — Fix 2 broken paths in `noise-lab/index.html`
3. **B3** — Add `p5-export-helper.js` to `distribution-visualizer/index.html`
4. **B11** — Diagnose and fix `applyFilters()` in `site.js` for difficulty/pathway across all suit stations
5. **B2** — Regex replace stale OG meta across 49 tool pages
6. **B5** — Update CSS version string on `about.html` and `sessions/index.html`
7. **B6** — Add Sessions + Map links to `about.html` topbar
8. **B8** — Fix session template controls panel layout
9. **B9** — Fix session card thumbnail overflow
10. **B10** — Fix `.top` nav link spacing on mobile
11. **G4** — Replace session template authoring placeholder text
12. **B7** — Decide on starter sketch export (product call)
