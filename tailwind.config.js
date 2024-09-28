/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(98,76,245)',
        accent: 'rgb(50,192,239)',
        secondary: 'black'
      },
      fontFamily: {
        poppins: ['Poppins' ,'sans-sarif'],
        grostek: ['Space Grotesk', 'sans-sarif'],
        dmsans: ['DM Sans', 'sans-sarif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}