module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'energy-green': '#4ade80',
        'power-blue': '#60a5fa',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}