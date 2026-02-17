/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark theme palette
        background: {
          DEFAULT: '#0A0E14', // Negro azulado oscuro
          light: '#151922',   // Surface cards
          lighter: '#1F2937', // Borders
        },
        // Primary orange accent
        primary: {
          DEFAULT: '#F97316', // Orange-500
          hover: '#EA580C',   // Orange-600
          light: '#FB923C',   // Orange-400
          dark: '#C2410C',    // Orange-700
        },
        // Text colors
        text: {
          primary: '#E5E7EB',   // Gray-200
          secondary: '#9CA3AF', // Gray-400
          muted: '#6B7280',     // Gray-500
        },
        // Keep error for validation
        error: {
          DEFAULT: '#DC2626',
          light: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(249, 115, 22, 0.15)',
        'glow-lg': '0 0 30px rgba(249, 115, 22, 0.25)',
      },
    },
  },
  plugins: [],
}