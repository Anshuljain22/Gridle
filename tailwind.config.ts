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
