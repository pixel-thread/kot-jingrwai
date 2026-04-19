# Plan: Configure Multiple App Variants

Implement multiple app variants (Development, Preview, Production) for the `employee-mobile` app so they can be installed side-by-side on a single device.

## Steps

### 1. Update `app.config.ts` [x]
- Add check for `APP_VARIANT` environment variable.
- Define constants for build types: `IS_DEV`, `IS_PREVIEW`, `IS_PROD`.
- Dynamically set the `name` property:
  - `IS_DEV` -> `employee (Dev)`
  - `IS_PREVIEW` -> `employee (Preview)`
  - `IS_PROD` -> `employee-mobile` (default)
- Dynamically set `ios.bundleIdentifier` and `android.package`:
  - `IS_DEV` -> `com.jyrwaboys.employeemobile.dev`
  - `IS_PREVIEW` -> `com.jyrwaboys.employeemobile.preview`
  - `IS_PROD` -> `com.jyrwaboys.employeemobile`

### 2. Update `eas.json` [x]
- Add `env.APP_VARIANT` to build profiles:
  - `development` -> `development`
  - `preview` -> `preview`
  - `production` -> `production`

### 3. Update `package.json` [x]
- Update development scripts to pass `APP_VARIANT=development` for local testing.

### 4. Verification [x]
- Verify that `expo config` output changes based on `APP_VARIANT` env var.
- Audit for security (no secrets in config).

### 5. Fix Circular Dependencies [x]
- Fix `Require cycle` between `http` and `logger`.
