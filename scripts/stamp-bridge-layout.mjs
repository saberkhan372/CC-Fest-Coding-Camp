import fs from "node:fs";
import path from "node:path";

// Injects the shared bridge-layout.js loader into every concept-bridge page
// (Phase 0+1: responsive canvas + callout relocation), without hand-editing 21
// pages. Idempotent — safe to re-run; refreshes the cache key in place.

const CACHE_KEY = "20260617-bridgelayout1";
const TAG = `<script src="../bridge-layout.js?v=${CACHE_KEY}"></script>`;

const roots = [
  path.join(process.cwd(), "cc-fest-coding-camp-pages"),
  path.join(process.cwd(), "docs"),
];

function bridgePages(root) {
  const dir = path.join(root, "concept-bridges");
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = path.join(dir, entry.name, "index.html");
    if (fs.existsSync(file)) out.push(file);
  }
  return out;
}

let updated = 0;

for (const root of roots) {
  for (const file of bridgePages(root)) {
    let html = fs.readFileSync(file, "utf8");
    const existing = /<script src="\.\.\/bridge-layout\.js[^"]*"><\/script>\n?/;

    if (existing.test(html)) {
      const next = html.replace(existing, `${TAG}\n`);
      if (next !== html) { fs.writeFileSync(file, next); updated += 1; }
      continue;
    }
    if (html.includes("</body>")) {
      fs.writeFileSync(file, html.replace("</body>", `  ${TAG}\n</body>`));
      updated += 1;
    }
  }
}

console.log(`Stamped bridge-layout loader into ${updated} concept-bridge pages.`);
