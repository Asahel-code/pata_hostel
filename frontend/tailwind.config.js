/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_color: "#05A3FF",
        primary_color_light: "#E2F4FE",
        secondary_color: "#4FA154",
        primary_red: "#FA0F0F",
        primary_green: "#05F77A",
        primary_yellow: "#FFA100",
        primary_blue: "#00AEFF",
        primary_red_light: "#FFBFBF",
        primary_green_light: "#BBFCD4",
        primary_yellow_light: "#FAFFC2",
        primary_blue_light: "#C2DCFF",
      },
    },
  },
  plugins: [],
}

