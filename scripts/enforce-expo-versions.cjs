const fs = require('fs');
const path = require('path');

/* ---------------------------------------------
 * Repo root (one level above /scripts)
 * --------------------------------------------- */
const ROOT = path.resolve(__dirname, '..');
const APPS_DIR = path.join(ROOT, 'src/apps');

/* ---------------------------------------------
 * Required Expo versions
 * --------------------------------------------- */
const REQUIRED_VERSIONS = {
  expo: '~53.0.24',
  react: '18.2.0',
  'react-native': '0.73.6',
  'expo-router': '~5.1.8',
  nativewind: '4.1.23',
};

/* ---------------------------------------------
 * Helpers
 * --------------------------------------------- */
function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isExpoApp(pkg) {
  return pkg.main === 'expo-router/entry' || Boolean(pkg.dependencies?.expo);
}

function checkApp(appPath) {
  const pkgPath = path.join(appPath, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = readJson(pkgPath);
  if (!isExpoApp(pkg)) return; // skip non-Expo apps (Next.js etc.)

  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  for (const [dep, requiredVersion] of Object.entries(REQUIRED_VERSIONS)) {
    if (!deps[dep]) continue;

    if (deps[dep] !== requiredVersion) {
      console.error(
        `\n❌ Expo version mismatch in ${pkg.name}\n` +
          `   ${dep}: ${deps[dep]}\n` +
          `   required: ${requiredVersion}\n`
      );
      process.exit(1);
    }
  }
}

/* ---------------------------------------------
 * Run
 * --------------------------------------------- */
if (!fs.existsSync(APPS_DIR)) {
  console.error(`❌ src/apps not found at ${APPS_DIR}`);
  process.exit(1);
}

fs.readdirSync(APPS_DIR).forEach((dir) => {
  checkApp(path.join(APPS_DIR, dir));
});

console.log('✅ Expo apps version check passed');
