import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/**
 * Sistema visual da Climeq.
 * As famílias `verde` e `azul` foram amostradas diretamente dos pixels do logo
 * institucional (anel verde #1C8255 / #086848, cruz azul #0454B1 / #0A70CC).
 */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        verde: {
          50: "#F0FAF5",
          100: "#DCF3E7",
          200: "#B4E5CC",
          300: "#7FCFA6",
          400: "#4CB683",
          500: "#2A9A63",
          600: "#1C8255",
          700: "#0F6A45",
          800: "#0A5235",
          900: "#073623",
          950: "#042317",
        },
        azul: {
          50: "#EFF6FE",
          100: "#DCEAFB",
          200: "#BBD7F6",
          300: "#7FB7EC",
          400: "#3A90DE",
          500: "#0A70CC",
          600: "#0454B1",
          700: "#0848A8",
          800: "#063F8E",
          900: "#052F6B",
        },
        pedra: {
          50: "#F6F9F7",
          100: "#ECF1EE",
          200: "#DDE5E1",
          300: "#C4D0CB",
          400: "#8A9893",
          500: "#647570",
          600: "#4A5A54",
          700: "#3A4A43",
          800: "#22302A",
          900: "#0C1A14",
        },
        tinta: "#0C1A14",
        papel: "#FBFCFB",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        sm: "0.5rem",
        DEFAULT: "0.75rem",
        md: "0.875rem",
        lg: "1.125rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.75rem",
      },
      boxShadow: {
        suave: "0 1px 2px rgba(12,26,20,.04), 0 2px 8px rgba(12,26,20,.04)",
        card: "0 1px 2px rgba(12,26,20,.05), 0 8px 24px -12px rgba(12,26,20,.14)",
        alta: "0 2px 4px rgba(12,26,20,.05), 0 18px 44px -18px rgba(12,26,20,.26)",
        anel: "0 0 0 1px rgba(28,130,85,.14)",
      },
      transitionTimingFunction: {
        suave: "cubic-bezier(.22,.61,.36,1)",
      },
      keyframes: {
        "surgir": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
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
        surgir: "surgir .7s cubic-bezier(.22,.61,.36,1) both",
        "accordion-down": "accordion-down .24s ease-out",
        "accordion-up": "accordion-up .24s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
