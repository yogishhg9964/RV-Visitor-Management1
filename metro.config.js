const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, 'mjs'];

module.exports = defaultConfig;
