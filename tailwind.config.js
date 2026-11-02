/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Blended FCINQ + HAUS Palette
        fcinq: {
          magenta: '#D83F87',
          pink: '#D83F87',
          violet: '#2A1B3D',
          indigo: '#44318D',
          lavender: '#8D69A6',
          mist: '#A4B3B6',
          card: '#221434',
          surface: '#321e4a',
        },
        haus: {
          slate: '#2F4454',
          plum: '#2E151B',
          sienna: '#2E151B',
          rose: '#DA7B93',
          teal: '#376E6F',
          pine: '#1C3334',
          card: '#162829',
          surface: '#233d3f',
        },
        brand: {
          magenta: '#D83F87',
          indigo: '#44318D',
          lavender: '#8D69A6',
          mist: '#A4B3B6',
          rose: '#DA7B93',
          teal: '#376E6F',
          slate: '#2F4454',
          plum: '#2E151B',
          pine: '#1C3334',
          void: '#130c1c',
          deep: '#1e1429',
          card: '#251933',
        }
      }
    },
  },
  plugins: [],
}
