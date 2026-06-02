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

// Tool filters: suit + pathway + difficulty + search
(function() {
  const suitBar = document.querySelector(".suit-filter-bar");
  const pathwayBar = document.querySelector(".pathway-filter-bar");
  const difficultyBar = document.querySelector(".difficulty-filter-bar");
  const searchInput = document.querySelector(".global-search");
  if (!suitBar && !pathwayBar && !difficultyBar && !searchInput) return;

  const filterState = {
    suit: "all",
    pathway: "all",
    difficulty: "all",
    search: ""
  };

  const allCards = Array.from(document.querySelectorAll(".tool-card"));
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
    return `${title} ${desc} ${meta} ${tags}`;
  }

  function matchesSearch(card) {
    return !filterState.search || cardText(card).includes(filterState.search);
  }

  function matchesSuit(card) {
    return filterState.suit === "all" || card.classList.contains(`suit-${filterState.suit}`);
  }

  function matchesPathway(card) {
    if (filterState.pathway === "all") return true;
    return (card.dataset.pathway || "").split(/\s+/).includes(filterState.pathway);
  }

  function matchesDifficulty(card) {
    return filterState.difficulty === "all" || card.dataset.difficulty === filterState.difficulty;
  }

  function matchesLearningFilters(card) {
    return matchesSuit(card) && matchesPathway(card) && matchesDifficulty(card);
  }

  function setActiveButtons(bar, selector, attr, value) {
    bar?.querySelectorAll(selector).forEach(btn => {
      btn.classList.toggle("active", btn.dataset[attr] === value);
    });
  }

  function updateFilterButtons() {
    setActiveButtons(suitBar, ".suit-btn", "filter", filterState.suit);
    setActiveButtons(pathwayBar, ".pathway-btn", "pathwayFilter", filterState.pathway);
    setActiveButtons(difficultyBar, ".difficulty-btn", "difficultyFilter", filterState.difficulty);
  }

  function stationHasVisibleCard(station) {
    return Array.from(station.querySelectorAll(".tool-card")).some(card => !card.hidden);
  }

  function applyFilters() {
    const hasLearningFilter = filterState.suit !== "all" ||
      filterState.pathway !== "all" ||
      filterState.difficulty !== "all";
    const hasSearch = Boolean(filterState.search);
    const shouldOpen = hasLearningFilter || hasSearch;

    document.body.classList.toggle("search-active", hasSearch);
    updateFilterButtons();

    allCards.forEach(card => {
      const insideLearningLibrary = card.closest("#interactive-tools, #starter-sketches");
      const visible = matchesSearch(card) && (!insideLearningLibrary || matchesLearningFilters(card));
      card.hidden = !visible;
    });

    bridgeStations.forEach(station => {
      const visible = stationHasVisibleCard(station);
      station.hidden = hasSearch && !visible;
      station.classList.toggle("is-open", hasSearch && visible);
    });

    toolStations.forEach(station => {
      const visible = stationHasVisibleCard(station);
      station.hidden = !visible;
      station.classList.toggle("is-open", shouldOpen && visible);
    });

    if (bridgeSection) {
      const visible = Array.from(bridgeSection.querySelectorAll(".tool-card")).some(c => !c.hidden);
      bridgeSection.hidden = hasSearch && !visible;
      bridgeSection.classList.toggle("is-open", hasSearch && visible);
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
  }

  suitBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".suit-btn");
    if (!btn) return;
    filterState.suit = btn.dataset.filter;
    if (filterState.suit === "all") {
      filterState.pathway = "all";
      filterState.difficulty = "all";
    }
    applyFilters();
  });

  pathwayBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".pathway-btn");
    if (!btn) return;
    filterState.pathway = btn.dataset.pathwayFilter;
    applyFilters();
  });

  difficultyBar?.addEventListener("click", (event) => {
    const btn = event.target.closest(".difficulty-btn");
    if (!btn) return;
    filterState.difficulty = btn.dataset.difficultyFilter;
    applyFilters();
  });

  searchInput?.addEventListener("input", function() {
    filterState.search = this.value.trim().toLowerCase();
    applyFilters();
  });
})();

// ─── Curated path data (edit here to update Start here + Best first) ──────────
const CURATED = {
  bridges: [
    { slug: "color-numbers-become-feeling",       title: "Color: Numbers Become Feeling",
      tool:   { slug: "rgb-hsb-color-lab",         title: "RGB / HSB Color Lab" },
      sketch: { slug: "hsb-color-seed",            title: "HSB Color Seed" },
      teaser: "Start with color — instant feedback." },
    { slug: "how-p5-thinks-about-time",           title: "How p5.js Thinks About Time",
      tool:   { slug: "animation-explorer",        title: "Animation Explorer" },
      sketch: { slug: "framecount-animation-seed", title: "frameCount Animation Seed" },
      teaser: "See how setup(), draw(), and frameCount create motion." },
    { slug: "map-range-translator",               title: "map() Range Translator",
      tool:   { slug: "map-explorer",             title: "Map Explorer" },
      sketch: { slug: "color-from-position",      title: "Color From Position" },
      teaser: "Translate mouse, distance, and data into size, color, and motion." },
    { slug: "noise-smooth-randomness",            title: "Noise: Smooth Randomness",
      tool:   { slug: "noise-lab",               title: "Noise Lab" },
      sketch: { slug: "noise-walker",            title: "Noise Walker" },
      teaser: "See why noise() flows while random() jumps." },
    { slug: "arrays-one-thing-to-many-things",    title: "Arrays: One Thing to Many Things",
      tool:   { slug: "simple-array-explorer",   title: "Simple Array Explorer" },
      sketch: { slug: "click-to-create-shapes",  title: "Click to Create Shapes" },
      teaser: "Move from one shape to a collection." },
    { slug: "state-machines-sketches-have-modes", title: "State Machines: Sketches Have Modes",
      tool:   { slug: "game-state-studio",       title: "Game State Studio" },
      sketch: { slug: "game-state-starter",      title: "Game State Starter" },
      teaser: "Learn how sketches switch between screens and rules." }
  ],
  bestFirst: [
    { slug: "coordinate-system-explorer",  title: "Coordinate System Explorer", type: "Tool" },
    { slug: "shape-and-color-explorer",    title: "Shape + Color Explorer",      type: "Tool" },
    { slug: "animation-explorer",          title: "Animation Explorer",          type: "Tool" },
    { slug: "framecount-animation-seed",   title: "frameCount Animation Seed",   type: "Sketch" }
  ]
};

(() => {
  const pathEl    = document.querySelector(".beginner-path");
  const linksEl   = document.querySelector(".best-first-links");
  const copyP     = document.querySelector(".best-first-copy p");
  if (!pathEl && !linksEl) return;

  if (pathEl) {
    pathEl.innerHTML = CURATED.bridges.map((b, i) => `
      <li>
        <span class="path-number">${i + 1}</span>
        <div>
          <h3><a href="concept-bridges/${b.slug}/">${b.title}</a></h3>
          <p>${b.teaser} Then try <a href="tools/${b.tool.slug}/">${b.tool.title}</a> and remix <a href="tools/${b.sketch.slug}/">${b.sketch.title}</a>.</p>
        </div>
      </li>`).join("");
  }

  if (linksEl) {
    linksEl.innerHTML = CURATED.bestFirst.map(t =>
      `<a href="tools/${t.slug}/"><span>${t.type}</span><strong>${t.title}</strong></a>`
    ).join("");
  }

  if (copyP) {
    copyP.textContent = `${CURATED.bestFirst.length} friendly places to click when you just want to begin.`;
  }
})();
