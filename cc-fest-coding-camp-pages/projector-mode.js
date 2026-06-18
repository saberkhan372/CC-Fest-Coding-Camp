/* projector-mode.js — "Project" (classroom / Zoom) view for CC Fest tool pages.
 *
 * This does NOT introduce a new display mode. It drives the project's existing
 * `embed-mode` (see p5-export-helper.js, spine.js, catalog-meta-strip.js,
 * starter-seed-pages.js) so that one focused layout serves both embeds and the
 * projector view. It adds two things on top:
 *
 *   1. A visible "Project" link (normal view) that opens a focused view in a new
 *      tab, preserving existing query params AND url-hash tool state.
 *   2. The hide rules embed-mode was missing — extended to cover all four tool
 *      layouts (.tool-shell, .wrap/nav.top, .page-topbar, .sketch-shell) plus
 *      the lone .topbar/.workspace variant — via class rules and a semantic
 *      "data-embed-hide" pass so teaching/related blocks collapse cleanly
 *      instead of leaving empty card shells.
 *
 * Public interface:
 *   ?project=1   canonical focused URL (opened by the Project link)
 *   ?embed=1     existing alias — same focused layout (iframe embeds)
 *   ?view=project  legacy alias, still honored
 */
(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const isProject = params.get("project") === "1" || params.get("view") === "project";
  const isEmbed = params.get("embed") === "1";
  const isFocus = isProject || isEmbed;

  const FOCUS_CLASS = "embed-mode"; // reuse the existing focused-layout mode

  // Topbars across every layout — used to place the button and to hide in focus.
  const TOPBAR_SELECTOR =
    ".tool-topbar, nav.top, .page-topbar, .sketch-topbar, nav.topbar, .topbar";

  // Inner markers for teaching / related blocks. The semantic pass walks each up
  // to its nearest card-like container and hides the whole block — unless that
  // container also holds something interactive (then only the marker is hidden).
  const TEACHING_MARKERS = [
    ".lesson-grid", ".lessons", ".lesson", ".lesson-cards",
    ".teaching-note", ".teaching-note-grid", ".notes-grid", ".note-card",
    ".mini-note", ".related-group", ".related-grid"
  ];
  const CONTAINER_SELECTOR = ".card, .lessons-card, section, article, aside, .panel";
  // Never collapse a container holding any of these — the interactive essentials.
  const ESSENTIALS_SELECTOR =
    "canvas, iframe, #starter-editor, .code-editor, .code-panel, pre, " +
    ".controls, .controls-grid, .controls-panel, input, select, textarea, " +
    ".canvas-action-bar, .stat-list, .readout-row, .readout-card";

  // ── Stylesheet: extend embed-mode to fully cover all layouts ───────────
  const CSS = `
    /* Topbars + injected wayfinding + catalog meta */
    .${FOCUS_CLASS} .tool-topbar,
    .${FOCUS_CLASS} nav.top,
    .${FOCUS_CLASS} .page-topbar,
    .${FOCUS_CLASS} .sketch-topbar,
    .${FOCUS_CLASS} nav.topbar,
    .${FOCUS_CLASS} .topbar,
    .${FOCUS_CLASS} .ccs-crumb,
    .${FOCUS_CLASS} .ccs-rail,
    .${FOCUS_CLASS} .ccs-strip,
    .${FOCUS_CLASS} .ccs-stations,
    .${FOCUS_CLASS} .ccs-tool-nav,
    .${FOCUS_CLASS} .cc-session-strip,
    .${FOCUS_CLASS} .catalog-meta-strip,
    /* Metadata pills */
    .${FOCUS_CLASS} .tool-header-meta,
    .${FOCUS_CLASS} .sketch-meta,
    .${FOCUS_CLASS} .stage-tag,
    /* Subtitles / tags / lede */
    .${FOCUS_CLASS} .tool-subtitle,
    .${FOCUS_CLASS} .sketch-subtitle,
    .${FOCUS_CLASS} .subtitle,
    .${FOCUS_CLASS} .tool-tags,
    .${FOCUS_CLASS} .tag-row,
    .${FOCUS_CLASS} .chips,
    .${FOCUS_CLASS} .wrap > .tag,
    .${FOCUS_CLASS} .lede,
    /* Learning-rhythm strips */
    .${FOCUS_CLASS} .tool-rhythm,
    .${FOCUS_CLASS} .seed-rhythm,
    /* Teaching / notes / related blocks that are their own container */
    .${FOCUS_CLASS} .care-note,
    .${FOCUS_CLASS} .lessons-card,
    .${FOCUS_CLASS} .teaching-note,
    .${FOCUS_CLASS} .try-next,
    .${FOCUS_CLASS} .related-resources,
    /* Footers */
    .${FOCUS_CLASS} .tool-footer,
    .${FOCUS_CLASS} .footer,
    /* Semantic pass result */
    .${FOCUS_CLASS} [data-embed-hide]{display:none !important;}

    /* Projector layout polish — compact chrome, no canvas-buffer changes */
    .${FOCUS_CLASS} .tool-shell,
    .${FOCUS_CLASS} .sketch-shell{padding-top:16px;}
    .${FOCUS_CLASS} .tool-header,
    .${FOCUS_CLASS} .sketch-header{margin-bottom:8px;}
    .${FOCUS_CLASS} .container,
    .${FOCUS_CLASS} .wrap{padding-top:14px;}
    @media (min-width:1100px){
      .${FOCUS_CLASS} .tool-layout{
        grid-template-columns:minmax(0,1.7fr) minmax(280px,.82fr);
      }
    }

    /* "Project" link in the topbar (normal view) */
    .cc-project-link{color:#c8391d !important;font-weight:700;}
    .cc-project-link:hover{text-decoration:underline;}
    /* Fallback button when a page has no recognizable topbar */
    a.cc-project-link.cc-project-fallback,
    .cc-projector-exit{
      position:fixed;top:12px;right:12px;z-index:9999;
      font:700 12px "DM Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
      text-decoration:none;background:rgba(255,255,255,.9);
      border:1px solid rgba(44,42,38,.18);border-radius:999px;
      padding:6px 11px;box-shadow:0 1px 3px rgba(0,0,0,.08);
    }
    .cc-projector-exit{color:#6b6760;font-weight:600;}
    .cc-projector-exit:hover{color:#c8391d;border-color:#c8391d;}
    @media print{.cc-projector-exit,.cc-project-link{display:none;}}
  `;

  function injectStyle() {
    if (document.getElementById("cc-projector-style")) return;
    const style = document.createElement("style");
    style.id = "cc-projector-style";
    style.textContent = CSS;
    (document.head || document.documentElement).appendChild(style);
  }

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  // ── URL builders — preserve query params AND hash (tool state) ──────────
  function projectHref() {
    const url = new URL(location.href);
    url.searchParams.set("project", "1");
    url.searchParams.delete("embed");
    url.searchParams.delete("view");
    return url.href; // hash left intact
  }

  function exitHref() {
    const url = new URL(location.href);
    url.searchParams.delete("project");
    url.searchParams.delete("embed");
    url.searchParams.delete("view");
    return url.href; // hash left intact
  }

  // ── Normal view: the "Project" link ────────────────────────────────────
  function makeProjectLink(extraClass) {
    const a = document.createElement("a");
    a.className = "cc-project-link" + (extraClass ? " " + extraClass : "");
    a.href = projectHref();
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "⊕ Project";
    a.title = "Open projector view in a new tab";
    a.setAttribute("aria-label", "Open projector view in a new tab");
    return a;
  }

  function injectButton() {
    if (document.querySelector(".cc-project-link")) return true;
    const topbar = document.querySelector(TOPBAR_SELECTOR);
    if (!topbar) return false;
    topbar.appendChild(makeProjectLink());
    return true;
  }

  function injectFallbackButton() {
    if (document.querySelector(".cc-project-link")) return;
    document.body.appendChild(makeProjectLink("cc-project-fallback"));
  }

  function buttonFlow() {
    // Topbars exist at script time for every page that has one (static markup,
    // or synchronously rendered starter sketches), so try that first.
    if (injectButton()) return;
    // No topbar — guarantee a button NOW. A timer chain here would be throttled
    // in a background tab, so the link must be placed synchronously.
    injectFallbackButton();
    // Defensive: if a topbar appears later, move the link into it. A
    // MutationObserver fires on real DOM changes even in throttled background
    // tabs, so this upgrade is reliable without depending on timers.
    const observer = new MutationObserver(() => {
      const topbar = document.querySelector(TOPBAR_SELECTOR);
      if (!topbar) return;
      const link = document.querySelector(".cc-project-link");
      if (link) {
        link.classList.remove("cc-project-fallback");
        topbar.appendChild(link);
      }
      observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 8000);
  }

  // ── Focus view: engage embed-mode + collapse teaching/related blocks ────
  function semanticHidePass() {
    for (const marker of TEACHING_MARKERS) {
      for (const el of document.querySelectorAll(marker)) {
        const container = el.closest(CONTAINER_SELECTOR);
        const target =
          container && !container.querySelector(ESSENTIALS_SELECTOR)
            ? container
            : el;
        target.setAttribute("data-embed-hide", "1");
      }
    }
  }

  function injectExit() {
    if (document.querySelector(".cc-projector-exit")) return;
    const a = document.createElement("a");
    a.className = "cc-projector-exit";
    a.href = exitHref();
    a.textContent = "✕ Exit projector";
    a.title = "Return to the full tool page";
    document.body.appendChild(a);
  }

  // ── Boot ───────────────────────────────────────────────────────────────
  injectStyle();
  if (isFocus) document.documentElement.classList.add(FOCUS_CLASS);

  if (isFocus) {
    onReady(() => {
      document.body.classList.add(FOCUS_CLASS);
      semanticHidePass();
      // Starter sketches render their DOM after this runs — re-run as it appears.
      const observer = new MutationObserver(() => semanticHidePass());
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(() => observer.disconnect(), 4000);
      if (isProject) injectExit(); // exit chrome only for the new-tab projector view
    });
  } else {
    onReady(buttonFlow);
  }
})();
