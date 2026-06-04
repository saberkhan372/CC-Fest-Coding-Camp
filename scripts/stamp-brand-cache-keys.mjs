import fs from "node:fs";
import path from "node:path";

const roots = [
  path.join(process.cwd(), "cc-fest-coding-camp-pages"),
  path.join(process.cwd(), "docs"),
];

const replacements = [
  [/tool-page\.css\?v=[^"']+/g, "tool-page.css?v=20260603-brand-topbar"],
  [/starter-sketch\.css\?v=[^"']+/g, "starter-sketch.css?v=20260603-brand-topbar"],
  [/workshop-tool-pages\.js\?v=[^"']+/g, "workshop-tool-pages.js?v=20260603-brand-topbar"],
  [/starter-seed-pages\.js\?v=[^"']+/g, "starter-seed-pages.js?v=20260603-brand-topbar"],
];

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...walk(full));
    else if (item.name.endsWith(".html")) out.push(full);
  }
  return out;
}

let updated = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    const html = fs.readFileSync(file, "utf8");
    let next = html;
    for (const [pattern, value] of replacements) {
      next = next.replace(pattern, value);
    }

    if (next !== html) {
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Stamped ${updated} brand cache keys.`);
