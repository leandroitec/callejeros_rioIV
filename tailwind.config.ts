import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: {
            DEFAULT: '#EA580C',
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          },
          cyan: {
            DEFAULT: '#0891B2',
            50: '#ECFEFF',
            100: '#CFFAFE',
            200: '#A5F3FC',
            300: '#67E8F9',
            400: '#22D3EE',
            500: '#06B6D4',
            600: '#0891B2',
            700: '#0E7490',
            800: '#155E75',
            900: '#164E63',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-poppins)', 'Nunito', 'sans-serif'],
        sans: ['var(--font-inter)', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
