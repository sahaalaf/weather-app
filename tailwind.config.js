/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-white': '0 0 8px 2px rgba(255, 255, 255, 0.2)',
        'custom-green': '0 0 8px 2px rgba(0, 255, 0, 0.2)',  
        'custom-blue': '0 0 8px 2px rgba(0, 0, 255, 0.4)',    
        'custom-purple': '0 0 8px 2px rgba(128, 0, 128, 0.2)',
      },
    },
  },
  plugins: [],
}
