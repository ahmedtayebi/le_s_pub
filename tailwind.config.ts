import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['"Cairo"', "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#F0C040",
          dark: "#A8832A",
        },
        charcoal: {
          DEFAULT: "#1C1C1C",
          deep: "#111111",
        },
        glass: "rgba(255,255,255,0.04)",
      },
      borderRadius: {
        card: "24px",
        hero: "48px",
        form: "30px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.07)",
        hover: "0 12px 40px rgba(0,0,0,0.18)",
        gold: "0 0 30px rgba(201,168,76,0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
