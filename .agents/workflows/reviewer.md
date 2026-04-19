---
description: Code Review with Skills Integration
---

# Agent Workflow: Code Review with Skills Integration

## Overview

This workflow defines an automated agent that reviews code changes in a pull request (PR) using multiple specialized skills:

- Code Review Skill `.agents/skills/code-reviewer.md`
- Security Scan Skill `.agents/skills/security-scan.md`
- Security Review Skill `.agents/skills/security-reviewer.md`

The workflow ensures that only modified files are analyzed and that all findings are consolidated into a structured report.

---

## Workflow Architecture

```

Trigger (PR Event)
↓
Identify Changed Files
↓
+-----------------------------+
|  For Each Changed File      |
|                             |
|  1. Code Review             |
|  2. Security Scan           |
|  3. Security Review         |
+-----------------------------+
↓
Aggregate Results
↓
Generate Final Report

```

---

## Step-by-Step Workflow

### 1. Trigger

- Event:
  - Pull Request (Created / Updated / Synchronized)
  - Local Changes (Uncommitted / Staged / Pre-commit)

- Inputs:
  - **For PR:**
    - PR ID
    - Repository
    - List of changed files (diff)

  - **For Local:**
    - List of modified files (git diff / staged changes)
    - Optional: full file content

---

### 2. Identify Changed Files

Extract all modified and newly added files from the PR:

```python
changed_files = get_changed_files(pr_id)
```

Example Output:

```json
["src/auth/login.js", "src/api/userController.js", "utils/validator.py"]
```

---

### 3. Code Review Phase

**Skill Used:** `review`

For each file, run a standard code quality and best-practices review.

#### Execution:

```python
for file in changed_files:
    review_results[file] = review.run({
        "file": file,
        "changes": get_diff(file)
    })
```

#### Responsibilities:

- Code quality checks
- Readability and maintainability
- Design pattern validation
- Performance considerations
- Naming conventions

---

### 4. Security Scan Phase

**Skill Used:** `security_scan`

Perform automated/static vulnerability detection.

#### Execution:

```python
for file in changed_files:
    security_scan_results[file] = security_scan.run({
        "file": file,
        "changes": get_diff(file)
    })
```

#### Responsibilities:

- Detect known vulnerability patterns
- Identify insecure dependencies (if applicable)
- Flag unsafe API usage
- Highlight common OWASP issues

---

### 5. Security Review Phase

**Skill Used:** `security_review`

Perform deep contextual and logical security analysis.

#### Execution:

```python
for file in changed_files:
    security_review_results[file] = security_review.run({
        "file": file,
        "changes": get_diff(file)
    })
```

#### Responsibilities:

- Business logic vulnerabilities
- Authentication/authorization flaws
- Data exposure risks
- Injection vulnerabilities (SQL, XSS, etc.)
- Misuse of cryptography or secrets

---

### 6. Aggregate Results

Combine all results into a structured format.

```python
final_report = {}

for file in changed_files:
    final_report[file] = {
        "code_review": review_results.get(file, []),
        "security_scan": security_scan_results.get(file, []),
        "security_review": security_review_results.get(file, [])
    }
```

---

### 7. Severity Classification

Standardize issue severity across all skills:

| Severity | Description                           |
| -------- | ------------------------------------- |
| Critical | Immediate risk, must fix before merge |
| High     | Serious issue, fix required           |
| Medium   | Moderate concern                      |
| Low      | Minor issue                           |
| Info     | Informational / suggestion            |

---

### 8. Generate Final Report

#### Output Format:

```md
# Code Review Summary

## File: src/auth/login.js

### Code Review Findings

- [Medium] Improve error handling for login failures
- [Low] Rename variable for clarity

### Security Scan Findings

- [High] Potential SQL Injection detected

### Security Review Findings

- [Critical] Missing authentication validation

---

## File: src/api/userController.js

### Code Review Findings

- [Low] Refactor duplicate logic

### Security Scan Findings

- No issues found

### Security Review Findings

- [High] Insecure direct object reference

---

## Overall Summary

- Total Issues: 6
- Critical: 1
- High: 2
- Medium: 1
- Low: 2
- Info: 0
```

---

## 9. Optional Enhancements

### CI/CD Integration

- Run workflow on every PR automatically
- Fail pipeline on Critical/High issues

### PR Comments

- Post inline comments on changed lines
- Provide suggested fixes

### Metrics & Monitoring

- Track:
  - Vulnerability trends
  - Code quality over time

### Auto-Fix (Advanced)

- Suggest or apply automated fixes for:
  - Formatting
  - Simple vulnerabilities

---
