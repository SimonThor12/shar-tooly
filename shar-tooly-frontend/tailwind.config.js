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
          primary: "#001f3f",
          secondary: "#F7D65A",
          accent: "#001f3f",
          neutral: "#3d4451",
          "neutral-focus": "#2d3748",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
