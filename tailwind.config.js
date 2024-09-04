/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter-var','lyon-text'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}