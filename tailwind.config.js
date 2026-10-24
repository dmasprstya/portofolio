/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#ffffff',
          text: '#1a1a1a',
          accent: '#3b82f6',
          border: '#e5e7eb',
        },
        dark: {
          bg: '#0f172a',
          text: '#f8fafc',
          accent: '#60a5fa',
          border: '#334155',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '2rem',
          sm: '3rem',
        },
        screens: {
          lg: '1120px',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
