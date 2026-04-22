/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "gray-900": "#050505",
        "gray-800": "#141414",
        "gray-700": "#212328",
        "gray-600": "#30333A",
        "gray-500": "#9095A1",
        "gray-400": "#CCDADC",
        "blue-600": "#5862FF",
        "yellow-400": "#FDD458",
        "yellow-500": "#E8BA40",
        "teal-400": "#0FEDBE",
        "red-500": "#FF495B",
        "orange-500": "#FF8243",
        "purple-500": "#D13BFF",
      },
    },
  },
  plugins: [],
};
