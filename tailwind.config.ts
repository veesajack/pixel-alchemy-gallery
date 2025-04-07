
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        ai: {
          primary: '#1B5E20',     // Dark green
          secondary: '#081C15',   // Almost black green
          accent: '#2E7D32',      // Slightly lighter green
          dark: '#040D0A',        // Deep almost black
          light: '#E8F5E9'        // Very light green
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--border))",
        ring: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        }
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #1B5E20 0%, #081C15 100%)',
        'accent-gradient': 'linear-gradient(90deg, #2E7D32 0%, #040D0A 100%)',
        'hero-gradient': 'radial-gradient(circle at 30% 30%, #2E7D32 0%, #040D0A 80%)',
        'card-gradient': 'linear-gradient(180deg, rgba(46, 125, 50, 0.1) 0%, rgba(4, 13, 10, 0.2) 100%)'
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%'
          },
          '50%': { 
            backgroundPosition: '100% 50%'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        'pulse-slow': {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0.7'
          }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 10s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
          },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
