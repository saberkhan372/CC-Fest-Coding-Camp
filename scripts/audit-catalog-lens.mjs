import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const catalogPath = path.join(repoRoot, "cc-fest-coding-camp-pages", "catalog-data.js");
const js = fs.readFileSync(catalogPath, "utf8");
const items = JSON.parse(js.match(/const CATALOG_ITEMS = ([\s\S]*?);\n\n  const CATALOG_FACETS/)[1]);

const expectedLenses = ["type", "suit", "session", "level", "pathway"];

function lensValues(item, lens) {
  if (lens === "type") return [item.type || "unknown"];
  if (lens === "suit") return [item.suit || "uncategorized"];
  if (lens === "level") return [item.level || "unleveled"];
  if (lens === "session") return [item.session || "unscheduled"];
  if (lens === "pathway") return item.pathways.length ? item.pathways : ["no-goal"];
  return ["all"];
}

function groupByLens(lens) {
  const groups = new Map();
  for (const item of items) {
    for (const value of lensValues(item, lens)) {
      if (!groups.has(value)) groups.set(value, []);
      groups.get(value).push(item);
    }
  }
  return groups;
}

const issues = [];
for (const lens of expectedLenses) {
  const groups = groupByLens(lens);
  if (!groups.size) issues.push(`${lens} produced no groups`);
  for (const [value, groupItems] of groups) {
    if (!value) issues.push(`${lens} has empty group key`);
    if (!groupItems.length) issues.push(`${lens}:${value} has no items`);
  }
}

const typeGroups = groupByLens("type");
if (typeGroups.get("bridge")?.length !== 21) issues.push("type:bridge should have 21 items");
if (typeGroups.get("tool")?.length !== 70) issues.push("type:tool should have 70 items");
if (typeGroups.get("sketch")?.length !== 44) issues.push("type:sketch should have 44 items");

const pathwayGroups = groupByLens("pathway");
for (const key of ["first-time", "animation", "data", "games", "stuck", "final"]) {
  if (!pathwayGroups.has(key)) issues.push(`pathway:${key} is missing`);
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Catalog lens smoke test passed for ${items.length} items across ${expectedLenses.length} lenses.`);
