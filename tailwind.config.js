/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:{
        myBlack:'#1D1D1F',
        inputBoxBlack:'#222222',
        lightGreen:"#93E14A",
        darkGreen:"#517B29",
        myBlue:"#4318FF",
        bgColor:"#F4F7FE",
        homePageGreen:"#D7FFB1",
      },
      padding:{
        '68p':'280px'
      }
    },
  },
  plugins: [require('flowbite/plugin')
  ],
}

