import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#FAF7F2",
          200: "#F3EEE6",
          300: "#E9E2D7",
          400: "#DCD3C5",
          500: "#CBBFAD",
        },
        herb: {
          50: "#F2F6F3",
          100: "#E1ECE5",
          200: "#C2D8CB",
          500: "#2B533F",
          600: "#203E2F",
          700: "#172E23",
          800: "#0F1F17",
        },
        terracotta: {
          50: "#FDF6F3",
          100: "#FAECE5",
          200: "#F4D4C6",
          500: "#C85A32",
          600: "#AC4A27",
          700: "#8A381C",
        },
        charcoal: {
          50: "#F7F6F5",
          100: "#EAE8E6",
          300: "#A29D97",
          500: "#635E59",
          700: "#36322F",
          900: "#1A1816",
        },
        amber: {
          500: "#E29D38",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
      },
      boxShadow: {
        editorial: "0 8px 30px rgba(26, 24, 22, 0.04)",
        card: "0 2px 8px rgba(26, 24, 22, 0.03)",
        "card-hover": "0 12px 28px rgba(26, 24, 22, 0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
