import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "link-active": "#0066F5",
        "main-bg": "#18191B",
        "menu-bg": "#101011",
        "primary-text": "#999CA3",
        "secondary-text": "#53555B",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
