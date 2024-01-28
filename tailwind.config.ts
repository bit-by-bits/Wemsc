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
        "link-active": "#0066F5",
        "main-bg": "#18191B",
        "menu-bg": "#101011",
        "primary-text": "#999CA3",
        "secondary-text": "#53555B",
      },
    },
  },
  plugins: [],
};
export default config;
