import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
import { execFileSync } from "child_process";
import { createRequire } from "module";
import { statSync } from "fs";
import { normalize, relative, resolve } from "path";

const require = createRequire(import.meta.url);
const usedAssets = require("./tools/collect-web-assets.cjs")();

execFileSync(process.execPath, ["tools/generate-asset-versions.cjs"], { stdio: "inherit" });

const OUT_DIR = "./build/web";

// Clean output directory
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

// Copy game files
const include = [
  "assets",
  "engine/core",
  "engine/LICENSE",
  "js",
  "style",
  "favicon.ico",
  "manifest.json",
  "service-worker.js",
];

for (const entry of include) {
  cpSync(entry, join(OUT_DIR, entry), {
    recursive: true,
    filter: source => {
      if (statSync(source).isDirectory()) return true;
      const file = normalize(relative(process.cwd(), resolve(source)));
      if (entry === "assets") return usedAssets.has(file);
      if (entry === "engine/core") return ["monogatari.js", "monogatari.css"].includes(relative(resolve(entry), resolve(source)));
      return true;
    },
  });
}

// Copy index.html with debug script removed
const html = readFileSync("index.html", "utf-8");
const cleanedHtml = html
  .replace(/\s*<!-- Debug Library\..*?-->\s*\n/s, "\n")
  .replace(/\s*<script src="\.\/engine\/debug\/debug\.js"><\/script>\s*\n/, "\n");
writeFileSync(join(OUT_DIR, "index.html"), cleanedHtml);
writeFileSync(join(OUT_DIR, ".nojekyll"), "");
// Keep the deployed version list limited to files actually shipped.
const versionsPath = join(OUT_DIR, "js/asset-versions.json");
const versions = JSON.parse(readFileSync(versionsPath, "utf8"));
for (const file of Object.keys(versions)) {
  if ((file.startsWith("assets/") && !usedAssets.has(normalize(file))) ||
      file.startsWith("engine/debug/") || file.endsWith(".map") || file === "engine/core/browser.js") delete versions[file];
}
writeFileSync(versionsPath, JSON.stringify(versions));
// Netlify reads these headers for both Git builds and manual folder uploads.
writeFileSync(join(OUT_DIR, "_headers"), [
  "/", "  Cache-Control: no-cache",
  "/index.html", "  Cache-Control: no-cache",
  "/service-worker.js", "  Cache-Control: no-cache",
  "/js/asset-versions.json", "  Cache-Control: no-cache",
  "",
].join("\n"));

console.log(`Web build output: ${OUT_DIR}`);
