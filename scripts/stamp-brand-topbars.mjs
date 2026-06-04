import fs from "node:fs";
import path from "node:path";

const roots = [
  path.join(process.cwd(), "cc-fest-coding-camp-pages"),
  path.join(process.cwd(), "docs"),
];

const brandLink =
  '<a class="brand-mark" href="../../index.html" style="color:#c8391d;font-weight:800;letter-spacing:.08em;text-transform:uppercase">CC Fest · Coding Camp Tools</a>';

function walk(dir) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...walk(full));
    else if (/\.(html|js)$/.test(item.name)) out.push(full);
  }
  return out;
}

function stamp(html) {
  return html
    .replaceAll('<a href="../../index.html">← Back to tool library</a>', brandLink)
    .replaceAll('<a href="../../index.html">Back to tool library</a>', brandLink);
}

let updated = 0;

for (const root of roots) {
  for (const file of walk(root)) {
    const html = fs.readFileSync(file, "utf8");
    const next = stamp(html);
    if (next !== html) {
      fs.writeFileSync(file, next);
      updated += 1;
    }
  }
}

console.log(`Stamped ${updated} branded topbars.`);
