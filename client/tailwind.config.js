/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dce7ff",
          400: "#5b8def",
          500: "#3466e6",
          600: "#264fc2",
          700: "#1e3d99"
        }
      }
    }
  },
  plugins: []
};
