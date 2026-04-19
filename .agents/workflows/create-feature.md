---
description: Create a new feature
---

# 🚀 Workflow: Create Feature

## 🕹️ Trigger

- `plans/active_feature_plan.md` task tagged `[IMPL]` or `[CREATE]`
- New feature specification available in `prd/features/`

---

## 🧠 Execution Mode

- Phase: Architecture → Implementation
- Skill: feature_scaffolding
- Risk Level: Medium

---

## 🛠️ Execution Protocol (§8)

### 1. Orient

- Extract feature name from:
  - `active_feature_plan.md` OR
  - PRD file name
- Validate against `src/app/` routing

---

### 2. Load Rules

- Enforce:
  - Feature Gateway (`index.ts`)
  - No cross-feature imports
  - Zod validation mandatory

---

### 3. Load Skill

- `feature_scaffolding`

---

### 4. Security Pre-Check

- Ensure feature name is safe (no path injection)
- Normalize:
  - lowercase
  - kebab-case (optional)

---

### 5. Execute (Script Integration) ⚡

The agent MUST automatically determine the `<feature-name>` based on the task context.
This script MUST be run from the root of the project.

```bash
node ./scripts/generate-feature.js <feature-name>
```

---
