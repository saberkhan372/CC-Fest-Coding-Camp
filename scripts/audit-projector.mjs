import fs from "node:fs";
import path from "node:path";

// Static audit for the projector / embed focused view. Verifies every tool page
// in both trees loads the shared projector-mode.js loader exactly once, and that
// the shared script itself is present and wired the same way in source and docs.
// Run: node scripts/audit-projector.mjs   (exits non-zero on any failure)

const roots = ["cc-fest-coding-camp-pages", "docs"].map((r) =>
  path.join(process.cwd(), r)
);

const LOADER = /<script src="\.\.\/\.\.\/projector-mode\.js\?v=[^"]+"><\/script>/g;
const failures = [];

function toolPages(root) {
  const dir = path.join(root, "tools");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => path.join(dir, e.name, "index.html"))
    .filter((f) => fs.existsSync(f));
}

let checked = 0;

// Content the shared script must keep — guards against silent regressions in the
// hide list or URL handling. (Runtime behavior is covered by
// scripts/audit-projector-runtime.mjs; this stays dependency-free.)
const SCRIPT_MUST_INCLUDE = [
  "embed-mode",                 // drives the existing focused mode, not a new one
  ".chips",                     // tag-pill container (regression Codex caught)
  ".try-next",                  // related-resource panels
  ".topbar",                    // text-basics-studio topbar
  ".sketch-topbar",             // starter-sketch topbar
  "semanticHidePass",           // teaching/related collapse pass
  'searchParams.set("project"', // canonical focused URL
  "injectFallbackButton",       // guaranteed button on nonstandard layouts
];

for (const root of roots) {
  // Shared script must exist and retain its critical content.
  const shared = path.join(root, "projector-mode.js");
  if (!fs.existsSync(shared)) {
    failures.push(`${path.basename(root)}: projector-mode.js missing`);
  } else {
    const src = fs.readFileSync(shared, "utf8");
    // Hash must be preserved: builders must never clear url.hash.
    if (/url\.hash\s*=\s*["']/.test(src)) {
      failures.push(`${path.basename(root)}: projector-mode.js clears url.hash (hash state must be preserved)`);
    }
    for (const needle of SCRIPT_MUST_INCLUDE) {
      if (!src.includes(needle)) {
        failures.push(`${path.basename(root)}: projector-mode.js missing "${needle}"`);
      }
    }
  }

  for (const file of toolPages(root)) {
    checked += 1;
    const html = fs.readFileSync(file, "utf8");
    const hits = html.match(LOADER) || [];
    const rel = path.relative(process.cwd(), file);
    if (hits.length !== 1) {
      failures.push(`${rel}: expected 1 projector loader, found ${hits.length}`);
    }
  }
}

console.log(`Checked ${checked} tool pages across ${roots.length} trees.`);
if (failures.length) {
  console.error(`\nFAIL — ${failures.length} issue(s):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log("PASS — every tool page loads the projector view exactly once.");
