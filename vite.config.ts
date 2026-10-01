import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssMinify: true,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three',
              test: /[\/]node_modules[\/](three|@react-three[\/](fiber|drei))[\/]/,
              priority: 3,
            },
            {
              name: 'motion',
              test: /[\/]node_modules[\/](framer-motion|gsap)[\/]/,
              priority: 2,
            },
            {
              name: 'vendor',
              test: /[\/]node_modules[\/](react|react-dom|react-router|react-router-dom|scheduler)[\/]/,
              priority: 1,
            },
          ],
        },
      },
    },
  },
});
