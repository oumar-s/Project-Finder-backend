/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#121063',
        'black1': '#24292f',
        'white1': '#f6f8fa',
        'blue1' : '#1571e3',
        
      },
      fontFamily: {
        'mono-sans': ['Mona Sans', 'Mona Sans Header Fallback', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Helvetica', 'Arial', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"],
      }
    },
  },
  plugins: [],
}

