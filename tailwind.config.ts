import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "4.5": "1.125rem",
      },
      colors: {
        dark: {
          bg: "#131F24",
          card: "#1B2A32",
          subtle: "#18252C",
          border: "#263842",
          borderSubtle: "#1F313B",
          muted: "#94A3B8",
          text: "#F1F5F9",
        },
        soft: {
          canvas: "#F8F9FA",
          surface: "#FFFFFF",
          border: "#EAECEF",
          sage: "#52B788",
          "sage-dark": "#40986E",
          "sage-light": "#EBF6F0",
          lavender: "#7E8CE0",
          "lavender-dark": "#6573C7",
          "lavender-light": "#EEF0FB",
          terracotta: "#E07A5F",
          "terracotta-dark": "#C9654B",
          "terracotta-light": "#FDF1EE",
          honey: "#F4A261",
          "honey-dark": "#DC8B4B",
          "honey-light": "#FEF5ED",
          text: "#2D3748",
          muted: "#718096",
        },
      },
      borderRadius: {
        card: "20px",
        button: "14px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(0, 0, 0, 0.04)",
        "soft-hover": "0 8px 24px -4px rgba(0, 0, 0, 0.06)",
        "btn-sage": "0 4px 0 #40986E",
        "btn-lavender": "0 4px 0 #6573C7",
        "btn-honey": "0 4px 0 #DC8B4B",
        "btn-terracotta": "0 4px 0 #C9654B",
        "btn-surface": "0 3px 0 #D8DCE2",
      },
      fontFamily: {
        sans: [
          "Lack",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          '"Open Sans"',
          '"Helvetica Neue"',
          "sans-serif",
        ],
        numbers: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
