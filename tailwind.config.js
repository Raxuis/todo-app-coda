/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
