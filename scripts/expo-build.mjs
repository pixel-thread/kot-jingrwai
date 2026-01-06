#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import readline from "node:readline";
import dotenv from "dotenv";

/* -------------------------------------------------
 * Helpers
 * ------------------------------------------------- */

function run(command, cwd = ROOT) {
  console.log(`\n→ ${command}`);
  execSync(command, {
    stdio: "inherit",
    cwd,
    env: process.env,
  });
}

dotenv.config();

function notifySlack(message) {
  if (!process.env.SLACK_WEBHOOK_URL) return;

  execSync(
    `curl -s -X POST -H 'Content-type: application/json' \
     --data '${JSON.stringify({ text: message })}' \
     ${process.env.SLACK_WEBHOOK_URL}`,
  );
}

function uploadToSlack(filePath, title) {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_CHANNEL;

  if (!token || !channel) {
    console.warn("⚠️ Slack file upload skipped (missing token or channel)");
    return;
  }

  execSync(
    `curl -s -F file=@${filePath} \
     -F "channels=${channel}" \
     -F "initial_comment=${title}" \
     -H "Authorization: Bearer ${token}" \
     https://slack.com/api/files.upload`,
    { stdio: "inherit" },
  );
}

function fail(message) {
  notifySlack(`❌ *Build failed*\n${message}`);
  console.error(`\n❌ ${message}`);
  process.exit(1);
}

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function shutdown(reason = "Interrupted") {
  console.log(`\n🛑 ${reason}`);
  notifySlack(`🛑 *Build cancelled*\nReason: ${reason}`);

  try {
    rl.close();
  } catch {}

  process.exit(130); // standard exit code for SIGINT
}

process.on("SIGINT", () => shutdown("SIGINT (Ctrl+C)"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("uncaughtException", (err) =>
  shutdown(`Uncaught exception: ${err.message}`),
);
process.on("unhandledRejection", (err) =>
  shutdown(`Unhandled rejection: ${err?.message || err}`),
);
/* -------------------------------------------------
 * Paths
 * ------------------------------------------------- */

const ROOT = process.cwd();
const APPS_ROOT = path.join(ROOT, "src/apps");
const ARTIFACT_DIR = path.join(ROOT, ".build-artifacts");

fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

/* -------------------------------------------------
 * Readline
 * ------------------------------------------------- */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/* -------------------------------------------------
 * Discover apps
 * ------------------------------------------------- */

if (!fs.existsSync(APPS_ROOT)) {
  fail("src/apps directory not found");
}

const apps = fs
  .readdirSync(APPS_ROOT)
  .filter((name) => fs.statSync(path.join(APPS_ROOT, name)).isDirectory());

if (apps.length === 0) {
  fail("No Expo apps found in src/apps");
}

/* -------------------------------------------------
 * Main
 * ------------------------------------------------- */

(async function main() {
  try {
    console.log("\n🚀 Expo Interactive Build\n");

    console.log("Available apps:");
    apps.forEach((app, i) => console.log(`  ${i + 1}. ${app}`));

    const appIndex = await ask("\nSelect app number: ");
    const app = apps[Number(appIndex) - 1];
    if (!app) fail("Invalid app selection");

    console.log("\nBuild types:");
    console.log("  1. Development");
    console.log("  2. Preview");
    console.log("  3. Production");

    const buildIndex = await ask("\nSelect build type: ");

    const timestamp = Date.now();
    let buildLabel;
    let buildCommand;

    const ARTIFACT_PATH = path.join(ARTIFACT_DIR, `${app}-${timestamp}.apk`);

    switch (buildIndex) {
      case "1":
        buildLabel = "development";
        buildCommand = `eas build --profile development --platform android --local --output ${ARTIFACT_PATH}`;
        break;
      case "2":
        buildLabel = "preview";
        buildCommand = `eas build --profile preview --platform android --local --output ${ARTIFACT_PATH}`;
        break;
      case "3":
        buildLabel = "production";
        buildCommand = `eas build --profile production --platform android --local --output ${ARTIFACT_PATH}`;
        break;
      default:
        fail("Invalid build type selection");
    }

    const APP_ROOT = path.join(APPS_ROOT, app);
    notifySlack(
      `🚀 *Build started*\n📱 App: ${app}\n🧱 Build: ${buildLabel}\n`,
    );

    run("node -v");
    run("pnpm -v");

    notifySlack("📦 Installing dependencies");
    run("pnpm install");

    notifySlack("🎨 Generating ui-native");
    run("pnpm run generate");

    const UI_NATIVE_DIST = path.join(ROOT, "src/packages/ui-native/dist");

    if (!fs.existsSync(UI_NATIVE_DIST)) {
      fail("ui-native/dist missing");
    }

    notifySlack("🏗️ Running EAS build");
    run(buildCommand, APP_ROOT);

    if (!fs.existsSync(ARTIFACT_PATH)) {
      fail(`Artifact missing at ${ARTIFACT_PATH}`);
    }

    notifySlack(`✅ *Build completed*\n📦 Artifact ready`);

    // uploadToSlack(ARTIFACT_PATH, `📦 ${app} (${buildLabel}) APK`);

    console.log(`\n📦 Artifact: ${ARTIFACT_PATH}`);
    console.log("\n✅ Done\n");

    rl.close();
  } catch (err) {
    notifySlack(`❌ *Build failed*\n${err.message || "Unknown error"}`);
    fail(err.message || "Unknown build error");
  }
})();
