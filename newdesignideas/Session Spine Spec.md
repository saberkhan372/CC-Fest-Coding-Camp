# CC Fest — Session Spine: drop-in implementation spec

This packages **Direction 3 (the session arc as a wayfinding spine)** for the
static site. The locator eyebrow you already added ("Session 2 · Mapping") is a
good start, but there's no *persistent* wayfinding — no 5-stop "you are here", no
prev/next within a session, no sibling-tool rail. This adds all three from **one
shared config**, in two contexts:

| Context | Renderer | What it gives |
|---|---|---|
| `/sessions/` index | `renderSideRail(el, currentIndex)` | metro spine; current session expands to focus + anchor bridge + tools |
| each tool page | `renderCompactStrip` + `renderStationRail` | you-are-here strip with prev/next across sessions + a rail of sibling tools |

Reference: **`Session Spine Spec.html`** (shows both contexts as they'd appear
live; links point at the real tool URLs). **Vanilla, no build, no framework.**
Three fenced `░░ COPY ░░` blocks: CSS, the arc config, the renderers.

---

## 1. The config (the single source of truth)

Everything renders from `CCS_SESSIONS` in **copy block 2**. One entry per session:

```js
{ id:'02', glyph:'◎', title:'Things That Move & Listen',
  focus:'Build things that move, react, and respond.',
  bridge:{ label:'Distance Becomes Behavior', href:'…/concept-bridges/distance-becomes-behavior/' },
  tools:[
    ['Animation Explorer', '…/tools/animation-explorer/'],
    ['map() Explorer',     '…/tools/map-explorer/'],
    // …
  ] }
```

- `glyph` = the session's dominant category mark (✦ ◎ ⬡ ▦ ☽). Doubles as the
  node icon, giving the arc a visual through-line.
- `tools` = `[label, href]` pairs. The reference is pre-filled with your real
  Session 1–5 tools and URLs — verify them against your routes, then extend each
  list to the full session roster.
- Keep this config in one shared file (e.g. `/assets/spine.js`) and include it on
  both the sessions page and every tool page, so there's a single list to maintain.

---

## 2. Mounting — two pages, three calls

**On `/sessions/`** (block 1 CSS + config + renderers, then):
```html
<div id="spine"></div>
<script>
  // currentIndex: which session to expand. Omit / pass null for none.
  // Tie it to scroll position if you want it to track as the user scrolls.
  ccs.renderSideRail('#spine', /* currentIndex */ 0);
</script>
```

**On a tool page** — give one element the session + this tool's URL, then let the
convenience initializer wire both pieces:
```html
<div id="spine" data-session="02" data-tool="https://…/tools/map-explorer/"></div>
<aside id="stations"></aside>
<script>
  ccs.autoToolPage('#spine', '#stations');   // reads data-session (1-based) + data-tool
</script>
```
`autoToolPage` calls `renderCompactStrip` (the you-are-here bar) and
`renderStationRail` (sibling tools, current one highlighted). The match is by
href, trailing slash tolerant. If you'd rather be explicit:
```js
ccs.renderCompactStrip('#spine', 1);                       // 0-based index
ccs.renderStationRail('#stations', 1, location.pathname);  // active = current page
```

---

## 3. The state logic (so you can extend safely)

- `stateOf(i, current)` → `'past' | 'current' | 'future'`. That single function
  drives every node's color, the connector-line fill, and the "You are here" badge.
- **Side rail**: past = filled ink, current = accent ring (expanded), future =
  outline. Connector segments above/at the current index render `.done` (accent).
- **Compact strip**: the same three states as 13px dots joined by segments; prev/next
  link to adjacent sessions and disable (`aria-disabled`) at the ends.
- **Station rail**: highlights the tool whose href matches the current page.

Everything is plain `<a href>` — it works with JS disabled as far as navigation
(the spine just won't render its chrome), and it's keyboard/screen-reader friendly.

---

## 4. Recommended adoption

1. Ship the config + CSS + renderers as two static assets (`spine.css`, `spine.js`).
2. Add the side rail to `/sessions/` first — it turns that stub page into the
   spine's home.
3. Add `autoToolPage` to your tool-page template. Since the session a tool belongs
   to is already known at build time (it's in a session block on the homepage),
   stamp `data-session` + `data-tool` from the generator.
4. Optional: make the side rail's `currentIndex` follow scroll with an
   IntersectionObserver on each session block — ~10 lines, makes it feel alive.

---

## 5. How it relates to the other two specs

- The **filter** (`Filter Spec.md`) is the *catalog's* narrowing UI; the spine is
  the *site's* wayfinding. Different jobs, different pages — don't merge them.
- The session a card belongs to (`data-session`) is shared vocabulary: the filter
  groups by it, the spine navigates by it.
- The fuller React synthesis (`Catalog.html`, `Session Arc.html`) shows all three
  together if you'd rather port from a single integrated source.

---

### File map
- **`Session Spine Spec.html`** — runnable reference (both contexts).
- **`Session Arc.html`** — the original exploration (Top / Side / Arc spine forms).
- **`Filter Spec.*`**, **`Card Anatomy Spec.*`** — Directions 1 and 2.
