module.exports = {
  purge: ['./**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#6CAF74'
    })
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      opacity: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
