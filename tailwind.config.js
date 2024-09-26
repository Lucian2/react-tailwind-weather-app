/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlack: '#171717',
        weatherCardBg: '#1e1e1e'
      }
    },
  },
  plugins: [],
}