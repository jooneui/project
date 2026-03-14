import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#161616",
        mist: "#f3f1eb",
        sand: "#e8e2d6",
        accent: "#7c5c3b"
      },
      boxShadow: {
        card: "0 18px 40px rgba(26, 26, 26, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};

export default config;
