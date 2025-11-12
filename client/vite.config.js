import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "3f527d40-b49e-4cc8-94f4-994e247f2842-00-24yksle1zyhdd.sisko.replit.dev",
    ],
  },
});
