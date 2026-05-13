import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:  '#FAF7F0',
        beige:  '#EDE8D8',
        mint:   '#B8D4B4',
        forest: '#2C3E2D',
        bark:   '#C4A882',
        brown:  '#8B6F5E',
        sage: {
          50:  '#E8F0E4',
          100: '#D0E4C8',
          200: '#A8C4A2',
          300: '#90B490',
          400: '#7A9E7E',
          500: '#5A8B5A',
          600: '#4A7C59',
          700: '#427050',
          800: '#3D6B4F',
          900: '#2A4D38',
        },
        text: {
          dark: '#2C3E2D',
          mid:  '#5A6B5A',
          soft: '#8A9E8A',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'Noto Sans KR', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        sway: 'sway 3.5s ease-in-out infinite alternate',
      },
      keyframes: {
        sway: {
          '0%':   { transform: 'rotate(-4deg)' },
          '100%': { transform: 'rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
