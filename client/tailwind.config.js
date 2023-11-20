/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: { main: ['Poppins', 'sans-serif'] },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#EE3131'
      },
      colors: {
        main: '#EE3131'
      },
      flex: {
        "2": '2 2 0%',
        "3": '3 3 0%',
        "4": '4 4 0%',
        "5": '5 5 0%',
      },
      animation: {
        "slide-top": "slide-top 0.25s ease-out both",
        "slide-bottom": "slide-bottom 0.25s ease-out both"
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(40px)",
            transform: "translateY(40px)"
          },
          "100%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)"
          }

        },
        "slide-bottom": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)"
          },
          "100%": {
            "-webkit-transform": "translateY(40px)",
            transform: "translateY(40px)"
          }

        },

      }
    },
  },
  plugins: [],
}