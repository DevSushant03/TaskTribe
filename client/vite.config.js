import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from 'vite-plugin-pwa' // Import the plugin

// Define your PWA manifest data
const manifestForPlugin = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
  manifest: {
    name: 'TaskTribe',
    short_name: 'TaskTribe',
    description: 'Tasktribe is collabrative platform that help student or freelancer to share , help and solve task',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      // You should include a maskable icon
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },
};
export default defineConfig({
  plugins: [react(), tailwindcss(),VitePWA(manifestForPlugin)],
  server: {
    historyApiFallback: true,
  },
});

