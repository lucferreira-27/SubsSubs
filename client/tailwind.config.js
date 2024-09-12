/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        secondary: '#2d4059',
        accent: '#ff5722',
        light: '#eeeeee',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
    },
  },
}
