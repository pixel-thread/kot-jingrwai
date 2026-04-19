# Implementation Plan - Feature Structure Standardization

The goal is to align all features in `src/features` with the template defined in `.agents/skills/feature-refactor.md`.

## Target Structure
Every feature in `src/features/[name]/` should have:
- `api/`
- `components/`
- `hooks/`
- `screens/`
- `services/`
- `types/`
- `validators/`
- `index.ts` (Public API)

## Current Status Audit
- **announcements**: Missing `api/`, `services/`.
- **auth**: Extra `store/`, `utils/`.
- **employee**: Extra `store/`, `utils/`.
- **flash**: Missing everything (just empty folders), missing `index.ts`. Extra `store/`, `utils/`.
- **home**: Extra `store/`, `utils/`.
- **leave**: Extra `store/`, `utils/`.
- **pension**: Extra `store/`, `utils/`.
- **profile**: Extra `store/`, `utils/`.
- **salary**: Extra `store/`, `utils/`.
- **settings**: Extra `store/`, `utils/`.

## Tasks

### 1. Cleanup Unapproved Directories [IMPL]
Remove `store/` and `utils/` from all features where they exist.

### 2. Standardize Mandatory Directories [IMPL]
Ensure `api/`, `components/`, `hooks/`, `screens/`, `services/`, `types/`, `validators/` exist for all features.

### 3. Ensure Public API (index.ts) [IMPL]
- Create `src/features/flash/index.ts`.
- Audit existing `index.ts` files.

### 4. Verification [REVIEW]
- Run `ls -R src/features` to verify.
- Run `npx eslint .`.
