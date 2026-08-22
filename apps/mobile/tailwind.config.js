const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.join(__dirname, "./App.{js,jsx,ts,tsx}"),
    path.join(__dirname, "./app/**/*.{js,jsx,ts,tsx}"),
    path.join(__dirname, "./components/**/*.{js,jsx,ts,tsx}"),
    path.join(__dirname, "./src/**/*.{js,jsx,ts,tsx}"),
    path.join(__dirname, "../../packages/shared/**/*.{js,jsx,ts,tsx}"),
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--font-sans)",
        din: "var(--font-sans)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "bg-dark": "#131f24",
        "card-dark": "#131f24",
        "card-hover": "#202f36",
        "card-border": "#37464f",
        "slate-dark": "#37464f",
        "brand-blue": "#1cb0f6",
        "brand-green": "#58cc02",
        "brand-yellow": "#ffc800",
        "brand-purple": "#ce82ff",
        "brand-red": "#ff4b4b",
        // Variables from apps/shared/styles.css
        "sea-ink": "#173a40",
        "sea-ink-soft": "#416166",
        lagoon: "#4fb8b2",
        "lagoon-deep": "#328f97",
        palm: "#2f6a4a",
        sand: "#e7f0e8",
        foam: "#f3faf5",
        "bg-base": "#e7f3ec",
      },
    },
  },
  plugins: [],
};
