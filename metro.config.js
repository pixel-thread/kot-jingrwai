// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname);

// Allow bundling .db files from assets for SQLite import
config.resolver.assetExts.push('db');

config.resolver.sourceExts.push('sql');

module.exports = withNativeWind(config, { input: './src/styles/global.css' });
