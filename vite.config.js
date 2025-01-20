import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://moji.aniqa.dev',
  server: {
    port: 3000,
    host: true,
  },
  plugins: [
    react(),
    VitePWA({
      includeAssets: ['sparkles.svg'],
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: [`stickers/**/*.svg`],
        runtimeCaching: [
          {
            urlPattern: /\/stickers\/.*\.svg$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'stickers',
              expiration: {
                maxAgeSeconds: 7 * 24 * 60 * 60,
              }
            }
          }
        ]
      },
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
