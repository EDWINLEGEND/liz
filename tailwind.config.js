/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hogwarts-black': '#000000',
        'hogwarts-gold': '#D4AF37',
        'hogwarts-red': '#740001',
        'hogwarts-green': '#1A472A',
        'hogwarts-blue': '#0E1A40',
        'hogwarts-yellow': '#FFD800',
      },
      fontFamily: {
        'harry-potter': ['"Harry Potter"', 'serif'],
        'serif': ['Georgia', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
}