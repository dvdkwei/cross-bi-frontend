import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const shouldSelfDestroy = process.env.VITE_SELF_DESTROYING;
  const devMode = process.env.VITE_DEV_MODE == 'true';

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        devOptions: {
          navigateFallbackAllowlist: [/^index.html$/],
          enabled: true,
          type: 'module',
        },
        selfDestroying: shouldSelfDestroy == 'true',
        injectRegister: 'script',
        srcDir: '.',
        filename: devMode ? 'sw.js' : 'sw-prod.js',
        manifest: {
          name: "Cross BI",
          short_name: "Cross BI",
          description: 'Your Cross Plattform Business Intelligence App',
          id: "/",
          icons: [
            {
              "src": "pwa-192x192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "pwa-192x192.png",
              "sizes": "192x192",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "pwa-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "maskable"
            },
            {
              "src": "pwa-512x512.png",
              "sizes": "512x512",
              "type": "any maskable",
              "purpose": "any"
            }
          ],
          screenshots: [
            {
              "src": "/sc-portrait.png",
              "sizes": "778x1684",
              "type": "image/png",
            },
          ],
          theme_color: "#fff",
          background_color: "#fff",
          display: "standalone",
          start_url: "/",
          related_applications: [{
            platform: "webapp",
            url: "https://app.crossbi.de/manifest.json",
          }],
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
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    }
  });
}
