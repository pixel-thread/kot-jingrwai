---
description: Deploy Mobile API changes safely to the staging environment.
---

1. Run `pnpm run lint` safely to ensure no missing syntax.
2. Run `eas build --platform android --profile preview --non-interactive --local` on `/` to verify TypeScript builds successfully.
3. Deploy the Edge application via `pnpm run deploy:preview`.
4. Post-deploy, run a smoke test manually to hit the base staging URL.
