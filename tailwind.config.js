/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#bc88fc",
        "primary-hover": "#a66ef5",
        secondary: "#00e5ff",
        "background-light": "#f7f5f8",
        "background-dark": "#180f23",
        surface: "#251a30",
        "surface-dark": "#231b2e",
        "surface-light": "#ffffff",
        "surface-highlight": "#322342",
        "border-color": "#463a55"
      },
      fontFamily: {
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      boxShadow: {
        neon: "0 0 10px rgba(188, 136, 252, 0.3)",
        "neon-cyan": "0 0 10px rgba(0, 229, 255, 0.3)"
      }
    }
  },
  plugins: []
};
