/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6070ff',
        secondary: '#172b4d',
        tertiary: '#344563',
        darkBg: '#0f172a',
        darkCard: '#1e293b',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        alegreya: ['Alegreya', 'serif'],
      },
    },
  },
  plugins: [],
}
