import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        f1: {
          red: "#E10600",
          redDark: "#9E0000",
          redBright: "#FF1801",
          asphalt: "#050608",
          cockpit: "#0B0E14",
          carbon: "#121620",
          border: "#1E2638",
          purple: "#9333EA",
          sectorYellow: "#FBBF24",
          sectorGreen: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-titillium)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        f1: ["var(--font-titillium)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "grid-scroll": "grid-scroll 20s linear infinite",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        shine: "shine 3s ease-in-out infinite",
        "spin-slow": "spin 50s linear infinite",
        "spin-reverse-slow": "spin-reverse 38s linear infinite",
        "laser-scan": "laser-scan 7s ease-in-out infinite",
        "aero-drift": "aero-drift 14s linear infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "grid-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(60px)" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "laser-scan": {
          "0%, 100%": { transform: "translateY(-5vh)", opacity: "0" },
          "20%, 80%": { opacity: "0.5" },
          "50%": { transform: "translateY(105vh)", opacity: "0.8" },
        },
        "aero-drift": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(250%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.6" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shine: {
          "0%": { "background-position": "0% 0%" },
          "50%": { "background-position": "100% 100%" },
          to: { "background-position": "0% 0%" },
        },
      },
      backgroundImage: {
        "carbon-grid":
          "radial-gradient(#18202F 15%, transparent 16%), radial-gradient(#18202F 15%, transparent 16%)",
        "kerb-pattern":
          "repeating-linear-gradient(45deg, #E10600, #E10600 10px, #FFFFFF 10px, #FFFFFF 20px)",
      },
    },
  },
  plugins: [],
};
export default config;
