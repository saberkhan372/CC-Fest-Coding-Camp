# CC Fest Coding Camp Deep Audit Tasks

Use this as the working checklist for the full-site audit. Mark each item as:

- `[ ]` not checked
- `[~]` checked, issue found
- `[x]` passed
- `[n/a]` not applicable

Severity:

- `P0` page blank, unusable, or core interaction broken
- `P1` major learning, navigation, mobile, or correctness issue
- `P2` polish issue, weak copy, awkward layout, or missing expected component
- `P3` optional improvement

Finding format:

```text
Page:
Viewport: desktop / mobile
Severity:
Issue:
Expected:
Evidence:
Suggested fix:
```

## Audit Pass 1 - Automated Static Sweep

- [x] List all source pages under `cc-fest-coding-camp-pages/`.
- [x] Count page groups: homepage, about, concept map, sessions, concept bridges, tools, starter sketches.
- [~] Check every HTML file has a `<title>`.
- [x] Flag stale meta counts: `31 tools`, `26 sketches`, `60 tools`, `40 sketches`.
- [x] Check homepage count text matches `21 bridges`, `70 workshop tools`, `44 starter sketches`.
- [~] Check internal links resolve to existing local files or valid anchors.
- [~] Flag any `../../starter-sketches/` paths.
- [~] Check static/JS tool pages include expected shared scripts where applicable.
- [x] Check CSS/JS asset references resolve.
- [ ] Check source-vs-docs drift after deploy expectations.

## Audit Pass 2 - Homepage

- [ ] Hero headline reads `A free workshop for creative coding.`
- [ ] Eyebrow reads `CC Fest Coding Camp - Free - Open to everyone` or equivalent with the same meaning.
- [ ] Hero lede includes open/invitation framing.
- [ ] Library summary cards show `21 / 70 / 44 / 5` if sessions are represented as five; otherwise flag mismatch with actual session data.
- [ ] Maker credit `CC Fest - 2026` or `CC Fest · 2026` is visible.
- [ ] Hero poster tiles animate on desktop pointer move.
- [ ] Mobile hero poster is flat and does not overflow.
- [ ] Topbar links present: CC Fest, Sessions, Map, About, GitHub.
- [ ] Topbar links resolve.
- [ ] Tool norms strip is visible between start panel and search.
- [ ] Tool norms are tool-specific, not generic social norms.
- [ ] Beginner path renders 6 entries.
- [ ] Best-first row renders 4 entries.
- [ ] Beginner/best-first links resolve.
- [ ] Suit filter buttons are present and clickable.
- [ ] Pathway filter buttons are present and clickable.
- [ ] Difficulty buttons are present: All, Beginner, Extension, Capstone.
- [ ] Filters compose by intersection.
- [ ] All suit button resets suit, pathway, and difficulty.
- [ ] Search filters cards live.
- [ ] Clearing search restores full gallery.
- [ ] Gallery headers show current counts.
- [ ] Footer copy is real and short.
- [ ] Footer links resolve.

## Audit Pass 3 - Concept Bridge Pages

Scope: `cc-fest-coding-camp-pages/concept-bridges/*/index.html`

- [ ] All 21 bridge pages render.
- [ ] Rhythm strip has five cards: Fuzzy idea, See it, Change it, Code idea, Go next.
- [ ] Desktop rhythm is 5-column.
- [ ] Mobile rhythm stacks without overflow.
- [ ] Canvas/interactive area renders.
- [ ] All sliders, tabs, and buttons respond.
- [ ] Tab progress bar updates where present.
- [ ] `aria-selected` updates where tabs exist.
- [ ] Snapshot button labeled `Save snapshot` is present where expected.
- [ ] Snapshot downloads PNG on at least one representative bridge.
- [ ] Break-it preset works where present.
- [ ] Teaching-note panel exists on priority/foundational bridge pages.
- [ ] Teaching-note uses exactly Prompt / Misconception / Ask.
- [ ] Try-next panel exists on six priority bridges.
- [ ] Try-next has Workshop Tools / Starter Sketches / Related Bridge.
- [ ] Try-next links resolve.
- [ ] Back navigation resolves to homepage.
- [ ] Local accent color is intentional and consistent.

