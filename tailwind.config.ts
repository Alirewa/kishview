import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0EA5E9',
        'primary-dark': '#38BDF8',
        cta: '#F97316',
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};

export default config;
