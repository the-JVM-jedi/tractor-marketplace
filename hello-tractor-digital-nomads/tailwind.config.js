import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: "var(--font-manrope)",
        merriweather: "var(--font-merriweather)",
        avenir: "var(--font-avenir)"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        hibiscus: "hsl(var(--hibiscus))"
      },
      borderRadius: {
        'lg': "var(--radius)"
      }
    },
  },
  plugins: [],
} satisfies Config;
