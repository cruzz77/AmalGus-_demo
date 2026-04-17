/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A1040",
        accent: "#00C9A7",
        surface: "#05050c",
        highlight: "#7B6FF0",
        glass: "rgba(255, 255, 255, 0.08)",
        "text-primary": "#F0F0FF",
        "text-muted": "#8884A8",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        glass: '12px',
      }
    },
  },
  plugins: [],
}
