import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      "https://web-tech-chatbot.vercel.app/",
      "metrological-leana-fleecily.ngrok-free.dev"
    ],
    proxy: {
      "/api": {
        target: "https://web-tech-chatbot.onrender.com",
        changeOrigin: true,
      },
    },
  },
});