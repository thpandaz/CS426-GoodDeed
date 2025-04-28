import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      // only parse your root/web tsconfig, not every tsconfig in the monorepo:
      projects: [path.resolve(__dirname, '../../tsconfig.json')],
      // swallow parse‐errors in other configs (e.g. your native app)
      ignoreConfigErrors: true,
    }),
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../../packages/ui-web/src'),
    },
  },
  server: {
    port: 8000,
    fs: { allow: [process.cwd(), path.resolve(process.cwd(), 'packages')] },
  },
});
