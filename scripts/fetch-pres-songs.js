const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
require('dotenv').config();

const apiBaseUrl = 'https://kot-jingrwai.vercel.app/api' || 'http://localhost:3000/api';

const API_URL = `${apiBaseUrl}/songs`;

const OUTPUT_PATH = path.resolve('../src/apps/mobile/src/libs/songs/song.json');
const LYNTI_BNENG = path.resolve('../src/apps/lynti-bneng/src/libs/songs/song.json');

async function fetchRuntimeConfig() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(`Backend error: ${json.message}`);
  }

  if (!json.data) {
    throw new Error('Invalid response: data field missing');
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(json.data, null, 2));
  fs.mkdirSync(path.dirname(LYNTI_BNENG), { recursive: true });
  fs.writeFileSync(LYNTI_BNENG, JSON.stringify(json.data, null, 2));

  console.log('Runtime config written successfully');
}

fetchRuntimeConfig().catch((error) => {
  console.error(error);
  process.exit(1);
});
