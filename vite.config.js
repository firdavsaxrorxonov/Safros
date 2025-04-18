import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Safros Hisobot',
      short_name: 'Safros',
      description: 'Hisobotlar tizimi',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'icons/logo.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/logo.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
})