Priority bridges:

- [ ] noise-smooth-randomness
- [ ] how-p5-thinks-about-time
- [ ] color-numbers-become-feeling
- [ ] map-range-translator
- [ ] arrays-one-thing-to-many-things
- [ ] state-machines-sketches-have-modes

Foundational bridges:

- [ ] events-sketches-listen
- [ ] distance-becomes-behavior
- [ ] random-controlled-surprise
- [ ] conditionals-code-makes-choices
- [ ] functions-make-your-own-commands
- [ ] variable-scope-where-variables-live

## Audit Pass 4 - Static Workshop Tool Pages

Scope: static tool pages that do not call `renderWorkshopToolPage(...)` or `renderStarterSeedPage(...)`.

- [ ] Nav present using either `div.tool-topbar` or `.top`.
- [ ] Back-to-library link resolves.
- [ ] Tool name appears in `<h1>`.
- [ ] Subtitle describes what the learner can do.
- [ ] Rhythm strip has Open it / Change it / Predict it / Remix it / Teach it.
- [ ] Session pill is present.
- [ ] Type pill is present.
- [ ] Canvas loads and renders.
- [ ] Controls respond.
- [ ] Live code/readouts update where present.
- [ ] `p5-export-helper.js?v=...` script is present.
- [ ] Canvas action bar appears after load.
- [ ] Save Image downloads PNG on representative page.
- [ ] Fullscreen works on representative page.
- [ ] Copy link copies current URL on representative page.
- [ ] Code export bar appears near code block where expected.
- [ ] `?embed=1` hides nav, rhythm, teaching note, try-next, and footer.
- [ ] `?embed=1` leaves canvas and controls functional.
- [ ] Teaching-note panels are correct where present.
- [ ] Break-it notes are short and specific where present.
- [ ] Try-next links resolve where present.
- [ ] OG/Twitter descriptions do not contain stale counts.

Representative static tools:

- [ ] noise-lab
- [ ] map-explorer
- [ ] rgb-hsb-color-lab
- [ ] if-else-decision-studio
- [ ] animation-explorer
- [ ] simple-array-explorer
- [ ] how-does-it-grow
- [ ] bezier-curve-sculptor
- [ ] distribution-visualizer
- [ ] unit-circle-wave-sync

## Audit Pass 5 - JS-Rendered Workshop Tool Pages

Scope: pages calling `renderWorkshopToolPage(...)`.

- [ ] All 11 JS-rendered pages render.
- [ ] `tool-state-utils.js?v=...` script tag is present.
- [ ] Moving a slider updates URL hash after debounce.
- [ ] Reloading with hash restores control values.
- [ ] Canvas redraws to match loaded state.
- [ ] `?embed=1` survives alongside hash state.
- [ ] All controls from data object are present.
- [ ] Teaching-note panel is rendered by JS.
- [ ] Related resources are rendered by JS.
- [ ] Static workshop tool checks also pass.

Known JS-rendered pages:

- [ ] agents-rules-playground
- [ ] atan2-rotation-studio
- [ ] class-inheritance-explorer
- [ ] easing-types-comparison
- [ ] game-state-studio
- [ ] gravity-acceleration-playground
- [ ] hover-data-chart
- [ ] object-lifecycle-visualizer
- [ ] readable-code-coach
- [ ] sine-cosine-motion-explorer
- [ ] string-text-manipulation-studio

## Audit Pass 6 - Starter Sketch Pages

Scope: pages calling `renderStarterSeedPage(...)`.

