/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        noir: ['"Noir Pro"', 'sans-serif'], // <— new family
      },
    },
  },
  plugins: [],
}


