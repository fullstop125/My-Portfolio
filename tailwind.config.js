/** @type {import('tailwindcss').Config} */
export default {
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
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        alegreya: ['Alegreya', 'serif'],
      },
    },
  },
  plugins: [],
}
