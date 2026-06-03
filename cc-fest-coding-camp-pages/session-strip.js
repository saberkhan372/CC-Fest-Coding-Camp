// Compact session strip for tool and concept bridge detail pages.
// Skipped if spine.js is loaded — spine.js renders the full compact
// arc strip which supersedes this simpler strip.
(function() {
  // Defer to spine.js if it is present or will be present.
  if (document.querySelector('script[src*="spine.js"]')) return;

  const STYLE_ID = "cc-session-strip-style";
  const catalog = window.CCFestCatalog;
  const sessions = window.CCFestSessions || [];
  if (!catalog?.items?.length || !sessions.length) return;

  const path = window.location.pathname.replace(/\\/g, "/");
  const match = path.match(/\/(tools|concept-bridges)\/([^/]+)\/(?:index\.html)?$/);
  if (!match) return;

  const slug = match[2];
  const item = catalog.items.find((entry) => entry.id === slug);
  const session = sessions.find((entry) => entry.id === item?.session);
  if (!item || !session || session.id === "template") return;

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .cc-session-strip {
        display: block;
        margin: 22px 0 12px;
        padding: 10px 12px;
        border: 1.5px solid var(--line, var(--cream-deep, #e4dccf));
        border-radius: var(--radius-sm, 10px);
        background: var(--panel, #fffdf7);
        color: var(--ink, #2c2a26);
        text-decoration: none;
        font: 800 12px/1.25 "DM Sans", system-ui, sans-serif;
      }
      .cc-session-strip:hover {
        border-color: var(--accent, #c8391d);
        color: var(--accent, #c8391d);
      }
    `;
    document.head.appendChild(style);
  }

  const strip = document.createElement("a");
  strip.className = "cc-session-strip";
  strip.href = `../../sessions/${session.id}/`;
  strip.textContent = `Part of ${session.label} \u00b7 ${session.title} \u2192`;

  const footer = document.querySelector(".tool-footer, .bridge-footer, footer");
  if (footer?.parentNode) {
    footer.insertAdjacentElement("beforebegin", strip);
  } else {
    document.body.appendChild(strip);
  }
})();
