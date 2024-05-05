/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          1: '#AAD7D9',
          2: '#92C7CF',
          3: '#6A9EAB',
          4: '#3B828E',
        },
        grey: {
          1: '#FBF9F1',
          2: '#E5E1DA',
          3: '#C9C3BB',
          4: '#AFA8A0',
        },
      },
    },
  },
  plugins: [],
}