/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-font-inter'), require('@tailwindcss/forms'),],
}