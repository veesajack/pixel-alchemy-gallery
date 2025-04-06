
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
        // Update primary colors to green and black gradient palette
        ai: {
          primary: '#1B5E20',     // Dark green
          secondary: '#081C15',   // Almost black green
          accent: '#2E7D32',      // Slightly lighter green
          dark: '#040D0A',        // Deep almost black
          light: '#E8F5E9'        // Very light green
        }
      },
      backgroundImage: {
        // Add green and black gradients
        'primary-gradient': 'linear-gradient(135deg, #1B5E20 0%, #081C15 100%)',
        'accent-gradient': 'linear-gradient(90deg, #2E7D32 0%, #040D0A 100%)',
        'hero-gradient': 'linear-gradient(to right, #1B5E20 0%, #081C15 100%)'
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 
            backgroundPosition: '0% 50%'
          },
          '50%': { 
            backgroundPosition: '100% 50%'
          }
        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 10s ease infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
