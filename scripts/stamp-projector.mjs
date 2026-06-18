import fs from "node:fs";
import path from "node:path";

// Injects the shared projector-mode.js loader into every tool page so the
// "Project" button + ?view=project classroom view work everywhere, without
// editing 114 tool HTML files by hand. Idempotent — safe to re-run.

const CACHE_KEY = "20260617-projector5";
const TAG = `<script src="../../projector-mode.js?v=${CACHE_KEY}"></script>`;

const roots = [
  path.join(process.cwd(), "cc-fest-coding-camp-pages"),
  path.join(process.cwd(), "docs"),
];

function toolPages(root) {
  const dir = path.join(root, "tools");
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
  for (const file of toolPages(root)) {
    let html = fs.readFileSync(file, "utf8");

    // Refresh the cache key if an older tag is already present.
    const existing = /<script src="\.\.\/\.\.\/projector-mode\.js[^"]*"><\/script>\n?/;
    if (existing.test(html)) {
      const next = html.replace(existing, `${TAG}\n`);
      if (next !== html) {
        fs.writeFileSync(file, next);
        updated += 1;
      }
      continue;
    }

    // Otherwise insert the loader just before </body>.
    if (html.includes("</body>")) {
      const next = html.replace("</body>", `  ${TAG}\n</body>`);
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Stamped projector loader into ${updated} tool pages.`);
