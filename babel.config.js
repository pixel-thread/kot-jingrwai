module.exports = function (api) {
  api.cache(true);
  let plugins = [
    // Drizzle
    ['inline-import', { extensions: ['.sql'] }],
  ];

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
