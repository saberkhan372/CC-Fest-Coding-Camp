// Compact catalog metadata strip for static workshop tool pages.
(function() {
  const STYLE_ID = "cc-catalog-meta-strip-style";
  const catalog = window.CCFestCatalog;
  if (!catalog?.items?.length) return;

  const path = window.location.pathname.replace(/\\/g, "/");
  const match = path.match(/\/tools\/([^/]+)\/(?:index\.html)?$/);
  if (!match) return;

  const slug = match[1];
  const item = catalog.items.find((entry) => entry.id === slug);
  if (!item) return;

  const suitMap = {
    marks: { glyph: "✦", label: "Marks" },
    motion: { glyph: "◎", label: "Motion" },
    systems: { glyph: "⬡", label: "Systems" },
    data: { glyph: "▦", label: "Data" },
    open: { glyph: "☽", label: "Open" },
    support: { glyph: "⊕", label: "Support" },
  };
  const pathwayLabels = {
    "first-time": "First time",
    animation: "Animation",
    data: "Data",
    games: "Games",
    stuck: "Stuck",
    final: "Final project",
  };

  const suit = suitMap[item.suit];
  const level = item.level
    ? item.level.charAt(0).toUpperCase() + item.level.slice(1)
    : null;
  const pathways = (item.pathways || []).map((pathway) => pathwayLabels[pathway] || pathway);

  const pills = [];
  if (suit) pills.push(`<span class="meta-pill meta-pill--suit">${suit.glyph} ${suit.label}</span>`);
  if (level) pills.push(`<span class="meta-pill meta-pill--level">${level}</span>`);
  pathways.forEach((pathway) => {
    pills.push(`<span class="meta-pill meta-pill--pathway">${pathway}</span>`);
  });
  if (!pills.length) return;

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .catalog-meta-strip {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin: 8px 0 4px;
      }
      .meta-pill {
        display: inline-flex;
        align-items: center;
        padding: 3px 9px;
        border-radius: 6px;
        font: 700 10.5px/1 "DM Mono", ui-monospace, monospace;
        letter-spacing: .04em;
        border: 1.5px solid;
      }
      .meta-pill--suit {
        background: var(--cream-dark, #efe6da);
        border-color: var(--line, #d8cdbf);
        color: var(--ink, #2c2a26);
      }
      .meta-pill--level {
        background: var(--gold-soft, #fef3d4);
        border-color: var(--gold, #f5a800);
        color: var(--ink, #2c2a26);
      }
      .meta-pill--pathway {
        background: transparent;
        border-color: var(--line, #d8cdbf);
        color: var(--ink-light, #5c5751);
      }
      .embed-mode .catalog-meta-strip {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  if (document.querySelector(".catalog-meta-strip")) return;

  const strip = document.createElement("div");
  strip.className = "catalog-meta-strip";
  strip.setAttribute("aria-label", "Resource metadata");
  strip.innerHTML = pills.join("");

  const subtitle = document.querySelector(".tool-subtitle");
  if (subtitle) {
    subtitle.insertAdjacentElement("afterend", strip);
    return;
  }

  const tagRow = document.querySelector(".tag-row, .tool-tags");
  if (tagRow?.parentNode) {
    tagRow.insertAdjacentElement("beforebegin", strip);
    return;
  }

  const heading = document.querySelector("h1");
  if (heading?.parentNode) {
    heading.insertAdjacentElement("beforebegin", strip);
  }
})();
