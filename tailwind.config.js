/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    accentColor: ({ theme }) => ({
      ...theme("colors"),
      auto: "auto",
    }),
    extend: {
      colors: {
        primary: "#4A3AFF",
        secondary:"#00DCB8"
      },
      fontFamily: {
        epilogue: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        secondary: "10px 10px 20px rgba(2, 2, 2, 0.25)",
      },
    },
  },
  plugins: [],
};