---

# kot jingrwai

A **digital handbook** of the _Kot Jingrwai_ hymnal, providing a searchable list of songs with fast filtering and a clean mobile-first experience. The app helps users quickly find hymns by number, title, or keywords.[2][1]

## Features

- List of hymns from _Kot Jingrwai_ with core metadata (number, title, section).[1][2]
- Search and filter songs (e.g. by hymn number, title, or text fragments).[3]
- Mobile app built with **Expo (React Native)** for Android/iOS.[4][5]
- Backend API built with **Next.js** for serving song data and search endpoints.[6]
- Designed as a fast, offline-friendly digital handbook for church and personal use.[2][1]

## Tech Stack

- **Frontend:** Expo (React Native) app for the hymn/song list UI, search, and filters.[7][4]
- **Backend:** Next.js (App Router) for APIs and admin views.[8][6]
- **Platform:** Deployed on Vercel for the Next.js backend and using Expo tooling for the mobile app.[6][4]

## Getting Started (Backend – Next.js)

From the backend (Next.js) project directory:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to verify the API and any web UI.[6]

## Getting Started (Frontend – Expo)

From the Expo app directory:

```bash
npm install
npx expo start
# or
yarn start
```

Then:

- Use the Expo Go app (or emulator) to run the mobile client.
- Ensure the backend Next.js server URL is correctly configured in your environment (e.g. `.env` or config file).[5][4]

## Core Song List / Hymn Use Case

The primary purpose of **kot jingrwai** is:

- To provide a **list of songs** from the _Kot Jingrwai_ hymnal in a digital format.[1][2]
- To act as a **searchable handbook** so users can quickly look up hymns during services, gatherings, or personal devotion.[9][1]

Future enhancements may include favorites, categories, and audio or notation references (where legally allowed).[10][11]
