/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    
    extend: {
      backgroundImage: {
        'flag-canada': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5GTNGSRXj8xrnMGZbnc1EWa-hYdxW5MEojQ&usqp=CAU')",
      },colors:{
        'canada':"#D80621"
      },
    },
  },
 
  plugins: [require("daisyui")],
}
