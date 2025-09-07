/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Habilita dark mode via classe
  theme: {
    extend: {
      colors: {
        saul: '#00ff9d', // sua cor de destaque (neon green)
      },
      fontFamily: {
        code: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
