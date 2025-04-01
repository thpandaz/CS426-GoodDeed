// theme.js
// This file combines fixed hex color values with references to CSS variables.
const theme = {
    // Colors using CSS variables for dynamic parts:
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",
  
    // Base colors
    background: "#fcfbf7", // soft off-white, better on eyes
    foreground: "#1e3a3a", // deeper but still friendly dark teal
  
    primary: {
      DEFAULT: "#ffc94a", // uplifting golden yellow
      foreground: "hsl(var(--primary-foreground))",
      50: "#fff9e9",
      100: "#fff1cc",
      200: "#ffe199",
      300: "#ffd166",
      400: "#ffc94a",
      500: "#f4b631",
      600: "#d19d2a",
      700: "#af8423",
      800: "#8d6b1c",
      900: "#6b5115",
      950: "#4a370e",
    },
  
    secondary: {
      DEFAULT: "#f86642", // a warm coral tone
      foreground: "hsl(var(--secondary-foreground))",
      50: "#ffebe6",
      100: "#ffd4cc",
      200: "#ffa999",
      300: "#ff7f66",
      400: "#f86642",
      500: "#d9502d",
      600: "#b93f23",
      700: "#99301b",
      800: "#7a2314",
      900: "#5b160e",
      950: "#3d0a07",
    },
  
    accent: {
      DEFAULT: "#2db67c", // bright green-teal = growth + trust
      foreground: "hsl(var(--accent-foreground))",
      50: "#e6f9f1",
      100: "#ccf3e3",
      200: "#99e6c6",
      300: "#66d9aa",
      400: "#2db67c",
      500: "#259c6a",
      600: "#1d8257",
      700: "#166844",
      800: "#0e4e32",
      900: "#07341f",
      950: "#032110",
    },
  
    neutral: {
      DEFAULT: "#f5f5f4",
      foreground: "#333333",
    },
  
    text: "#1e3a3a",
  
    destructive: {
      DEFAULT: "#e11d48",
      foreground: "hsl(var(--destructive-foreground))",
    },
  
    muted: {
      DEFAULT: "#f2f2f2",
      foreground: "hsl(var(--muted-foreground))",
    },
  
    popover: {
      DEFAULT: "hsl(var(--popover))",
      foreground: "hsl(var(--popover-foreground))",
    },
  
    card: {
      DEFAULT: "hsl(var(--card))",
      foreground: "hsl(var(--card-foreground))",
    },
  };
  
  module.exports = theme;
  