import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3faf2',
          100: '#daf3dc',
          200: '#b8e7bb',
          300: '#8fd995',
          400: '#5ac96b',
          500: '#2fa541',
          600: '#268a36',
          700: '#1f6f2b',
          800: '#195923',
          900: '#14451c'
        }
      },
      boxShadow: {
        card: '0 24px 80px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
