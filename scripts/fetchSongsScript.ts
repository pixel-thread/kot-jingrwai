import fs from 'fs';
import path from 'path';

type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
};

const API_URL = `http://localhost:3000/api/songs`;

const OUTPUT_PATH = path.resolve('src/libs/songs/song.json');

async function fetchRuntimeConfig() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse<unknown>;

  if (!json.success) {
    throw new Error(`Backend error: ${json.message}`);
  }

  if (!json.data) {
    throw new Error('Invalid response: data field missing');
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(json.data, null, 2));

  console.log('Runtime config written successfully');
}

fetchRuntimeConfig().catch((error) => {
  console.error(error);
  process.exit(1);
});
