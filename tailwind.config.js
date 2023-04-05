/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      Poppins: "Poppins",
      Montserrat: "Montserrat",
      Inter: "Inter",
      Roboto: "Roboto",
      Manrope: "Manrope",
    },
    extend: {
      colors: {
        brightRed: "#FC0B0D",
        lightBlue: "#4A99D3",
        blueIshGray: "#EAF6FF",
        grayIsh: "#E6E6E6",
        darkIshGray: "#8D8D8D",
        brightIshBlue: "#3EC1F3",
        lightIshGray: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
