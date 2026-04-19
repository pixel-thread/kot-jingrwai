---
description: Security Audit
---

# 🛡️ Workflow: Security Audit

## 🕹️ Trigger

- Weekly automated schedule
- Pre-release milestone (Mandatory Gate)
- Major refactor or API change

## 🛠️ Execution Protocol

1.  **Orient**: Sync with **§10 Antigravity Threat Model** and **§11 OWASP Top 10**.
2.  **Secret Scan**: Run a recursive `grep` for tokens and private keys.
    - `grep -rE "token|password|secret|key|base64" src/`
3.  **Encapsulation Check**: Verify `SecureStore` is used for all tokens (no `AsyncStorage`).
4.  **PII Sanitization**: Scan for logic leaking email, phone, or bio into logs.
5.  **Network Audit**: Verify SSL Pinning client configuration for `employee-nic.vercel.app`.
6.  **Zod Integrity**: Confirm 100% test coverage for API response parsers.

## 🛡️ Rules & Verdict

- [ ] [SEC] Check for redirects to Always Blocked IP ranges (§4).
- [ ] [SEC] Verify no `console.log` remains in production code paths.
- [ ] [SEC] Audit all 3rd party package origins against §4 Allowlist.

## 🧠 Output

- **Security Review Artifact (§13)** with Location/Issue/Fix triad.
- **🔴 FAIL** | **🟢 PASS** consensus verdict.
- `Log to memory.md`: Audit `COMPLETE`.
