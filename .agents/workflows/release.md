---
description: Deploy Mobile API changes safely to the staging environment.
---

# 🚀 Workflow: Release (Staging/Prod)

## 🕹️ Trigger

-   `plans/active_feature_plan.md` task tagged `[RELEASE]`
-   Production deployment milestone

## 🛠️ Execution Protocol

1.  **Orient**: Confirm all feature tasks in `task_breakdown.md` are marked `[x]`.
2.  **Security Gate**: Invoke `strict-gate.md` (Mandatory Gated Review).
3.  **Scan Gate**: Invoke `security-audit.md` (Full Threat Scan).
4.  **Verification**: 
    -   `pnpm lint`: Zero linting/formatting errors.
    -   `pnpm test`: Zero test failures.
5.  **Build**: Run `eas build --profile preview` (Staging/Preview).
6.  **QA**: Manual verification of generated artifact on physical device.
7.  **Finalize**: Submit for human approval before production merge.

## 🛡️ Senior Mandate

-   **Policy**: Switch to **T1 Terminal Policy** for the duration of this workflow.
-   **Law**: Ensure no `console.logs` or PII in production-bound code. (Rule §9).
-   **Law**: Verify all feature `index.ts` gateways are fully encapsulated.

## 🧠 Output

-   `[RELEASE]` Staging/Prod build generated securely.
-   `Log to memory.md`: Production Milestone `COMPLETE`.
