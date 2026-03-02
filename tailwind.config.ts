import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#ece7e1",
        ink: "#171717",
        muted: "#6f6f6f",
        accent: "#f46d34",
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        card: "1.6rem",
      },
    },
  },
  plugins: [],
};

export default config;
