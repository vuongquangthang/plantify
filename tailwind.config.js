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
          DEFAULT: '#28643E',
          dark: '#193D2A',
          light: '#6F956E',
        },
        sage: '#EAF2E7',
        cream: '#FAF9F4',
        beige: '#E8DFCF',
        'text-main': '#26352B',
        'text-secondary': '#788278',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
