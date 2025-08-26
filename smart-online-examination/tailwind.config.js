/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',   // custom smaller breakpoint
      'sm': '640px',   // overwrite default sm
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1800px', // add a bigger breakpoint
    },
  },
  plugins: [],
}

