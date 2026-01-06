#!/usr/bin/env node
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

/* -------------------------------------------------
 * Validation
 * ------------------------------------------------- */

function assertEnv(name) {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable: ${name}`);
  }
}

assertEnv("SLACK_BOT_TOKEN");
assertEnv("SLACK_CHANNEL_ID");

/* -------------------------------------------------
 * Slack upload (NEW API – CORRECT)
 * ------------------------------------------------- */

function getUploadUrl(filePath) {
  const stats = fs.statSync(filePath);
  const filename = path.basename(filePath);

  const payload = JSON.stringify({
    filename,
    length: stats.size,
  });

  const response = execSync(
    `printf '%s' '${payload}' | curl -s https://slack.com/api/files.getUploadURLExternal \
      -H "Authorization: Bearer ${process.env.SLACK_BOT_TOKEN}" \
      -H "Content-Type: application/json; charset=utf-8" \
      --data-binary @-`,
  ).toString();

  const data = JSON.parse(response);

  if (!data.ok) {
    throw new Error(`Slack getUploadURLExternal failed: ${data.error}`);
  }

  return data; // { upload_url, file_id }
}

function uploadBinary(uploadUrl, filePath) {
  execSync(`curl -s -X PUT --upload-file "${filePath}" "${uploadUrl}"`, {
    stdio: "inherit",
  });
}

function completeUpload(fileId, title) {
  const payload = JSON.stringify({
    files: [{ id: fileId, title }],
    channel_id: process.env.SLACK_CHANNEL_ID,
  });

  const response = execSync(
    `printf '%s' '${payload}' | curl -s https://slack.com/api/files.completeUploadExternal \
      -H "Authorization: Bearer ${process.env.SLACK_BOT_TOKEN}" \
      -H "Content-Type: application/json; charset=utf-8" \
      --data-binary @-`,
  ).toString();

  const data = JSON.parse(response);

  if (!data.ok) {
    throw new Error(`Slack completeUpload failed: ${data.error}`);
  }
}

/* -------------------------------------------------
 * Public API
 * ------------------------------------------------- */

export function uploadToSlack(filePath, title) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  console.log(`📦 Uploading ${path.basename(filePath)} to Slack…`);

  const { upload_url, file_id } = getUploadUrl(filePath);
  uploadBinary(upload_url, filePath);
  completeUpload(file_id, title);

  console.log("✅ Upload complete");
}

/* -------------------------------------------------
 * CLI
 * ------------------------------------------------- */

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const file = process.argv[2];
  const title = process.argv[3] || "Build Artifact";

  if (!file) {
    console.error("Usage: node update-slack.mjs <file> [title]");
    process.exit(1);
  }

  uploadToSlack(path.resolve(file), title);
}
