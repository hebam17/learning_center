/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-500": "#FF6636",
        "primary-400": "#FF855E",
        "secodary-900": "#111033",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
