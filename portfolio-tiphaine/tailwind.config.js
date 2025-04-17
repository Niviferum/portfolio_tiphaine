// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Satoshi', 'sans-serif'],
        },
        fontSize: {
          '8xl': '100px', // Pour le titre TIPHAINE DERREY
          '2xl': '25px',  // Pour le texte défilant
          '3xl': '35px',  // Pour le bouton de téléchargement
          'lg': '20px',   // Pour les crédits
        },
        fontWeight: {
          'light': 300,
          'normal': 400,
          'medium': 500,
          'bold': 700,
          'black': 900,
        },
      },
    },
    plugins: [],
  }