/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        liturgical: {
          green: 'var(--liturgical-green)',
          red: 'var(--liturgical-red)',
          purple: 'var(--liturgical-purple)',
          white: 'var(--liturgical-white)',
        },
      },
    },
  },
  plugins: [],
};
