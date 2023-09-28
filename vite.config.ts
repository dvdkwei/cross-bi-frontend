import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      devOptions: {
        enabled: true,
      },
      selfDestroying: true,
      injectRegister: 'script',
      manifest: {
        "name": "Cross BI",
        "short_name": "Cross BI",
        "id": "/",
        "icons": [
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": " any maskable"
          }
        ],
        "theme_color": "#fff",
        "background_color": "#fff",
        "display": "standalone",
        "start_url": "/"
      }
    })
  ], 
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        tailwindcss()
      ]
    }
  }
})
