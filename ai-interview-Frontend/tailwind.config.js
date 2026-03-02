/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(99 102 241 / <alpha-value>)',
        secondary: 'rgb(139 92 246 / <alpha-value>)',
        accent: 'rgb(236 72 153 / <alpha-value>)',
        background: 'rgb(15 23 42 / <alpha-value>)',
        foreground: 'rgb(241 245 249 / <alpha-value>)',
        muted: 'rgb(100 116 139 / <alpha-value>)',
        card: 'rgb(30 41 59 / <alpha-value>)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        mono: ['menlo', 'monospace'],
      },
      borderRadius: {
        'xl': '1rem',
      },
      animation: {
        'spin': 'spin 1s linear infinite',
      },
      boxShadow: {
        'lg': '0 10px 25px -5px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
