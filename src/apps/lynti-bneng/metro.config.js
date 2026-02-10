const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../../..");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

/**
 * ✅ EXTEND defaults instead of overwriting
 */
config.watchFolders = [...config.watchFolders, workspaceRoot];

/**
 * ✅ Allow Metro to resolve normally
 */
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, "node_modules"),
  path.join(workspaceRoot, "node_modules"),
];

/**
 * ❌ REMOVE this line entirely
 */

// 🚨 DO NOT disable hierarchical lookup
config.resolver.disableHierarchicalLookup = true;

// NativeWind v4
const { withNativeWind } = require("nativewind/dist/metro");

module.exports = withNativeWind(config, {
  input: "./global.css",
});
