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
    },
  },
  plugins: [],
  corePlugins: {
    backdropFilter: true,
  }
};
