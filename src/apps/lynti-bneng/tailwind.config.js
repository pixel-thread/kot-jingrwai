/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,tsx}',
    '../../packages/ui-native/src/**/*.{js,ts,tsx}',
    '../../packages/ui-native/dist/**/*.{js,ts,tsx}',
    '../../packages/libs/src/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
};
