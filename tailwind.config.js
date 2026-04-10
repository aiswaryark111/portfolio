/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: {
          DEFAULT: "#2DD4BF",
          dark: "#0F766E",
          light: "#5EEAD4",
          glow: "rgba(45,212,191,0.15)",
        },
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#111111",
          100: "#1A1A1A",
          250: "#858383",
          200: "#242424",
          300: "#2E2E2E",
        },
        parchment: {
          DEFAULT: "#F0EDE8",
          muted: "#9CA3AF",
          dim: "#6B7280",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Georgia", "serif"],
        mono: ["DM Mono", "Courier New", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scan: "scan 3s linear infinite",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      backgroundImage: {
        "grid-pattern": `linear-gradient(rgba(45,212,191,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(45,212,191,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grid: "60px 60px",
      },
    },
  },
  plugins: [],
};
