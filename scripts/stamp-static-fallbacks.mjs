import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "cc-fest-coding-camp-pages");
const docsRoot = path.join(repoRoot, "docs");
const catalogPath = path.join(sourceRoot, "catalog-data.js");

function walk(dir, predicate = () => true) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function escapeHtml(value = "") {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readCatalogItems() {
  const js = read(catalogPath);
  const match = js.match(/const CATALOG_ITEMS = ([\s\S]*?);\n\n  const CATALOG_FACETS/);
  if (!match) throw new Error("Could not parse CATALOG_ITEMS from catalog-data.js");
  return JSON.parse(match[1]);
}

function fallbackHtml(item) {
  const typeLabel = item.type === "sketch" ? "Starter sketch" : "Workshop tool";
  const summary = normalizeText(item.summary) || "A CC Fest creative coding resource for p5.js learners.";
  return `<main class="static-fallback" data-static-fallback>
    <p class="tool-eyebrow">${typeLabel}</p>
    <h1>${escapeHtml(item.title)}</h1>
    <p>${escapeHtml(summary)}</p>
    <p>This interactive page is rendered with JavaScript. Enable JavaScript to use the canvas, controls, code panel, and session wayfinding.</p>
    <p><a href="../../index.html">Back to the CC Fest tool library</a></p>
  </main>`;
}

function slugFromShell(html) {
  return html.match(/render(?:WorkshopToolPage|StarterSeedPage)\("([^"]+)"\)/)?.[1] || "";
}

function replaceAppShell(html, item) {
  const appPattern = /<div id="app">[\s\S]*?<\/div>/;
  if (!appPattern.test(html)) return html;
  return html.replace(appPattern, `<div id="app">\n  ${fallbackHtml(item)}\n  </div>`);
}

const catalogById = new Map(readCatalogItems().map((item) => [item.id, item]));
let updated = 0;

for (const root of [sourceRoot, docsRoot]) {
  for (const file of walk(path.join(root, "tools"), (candidate) => candidate.endsWith("index.html"))) {
    const html = read(file);
    if (!/render(?:WorkshopToolPage|StarterSeedPage)\("/.test(html)) continue;

    const slug = slugFromShell(html);
    const item = catalogById.get(slug);
    if (!item) throw new Error(`No catalog item found for ${slug} in ${file}`);

    const next = replaceAppShell(html, item);
    if (next !== html) {
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Stamped ${updated} static fallbacks.`);
