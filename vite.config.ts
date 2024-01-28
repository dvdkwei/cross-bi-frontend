import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import manifestObject from './statics/manifest.json';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const shouldSelfDestroy = process.env.VITE_SELF_DESTROYING;

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        manifest: manifestObject,
        registerType: 'autoUpdate',
        strategies: 'injectManifest',
        srcDir: '.',
        filename: 'sw.js',
        injectRegister: null,
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}']
        },
        devOptions: {
          navigateFallbackAllowlist: [/^index.html$/],
          enabled: true,
          type: 'module',
        },
        selfDestroying: shouldSelfDestroy == 'true'
      }),
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
