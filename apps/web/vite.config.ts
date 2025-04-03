import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";


export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
    {
      find: "@ui",
      replacement: path.resolve(__dirname, "../../packages/ui-web/src"),
    },
  ],
    
  },
  // optimizeDeps: {
  //   include: ['@assets'],
  // },

  server: {
    port: 8000,
    fs: {
      // Update the allow list to include the project root and the web app folder
      allow: [
        // Project root to allow access to all files in the monorepo
        path.resolve(__dirname, '../..'), 
        // Specific paths for clarity
        path.resolve(__dirname, '../../packages/assets'),
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, '../../packages'),
      ],
    },
  },
});