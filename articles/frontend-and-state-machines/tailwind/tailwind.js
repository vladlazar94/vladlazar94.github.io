/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../**/*.{html,js,svg}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Source Code Pro", "monospace"],
        sans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
