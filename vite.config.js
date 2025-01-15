import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://moji.aniqa.dev',
  server: {
    port: 5000,
  },
  plugins: [react()],
});
