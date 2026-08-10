import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        ink: '#0A0A0C',
        mist: '#1a1a1e',
        accent: {
          green: '#2A6B4A',
          cyan: '#38B6C0',
          blue: '#3D6DF2',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        display: '-0.045em',
      },
    },
  },
  plugins: [],
}

export default config
