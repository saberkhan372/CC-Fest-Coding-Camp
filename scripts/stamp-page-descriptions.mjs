import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "cc-fest-coding-camp-pages");
const docsRoot = path.join(repoRoot, "docs");
const catalogPath = path.join(sourceRoot, "catalog-data.js");
const sessionsPath = path.join(sourceRoot, "sessions-data.js");

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

function relFromRoot(file, root) {
  return path.relative(root, file).replaceAll("\\", "/");
}

function escapeAttr(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeText(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentence(value = "") {
  const text = normalizeText(value);
  if (!text) return "";
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

function limitDescription(value, max = 165) {
  const text = normalizeText(value);
  if (text.length <= max) return text;
  const clipped = text.slice(0, max - 1);
  const boundary = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, boundary > 80 ? boundary : clipped.length).trim()}...`;
}

function readCatalogItems() {
  const js = read(catalogPath);
  const match = js.match(/const CATALOG_ITEMS = ([\s\S]*?);\n\n  const CATALOG_FACETS/);
  if (!match) throw new Error("Could not parse CATALOG_ITEMS from catalog-data.js");
  return JSON.parse(match[1]);
}

function readSessions() {
  const js = read(sessionsPath);
  const match = js.match(/const SESSIONS = ([\s\S]*?);\n\n  window\.CCFestSessions/);
  if (!match) throw new Error("Could not parse SESSIONS from sessions-data.js");
  return Function(`"use strict"; return (${match[1]});`)();
}

function descriptionForCatalogItem(item) {
  const typePhrase = {
    bridge: "A CC Fest concept bridge for p5.js learners.",
    tool: "A CC Fest p5.js workshop tool.",
    sketch: "A remixable CC Fest starter sketch for p5.js learners.",
  }[item.type] || "A CC Fest creative coding resource.";
  const base = `${item.title}: ${sentence(item.summary)}`;
  const extended = `${base} ${typePhrase}`;
  return limitDescription(extended.length <= 165 ? extended : base);
}

function descriptionForSession(session) {
  if (session.id === "template") {
    return "Create a CC Fest session poster with editable topic, date, location, accent color, and seeded generative artwork.";
  }
  const base = `${session.title}: ${sentence(session.subtitle)}`;
  const extended = `${base} A CC Fest workshop session with an anchor bridge, tools, sketches, and poster.`;
  return limitDescription(extended.length <= 165 ? extended : base);
}

function descriptionForPage(rel, catalogBySlug, sessionsById) {
  if (rel === "concept-map.html") {
    return "Explore how CC Fest concept bridges connect to workshop tools, starter sketches, and try-next learning paths.";
  }

  if (rel === "sessions/index.html") {
    return "Browse the five CC Fest workshop sessions, each with a poster, anchor bridge, workshop tools, and starter sketches.";
  }

  const sessionMatch = rel.match(/^sessions\/([^/]+)\/index\.html$/);
  if (sessionMatch) {
    const session = sessionsById.get(sessionMatch[1]);
    if (session) return descriptionForSession(session);
  }

  const catalogMatch = rel.match(/^(?:tools|concept-bridges)\/([^/]+)\/index\.html$/);
  if (catalogMatch) {
    const item = catalogBySlug.get(catalogMatch[1]);
    if (item) return descriptionForCatalogItem(item);
  }

  return "";
}

function upsertDescription(html, description) {
  const tag = `<meta name="description" content="${escapeAttr(description)}">`;
  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    return html.replace(/<meta\s+name=["']description["'][^>]*>/i, tag);
  }

  const viewport = /<meta\s+name=["']viewport["'][^>]*>\s*/i;
  if (viewport.test(html)) return html.replace(viewport, (match) => `${match}${tag}\n`);

  const charset = /<meta\s+charset=["'][^"']+["'][^>]*>\s*/i;
  if (charset.test(html)) return html.replace(charset, (match) => `${match}${tag}\n`);

  return html.replace(/<title>/i, `${tag}\n<title>`);
}

const catalogBySlug = new Map(readCatalogItems().map((item) => [item.id, item]));
const sessionsById = new Map(readSessions().map((session) => [session.id, session]));
let updated = 0;

for (const root of [sourceRoot, docsRoot]) {
  for (const file of walk(root, (candidate) => candidate.endsWith(".html"))) {
    const html = read(file);
    const description = descriptionForPage(relFromRoot(file, root), catalogBySlug, sessionsById);
    if (!description) continue;

    fs.writeFileSync(file, upsertDescription(html, description));
    updated += 1;
  }
}

console.log(`Stamped ${updated} page descriptions.`);
