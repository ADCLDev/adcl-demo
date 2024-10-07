import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
      transitionDuration: {
        'default': '300ms', // Example default transition duration, adjust if needed
      },
      
      spacing: {
        '3rem': '3rem',
        '1.5rem': '1.5rem',
        '0.5rem': '0.5rem',
      },
      gridTemplateColumns: {
        'projects': 'repeat(auto-fill, minmax(20rem, 1fr))',
      },
    },
    
  },
  plugins: [],
};
export default config;
