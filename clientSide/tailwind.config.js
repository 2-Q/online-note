
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '0',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addComponents }) {
      addComponents({
        '.btn, .btn-outline, .btn-outline-hover': {
          padding: '.33rem 1rem',
          borderRadius: '.25rem',
          textAlign: 'center',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '.25rem',
          lineHeight: 'initial',
          fontWeight: '600'
        },
        '.btn': {
          color: '#fff'
        },
        '.btn-outline, .btn-outline-hover': {
          borderWidth: '1.9px',
        },
        '.btn-outline-hover': {
          '&:hover': {
            borderColor: 'transparent',
            color: '#fff'
          }
        },
        '.card': {
          backgroundColor: '#fff',
          '--tw-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          '--tw-shadow-colored': '0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color)',
          boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
          width: '100%',
          borderWidth: '1px',
          marginBottom: '.75rem',
        },
        '.card-header': {
          display: 'flex',
          justifyContent: 'space-between',
          justifyItems: 'center',
          padding: '.5rem 1.25rem',
          borderBottomWidth: '1px',
          backgroundColor: '#fff',
        },
        '.card-title': {
          fontSize: '15px',
          fontWeight: 600,
          textTransform: 'capitalize',
        },
        '.card-body': {
          backgroundColor: '#fff',
          padding: '.75rem 1.25rem',
        },
        '.card-footer': {
          backgroundColor: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          justifyItems: 'center',
          padding: '1rem 1.25rem',
          borderTopWidth: '1px',
        }
      })
    })
  ],
}
