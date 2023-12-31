/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      sm: "0.8rem",
      ssm: "0.75rem",
      sbase: "0.90rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    colors: {
      "icon-avatar": "#E6EAF5",
      "text-color": "#252C58",
      "main-bg": "#F1F2F6",
      "progress-color": "#43900C",
      "progress-bg": "#97CE71",
      "regress-color": "#900C0C",
      "regress-bg": "#CE7171",
      "halt-bg": "#CCDDFA",
      "halt-color": "#0054E8",
      // 'tahiti': {
      //   100: '#cffafe',
      //   200: '#a5f3fc',
      //   300: '#67e8f9',
      //   400: '#22d3ee',
      //   500: '#06b6d4',
      //   600: '#0891b2',
      //   700: '#0e7490',
      //   800: '#155e75',
      //   900: '#164e63',
      // },
    },

    extend: {},
  },
  plugins: [],
};
