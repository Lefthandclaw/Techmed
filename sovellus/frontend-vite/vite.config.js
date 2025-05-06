import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/pages/index.html'),
        home: resolve(__dirname, 'src/pages/home.html'),
        hrv: resolve(__dirname, 'src/pages/hrv.html'),
        harjoitukset: resolve(__dirname, 'src/pages/harjoitukset.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
});