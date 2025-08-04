import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    build: {
      chunkSizeWarningLimit: 450, // Set your desired limit in KB (e.g., 1000 for 1MB)
    },
  },
});
