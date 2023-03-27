/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
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
