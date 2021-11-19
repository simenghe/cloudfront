module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        'max-h-120': '120rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
