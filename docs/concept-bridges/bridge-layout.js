/* bridge-layout.js — Phase 0+1 layout fix for all concept-bridge pages.
 *
 * Two safe, universal improvements applied at runtime so we don't have to hand-
 * edit 21 pages' inline styles/markup (which load after the shared stylesheet
 * and would otherwise win the cascade):
 *
 *   Phase 0 — Responsive canvas. The per-page inline script hard-sets
 *     `canvas.style.width = CW + 'px'`, which overrides the stylesheet's
 *     `width:100%` and makes the canvas a fixed pixel size — so it overflows and
 *     gets clipped by `.canvas-panel { overflow:hidden }` on narrow screens
 *     (a pre-existing mobile bug). The pointer handlers already map coordinates
 *     via getBoundingClientRect, so we can safely let CSS drive the display size:
 *     cap the width at the original logical width, then width:100% / height:auto.
 *
 *   Phase 1 — Layout rebalance. The three teaching callouts (Big idea / Common
 *     mistake / Try this) sit in the tall right control rail, leaving dead space
 *     under the shorter canvas column. Move them into a full-width band beneath
 *     the grid so the rail shrinks to roughly the canvas height and the columns
 *     balance. Callouts are located by their stable ids/classes, so this works
 *     on all 21 bridges including the 5 without a #bridge-panel wrapper.
 *
 * Canvas dimensions are NOT changed here — that's Phase 2, done per page.
 */
(() => {
  "use strict";

  const CSS = `
    /* Equal-height columns + a panel that lets the canvas wrap fill height */
    .main-grid { align-items: stretch; }
    .canvas-panel { display: flex; flex-direction: column; }
    .canvas-wrap { flex: 1 1 auto; align-content: center; }
    /* Backup for the responsive canvas (JS inline styles are authoritative) */
    .canvas-panel canvas, .canvas-wrap canvas { width: 100%; height: auto; }

    /* Phase 2 (safe, universal): give the canvas more of the row on wide
       screens so it scales up to fill the reclaimed space. Aspect ratio is
       preserved and no per-page coordinates change — the canvas just renders
       larger. Below the 980px breakpoint the original single-column layout
       (and the callout band's own breakpoint) take over. */
    @media (min-width: 981px) {
      /* Widen the whole page container so the canvas column has room to grow
         into the side margins (prose keeps its own narrower max-width, so
         reading line-length is unaffected). */
      .page { max-width: 1320px; }
      .main-grid { grid-template-columns: minmax(0, 1.5fr) minmax(330px, 0.8fr); }
    }
    /* Let the event-type tabs shrink to fit a narrower rail instead of
       forcing a few px of horizontal overflow (e.g. world-vs-local at 1000px). */
    .tabs { min-width: 0; }
    .tabs .tab, .tabs button { min-width: 0; }

    /* Teaching callouts relocated into a full-width band below the grid */
    .bridge-callouts {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 18px;
    }
    .bridge-callouts .callout { margin: 0; height: 100%; }
    @media (max-width: 860px) {
      .bridge-callouts { grid-template-columns: 1fr; }
    }
  `;

  function injectStyle() {
    if (document.getElementById("cc-bridge-layout-style")) return;
    const style = document.createElement("style");
    style.id = "cc-bridge-layout-style";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  // Phase 1 — move the callouts into a full-width band after the grid.
  function relocateCallouts() {
    const grid = document.querySelector(".main-grid");
    if (!grid || document.querySelector(".bridge-callouts")) return;

    const callouts = [];
    for (const id of ["big-idea-text", "bug-text", "try-text"]) {
      const el = document.getElementById(id);
      const box = el && el.closest(".callout");
      if (box && !callouts.includes(box)) callouts.push(box);
    }
    // Fallback for any page that doesn't use those ids.
    if (!callouts.length) {
      for (const box of document.querySelectorAll(".callout")) callouts.push(box);
    }
    if (!callouts.length) return;

    const band = document.createElement("section");
    band.className = "bridge-callouts";
    band.setAttribute("aria-label", "Key ideas");
    callouts.forEach((box) => band.appendChild(box)); // appendChild moves the node
    grid.insertAdjacentElement("afterend", band);
  }

  // Phase 0 — let CSS drive the canvas display size so it scales and never clips.
  function makeCanvasResponsive() {
    const canvas = document.querySelector(".canvas-wrap canvas, .canvas-panel canvas");
    if (!canvas) return;
    // Read each page's own display cap (most set the canvas to max-width:620px
    // via an id selector that a shared class rule can't beat) and raise it ~1.3×
    // as an inline style, which always wins. Only 2 of 21 pages set
    // canvas.style.width, so reading the COMPUTED max-width is what makes the
    // enlargement consistent across all bridges. width:100% / height:auto keep
    // it responsive against the 2× DPR backing, so it never clips on mobile.
    const cap = parseInt(getComputedStyle(canvas).maxWidth, 10); // e.g. 620
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    if (cap) canvas.style.maxWidth = Math.round(cap * 1.3) + "px";
  }

  function run() {
    injectStyle();
    relocateCallouts();
    makeCanvasResponsive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
