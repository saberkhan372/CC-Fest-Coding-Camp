(() => {
  const poster = document.querySelector("[data-hero-poster]");
  if (!poster) return;

  const tokens = Array.from(poster.querySelectorAll("[data-token]"));
  const dots = Array.from(poster.querySelectorAll(".poster-dot"));
  const tokenSets = [
    ["mouseX", "noise()", "circle()", "map()", "draw()", "fill()"],
    ["lerp()", "random()", "translate()", "push()", "rotate()", "text()"],
    ["frameCount", "dist()", "arc()", "colorMode()", "sin()", "rect()"],
    ["setup()", "background()", "noStroke()", "if / else", "for loop", "HSB"]
  ];
  const palettes = [
    ["#d83a24", "#f5a800", "#e97a5f", "#2d6a4f", "#211f1c", "#5c4084"],
    ["#315c92", "#f0b43c", "#c94f7c", "#2f7f6f", "#222222", "#7d4e9e"],
    ["#c8391d", "#95c94a", "#e07a5f", "#457b9d", "#1d1d1b", "#8d6a9f"],
    ["#7149a3", "#f28c28", "#2f8f83", "#d9534f", "#232323", "#3762a3"]
  ];
  let remixIndex = 0;

  const setPush = (items, rect, clientX, clientY) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (clientX - cx) / rect.width;
    const y = (clientY - cy) / rect.height;
    const localX = ((clientX - rect.left) / rect.width) * 100;
    const localY = ((clientY - rect.top) / rect.height) * 100;

    poster.style.setProperty("--tilt-x", `${x * 8}deg`);
    poster.style.setProperty("--tilt-y", `${y * -8}deg`);
    poster.style.setProperty("--mouse-x", `${localX}%`);
    poster.style.setProperty("--mouse-y", `${localY}%`);

    items.forEach((item, index) => {
      const depth = index % 2 === 0 ? 18 : -14;
      item.style.setProperty("--push-x", `${x * depth}px`);
      item.style.setProperty("--push-y", `${y * depth}px`);
    });
  };

  const resetPush = () => {
    poster.style.setProperty("--tilt-x", "0deg");
    poster.style.setProperty("--tilt-y", "0deg");
    poster.style.setProperty("--mouse-x", "50%");
    poster.style.setProperty("--mouse-y", "50%");
    [...tokens, ...dots].forEach((item) => {
      item.style.setProperty("--push-x", "0px");
      item.style.setProperty("--push-y", "0px");
    });
  };

  const remixPoster = () => {
    remixIndex = (remixIndex + 1) % tokenSets.length;
    const labels = tokenSets[remixIndex];
    const colors = palettes[remixIndex];

    tokens.forEach((token, index) => {
      token.textContent = labels[index];
      token.style.background = colors[index];
      token.style.color = index === 1 ? "#211f1c" : "#fff";
      token.style.setProperty("--rotate", `${-10 + Math.random() * 20}deg`);
      token.style.setProperty("--rotate-mid", `${-6 + Math.random() * 12}deg`);
    });

    poster.classList.remove("is-remixing");
    window.requestAnimationFrame(() => {
      poster.classList.add("is-remixing");
      window.setTimeout(() => poster.classList.remove("is-remixing"), 260);
    });
  };

  // Draggable tokens
  const draggableTokens = Array.from(poster.querySelectorAll("[data-draggable]"));
  draggableTokens.forEach((token) => {
    let dragging = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    token.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      dragging = true;
      token.setPointerCapture(e.pointerId);
      const rect = poster.getBoundingClientRect();
      const tokRect = token.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      origLeft = tokRect.left - rect.left;
      origTop = tokRect.top - rect.top;
      token.style.position = "absolute";
      token.style.left = origLeft + "px";
      token.style.top = origTop + "px";
      token.style.zIndex = "10";
      token.style.transition = "none";
      token.style.animation = "none";
      token.style.transform = "none";
      token.style.cursor = "grabbing";
    });

    token.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      e.stopPropagation();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const rect = poster.getBoundingClientRect();
      const newLeft = Math.max(0, Math.min(rect.width - token.offsetWidth, origLeft + dx));
      const newTop = Math.max(0, Math.min(rect.height - token.offsetHeight, origTop + dy));
      token.style.left = newLeft + "px";
      token.style.top = newTop + "px";
    });

    token.addEventListener("pointerup", (e) => {
      if (!dragging) return;
      dragging = false;
      token.style.zIndex = "";
      token.style.cursor = "";
      token.style.transition = "";
      token.style.animation = "";
      token.style.transform = "";
    });
  });

  // Parallax tilt (only when not dragging a token)
  poster.addEventListener("pointermove", (event) => {
    if (event.target.hasAttribute("data-draggable")) return;
    setPush([...tokens, ...dots], poster.getBoundingClientRect(), event.clientX, event.clientY);
  });

  poster.addEventListener("pointerleave", resetPush);
  poster.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-draggable")) return;
    remixPoster();
  });
  poster.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    remixPoster();
  });

  const makeCollapsible = ({ container, header, grid, label, openByDefault = false }) => {
    if (!container || !header || !grid) return;
    container.classList.add("is-collapsible");
    if (openByDefault) container.classList.add("is-open");
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-controls", grid.id);
    header.setAttribute("aria-expanded", String(openByDefault));
    header.setAttribute("aria-label", `${openByDefault ? "Hide" : "Show"} ${label}`);

    const toggle = () => {
      const isOpen = container.classList.toggle("is-open");
      header.setAttribute("aria-expanded", String(isOpen));
      header.setAttribute("aria-label", `${isOpen ? "Hide" : "Show"} ${label}`);
      if (isOpen) {
        // Re-animate cards and fix preview canvas sizes (were 0 while display:none)
        grid.querySelectorAll(".tool-card").forEach((card, i) => {
          card.style.animationDelay = `${i * 0.07}s`;
          card.style.animation = "none";
          card.offsetHeight;
          card.style.animation = "";
        });
        requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      }
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  };

  const addSectionPeek = ({ section, label, itemLabel, emptyLabel }) => {
    const header = section?.querySelector(".gallery-header");
    const stationList = section?.querySelector(".station-list");
    if (!section || !header || !stationList) return;

    const peekCards = Array.from(section.querySelectorAll(".station .tool-card")).slice(0, 3);
    if (peekCards.length === 0) return;

    const peekGrid = document.createElement("div");
    peekGrid.className = "gallery-peek tool-grid";
    peekGrid.id = `${section.id}-peek-grid`;

    peekCards.forEach((card) => {
      peekGrid.appendChild(card.cloneNode(true));
    });

    const totalItems = section.querySelectorAll(".station .tool-card").length;
    const remaining = Math.max(0, totalItems - peekCards.length);
    const trigger = document.createElement("div");
    trigger.className = "station-peek-trigger";
    trigger.setAttribute("aria-hidden", "true");
    const btn = document.createElement("span");
    btn.className = "station-peek-btn";
    btn.textContent = remaining > 0
      ? `Show ${remaining} more ${itemLabel} →`
      : emptyLabel;
    trigger.appendChild(btn);
    peekGrid.appendChild(trigger);

    stationList.before(peekGrid);

    makeCollapsible({
      container: section,
      header,
      grid: peekGrid,
      label,
      openByDefault: false
    });

    trigger.addEventListener("click", () => header.click());
  };

  addSectionPeek({
    section: document.querySelector("#concept-bridges"),
    label: "concept bridges",
    itemLabel: "concept bridges by section",
    emptyLabel: "Show concept bridges by section →"
  });

  addSectionPeek({
    section: document.querySelector("#interactive-tools"),
    label: "workshop tools",
    itemLabel: "workshop tools by section",
    emptyLabel: "Show workshop tools by section →"
  });

  document.querySelectorAll("#interactive-tools .station, #concept-bridges .station").forEach((station, index) => {
    const header = station.querySelector(".station-header");
    const grid = station.querySelector(".tool-grid");
    if (!header || !grid) return;

    const label = station.querySelector(".station-name")?.textContent?.trim() || `Tool section ${index + 1}`;
    const sectionType = station.closest("#concept-bridges") ? "bridge" : "tool";
    const gridId = `station-${sectionType}s-${index + 1}`;
    grid.id = grid.id || gridId;
    makeCollapsible({
      container: station,
      header,
      grid,
      label: `${label} ${sectionType}s`,
      openByDefault: false
    });

    const totalCards = grid.querySelectorAll(".tool-card").length;
    const previewCount = 3;
    const remaining = totalCards - previewCount;
    if (totalCards === 1) {
      station.setAttribute("data-card-count", "1");
    } else if (totalCards === 2) {
      station.setAttribute("data-card-count", "2");
    } else {
      station.removeAttribute("data-card-count");
    }
    if (remaining <= 0) {
      return;
    }
    const trigger = document.createElement("div");
    trigger.className = "station-peek-trigger";
    trigger.setAttribute("aria-hidden", "true");
    const btn = document.createElement("span");
    btn.className = "station-peek-btn";
    btn.textContent = `Show ${remaining} more ${label} ${sectionType}${remaining !== 1 ? "s" : ""} →`;
    trigger.appendChild(btn);
    grid.appendChild(trigger);
    trigger.addEventListener("click", () => header.click());
  });

  const starterSection = document.querySelector("#starter-sketches");
  const starterHeader = starterSection?.querySelector(".gallery-header");
  const starterGrid = starterSection?.querySelector(".tool-grid");
  if (starterSection && starterHeader && starterGrid) {
    starterGrid.id = starterGrid.id || "starter-sketch-grid";
    makeCollapsible({
      container: starterSection,
      header: starterHeader,
      grid: starterGrid,
      label: "starter sketches",
      openByDefault: false
    });
  }
})();

