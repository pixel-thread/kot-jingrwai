import { execSync } from "node:child_process";
import path from "node:path";

const ROOT = process.cwd();

function run(cmd) {
  console.log(`\n→ ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

function tryRun(cmd) {
  try {
    run(cmd);
  } catch {
    console.warn(`⚠️  Skipped: ${cmd}`);
  }
}

console.log("🧹 Cleaning workspace...");

/**
 * 1. Kill all node_modules (root + apps + packages)
 *    rm -rf is the only 100% reliable option with pnpm
 */
tryRun(`rm -rf ${path.join(ROOT, "node_modules")}`);
tryRun(`rm -rf ${path.join(ROOT, "src/apps/**/node_modules")}`);
tryRun(`rm -rf ${path.join(ROOT, "src/packages/**/node_modules")}`);

/**
 * 2. Remove build artifacts
 */
tryRun(`rm -rf ${path.join(ROOT, "src/apps/**/dist")}`);
tryRun(`rm -rf ${path.join(ROOT, "src/packages/**/dist")}`);
tryRun(`rm -rf ${path.join(ROOT, "src/apps/**/build")}`);
tryRun(`rm -rf ${path.join(ROOT, "src/packages/**/build")}`);

/**
 * 3. Clean pnpm store
 */
run("pnpm store prune");

/**
 * 4. Install dependencies ONCE
 */
console.log("\n📦 Installing dependencies...");
run("pnpm install");

/**
 * 5. Build shared packages first
 */
console.log("\n🔧 Building shared packages...");
run("pnpm run generate");

/**
 * 6. Prisma generate (only web app)
 */
console.log("\n🧬 Running Prisma generate...");
tryRun("pnpm --filter web prisma generate");

console.log("\n✅ Clean install completed successfully");
