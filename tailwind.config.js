/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#823C72',
          hover: '#6a315d',
          foreground: '#ffffff',
        },
        text: {
          primary: '#1A1B1B',
          secondary: '#424344',
          tertiary: '#58595B',
          link: '#823C72',
        },
        background: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}