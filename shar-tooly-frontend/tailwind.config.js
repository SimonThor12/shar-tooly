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
          secondary: "#000000",
          accent: "#001f3f",
          background: "#F7D65A",
        },
      },
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
