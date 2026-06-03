import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "cc-fest-coding-camp-pages");
const indexPath = path.join(sourceRoot, "index.html");
const catalogPath = path.join(sourceRoot, "catalog-data.js");

const html = fs.readFileSync(indexPath, "utf8");
const catalogJs = fs.readFileSync(catalogPath, "utf8");
const sandbox = { window: {} };
vm.runInNewContext(catalogJs, sandbox);

const itemsById = new Map((sandbox.window.CCFestCatalog?.items || []).map((item) => [item.id, item]));

function firstMatch(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1] : "";
}

function cardPrimaryHref(body) {
  const actions = firstMatch(body, /<div class="tool-actions">([\s\S]*?)<\/div>/i);
  return firstMatch(actions, /href="([^"]+)"/) || firstMatch(body, /href="([^"]+)"/);
}

function slugFromUrl(url) {
  return url
    .replace(/^(\.\.\/)+/, "")
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "")
    .split("/")
    .pop();
}

function escapeAttr(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function setAttr(attrs, name, value) {
  const next = ` ${name}="${escapeAttr(value)}"`;
  const pattern = new RegExp(`\\s${name}\\s*=\\s*"[^"]*"`, "i");
  return pattern.test(attrs) ? attrs.replace(pattern, next) : `${attrs}${next}`;
}

let stamped = 0;
const nextHtml = html.replace(/<article class="tool-card([^"]*)"([^>]*)>([\s\S]*?)<\/article>/g, (full, classTail, attrs, body) => {
  const href = cardPrimaryHref(body);
  const item = itemsById.get(slugFromUrl(href));
  if (!item) return full;

  let nextAttrs = attrs;
  nextAttrs = setAttr(nextAttrs, "data-type", item.type || "");
  nextAttrs = setAttr(nextAttrs, "data-category", item.suit || "");
  nextAttrs = setAttr(nextAttrs, "data-level", item.level || "");
  nextAttrs = setAttr(nextAttrs, "data-session", item.session || "");
  nextAttrs = setAttr(nextAttrs, "data-pathway", (item.pathways || []).join(" "));
  nextAttrs = setAttr(nextAttrs, "data-name", item.title || "");
  nextAttrs = setAttr(nextAttrs, "data-tags", (item.tags || []).join(" "));
  stamped += 1;
  return `<article class="tool-card${classTail}"${nextAttrs}>${body}</article>`;
});

fs.writeFileSync(indexPath, nextHtml);
console.log(`Stamped metadata on ${stamped} cards in ${path.relative(repoRoot, indexPath)}.`);
