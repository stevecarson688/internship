/** @type {import('tailwindcss').Config} */

const { blue } = require('@mui/material/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
        sml: "500px",
        xs: "320px",
        sm: "375px",
        mdl: "768px",
        md: "667px",
      },
      fontFamily: {
        titleFont: 'Roboto',
        bodyFont: 'Poppins'

      },
      colors:{
        amazon_gray: "  rgb(33, 32, 34)",
        amazon_white:  "rgb(236, 238, 239)",
        amazon_blue: " rgb(22, 22, 184)",
        amazon_bl: " rgb(12, 118, 199)",
        amazon_light: "#232f3t",
        amazon_yellow: "#febd69",
        whiteText: "#ffffff",
        lightText: "#ccc",
        quantity_box:"#F0F2F2",
        footerBottom: " rgb(7, 7, 7)",
        

      },
      boxShadow:{
        testShadow: "0px 0px 32px 1px rgba(199,199,199,1)",
        amazonInput: "0 0 3px 2px rgb(228 121 17 /50%)",

      },
    },
  },
  plugins: [],
}

