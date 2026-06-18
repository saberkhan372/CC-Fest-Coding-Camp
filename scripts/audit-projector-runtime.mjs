import fs from "node:fs";
import path from "node:path";
import http from "node:http";

// Runtime audit for the projector / embed focused view. Drives a real browser
// over every tool page (normal + ?project=1) and verifies button presence and
// the actual hide/keep behavior — the things the static audit can't see.
//
// Run: node scripts/audit-projector-runtime.mjs
// Requires playwright (`npm i -g playwright && npx playwright install chromium`).
// If playwright is unavailable it skips cleanly (exit 0) so it never breaks a
// machine that only wants the static audit.

const ROOT = path.join(process.cwd(), "cc-fest-coding-camp-pages");
const PORT = 4199;

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.log("playwright not installed — skipping runtime audit (static audit still covers stamping).");
  process.exit(0);
}

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml" };

function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let file = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
      if (file.endsWith("/")) file = path.join(file, "index.html");
      fs.readFile(file, (err, buf) => {
        if (err) { res.statusCode = 404; res.end("not found"); return; }
        res.setHeader("content-type", TYPES[path.extname(file)] || "application/octet-stream");
        res.end(buf);
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

const slugs = fs.readdirSync(path.join(ROOT, "tools"), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .filter((s) => fs.existsSync(path.join(ROOT, "tools", s, "index.html")));

// Known pre-existing stub: slug absent from the starter-seed dataset, so it
// renders only the static fallback (no workspace). Tracked in AUDIT_TASKS.md.
const NO_WORKSPACE_EXPECTED = new Set(["hover-data-bar-chart-seed"]);

const server = await serve();
const browser = await chromium.launch();
const failures = [];
let checked = 0;

const NORMAL_CHECK = () => {
  const links = document.querySelectorAll(".cc-project-link");
  const a = links[0];
  return { n: links.length, blank: !!(a && a.target === "_blank"), focus: document.documentElement.classList.contains("embed-mode") };
};

const FOCUS_CHECK = () => {
  const shown = (sel) => { const el = document.querySelector(sel); if (!el) return false; const s = getComputedStyle(el); return s.display !== "none" && s.visibility !== "hidden" && el.offsetParent !== null; };
  const anyShown = (sel) => [...document.querySelectorAll(sel)].some((el) => { const s = getComputedStyle(el); return s.display !== "none" && s.visibility !== "hidden" && el.offsetParent !== null; });
  return {
    focus: document.documentElement.classList.contains("embed-mode") || document.body.classList.contains("embed-mode"),
    title: shown("h1"),
    workspace: shown("canvas") || shown("iframe#preview-frame") || anyShown(".controls,.controls-grid,input,select,#starter-editor,.code-editor,main.grid,.panel,.workspace,.code-panel"),
    leak_topbar: anyShown(".tool-topbar,nav.top,.page-topbar,.sketch-topbar,nav.topbar,.topbar"),
    leak_related: anyShown(".try-next,.related-group,.related-grid"),
    leak_teaching: anyShown(".lesson-grid,.lessons-card,.teaching-note,.care-note,.seed-rhythm,.tool-rhythm"),
    leak_tags: anyShown(".tool-tags,.tag-row,.chips,.wrap > .tag,.tool-subtitle,.sketch-subtitle,.subtitle,.lede,.stage-tag"),
    leak_footer: anyShown(".tool-footer,.footer"),
    leak_chrome: anyShown(".ccs-crumb,.catalog-meta-strip"),
  };
};
const LEAK_KEYS = ["leak_topbar", "leak_related", "leak_teaching", "leak_tags", "leak_footer", "leak_chrome"];

for (const slug of slugs) {
  checked += 1;
  const page = await browser.newPage();
  try {
    const base = `http://localhost:${PORT}/tools/${slug}/`;

    await page.goto(base, { waitUntil: "load" });
    await page.waitForTimeout(400);
    const n = await page.evaluate(NORMAL_CHECK);
    if (n.n !== 1) failures.push(`${slug} [normal]: expected 1 Project link, found ${n.n}`);
    if (n.n === 1 && !n.blank) failures.push(`${slug} [normal]: Project link not target=_blank`);
    if (n.focus) failures.push(`${slug} [normal]: embed-mode active without a focus param`);

    await page.goto(base + "?project=1", { waitUntil: "load" });
    await page.waitForTimeout(500);
    const f = await page.evaluate(FOCUS_CHECK);
    if (!f.focus) failures.push(`${slug} [project]: embed-mode not engaged`);
    if (!f.title) failures.push(`${slug} [project]: title hidden`);
    if (!f.workspace && !NO_WORKSPACE_EXPECTED.has(slug)) failures.push(`${slug} [project]: workspace missing`);
    const leaks = LEAK_KEYS.filter((k) => f[k]);
    if (leaks.length) failures.push(`${slug} [project]: chrome leaked -> ${leaks.join(", ")}`);
  } catch (e) {
    failures.push(`${slug}: error ${e.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();

console.log(`Runtime-audited ${checked} tool pages (normal + project views).`);
if (failures.length) {
  console.error(`\nFAIL — ${failures.length} issue(s):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("PASS — every page shows the Project link and a clean, complete projector view.");
