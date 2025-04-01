import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
import themeValues from "@repo/assets";

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  prefix: "ui-",
  presets: [sharedConfig],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: themeValues,
      borderRadius: {
        lg: "1rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
