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
 * This file also owns the shared fullscreen workspace used by both generated
 * tools and starter sketches. Fullscreen is deliberately stricter than Project:
 * it temporarily moves the live canvas/editor and its actual controls into a
 * focused shell, so listeners and state survive, while titles, teaching chrome,
 * export links, and page navigation stay behind.
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

    /* Fullscreen workspace — canvas/editor + controls, with no page chrome. */
    .cc-fullscreen-shell{
      box-sizing:border-box;width:100%;height:100%;min-height:100vh;
      overflow:auto;padding:clamp(18px,3vw,48px);
      color:#2c2a26;background:#f7f3ea;
      font-family:inherit;color-scheme:light;
    }
    .cc-fullscreen-shell.cc-fullscreen-fallback{
      position:fixed;inset:0;z-index:2147483000;
    }
    .cc-fullscreen-workspace{
      width:min(1800px,100%);min-height:calc(100vh - clamp(36px,6vw,96px));
      margin:0 auto;display:grid;
      grid-template-columns:minmax(0,1.7fr) minmax(270px,.72fr);
      gap:clamp(16px,2vw,32px);align-items:stretch;
    }
    .cc-fullscreen-canvas-column,
    .cc-fullscreen-controls-column{min-width:0;display:flex;flex-direction:column;gap:14px;}
    .cc-fullscreen-canvas-column>[data-cc-fullscreen-part="canvas"]{flex:1;}
    .cc-fullscreen-shell [data-cc-fullscreen-part="canvas"]{
      min-height:0;display:flex;flex-direction:column;justify-content:center;
    }
    .cc-fullscreen-shell canvas{
      display:block;width:100% !important;height:auto !important;
      max-width:100% !important;max-height:calc(100vh - 96px) !important;
      margin:auto;object-fit:contain;
    }
    .cc-fullscreen-shell .cc-fullscreen-starter{grid-column:1/-1;min-width:0;}
    .cc-fullscreen-shell .cc-fullscreen-starter>.editor-card{margin:0;}
    .cc-fullscreen-shell .editor-layout{min-height:calc(100vh - 150px);}
    .cc-fullscreen-shell .preview-frame{min-height:clamp(360px,66vh,900px);}
    .cc-fullscreen-shell .tool-header,
    .cc-fullscreen-shell .sketch-header,
    .cc-fullscreen-shell .card-header,
    .cc-fullscreen-shell .editor-hint,
    .cc-fullscreen-shell .teaching-note,
    .cc-fullscreen-shell .lesson-grid,
    .cc-fullscreen-shell .lessons,
    .cc-fullscreen-shell .related-group,
    .cc-fullscreen-shell .related-grid,
    .cc-fullscreen-shell .p5-export-bar,
    .cc-fullscreen-shell .canvas-action-bar,
    .cc-fullscreen-shell #p5-export-button{display:none !important;}
    .cc-fullscreen-shell [data-cc-fullscreen-part] > h1,
    .cc-fullscreen-shell [data-cc-fullscreen-part] > h2,
    .cc-fullscreen-shell [data-cc-fullscreen-part] > .title,
    .cc-fullscreen-shell [data-cc-fullscreen-part] > .subtitle,
    .cc-fullscreen-shell [data-cc-fullscreen-part] > p:first-of-type{display:none !important;}
    .cc-fullscreen-exit{
      position:fixed;top:12px;right:12px;z-index:2147483647;
      appearance:none;border:1px solid rgba(44,42,38,.24);border-radius:999px;
      padding:8px 12px;background:rgba(255,255,255,.94);color:#2c2a26;
      box-shadow:0 2px 10px rgba(0,0,0,.12);cursor:pointer;
      font:700 12px "DM Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
    }
    .cc-fullscreen-exit:hover{color:#c8391d;border-color:#c8391d;}
    .cc-fullscreen-notice{
      position:fixed;left:50%;bottom:16px;z-index:2147483647;
      transform:translateX(-50%);padding:8px 12px;border-radius:999px;
      background:#2c2a26;color:#fff;font-size:12px;box-shadow:0 2px 10px rgba(0,0,0,.18);
    }
    @media (max-width:900px){
      .cc-fullscreen-workspace{grid-template-columns:1fr;min-height:0;}
      .cc-fullscreen-shell canvas{max-height:none !important;}
      .cc-fullscreen-shell .editor-layout{min-height:0;}
    }
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

  // ── Fullscreen workspace: stricter than Project mode ─────────────────
  const FULLSCREEN_CONTAINER_SELECTOR =
    ".controls, .controls-panel, .control-panel, .controls-grid, .control-card, " +
    ".settings, .settings-panel, .card, .panel, article, aside, section";
  let fullscreenSession = null;

  function isVisible(el) {
    if (!el || !el.isConnected) return false;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
  }

  function nativeFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function compactRoots(nodes) {
    const unique = Array.from(new Set(nodes.filter(Boolean)));
    return unique.filter((node) => !unique.some((other) => other !== node && other.contains(node)));
  }

  function controlRoots(canvasRoot) {
    const ignored =
      ".canvas-action-bar, .p5-export-bar, .tool-topbar, nav, .page-topbar, " +
      ".sketch-topbar, .cc-project-link, .cc-projector-exit, .tool-header, .sketch-header";
    const controls = Array.from(document.querySelectorAll("button, input, select, textarea"))
      .filter((el) => isVisible(el) && !el.closest(ignored))
      .filter((el) => el.id !== "p5-export-button" && el.id !== "fullscreen-btn")
      .filter((el) => !/copy link|save image|p5 editor|fullscreen/i.test(el.textContent || ""));
    const roots = controls.map((el) => el.closest(FULLSCREEN_CONTAINER_SELECTOR) || el.parentElement);
    return compactRoots(roots)
      .filter((root) => root && root !== canvasRoot && !canvasRoot.contains(root))
      .filter((root) => !root.closest(".lessons-card, .teaching-note, .related-group, .related-grid"))
      // Copy/export buttons can make a code card look interactive. Keep actual
      // form controls; discard read-only code cards whose only controls are
      // export conveniences.
      .filter((root) => !(
        root.querySelector("pre, .code-panel, .code-output") &&
        !root.querySelector("input, select, textarea")
      ));
  }

  function moveInto(node, destination, part, moved) {
    const marker = document.createComment("cc-fullscreen-placeholder");
    node.parentNode.insertBefore(marker, node);
    node.setAttribute("data-cc-fullscreen-part", part);
    destination.appendChild(node);
    moved.push({ node, marker });
  }

  function restoreFullscreenSession(session) {
    if (!session || session.restored) return;
    session.restored = true;
    for (const { node, marker } of session.moved) {
      node.removeAttribute("data-cc-fullscreen-part");
      if (marker.parentNode) marker.parentNode.insertBefore(node, marker);
      marker.remove();
    }
    session.shell.remove();
    document.documentElement.classList.remove("cc-fullscreen-active");
    document.body.style.overflow = session.bodyOverflow;
    session.trigger.textContent = session.originalLabel;
    session.trigger.removeAttribute("aria-pressed");
    fullscreenSession = null;
    window.removeEventListener("keydown", session.onKeydown);
    try { session.trigger.focus({ preventScroll: true }); } catch (_) {}
  }

  async function closeFullscreenWorkspace() {
    const session = fullscreenSession;
    if (!session) return;
    const active = nativeFullscreenElement();
    if (active) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) {
        try { await exit.call(document); } catch (_) { restoreFullscreenSession(session); }
        return;
      }
    }
    restoreFullscreenSession(session);
  }

  function fullscreenChanged() {
    if (fullscreenSession && fullscreenSession.nativeStarted && !nativeFullscreenElement()) {
      restoreFullscreenSession(fullscreenSession);
    }
  }

  document.addEventListener("fullscreenchange", fullscreenChanged);
  document.addEventListener("webkitfullscreenchange", fullscreenChanged);

  async function openFullscreenWorkspace(options = {}) {
    if (fullscreenSession) return closeFullscreenWorkspace();
    const trigger = options.trigger;
    if (!trigger) return;

    const canvas = options.canvas || Array.from(document.querySelectorAll("canvas")).find(isVisible);
    const starterRoot = options.kind === "starter"
      ? (options.preferredRoot || document.querySelector(".editor-card"))
      : null;
    const canvasRoot = starterRoot ? null : canvas && (canvas.closest(".card, .panel, article, section") || canvas.parentElement);
    if (!starterRoot && !canvasRoot) {
      trigger.textContent = "Canvas unavailable";
      window.setTimeout(() => { trigger.textContent = "⛶ Fullscreen"; }, 1400);
      return;
    }

    const shell = document.createElement("div");
    shell.className = "cc-fullscreen-shell";
    shell.setAttribute("role", "dialog");
    shell.setAttribute("aria-modal", "true");
    shell.setAttribute("aria-label", "Fullscreen interactive workspace");
    const workspace = document.createElement("div");
    workspace.className = "cc-fullscreen-workspace";
    const exitButton = document.createElement("button");
    exitButton.type = "button";
    exitButton.className = "cc-fullscreen-exit";
    exitButton.textContent = "✕ Exit fullscreen";
    exitButton.setAttribute("aria-label", "Exit fullscreen workspace");
    shell.append(workspace, exitButton);

    const moved = [];
    if (starterRoot) {
      const starterColumn = document.createElement("div");
      starterColumn.className = "cc-fullscreen-starter";
      workspace.appendChild(starterColumn);
      moveInto(starterRoot, starterColumn, "editor", moved);
    } else {
      const canvasColumn = document.createElement("div");
      canvasColumn.className = "cc-fullscreen-canvas-column";
      const controlsColumn = document.createElement("div");
      controlsColumn.className = "cc-fullscreen-controls-column";
      workspace.append(canvasColumn, controlsColumn);
      const controls = controlRoots(canvasRoot);
      moveInto(canvasRoot, canvasColumn, "canvas", moved);
      for (const root of controls) moveInto(root, controlsColumn, "controls", moved);
      if (!controls.length) controlsColumn.remove();
    }

    const session = {
      shell, moved, trigger,
      originalLabel: trigger.textContent,
      bodyOverflow: document.body.style.overflow,
      nativeStarted: false,
      restored: false,
      onKeydown: (event) => {
        if (event.key === "Escape" && fullscreenSession && !fullscreenSession.nativeStarted) {
          event.preventDefault();
          closeFullscreenWorkspace();
        }
      }
    };
    fullscreenSession = session;
    trigger.textContent = "✕ Exit full";
    trigger.setAttribute("aria-pressed", "true");
    document.documentElement.classList.add("cc-fullscreen-active");
    document.body.style.overflow = "hidden";
    document.body.appendChild(shell);
    exitButton.addEventListener("click", closeFullscreenWorkspace);
    window.addEventListener("keydown", session.onKeydown);

    const request = shell.requestFullscreen || shell.webkitRequestFullscreen;
    if (request) {
      try {
        await request.call(shell);
        session.nativeStarted = true;
        exitButton.focus();
        return;
      } catch (_) {}
    }

    shell.classList.add("cc-fullscreen-fallback");
    const notice = document.createElement("div");
    notice.className = "cc-fullscreen-notice";
    notice.setAttribute("role", "status");
    notice.textContent = "Browser blocked native fullscreen — focus view is active";
    shell.appendChild(notice);
    window.setTimeout(() => notice.remove(), 2600);
    exitButton.textContent = "✕ Exit focus view";
    exitButton.focus();
  }

  window.CCFullscreen = {
    toggle: openFullscreenWorkspace,
    close: closeFullscreenWorkspace,
    isActive: () => !!fullscreenSession
  };

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
