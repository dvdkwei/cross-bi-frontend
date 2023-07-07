import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      selfDestroying: true,
      injectRegister: 'auto',
      manifest: {
        "name": "Cross BI",
        "short_name": "Cross BI",
        "id": "/",
        "icons": [
          {
            "src": "./android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
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
      ]
    }
  }
})