- [ ] All 44 starter pages render.
- [ ] Seed rhythm has See it / Change it / Remix it / Teach it.
- [ ] Rhythm styling matches `starter-sketch.css`.
- [ ] Mobile rhythm collapses cleanly.
- [ ] p5 sketch runs without error.
- [ ] Sketch is not blank.
- [ ] Authored related metadata renders with correct titles where present.
- [ ] Tag-based fallback renders for at least one page without authored related metadata.
- [ ] Maker credit is visible.

Representative starter sketches:

- [ ] mini-generative-poster-seed
- [ ] generative-tile-pattern-seed
- [ ] wander-agent-seed
- [ ] color-from-position
- [ ] game-state-starter

## Audit Pass 7 - Sessions

- [ ] `/sessions/index.html` renders.
- [ ] Cards render from `SESSIONS` array.
- [ ] Session data is correct for actual sessions or clearly marked template-only.
- [ ] Template link resolves.
- [ ] `/sessions/template/index.html` renders.
- [ ] Editable fields are present: session number, topic, date, location, accent color.
- [ ] Field changes redraw poster.
- [ ] Shuffle design redraws.
- [ ] Download poster saves PNG.
- [ ] Headline auto-scales and does not overflow.
- [ ] Maker credit visible on poster.
- [ ] Visual design matches CC Fest language.

## Audit Pass 8 - About Page

- [ ] CC Fest frame/context is visible.
- [ ] Audience notes are clear.
- [ ] Session rhythm is described.
- [ ] Note from Saber section exists.
- [ ] Direct next-step links point back into the library.
- [ ] Topbar matches homepage topbar.
- [ ] Page is not a dead end.

## Audit Pass 9 - Concept Map

- [ ] `concept-map-data.js` loads without console errors.
- [ ] Desktop SVG graph renders.
- [ ] Priority bridges are bold hexagons.
- [ ] Referenced bridges are smaller/lighter hexagons.
- [ ] Tools are rounded rectangles with suit-colored left border.
- [ ] Sketches are circles with suit-colored fill.
- [ ] Solid lines connect tool/sketch relationships.
- [ ] Dashed accent lines connect bridge cross-links.
- [ ] Arrowheads point toward target nodes.
- [ ] Three swimlanes render: Bridges / Tools / Sketches.
- [ ] `color-from-position` sits between columns 3 and 4.
- [ ] Referenced bridges sit outside 6-column grid.
- [ ] Nodes are clickable links.
- [ ] Hover title/tooltips are present.
- [ ] Mobile hides SVG and shows readable list fallback.
- [ ] Homepage topbar Map link resolves.
- [ ] Flag known map gap: phase 14-18 tools missing from data.

## Audit Pass 10 - Cross-Cutting Visual / Accessibility / Mobile

- [ ] Fraunces loads for headlines.
- [ ] DM Sans loads for body.
- [ ] DM Mono appears only for code/labels.
- [ ] Cream/paper background is present.
- [ ] Dot-grid/noise texture is visible.
- [ ] No pure-white/off-brand gray page backgrounds.
- [ ] Ink text is used instead of pure black/mid-gray.
- [ ] Token colors are respected.
- [ ] Keyboard navigation works on representative pages.
- [ ] Focus states are visible.
- [ ] Controls have labels.
- [ ] Important information is not hover-only.
- [ ] 200% zoom remains usable on representative pages.
- [ ] No horizontal scroll at mobile breakpoints.
- [ ] Rotated elements flatten on mobile.
- [ ] Canvas areas fit viewport.
- [ ] Text does not clip or overlap.
- [ ] Console has no serious errors on representative pages.
- [ ] No missing shared CSS/JS files.
- [ ] Preview canvases do not cause obvious homepage jank.

## Suggested Audit Order

1. Automated static sweep.
2. Homepage desktop and mobile.
3. About, sessions, concept map.
4. One representative bridge, static tool, JS-rendered tool, and starter sketch.
5. Six priority bridges.
6. Remaining bridge pages.
7. JS-rendered workshop tools.
8. Static workshop tools by suit station.
9. Starter sketches.
10. Final mobile and console sweep.
