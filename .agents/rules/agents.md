# Agent Orchestration and ADD Flow

## Available Agents

Located as skills in `.agents/skills/`:

| Agent | Purpose | When to Use |
|-------|---------|-------------|
| planner | Implementation planning | Complex features, refactoring |
| architect | System design | Architectural decisions |
| tdd-guide | Test-driven development | New features, bug fixes |
| code-reviewer | Code review | After writing code |
| security-reviewer | Security analysis | Before commits |
| doc-updater | Documentation | Updating docs |

## The Agent-Driven Development (ADD) Flow

### Phase 1: Product Definition (User)
Create a new file in `.agents/prd/features/<feature-name>.md` outlining **User Story**, **Acceptance Criteria**, and **Out of Scope**.

### Phase 2: Planning (`planner` skill)
Trigger: *"I want to build the feature described in `.agents/prd/features/<feature-name>.md`. Please act as the Planner."*
The Planner reads `rules/common/agents.md`, `core_prd.md`, and the feature PRD, outputting a step-by-step implementation plan to `.agents/plans/active_feature_plan.md`.

### Phase 3: Execution (`tdd-guide` or default coder)
Trigger: *"Plan approved. Keep `active_feature_plan.md` open and begin execution."*
The AI executes steps one by one, checking off boxes in `active_feature_plan.md` to maintain state. Reads domain-specific rules (backend/frontend).

### Phase 4: Verification & Security (`security-reviewer` skill)
Trigger: *"Acting as the Security Reviewer, audit the recent changes."*
The AI scans against OWASP constraints in `rules/common/security.md`. Fix occurrences or issue all-clear.

### Phase 5: Documentation (`doc-updater` skill)
Trigger: *"Feature complete. Update the docs."*
The AI marks the feature PRD as `[IMPLEMENTED]`, resets `active_feature_plan.md`, and updates public docs.
