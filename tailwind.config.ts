import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          50: '#e8f6ff',
          100: '#cfeeff',
          200: '#a6ddff',
          300: '#6dc6ff',
          400: '#36aaff',
          500: '#0b8bff', // near cobalt
          600: '#006fe6',
          700: '#0057b3',
          800: '#003f80',
          900: '#002a59'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config