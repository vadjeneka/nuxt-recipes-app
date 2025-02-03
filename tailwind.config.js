/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      "dodgeroll-gold": "#F79F1A",
      "apple-green": "#046E1B",
      "dire-wolf": "#292727"
    },


    container: {
      center: true,
      padding: "2rem",
    }
  },
  plugins: [],
}

