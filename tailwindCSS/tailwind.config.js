/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../html/**/*.{html,js}", "../js/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        gradient: {
          100: "#e8f0f5",
          200: "#99d5c4",
          300: "#a1dbc7",
          400: "#a1dbc7",
          500: "#8fafcf",
          600: "#8fafcf",
          700: "#8fafcf",
        },
      },
    },
  },
  plugins: [],
};
