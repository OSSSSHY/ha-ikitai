import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ハイキタイ カスタムカラー */
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
          foreground: "hsl(var(--accent-foreground))",
        },
        "ha-bg": "var(--color-bg)",
        "ha-bg-subtle": "var(--color-bg-subtle)",
        "ha-bg-dark": "var(--color-bg-dark)",
        "ha-bg-dark-subtle": "var(--color-bg-dark-subtle)",
        "ha-text": "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "ha-border": "var(--color-border)",
        "status-open": "var(--color-open)",
        "status-closed": "var(--color-closed)",
        /* shadcn/ui 互換 */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        heading: ['"Noto Sans JP"', "sans-serif"],
        body: ['"Noto Sans JP"', "sans-serif"],
        number: ['"Noto Sans JP"', "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
