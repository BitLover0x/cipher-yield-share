import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          muted: "hsl(var(--secondary-muted))",
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
          muted: "hsl(var(--accent-muted))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        profit: {
          DEFAULT: "hsl(var(--profit-green))",
          dark: "hsl(var(--profit-green-dark))",
        },
        encryption: {
          DEFAULT: "hsl(var(--encryption-purple))",
          dark: "hsl(var(--encryption-purple-dark))",
        },
        tech: {
          DEFAULT: "hsl(var(--tech-blue))",
          dark: "hsl(var(--tech-blue-dark))",
        },
        gold: "hsl(var(--gold))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        'gradient-profit': 'var(--gradient-profit)',
        'gradient-encryption': 'var(--gradient-encryption)',
        'gradient-tech': 'var(--gradient-tech)',
        'gradient-glass': 'var(--gradient-glass)',
      },
      boxShadow: {
        'profit': 'var(--shadow-profit)',
        'encryption': 'var(--shadow-encryption)',
        'glass': 'var(--shadow-glass)',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "encrypt-sweep": {
          "0%, 100%": { backgroundPosition: "-200% 0" },
          "50%": { backgroundPosition: "200% 0" },
        },
        "decrypt-reveal": {
          "0%, 70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "coin-split": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px) rotate(-5deg)" },
          "75%": { transform: "translateX(10px) rotate(5deg)" },
        },
        "pulse-profit": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(var(--profit-green) / 0.3)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--profit-green) / 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "encrypt-sweep": "encrypt-sweep 2s ease-in-out infinite",
        "decrypt-reveal": "decrypt-reveal 3s ease-in-out infinite",
        "coin-split": "coin-split 3s ease-in-out infinite",
        "pulse-profit": "pulse-profit 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
