---
description: Automates the synthesis of task history into persistent Knowledge Items (KIs).
---

# 🧠 Workflow: Knowledge Synthesis

## 🕹️ Trigger

-   Task marked `[x]` in `plans/active_feature_plan.md`
-   Every 10 entries in `memory.md`
-   End-of-Session protocol

## 🛠️ Execution Protocol

1.  **Orient**: Scan `plans/memory.md` for `[COMPLETE]` task identifiers.
2.  **Extract Patterns**: Identify any recurring technical patterns (e.g., "Always refactoring this shared/ logic").
3.  **Extract Security**: Identify any new `[SEC]` findings from the Security Review Artifacts.
4.  **Synthesize**: Call `reflect` or `store_memory` via the agent_memory MCP server.
5.  **Persist**: Append insights to `.gemini/antigravity/brain/conventions.md` or `pitfalls.md`.

## 🛡️ Senior Mandate & Laws

-   [ ] [SEC] Verify NO PII, secrets, or tokens are written to Brain/KIs.
-   [ ] [LAW] Link new Knowledge Items to existing project laws.

## 🧠 Output

-   `[MEMORY]` Context-aware Knowledge Item indexed in the vault.
-   `Log to memory.md`: Knowledge Extraction `COMPLETE`.
