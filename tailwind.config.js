/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e6f0f5',
          100: '#cce1eb',
          200: '#99c3d7',
          300: '#66a5c3',
          400: '#3387af',
          500: '#00699b',
          600: '#00547c',
          700: '#003f5d',
          800: '#002a3e',
          900: '#00151f',
        }
      }
    },
  },
  plugins: [],
}

