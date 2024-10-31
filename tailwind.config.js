/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary : '#00d094',
        dark:'#00150f',
        'dark-light':'#0b201a',
        'text-dark':'#939b99',
        primaryLight : '#fc9e12',
      }
    },
  },
  plugins: [],
}

