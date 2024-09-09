/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Inter-var', 'lyon-text'],
      },
      scale: {
        '110': '1.10',  // Adds a scale of 110%
        '125': '1.25',  // Adds a scale of 125%
        '150': '1.50',  // Adds a scale of 150%
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }), // Optional adjustment
  ],
  variants: {
    scrollbar: ['rounded'], // Optional: for rounded scrollbars
  },
}
