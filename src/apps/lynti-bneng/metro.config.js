const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const path = require('path');
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../../..');

// Monorepo setup
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;

// NativeWind v4 - Use NativeWind helper (SIMPLEST)
const { withNativeWind } = require('nativewind/dist/metro');

module.exports = withNativeWind(config, { input: './global.css' });