// Credits disclosure
(function() {
  const button = document.querySelector(".credits-toggle");
  const body = document.querySelector("#credits-body");
  if (!button || !body) return;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.textContent = isOpen ? "See credits ↓" : "Hide credits ↑";
    body.hidden = isOpen;
  });
})();

// Core tool badges
(function() {
  const CORE = new Set([
    "coordinate-system-explorer", "shape-and-color-explorer", "text-basics-studio", "rgb-hsb-color-lab",
    "animation-explorer", "framerate-visualizer", "map-explorer", "lerp-explorer", "if-else-decision-studio",
    "for-loop-stepper", "rows-and-columns", "function-builder", "noise-vs-random-explorer",
    "data-story-planner", "data-mapper", "csv-loadtable-data-explorer",
    "image-remix-studio", "sound-shape-visualizer", "postcard-studio", "game-state-starter", "particle-system-seed"
  ]);
  document.querySelectorAll(".tool-card").forEach(card => {
    const link = card.querySelector(".tool-actions a");
    if (!link) return;
    const slug = link.getAttribute("href").replace(/^tools\/|\/$/g, "");
    if (!CORE.has(slug)) return;
    card.dataset.core = "";
    const meta = card.querySelector(".tool-meta");
    if (meta) {
      const pill = document.createElement("span");
      pill.className = "pill core";
      pill.textContent = "Core";
      meta.appendChild(pill);
    }
  });
})();

