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
        'accent-light': '#ff7a50',
        light: '#eeeeee',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in-scale': 'fadeInScale 0.2s ease-out',
        'fade-out-scale': 'fadeOutScale 0.2s ease-in',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOutScale: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundImage: ['hover', 'focus'],
      scale: ['group-hover'],
      opacity: ['group-hover'],
    },
  },
}
