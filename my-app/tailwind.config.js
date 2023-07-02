/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        buttonClick: "btnClick 0.5s ease 1",
      },
      keyframes: {
        btnClick: {
          "0%": { scale: "100%" },
          "50%": { scale: "95%" },
          "100%": { scale: "100%" },
        },
      },
    },
  },
  plugins: [],
};
