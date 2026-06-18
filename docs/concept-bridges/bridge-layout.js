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
    const fixed = canvas.style.width; // e.g. "620px", set by the page's inline setup
    if (fixed && fixed.endsWith("px")) canvas.style.maxWidth = fixed;
    canvas.style.width = "100%";
    canvas.style.height = "auto";
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
