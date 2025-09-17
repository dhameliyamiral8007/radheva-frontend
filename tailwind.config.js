
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        headerBg: "var(--header-bg)",
        headerText: "var(--header-text)",
        headerBorder: "var(--header-border)",
        searchBg: "var(--search-bg)",
        iconColor: "var(--icon-color)",
        // tailwind.config.js

        fontFamily: {
          kufam: ["'Kufam'", 'sans-serif'],
        }
      },
    },
  },
  plugins: [],
};
