import fs from "node:fs";
import path from "node:path";

const roots = [
  path.join(process.cwd(), "cc-fest-coding-camp-pages", "tools"),
  path.join(process.cwd(), "docs", "tools"),
];
const rendererSrc = "starter-seed-pages.js?v=20260603-phase6d-starter-actions";

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...walk(full));
    else if (item.name === "index.html") out.push(full);
  }
  return out;
}

let updated = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    const html = fs.readFileSync(file, "utf8");
    if (!html.includes("renderStarterSeedPage(")) continue;

    const next = html.replace(
      /starter-seed-pages\.js(?:\?v=[^"']*)?/g,
      rendererSrc
    );
    if (next !== html) {
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Stamped ${updated} starter renderer cache keys.`);
