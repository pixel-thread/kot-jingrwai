const fs = require("fs");
const path = require("path");

const REQUIRED_VERSIONS = {
  expo: "~53.0.24",
  react: "19.0.0",
  "react-native": "0.79.6",
  "expo-router": "~5.1.8",
  nativewind: "4.1.23",
};

const APPS_DIR = path.join(process.cwd(), "src/apps");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isExpoApp(pkg) {
  return pkg.main === "expo-router/entry" || Boolean(pkg.dependencies?.expo);
}

function checkApp(appPath) {
  const pkgPath = path.join(appPath, "package.json");
  if (!fs.existsSync(pkgPath)) return;

  const pkg = readJson(pkgPath);
  if (!isExpoApp(pkg)) return; // ✅ skip web apps

  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  for (const [dep, requiredVersion] of Object.entries(REQUIRED_VERSIONS)) {
    if (!deps[dep]) continue;

    if (deps[dep] !== requiredVersion) {
      console.error(
        `\n❌ Expo version mismatch in ${pkg.name}\n` +
          `   ${dep}: ${deps[dep]}\n` +
          `   required: ${requiredVersion}\n`,
      );
      process.exit(1);
    }
  }
}

fs.readdirSync(APPS_DIR).forEach((dir) => {
  checkApp(path.join(APPS_DIR, dir));
});

console.log("✅ Expo apps version check passed");
