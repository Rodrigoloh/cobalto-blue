import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cobaltBase: '#1F00FF',
        gradientA: '#1F00FF', // top
        gradientB: '#3a00ff',
        gradientC: '#0076ff',
        gradientD: '#ff0022', // bottom right hue
      },
      fontFamily: {
        neueMachina: ['NeueMachina', 'system-ui', 'sans-serif'],
        circularStd: ['CircularStd', 'system-ui', 'sans-serif'],
        groteskMono: ['PPRightGroteskMono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config