// Catalog metadata enhancement: Medium content-type card anatomy
(function() {
  const catalog = window.CCFestCatalog;
  if (!catalog?.items?.length) return;

  const byUrl = new Map(catalog.items.map((item) => [item.url.replace(/^\.\//, ""), item]));
  const actionVerb = {
    bridge: "Understand the idea",
    tool: "Play before you read",
    sketch: "Change one value"
  };

  function normalizeHref(href) {
    return (href || "")
      .replace(/^(\.\/)+/, "")
      .replace(/^\/CC-Fest-Coding-Camp\//, "")
      .split("#")[0]
      .split("?")[0];
  }

  function findCatalogItem(card) {
    const localLinks = Array.from(card.querySelectorAll(".tool-actions a[href]"))
      .map((link) => normalizeHref(link.getAttribute("href")))
      .filter((href) => href.startsWith("tools/") || href.startsWith("concept-bridges/"));
    return localLinks.map((href) => byUrl.get(href)).find(Boolean);
  }

  function cueShell(item) {
    const cue = document.createElement("div");
    cue.className = `catalog-card-cue catalog-card-cue--${item.type}`;
    cue.setAttribute("aria-label", `${item.type} cue`);
    return cue;
  }

  function bridgeCue(item) {
    const cue = cueShell(item);
    const idea = document.createElement("span");
    idea.className = "cue-idea";
    idea.textContent = "idea";
    const arrow = document.createElement("span");
    arrow.className = "cue-arrow";
    arrow.textContent = "->";
    const concept = document.createElement("span");
    concept.className = "cue-code";
    concept.textContent = item.bridgeConcept || item.tags.slice(0, 2).join(" · ") || "p5.js";
    cue.append(idea, arrow, concept);
    return cue;
  }

  function toolCue(item) {
    const cue = cueShell(item);
    const label = document.createElement("span");
    label.className = "cue-label";
    label.textContent = item.controlCue || "change";
    const track = document.createElement("span");
    track.className = "cue-track";
    const knob = document.createElement("span");
    knob.className = "cue-knob";
    track.appendChild(knob);
    const dots = document.createElement("span");
    dots.className = "cue-dots";
    dots.setAttribute("aria-hidden", "true");
    dots.textContent = "• •";
    cue.append(label, track, dots);
    return cue;
  }

  function sketchCue(item) {
    const cue = cueShell(item);
    const code = document.createElement("code");
    const value = item.codePeek || "let changeMe = 1;";
    const [head, ...tail] = value.split("=");
    code.innerHTML = `${head.trim()} = <mark>${tail.join("=").replace(/;$/, "").trim() || "changeMe"}</mark>;`;
    cue.appendChild(code);
    return cue;
  }

  function makeCue(item) {
    if (item.type === "bridge") return bridgeCue(item);
    if (item.type === "tool") return toolCue(item);
    if (item.type === "sketch") return sketchCue(item);
    return null;
  }

  document.querySelectorAll(".tool-card").forEach((card) => {
    if (card.querySelector(".catalog-card-cue")) return;
    const item = findCatalogItem(card);
    if (!item) return;

    card.classList.add("catalog-card", `catalog-card--${item.type}`);
    card.dataset.catalogId = item.id;
    card.dataset.catalogType = item.type;
    card.dataset.type = item.type;
    card.dataset.category = item.suit || "";
    card.dataset.level = item.level || "";
    card.dataset.session = item.session || "";
    card.dataset.pathway = (item.pathways || []).join(" ");
    card.dataset.name = item.title || "";
    card.dataset.tags = (item.tags || []).join(" ");

    const cue = makeCue(item);
    const tagRow = card.querySelector(".tag-row");
    if (cue && tagRow) tagRow.before(cue);

    const primaryAction = card.querySelector(".tool-actions .button.primary");
    if (primaryAction && actionVerb[item.type]) {
      primaryAction.textContent = actionVerb[item.type];
    }
  });
})();

// Catalog filters: OR within a facet, AND across facets, plus search.
(function() {
  const searchInput = document.querySelector(".global-search");
  if (!searchInput) return;

  const catalog = window.CCFestCatalog;
  const facetLookup = catalog?.facets ? {
    type: new Map(catalog.facets.types.map((item) => [item.id, item])),
    suit: new Map(catalog.facets.suits.map((item) => [item.id, item])),
    level: new Map(catalog.facets.levels.map((item) => [item.id, item])),
    pathway: new Map(catalog.facets.pathways.map((item) => [item.id, item])),
    session: new Map(catalog.facets.sessions.map((item) => [item.id, item])),
  } : null;

  const lensState = {
    lens: "type",
    expanded: false
  };

  const filterState = {
    cats: new Set(),
    paths: new Set(),
    levels: new Set(),
    search: ""
  };

  const facetConfig = {
    cats: { lens: "suit", label: "Category", values: catalog?.facets?.suits || [] },
    levels: { lens: "level", label: "Level", values: catalog?.facets?.levels || [] },
    paths: { lens: "pathway", label: "Goal", values: catalog?.facets?.pathways || [] }
  };

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char]));
  }

  const filterStatus = document.createElement("div");
  filterStatus.className = "catalog-filter-status";
  const searchWrap = searchInput.closest(".global-search-wrap");
  searchWrap?.insertAdjacentElement("afterend", filterStatus);

  let lensBar = null;
  let lensPanel = null;
  let refineBar = null;
  if (catalog?.items?.length && filterStatus.parentNode) {
    lensBar = document.createElement("div");
    lensBar.className = "catalog-lens-bar";
    lensBar.innerHTML = `
      <span>Organize by</span>
      <button type="button" class="lens-btn active" data-lens="type">Type</button>
      <button type="button" class="lens-btn" data-lens="suit">Category</button>
      <button type="button" class="lens-btn" data-lens="session">Session</button>
      <button type="button" class="lens-btn" data-lens="level">Level</button>
      <button type="button" class="lens-btn" data-lens="pathway">Goal</button>
    `;
    refineBar = document.createElement("div");
    refineBar.className = "catalog-refine-bar";
    refineBar.innerHTML = Object.entries(facetConfig).map(([facet, config]) => `
      <div class="refine-group" data-refine-group="${facet}">
        <span>${escapeHtml(config.label)}</span>
        ${config.values.map((item) => `
          <button type="button" class="refine-chip" data-filter-facet="${facet}" data-filter-value="${escapeHtml(item.id)}" aria-pressed="false">
            <b>${escapeHtml(item.label)}</b>
            <em>0</em>
          </button>
        `).join("")}
      </div>
    `).join("");
    lensPanel = document.createElement("div");
    lensPanel.className = "catalog-lens-panel";
    lensPanel.hidden = true;
    filterStatus.insertAdjacentElement("afterend", lensPanel);
    filterStatus.insertAdjacentElement("afterend", refineBar);
    filterStatus.insertAdjacentElement("afterend", lensBar);
  }

  const toolStations = Array.from(document.querySelectorAll("#interactive-tools .station"));
  const bridgeStations = Array.from(document.querySelectorAll("#concept-bridges .station"));
  const sketchCards = Array.from(document.querySelectorAll("#starter-sketches .tool-card"));
  const bridgeSection = document.querySelector("#concept-bridges");
  const toolSection = document.querySelector("#interactive-tools");
  const sketchSection = document.querySelector("#starter-sketches");

  function cardText(card) {
    const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
    const desc = card.querySelector(".tool-description")?.textContent.toLowerCase() || "";
    const meta = Array.from(card.querySelectorAll(".pill")).map(t => t.textContent.toLowerCase()).join(" ");
    const tags = Array.from(card.querySelectorAll(".tag")).map(t => t.textContent.toLowerCase()).join(" ");
    const data = `${card.dataset.name || ""} ${card.dataset.tags || ""}`.toLowerCase();
    return `${title} ${desc} ${meta} ${tags} ${data}`;
  }

  function valuesForCard(card, facet) {
    if (facet === "cats") return card.dataset.category ? [card.dataset.category] : [];
    if (facet === "levels") return card.dataset.level ? [card.dataset.level] : [];
    if (facet === "paths") return (card.dataset.pathway || "").split(/\s+/).filter(Boolean);
    return [];
  }

  function valuesForItem(item, facet) {
    if (facet === "cats") return item.suit ? [item.suit] : [];
    if (facet === "levels") return item.level ? [item.level] : [];
    if (facet === "paths") return item.pathways || [];
    return [];
  }

  function setMatches(values, selected) {
    return !selected.size || values.some((value) => selected.has(value));
  }

  function matchesCard(card, ignore = "") {
    if (filterState.search && !cardText(card).includes(filterState.search)) return false;
    if (ignore !== "cats" && !setMatches(valuesForCard(card, "cats"), filterState.cats)) return false;
    if (ignore !== "levels" && !setMatches(valuesForCard(card, "levels"), filterState.levels)) return false;
    if (ignore !== "paths" && !setMatches(valuesForCard(card, "paths"), filterState.paths)) return false;
    return true;
  }

  function itemMatchesFacetValue(item, facet, value) {
    return valuesForItem(item, facet).includes(value);
  }

  function visibleCatalogCount() {
    const ids = new Set();
    document.querySelectorAll(".tool-card[data-catalog-id]").forEach(card => {
      if (card.hidden || card.style.display === "none") return;
      ids.add(card.dataset.catalogId);
    });
    return ids.size;
  }

  function itemHaystack(item) {
    return `${item.title} ${item.summary} ${item.tags.join(" ")} ${item.group}`.toLowerCase();
  }

  function catalogMatchesFilters(item, ignore = "") {
    if (filterState.search && !itemHaystack(item).includes(filterState.search)) return false;
    if (ignore !== "cats" && !setMatches(valuesForItem(item, "cats"), filterState.cats)) return false;
    if (ignore !== "levels" && !setMatches(valuesForItem(item, "levels"), filterState.levels)) return false;
    if (ignore !== "paths" && !setMatches(valuesForItem(item, "paths"), filterState.paths)) return false;
    return true;
  }

  function hasActiveRefinement() {
    return filterState.search ||
      filterState.cats.size ||
      filterState.paths.size ||
      filterState.levels.size;
  }

  function lensValues(item, lens) {
    if (lens === "type") return [item.type || "unknown"];
    if (lens === "suit") return [item.suit || "uncategorized"];
    if (lens === "level") return [item.level || "unleveled"];
    if (lens === "session") return [item.session || "unscheduled"];
    if (lens === "pathway") return item.pathways.length ? item.pathways : ["no-goal"];
    return ["all"];
  }

  function lensLabel(lens, value) {
    if (value === "unknown") return "Unknown";
    if (value === "uncategorized") return "Uncategorized";
    if (value === "unleveled") return "Unleveled";
    if (value === "unscheduled") return "Unscheduled";
    if (value === "no-goal") return "No goal tag";
    const lookup = facetLookup?.[lens];
    const item = lookup?.get(value);
    return item?.plural || item?.label || item?.title || value;
  }

  function lensSubLabel(lens, value) {
    const item = facetLookup?.[lens]?.get(value);
    return item?.summary || item?.focus || item?.verb || "";
  }

  function renderLensPanel() {
    if (!lensPanel || !catalog?.items?.length) return;
    const shouldShow = lensState.expanded || hasActiveRefinement();
    lensPanel.hidden = !shouldShow;
    lensBar?.querySelectorAll(".lens-btn").forEach(btn => {
      btn.classList.toggle("active", shouldShow && btn.dataset.lens === lensState.lens);
    });
    if (!shouldShow) {
      lensPanel.innerHTML = "";
      return;
    }

    const items = catalog.items.filter(catalogMatchesFilters);
    const groups = new Map();
    items.forEach((item) => {
      lensValues(item, lensState.lens).forEach((value) => {
        if (!groups.has(value)) groups.set(value, []);
        groups.get(value).push(item);
      });
    });

    const typeOrder = { bridge: 0, tool: 1, sketch: 2 };
    const sortedGroups = Array.from(groups.entries()).sort(([a], [b]) => {
      if (lensState.lens === "type") return (typeOrder[a] ?? 9) - (typeOrder[b] ?? 9);
      return lensLabel(lensState.lens, a).localeCompare(lensLabel(lensState.lens, b));
    });

    lensPanel.innerHTML = sortedGroups.length ? `
      <div class="catalog-lens-groups">
        ${sortedGroups.map(([value, groupItems]) => `
          <section class="catalog-lens-group">
            <header>
              <div>
                <h3>${escapeHtml(lensLabel(lensState.lens, value))}</h3>
                ${lensSubLabel(lensState.lens, value) ? `<p>${escapeHtml(lensSubLabel(lensState.lens, value))}</p>` : ""}
              </div>
              <span>${groupItems.length}</span>
            </header>
            <div class="catalog-lens-links">
              ${groupItems.slice(0, 6).map((item) => `
                <a class="lens-link lens-link--${escapeHtml(item.type)}" href="${escapeHtml(item.url)}">
                  <span>${escapeHtml(item.type)}</span>
                  <strong>${escapeHtml(item.title)}</strong>
                </a>
              `).join("")}
            </div>
            ${groupItems.length > 6 ? `<div class="lens-more">+ ${groupItems.length - 6} more in this group</div>` : ""}
          </section>
        `).join("")}
      </div>
    ` : `
      <div class="catalog-lens-empty">
        <strong>No matching resources yet.</strong>
        <span>Remove a refinement or try a broader search.</span>
      </div>
    `;
  }

  function filterLabel(facet, value) {
    const lens = facetConfig[facet]?.lens;
    const item = lens ? facetLookup?.[lens]?.get(value) : null;
    return item?.label || item?.title || value;
  }

  function countFor(facet, value) {
    if (!catalog?.items?.length) return 0;
    return catalog.items.filter((item) => (
      catalogMatchesFilters(item, facet) && itemMatchesFacetValue(item, facet, value)
    )).length;
  }

  function updateRefineCounts() {
    refineBar?.querySelectorAll(".refine-chip").forEach((chip) => {
      const facet = chip.dataset.filterFacet;
      const value = chip.dataset.filterValue;
      const active = Boolean(facet && filterState[facet]?.has(value));
      const count = facet && value ? countFor(facet, value) : 0;
      chip.classList.toggle("active", active);
      chip.disabled = count === 0 && !active;
      chip.setAttribute("aria-pressed", active ? "true" : "false");
      const badge = chip.querySelector("em");
      if (badge) badge.textContent = String(count);
    });
  }

  function updateFilterStatus() {
    if (!filterStatus) return;
    const tokens = [];
    Object.keys(facetConfig).forEach((facet) => {
      Array.from(filterState[facet]).forEach((value) => {
        tokens.push({ key: facet, value, label: filterLabel(facet, value) });
      });
    });
    if (filterState.search) {
      tokens.push({ key: "search", label: `Search: ${filterState.search}` });
    }

    const count = visibleCatalogCount();
    filterStatus.innerHTML = `
      <span class="filter-count">${count} resource${count === 1 ? "" : "s"} shown</span>
      <div class="filter-token-list">
        ${tokens.length ? tokens.map(token => `
          <button class="filter-token" type="button" data-clear-filter="${token.key}" ${token.value ? `data-clear-value="${escapeHtml(token.value)}"` : ""}>
            <span>${escapeHtml(token.label)}</span>
            <b aria-hidden="true">×</b>
          </button>
        `).join("") : `<span class="filter-empty">No refinements active</span>`}
      </div>
    `;
  }

  function stationHasVisibleCard(station) {
    return Array.from(station.querySelectorAll(".tool-card")).some(card => !card.hidden && card.style.display !== "none");
  }

  function applyFilters() {
    const hasLearningFilter = Boolean(filterState.cats.size || filterState.paths.size || filterState.levels.size);
    const hasSearch = Boolean(filterState.search);
    const shouldOpen = hasLearningFilter || hasSearch;

    document.body.classList.toggle("search-active", hasSearch);
    document.querySelectorAll(".tool-card").forEach(card => {
      const visible = matchesCard(card);
      card.hidden = !visible;
      card.style.display = visible ? "" : "none";
    });

    bridgeStations.forEach(station => {
      const visible = stationHasVisibleCard(station);
      station.hidden = shouldOpen && !visible;
      station.classList.toggle("is-open", shouldOpen && visible);
    });

    toolStations.forEach(station => {
      const visible = stationHasVisibleCard(station);
      station.hidden = !visible;
      station.classList.toggle("is-open", shouldOpen && visible);
    });

    if (bridgeSection) {
      const visible = Array.from(bridgeSection.querySelectorAll(".tool-card")).some(c => !c.hidden);
      bridgeSection.hidden = shouldOpen && !visible;
      bridgeSection.classList.toggle("is-open", shouldOpen && visible);
    }

    if (toolSection) {
      const visible = toolStations.some(station => !station.hidden);
      toolSection.hidden = false;
      toolSection.classList.toggle("is-open", shouldOpen && visible);
    }

    if (sketchSection) {
      const visible = sketchCards.some(card => !card.hidden);
      sketchSection.hidden = shouldOpen && !visible;
      sketchSection.classList.toggle("is-open", shouldOpen && visible);
    }

    updateFilterStatus();
    updateRefineCounts();
    renderLensPanel();
  }

  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".shelf-filter-link");
    if (!btn) return;
    filterState.cats.clear();
    filterState.paths.clear();
    filterState.levels.clear();
    const pathway = btn.dataset.pathwayFilter;
    if (pathway) filterState.paths.add(pathway);
    applyFilters();
    document.querySelector("#interactive-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  refineBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".refine-chip");
    if (!btn || btn.disabled) return;
    const facet = btn.dataset.filterFacet;
    const value = btn.dataset.filterValue;
    if (!facet || !value || !filterState[facet]) return;
    if (filterState[facet].has(value)) {
      filterState[facet].delete(value);
    } else {
      filterState[facet].add(value);
    }
    applyFilters();
  });

  document.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter-token");
    if (!btn) return;
    const key = btn.dataset.clearFilter;
    if (key === "search") {
      filterState.search = "";
      if (searchInput) searchInput.value = "";
    } else if (key && filterState[key]) {
      const value = btn.dataset.clearValue;
      if (value) filterState[key].delete(value);
      else filterState[key].clear();
    }
    applyFilters();
  });

  lensBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".lens-btn");
    if (!btn) return;
    lensState.lens = btn.dataset.lens || "type";
    lensState.expanded = true;
    renderLensPanel();
  });

  searchInput?.addEventListener("input", function() {
    filterState.search = this.value.trim().toLowerCase();
    applyFilters();
  });

  applyFilters();
})();

