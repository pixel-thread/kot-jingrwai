# Plan: Create 'flash' Feature

Scaffold the "flash" feature and implement basic structure and a custom hook.

## 1. Scaffold Feature [IMPL]
- Run `node scripts/generate-feature.js` and provide 'flash' as input.
- Verify directory structure in `src/features/flash/`.

## 2. Implement Custom Hook `useFlash` [IMPL]
- Create `src/features/flash/hooks/useFlash.ts`.
- Implement basic logic (placeholder for now).
- Export hook in `src/features/flash/index.ts`.

## 3. Security Review [SEC] [REVIEW]
- Verify no path injection in feature name (normalized to 'flash').
- Audit for secrets or insecure patterns.

## 4. Final Review & Log [REVIEW]
- Verify exports and structure.
- Update `memory.md`.
