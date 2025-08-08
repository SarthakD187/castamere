/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Kigo', 'sans-serif'], 
        nova: ['"Nova Klasse"', 'sans-serif'], 
        noir: ['"Noir Pro"', 'sans-serif'], // <— new family
      },
    },
  },
  plugins: [],
}


