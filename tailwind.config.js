module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {},
    colors: {
      navy: '#02042F',
      koamaru: '#222352',
      red: '#EB2F2F',
      green: '#2FEB5A',
      white: '#ffffff'
    },
    fontFamily: {
      'sans': 'nexa, sans-serif',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};