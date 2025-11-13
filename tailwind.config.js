/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        // Custom theme colors from original project
        bg: {
          DEFAULT: '#061316',
          card: '#0a1c22',
          secondary: '#122a32',
          hover: '#15323c',
        },
        text: {
          DEFAULT: '#f0f7f9',
          secondary: '#c8e0e7',
          muted: '#a2c2cc',
        },
        accent: {
          DEFAULT: '#06d6a0',
          light: '#20e3b2',
          dark: '#05a87f',
        },
        border: 'rgba(150, 177, 187, 0.15)',
        highlight: 'rgba(6, 214, 160, 0.08)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Vazirmatn"', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease infinite alternate',
        'icon-pulse': 'iconPulse 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        iconPulse: {
          '0%': { filter: 'drop-shadow(0 0 3px rgba(6, 214, 160, 0.5))' },
          '100%': { filter: 'drop-shadow(0 0 8px rgba(6, 214, 160, 0.8))' },
        },
      },
      transitionDuration: {
        '25': '25ms',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
