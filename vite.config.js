import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://moji.aniqa.dev',
  server: {
    port: 5000,
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['sparkles.svg'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moji Canvas',
        short_name: 'Moji Canvas',
        description: 'Interactive emoji-based sticker canvas',
        theme_color: '#ffffff',
        background_color: '#ffefef',
        display: 'standalone',
        icons: [
          {
            src: '/sparkles-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/sparkles-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
