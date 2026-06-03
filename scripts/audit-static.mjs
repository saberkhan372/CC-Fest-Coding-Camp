import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "cc-fest-coding-camp-pages");
const reportPath = path.join(repoRoot, "AUDIT_STATIC_REPORT.md");
const staleCountPattern = /\b(31(?: workshop)? tools|26(?: starter)? sketches|60 tools|40 sketches)\b/i;

function walk(dir, predicate = () => true) {
  const out = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) out.push(...walk(full, predicate));
    else if (predicate(full)) out.push(full);
  }
  return out;
}

function rel(file) {
  return path.relative(repoRoot, file).replaceAll("\\", "/");
}

function srcRel(file) {
  return path.relative(sourceRoot, file).replaceAll("\\", "/");
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function normalizeLocalTarget(file, rawUrl) {
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  if (trimmed.includes("${")) return null;
  if (/^(https?:|mailto:|tel:|javascript:|data:|blob:)/i.test(trimmed)) return null;
  if (trimmed.startsWith("//")) return null;

  const [withoutHash] = trimmed.split("#");
  const [withoutQuery] = withoutHash.split("?");
  if (!withoutQuery) return null;

  const githubPagesPrefix = "/CC-Fest-Coding-Camp/";
  const localPath = withoutQuery.startsWith(githubPagesPrefix)
    ? withoutQuery.slice(githubPagesPrefix.length)
    : withoutQuery;

  const base = withoutQuery.startsWith(githubPagesPrefix)
    ? sourceRoot
    : trimmed.startsWith("/")
    ? sourceRoot
    : path.dirname(file);
  let target = path.resolve(base, localPath);
  if (localPath.endsWith("/") || fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  return target;
}

function extractAttrs(html, attr) {
  const matches = [];
  const pattern = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "gi");
  let match;
  while ((match = pattern.exec(html))) matches.push(match[1]);
  return matches;
}

function hasTitle(html) {
  return /<title>[^<]+<\/title>/i.test(html);
}

function countMatches(files, test) {
  return files.filter((file) => test(read(file), file));
}

const htmlFiles = walk(sourceRoot, (file) => file.endsWith(".html"));
const toolIndexFiles = htmlFiles.filter((file) => srcRel(file).startsWith("tools/") && path.basename(file) === "index.html");
const bridgeIndexFiles = htmlFiles.filter((file) => srcRel(file).startsWith("concept-bridges/") && path.basename(file) === "index.html");
const sessionIndexFiles = htmlFiles.filter((file) => srcRel(file).startsWith("sessions/") && path.basename(file) === "index.html");
const jsWorkshopTools = countMatches(toolIndexFiles, (html) => html.includes("renderWorkshopToolPage("));
const starterSketches = countMatches(toolIndexFiles, (html) => html.includes("renderStarterSeedPage("));
const staticWorkshopTools = toolIndexFiles.filter((file) => {
  const html = read(file);
  return !html.includes("renderWorkshopToolPage(") && !html.includes("renderStarterSeedPage(");
});

const missingTitles = htmlFiles.filter((file) => !hasTitle(read(file)));
const staleCounts = htmlFiles.filter((file) => staleCountPattern.test(read(file)));
const badStarterPaths = htmlFiles.filter((file) => read(file).includes("../../starter-sketches/"));

const brokenTargets = [];
const unresolvedAssets = [];
for (const file of htmlFiles) {
  const html = read(file);
  const hrefs = extractAttrs(html, "href");
  const srcs = extractAttrs(html, "src");

  for (const href of hrefs) {
    const target = normalizeLocalTarget(file, href);
    if (!target) continue;
    if (!target.startsWith(sourceRoot) || !fs.existsSync(target)) {
      brokenTargets.push({ file, url: href, target });
    }
  }

  for (const src of srcs) {
    const target = normalizeLocalTarget(file, src);
    if (!target) continue;
    if (!target.startsWith(sourceRoot) || !fs.existsSync(target)) {
      unresolvedAssets.push({ file, url: src, target });
    }
  }
}

const staticMissingExportHelper = staticWorkshopTools.filter((file) => !read(file).includes("p5-export-helper.js?v="));
const jsMissingStateUtils = jsWorkshopTools.filter((file) => !read(file).includes("tool-state-utils.js?v="));
const jsMissingExportHelper = jsWorkshopTools.filter((file) => !read(file).includes("p5-export-helper.js?v="));
const starterMissingRenderer = starterSketches.filter((file) => !read(file).includes("starter-seed-pages.js"));

const homepage = read(path.join(sourceRoot, "index.html"));
const homepageCountChecks = [
  ["21 concept bridges", /21 (concept )?bridges/i.test(homepage)],
  ["70 workshop tools", /70 workshop tools/i.test(homepage)],
  ["44 starter sketches", /44 starter sketches/i.test(homepage)],
];

const sessionsHtml = read(path.join(sourceRoot, "sessions", "index.html"));
const sessionIds = [...sessionsHtml.matchAll(/\bid\s*:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

const lines = [];
lines.push("# CC Fest Coding Camp Static Audit Report");
lines.push("");
lines.push(`Generated from \`${rel(sourceRoot)}\`.`);
lines.push("");
lines.push("## Counts");
lines.push("");
lines.push(`- HTML pages: ${htmlFiles.length}`);
lines.push(`- Concept bridge pages: ${bridgeIndexFiles.length}`);
lines.push(`- Tool directories/pages total: ${toolIndexFiles.length}`);
lines.push(`- Static workshop tools: ${staticWorkshopTools.length}`);
lines.push(`- JS-rendered workshop tools: ${jsWorkshopTools.length}`);
lines.push(`- Starter sketches: ${starterSketches.length}`);
lines.push(`- Session pages/directories with index: ${sessionIndexFiles.length}`);
lines.push(`- Session entries in SESSIONS array: ${sessionIds.length} (${sessionIds.join(", ") || "none"})`);
lines.push("");
lines.push("## Homepage Count Text");
lines.push("");
for (const [label, ok] of homepageCountChecks) lines.push(`- ${ok ? "[x]" : "[~]"} ${label}`);
lines.push("");

function section(title, items, formatter) {
  lines.push(`## ${title}`);
  lines.push("");
  if (!items.length) {
    lines.push("- [x] No issues found.");
  } else {
    for (const item of items) lines.push(`- [~] ${formatter(item)}`);
  }
  lines.push("");
}

section("Missing Titles", missingTitles, (file) => rel(file));
section("Stale Count Text", staleCounts, (file) => rel(file));
section("Bad Starter-Sketch Path References", badStarterPaths, (file) => rel(file));
section("Broken Local Hrefs", brokenTargets, (item) => `${rel(item.file)} -> \`${item.url}\``);
section("Broken Local Src Assets", unresolvedAssets, (item) => `${rel(item.file)} -> \`${item.url}\``);
section("Static Workshop Tools Missing p5 Export Helper", staticMissingExportHelper, (file) => rel(file));
section("JS Workshop Tools Missing State Utils", jsMissingStateUtils, (file) => rel(file));
section("JS Workshop Tools Missing p5 Export Helper", jsMissingExportHelper, (file) => rel(file));
section("Starter Sketches Missing Renderer Script", starterMissingRenderer, (file) => rel(file));

lines.push("## Notes");
lines.push("");
lines.push("- This static sweep checks file existence and expected script references only.");
lines.push("- It does not verify browser rendering, canvas behavior, downloads, clipboard, fonts, mobile layout, or visual/design quality.");
lines.push("- Relative links with hashes are checked for target file existence, not anchor existence.");
lines.push("");

fs.writeFileSync(reportPath, `${lines.join("\n")}\n`);

console.log(lines.slice(0, 40).join("\n"));
console.log(`\nReport written to ${rel(reportPath)}`);
