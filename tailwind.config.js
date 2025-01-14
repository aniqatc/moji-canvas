/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'accent-maroon': '#540F0F',
        'muted-maroon': '#7f4646',
        'highlight-maroon': '#fce5e5',
        'active-gray': '#f0e7e7',
        'light-gray': '#E5E5E5',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          'Avenir',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'DM Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
        display: ['Agbalumo', 'sans-serif'],
        hand: ['Shantell Sans', 'sans-serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(-20deg) scale(1.1)'},
          '75%': { transform: 'rotate(20deg) scale(1.1)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out 0.2s',
      },
    },
  },
  plugins: [],
  corePlugins: {
    backdropFilter: true,
  }
};
