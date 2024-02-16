/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
  },
}
