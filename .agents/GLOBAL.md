@import "~/.gemini/GEMINI.md"

---

Each and every agent has to follow the SOLID principles. and the golden rules.

## 📂 Root Directory Breakdown

- `.agents/`: Orchestration and engineering standards for AI agents.
- `.gemini/`: Persistent knowledge base and session logs.
- `src/`: Core source code of the application.

---

## 🏛️ The `src/` Architecture

### 1. `src/app/` (The Router)

_Powered by Expo Router._
This directory should only contain **"dumb" route files**. No business logic, styling, or complex component composition should happen here.

- `[feature]/index.tsx`: Entry point for a feature route. Usually just renders a `HeaderStack` and a screen from `src/features`.
- `_layout.tsx`: Root layout, providers, and global navigation definitions.
- `(tabs)/`, `(drawers)/`: Navigation group nesting.

### 2. `src/features/` (The Business Logic)

Each folder here represents a self-contained domain (e.g., `announcements`, `leave`, `payroll`).

- `api/`: Endpoint definitions specific only to this feature.
- `components/`: Presentational components used strictly within this feature (e.g., `AnnouncementCard`).
- `hooks/`: Custom stateful logic and data-fetching hooks.
- `screens/`: The primary visual orchestrators of a feature.
- `types/`: TypeScript interfaces inferred from validators.
- `validators/`: **MANDATORY.** All Zod models and runtime validation schemas go here.
- `services/`: Complex business operations or third-party integrations (e.g., Local Storage, specialized calculations).
- `store/`: Feature-specific state management (e.g., Zustand slices).
- `utils/`: Helper functions specific only to this domain.
- `index.ts`: **The Gateway.** Only export what the rest of the app needs (usually screens and hooks).

### 3. `src/shared/` (The Infrastructure)

Reusable logic and UI across multiple features.

- `api/`: Centralized `query-keys.ts`, `index.ts` (Registry), and generic endpoint factories.
- `components/`:
  - `ui/`: Standardized design system atoms (e.g., `Text`, `Button`, `Skeleton`).
  - `layout/`: Global layout patterns (e.g., `Header`, `TabLayout`).
- `constants/`: Repo-wide tokens like `routes.ts`, `regex.ts`, and `status-codes.ts`.
- `context/`: React context providers for global state (e.g., Auth, Theme).
- `hooks/`: Generic utility hooks (e.g., `useTheme`, `useDebounce`).
- `providers/`: Context provider wrappers for the root layout.
- `services/`: Application-wide services (e.g., `notification.service.ts`).
- `store/`: Global state (e.g., Auth token, Theme).
- `types/`: Common TS interfaces (API envelopes, Meta data).
- `utils/`: Cross-cutting utility functions (e.g., `cn.ts`, `date-formatter.ts`).
- `validators/`: Common Zod schemas (e.g., ID schema, email schema).

### 4. `src/assets/`

Static assets like images, fonts, and icons.

---

## 📜 Golden Rules for Developers & Agents

1.  **Feature Isolation**: A feature should never reach deep into another feature's subfolders. Only import from the feature's root `index.ts`.
2.  **Shared vs. Feature**: If a component is used by ≥2 features, it must move to `src/shared/components`.
3.  **Validators First**: Never define types manually. Define a Zod schema in `validators/` and infer the type in `types/`.
4.  **Dumb Routes**: Keep `src/app` thin. If you find yourself writing logic there, extract it to a feature component or hook.
5.  **No Absolute Paths (Internal)**: Use relative paths within a feature folder. Use `@/src/...` aliases for shared or cross-feature imports.
