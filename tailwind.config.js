/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 24px 80px rgba(37, 211, 102, 0.14)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
