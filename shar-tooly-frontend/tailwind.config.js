import { textChangeRangeIsUnchanged } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        shartooly: {
          font: "#000000",
          primary: "#001f3f",
          secondary: "#000000",
          accent: "#001f3f",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          background: "#F7D65A",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
