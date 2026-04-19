---
description: Refactor a feature
---

# ♻️ Workflow: Refactor Feature

## Trigger

- Code smell / duplication / performance issue

## Steps

1. Identify problem area
2. Check if logic belongs in:
   - api/
   - services/
   - hooks/
3. Extract reusable logic
4. Move shared logic (if used in 3+ features → shared/)
5. Update imports via index.ts

## Validation

- Run `pnpm lint`
- Run `pnpm test`

## Output

- Cleaner structure
- Reduced duplication
