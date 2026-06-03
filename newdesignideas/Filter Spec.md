# CC Fest — Catalog Filter: drop-in implementation spec

This packages **Direction 1 (filter / taxonomy)** as code you can paste into the
static site. It replaces the three stacked filter rows on the homepage
(`All / ✦ Marks / … / ⊕ Support`, then `All pathways / …`, then `All levels / …`)
with **one refine bar** that has the things the current filter is missing:

- a single **search** field (name + tags + description),
- an **"Organize by" lens** that regroups the surviving cards into labeled,
  counted sections (Category / Session / Goal / Level / none),
- **live counts** on every facet option (the number you'll get if you pick it),
- **removable active-filter tokens** + a result total + an empty state,
- **AND across facets, OR within a facet** (e.g. Marks *or* Motion, *and* Beginner).

It's **vanilla JS, no build step, no framework** — matching the site's static
HTML. Reference implementation: **`Filter Spec.html`** (open it; the three copy
blocks are fenced with `░░ COPY ░░` comments). This file is the integration guide.

---

## 1. The data contract (the only real work)

The filter reads everything from `data-*` attributes on each card. Your tool /
bridge / sketch generator **already prints all of these as visible text** today
(the `✦ Marks · III`, `Interactive`, `Beginner`, the tag chips). You just need to
**also stamp them as attributes** on the card's root element:

```html
<article class="ccf-card"
         data-type="tool"                         <!-- tool | bridge | sketch -->
         data-category="marks"                     <!-- marks motion systems data open support -->
         data-level="beginner"                     <!-- beginner | extension | capstone -->
         data-session="01"                          <!-- 01..05, or — for cross-session -->
         data-pathway="first animation"            <!-- space-separated; optional -->
         data-name="Coordinate System Explorer"
         data-tags="coordinates canvas shapes">
  … your existing card markup, unchanged …
</article>
```

Notes:
- `data-pathway` is the one genuinely new piece of data. Today pathways exist only
  as filter buttons, not per-card metadata — you'll need to tag each card with the
  goals it serves. It's optional: cards with no pathway simply never match a goal filter.
- The interaction sub-type you added (`Interactive`, `Code Generator`, `Simulation`,
  `Async Lab`, …) is **richer than `data-type`** and worth keeping — see §5 for how
  to fold it in as a fourth facet *without* it becoming a fourth stacked row.
- Everything else you already compute. The session number is implied by which
  session block a tool's bridge sits in; carry it onto the card.

---

## 2. Where to paste

1. **`<style id="ccf-css">`** → into your stylesheet (or keep as a block). All
   selectors are namespaced `.ccf-*` so they won't collide. The card styling in
   there is only for the standalone demo — **delete the `.ccf-card{…}` visual rules
   and keep your existing card CSS**; the script only needs `.ccf-card[hidden]{display:none}`
   and the `.ccf-group` / `.ccf-group-head` rules.
2. **The `.ccf-bar` markup** → directly above your `#interactive-tools` grid.
3. Give the grid container **`id="ccf-grid"`** and put the empty-state div inside it.
4. **`<script id="ccf-js">`** → before `</body>`. It self-initialises on load.

That's it. No dependencies.

---

## 3. How the logic works (so you can extend it safely)

- **One state object** holds `q`, `type`, three `Set`s (`cats`, `levels`, `paths`),
  and `lens`.
- **`matches(card, ignore)`** decides if a card survives. `ignore` lets it skip one
  facet — that's how counts stay honest.
- **`countFor(key, value)`** = "how many cards match if I also pick `value`,
  holding every *other* facet fixed." This is the number printed on each chip, so
  the count is always *what you'll actually get*, never a dead end. Options that
  would yield 0 are disabled.
- **`applyGrouping(visible)`** is the lens. With a lens active it removes old group
  headers, then re-appends headers + their members into the grid in taxonomy order.
  `.ccf-group` uses `display:contents` so groups don't break the CSS grid columns.
  With lens = none it just toggles `hidden` in source order.
- **`render()`** re-runs all of the above on every change. With ~135 cards this is
  instantaneous; no need to debounce beyond the native `input` event.

---

## 4. Recommended defaults

- **Default lens = Category.** It reproduces the editorial sections you already
  have ("Draw + Color", "Motion + Interaction", …) but now they're filterable and
  counted. Set the `<select id="ccf-lens">` `selected` option accordingly.
- **Type as a segmented control, not a row of six.** Bridges / Tools / Sketches is
  the highest-level cut and deserves the most prominent, always-visible control.
- Keep Category / Level / Goal as **count-bearing chips** — multi-select, with the
  live number doing the teaching ("oh, only 2 capstone data tools").

---

## 5. Folding in your interaction sub-type (Interactive / Simulation / …)

You introduced a useful tool taxonomy. Don't add it as a 4th stacked row — that
recreates the original problem. Two good options:

- **As a lens value:** add `<option value="interaction">Interaction style</option>`
  to the Organize-by select and a `data-interaction="simulation"` attribute, then add
  an `interaction` block to `GROUP_META`. Users *group* by it on demand instead of
  it always occupying bar space.
- **As a search keyword:** include the interaction label in `data-tags`, so typing
  "simulation" surfaces them. Lowest effort, zero new UI.

---

## 6. What this spec deliberately leaves to you

- **Visual styling of the cards** — untouched; keep your look. Only add the
  Medium per-type "anatomy" cue from Direction 2 when you're ready (separate spec).
- **URL state / deep links** — if you want `?type=tool&cat=motion` to be shareable,
  read/write `state` to `location.search` in `render()` and on init. ~15 lines.
- **The session spine (Direction 3)** lives on `/sessions/` and tool pages, not
  here — this bar is the catalog's filter, the spine is the site's wayfinding.

---

### File map
- **`Filter Spec.html`** — runnable reference (view source, copy the 3 blocks).
- **`Catalog.html`** — the fuller React synthesis (filter + Medium cards + session
  spine together) if you'd rather port from that.
