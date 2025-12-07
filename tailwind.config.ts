import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fountain Design System Colors
        black: '#000000',
        white: '#FFFFFF',
        neutral: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          500: '#737373',
          700: '#404040',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-space-grotesk)', 'monospace'],
      },
      fontSize: {
        // Kiosk-specific sizing (1.5x larger)
        'kiosk-base': '20px',
        'kiosk-lg': '24px',
        'kiosk-xl': '32px',
        'kiosk-2xl': '48px',
        'kiosk-3xl': '64px',
      },
      spacing: {
        'kiosk': '64px', // Large page margins for kiosk
      },
      borderRadius: {
        lg: '8px',
        md: '6px',
        sm: '4px',
      },
    },
  },
  plugins: [],
}

export default config
