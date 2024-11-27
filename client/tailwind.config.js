/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#FFEEE8",
        "primary-400": "#FF855E",
        "primary-500": "#FF6636",
        "secondary-900": "#111033",
        "gray-300": "#B7BAC7",
        "gray-700": "#4E5566",
        "gray-800": "#363B47",
        "gray-900": "#1D2026",
      },
      borderWidth: {
        1: "1px",
      },
      outlineWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
