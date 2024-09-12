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
      animation: {
        'card-appear': 'card-appear 0.3s ease-out forwards',
      },
      keyframes: {
        'card-appear': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
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
