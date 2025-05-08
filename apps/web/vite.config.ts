import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({

  root: __dirname,

  envDir: __dirname,

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
    dedupe: [
      'react',
      'react-dom',
      '@clerk/clerk-react',
      'react-router-dom',
    ],
  },
  optimizeDeps: {
    include: [
      '@clerk/clerk-react',
      'react-router-dom',
      'lucide-react',
      // any other shared workspace packages
    ],
  },
  server: {
    port: 8000,
    fs: { 
      allow: [
      // Current directory
      process.cwd(),
      // Root of monorepo
      path.resolve(__dirname, '../..'),
      // Explicit packages directory
      path.resolve(__dirname, '../../packages')
    ] 
   },
    allowedHosts: ['all', '0cda-128-119-202-12.ngrok-free.app'],
  },
  build: {
    sourcemap: true,
  },
});
