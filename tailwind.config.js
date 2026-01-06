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
          DEFAULT: '#823C72', // User specified
          hover: '#6a315d',
          foreground: '#ffffff',
        },
        text: {
          primary: '#1A1B1B', // User specified
          secondary: '#424344', // User specified
          tertiary: '#58595B', // User specified
          link: '#823C72', // User specified
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
