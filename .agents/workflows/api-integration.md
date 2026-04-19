---
description: API Integration
---

# 🌐 Workflow: API Integration

## 🕹️ Trigger

- `plans/active_feature_plan.md` task tagged `[IMPL]` or `[API]`
- New backend endpoint specification available

## 🛠️ Execution Protocol

1.  **Orient**: Confirm endpoint against `src/shared/api/index.ts` (SSL Pinning client).
2.  **Validate**: Create **Zod** schema in `validators/[feature].schema.ts` (Rule §11: A03).
3.  **Register**: Add endpoint configuration to `api/[feature].endpoints.ts`.
4.  **Integrated Hook**: Create or update React Query hook in `api/[feature].api.ts`.
    - Must handle loading, error, and stale states.
    - Must use the feature's query keys.
5.  **Connect**: Inject hook into the feature's screen components.

## 🛡️ Security & Rules

- [ ] [SEC] Verify HTTPS and SSL Pinning for `employee-nic.vercel.app`.
- [ ] [SEC] Never expose raw API responses directly to UI without Zod parsing.
- [ ] No direct Axios/Fetch calls allowed in screens (Step 4).
- [ ] Use `@/src/shared/api` for the base client only (no custom clients per feature).

## 🧠 Output

- `[IMPL]` Secure, type-safe API hook.
- `Log to memory.md`: Task `COMPLETE`.
