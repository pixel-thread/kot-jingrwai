---
description: Enforces a Gated Review Pattern (Strict Mode) for high-risk operations.
---

# 🛡️ Workflow: Strict Mode Gate

## 🕹️ Trigger

-   `plans/active_feature_plan.md` task tagged `[SEC]` or `[RELEASE]`
-   Called by `release.md` or `security-audit.md` (Nested Workflow)
-   Manual invocation via `/strict-mode`

## 🛠️ Execution Protocol

1.  **Activate Gate**: Set `request_feedback = true` in the active **Implementation Plan Artifact**.
2.  **Lock Terminal**: Switch to **T1 Terminal Policy** (Off + Allow List). Approval is required for any command not in the §12 allow-list.
3.  **Audit Mandate**: Launch `security-audit.md` (Nested Scan).
4.  **Verification**: 
    -   Validate all `write_file` targets against the §4 Allowlist.
    -   Confirm zero CRITICAL or HIGH findings in the **Security Review Artifact**.

## 🛡️ Laws & Senior Mandate

-   [ ] [SEC] Verify no `AsyncStorage` usage for credentials (must use `SecureStore`).
-   [ ] [SEC] Verify HTTPS enforcement in all feature-local `api/` constants.

## 🧠 Output

-   `[SEC]` Gated artifact awaiting human approval.
-   `Log to memory.md`: Strict Mode Gate **ACTIVE**.
