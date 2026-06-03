# CC Fest — Card Anatomy: drop-in implementation spec

This packages **Direction 2 (the three content types reading distinct-but-related)**
as code for the static site. Today Bridge / Tool / Sketch differ only by a text
label, so the grid reads as one undifferentiated wall. This adds **one quiet,
type-specific "anatomy" zone** to each card — the "Medium" level you approved:

| Type | Zone | What it signals |
|------|------|-----------------|
| **Concept Bridge** | `idea ⟶ fill() · HSB` crossing | the bridge metaphor; this explains an idea |
| **Workshop Tool** | a slider + dots control strip | "you can move this" — it's interactive |
| **Starter Sketch** | a one-line code peek (`let speed = 4`) | "you can edit this" — it's a seed |

The frame, type label, and footer stay identical across all three, so the family
resemblance holds while the type is now legible at a glance.

Reference: **`Card Anatomy Spec.html`** — open it and use the **Before / After**
toggle to see the diff. Two copy blocks are fenced `░░ COPY ░░`.
**Vanilla, no build, no framework.**

---

## 1. The data contract

The anatomy zone is injected from `data-*` you mostly already have for the filter
(see `Filter Spec.md`). Two attributes are anatomy-specific and **optional** —
each has a graceful fallback:

```html
<article class="cca-card" data-type="bridge"
         data-fn="fill() · HSB · lerpColor()">     <!-- BRIDGE only; falls back to data-tags -->

<article class="cca-card" data-type="tool">        <!-- TOOL needs nothing extra -->

<article class="cca-card" data-type="sketch"
         data-snippet="let speed = 4">             <!-- SKETCH only; falls back to "// change <first tag>" -->
```

- **`data-fn`** (bridge): the p5 functions the bridge connects to. You already
  print these as tag chips (`sin() cos() unit circle`) — reuse that string. If
  absent, the enhancer uses `data-tags`.
- **`data-snippet`** (sketch): one representative line from the seed, ideally an
  assignment (`let speed = 4`) so the editable value can be accent-colored. If
  absent, it shows `// change <first tag>`.
- **Tools** need no extra data — the control strip is a fixed affordance cue.

Required base attribute: **`data-type="bridge|tool|sketch"`** and the card must
carry **`class="cca-card"`** (or change the selector in the enhancer).

---

## 2. Where to paste

1. **`<style id="cca-css">`** → your stylesheet. All selectors are `.cca-*`
   namespaced. The card-frame rules (`.cca-card`, `.cca-foot`, …) are there so the
   reference is self-contained — **if your cards already have their own frame
   styling, keep yours and copy only the `.cca-anat` / `.cca-bridge` /
   `.cca-tool` / `.cca-sketch` rules.**
2. **`<script id="cca-js">`** → before `</body>`, after your cards exist in the
   DOM. It enhances every `.cca-card` once on load (idempotent — safe to re-run).

The CSS variables (`--cca-accent`, etc.) should match your site tokens; map them to
whatever you already use.

---

## 3. Prefer hand-authored markup? (no JS)

If you'd rather bake the zone into your card template instead of running the
enhancer, the enhancer just produces this markup — drop it in directly, before the
footer:

```html
<!-- bridge -->
<div class="cca-anat cca-bridge">
  <span class="idea">idea</span><span class="arrow">⟶</span>
  <span class="fn">fill() · HSB · lerpColor()</span>
</div>

<!-- tool -->
<div class="cca-anat cca-tool">
  <span class="cca-track"><span class="cca-knob"></span></span>
  <span class="cca-dots"><i></i><i></i></span>
</div>

<!-- sketch -->
<div class="cca-anat cca-sketch">
  let speed = <span class="v">4</span>
</div>
```

Static markup is the most robust (works with JS disabled, no FOUC). The enhancer
is the lower-effort path if your generator can't easily emit per-type bodies.

---

## 4. Why "Medium" and not louder

We prototyped three intensities (`Content Types.html`):
- **Whisper** = today's label-only cards — types are nearly indistinguishable.
- **Medium** = this spec — one compact tell per type; instantly legible, still
  calm enough to tile 70 tools.
- **Loud** = full material per type (tinted panels, dark mini-editor) — unmistakable
  but busy and hard to keep tidy at scale.

Medium is the sweet spot for a dense, filterable catalog. If a single hero card
(e.g. the "Best first" picks) wants more presence, you can promote just those to
Loud without disturbing the grid.

---

## 5. Pairs with the filter

These cards are the same `.ccf-card` elements the filter (`Filter Spec.md`) shows
and hides — `cca-card` and `ccf-card` can sit on the same element. Add both
classes, add the union of the `data-*` attributes once, and the filter groups
them while the anatomy distinguishes them. Order of adoption doesn't matter; they
don't touch each other's DOM.

---

### File map
- **`Card Anatomy Spec.html`** — runnable reference + Before/After toggle.
- **`Filter Spec.html` / `Filter Spec.md`** — Direction 1 (the refine bar).
- **`Content Types.html`** — the original 3-intensity exploration (Whisper/Medium/Loud).
