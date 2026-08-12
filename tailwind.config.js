/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/globals.css",
    "./src/frontend/**/*.css",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A2540",
        secondary: "#1E6FEB",
        accent: "#14B8A6",
        highlight: "#F5A623",
      },
    },
  },
  plugins: [],
}