(() => {
  const shelvesEl = document.querySelector(".catalog-shelves");
  const catalog = window.CCFestCatalog;
  if (!shelvesEl) return;

  if (catalog?.items?.length) {
    const pathwayOrder = ["first-time", "animation", "data", "games", "stuck", "final"];
    const pathwayNotes = {
      "first-time": "Gentle first clicks for people new to p5.js.",
      animation: "Motion, easing, trails, and sketches that react over time.",
      data: "Turn tables, rows, and outside information into visual material.",
      games: "Characters, collisions, state, and interaction loops.",
      stuck: "Debugging, readability, and confidence when code gets weird.",
      final: "Project-ready tools and seeds for open studio."
    };
    const typeLabel = { bridge: "Bridge", tool: "Tool", sketch: "Sketch" };

    function pickShelfItems(pathwayId) {
      const matches = catalog.items.filter((item) => item.pathways.includes(pathwayId));
      const buckets = ["bridge", "tool", "sketch"].map((type) => matches.find((item) => item.type === type)).filter(Boolean);
      const extras = matches.filter((item) => !buckets.includes(item));
      return [...buckets, ...extras].slice(0, 4);
    }

    const shelves = pathwayOrder.map((id) => {
      const pathway = catalog.facets.pathways.find((item) => item.id === id);
      return { ...pathway, note: pathwayNotes[id], items: pickShelfItems(id) };
    }).filter((shelf) => shelf.label && shelf.items.length);

    shelvesEl.innerHTML = `
      <div class="catalog-shelves-head">
        <div>
          <div class="section-label">Where to start</div>
          <h3>Browse by goal</h3>
          <p>Pick the kind of momentum you want. Each shelf mixes tools and starter sketches from the full catalog.</p>
        </div>
      </div>
      <div class="catalog-shelf-grid">
        ${shelves.map((shelf) => `
          <section class="catalog-shelf" data-shelf="${shelf.id}">
            <div class="catalog-shelf-top">
              <div>
                <h4>${shelf.label}</h4>
                <p>${shelf.note}</p>
              </div>
              <button class="shelf-filter-link" type="button" data-pathway-filter="${shelf.id}">Show all</button>
            </div>
            <div class="catalog-shelf-items">
              ${shelf.items.map((item) => `
                <a class="shelf-card shelf-card--${item.type}" href="${item.url}">
                  <span>${typeLabel[item.type] || "Item"}</span>
                  <strong>${item.title}</strong>
                </a>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    `;
  }
})();
