/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "Fira Code", "monospace"],
        display: ['"Space Grotesk"', "sans-serif"],
      },
      colors: {
        brand: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#52e8ff",
          300: "#86efac",
          400: "#52e8ff",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      keyframes: {
        "typing-dot": {
          "0%, 80%, 100%": { opacity: 0, transform: "scale(0.8)" },
          "40%": { opacity: 1, transform: "scale(1)" },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulse2: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "typing-1": "typing-dot 1.2s infinite 0s",
        "typing-2": "typing-dot 1.2s infinite 0.2s",
        "typing-3": "typing-dot 1.2s infinite 0.4s",
        "fade-in-up": "fade-in-up 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
