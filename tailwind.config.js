/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: {
        'h-sm': { raw: '(max-height: 810px) or (max-width: 600px)' },
        'h-xs': { raw: '(max-height: 750px) or (max-width: 400px)' },
        'w-xs': { raw: '(max-width: 380px)' },
      },
      colors: {
        'accent-maroon': 'var(--accent-maroon, #540F0F)',
        muted: 'var(--muted, #7f4646)',
        highlight: 'var(--highlight, #fce5e5)',
        'active-gray': '#f0e7e7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
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
          '25%': { transform: 'rotate(-20deg) scale(1.1)' },
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
  },
};
