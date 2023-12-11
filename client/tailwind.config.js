/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: { main: ["Poppins", "sans-serif"] },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "#EE3131",
      },
      colors: {
        main: "#EE3131",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        6: "6 6 0%",
        7: "7 7 0%",
        8: "8 8 0%",
      },
      animation: {
        "slide-top": "slide-top 0.25s ease-out both",
        "slide-bottom": "slide-bottom 0.25s ease-out both",
        "scale-up-center": "scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px)",
            transform: "translateY(40px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
        "scale-up-center": {
          "0%": {
            "-webkit-transform": "scale(0.5)",
            transform: "scale(0.5)",
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
        },

        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(-1000px)",
            transform: "translateY(-1000px)",
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
