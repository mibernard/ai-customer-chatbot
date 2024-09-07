/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}', // Add this line for the new app directory
    './src/components/**/*.{js,ts,jsx,tsx}', // If you use a components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
