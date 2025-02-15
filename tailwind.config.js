/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        jaldi: ['Jaldi-Regular', 'sans-serif'],
        "jaldi-bold": ['Jaldi-Bold', 'sans-serif']
      },
      colors:{
        "primary":{
          100: "7B85BC",
          200: "283370"
        },
        "secondary":{
          100:"FFFFFF",
          200:"EAEAEA"
        }
      }
    },
  },
  plugins: [],
}