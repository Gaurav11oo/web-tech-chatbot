import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,

    // ✅ only domain names (no https)
    allowedHosts: [
      "web-tech-chatbot.onrender.com",
      "web-tech-chatbot.vercel.app",
      "metrological-leana-fleecily.ngrok-free.dev",
    ],

    // ✅ ONLY for local development
    proxy: {
      "/api": {
        target: "https://web-tech-chatbot.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});