module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: '#14A3C7',
        'primary-dark': '#1186A3', // optional, for hover
      },
    },
  },
  plugins: [],
};
