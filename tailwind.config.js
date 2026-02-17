/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Strict B&W palette - NO accent colors
        white: '#FFFFFF',
        black: '#000000',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        // Error state only
        error: {
          DEFAULT: '#7F1D1D',
          light: '#991B1B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
      },
      boxShadow: {
        'flat': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'flat-lg': '0 2px 4px 0 rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
}
