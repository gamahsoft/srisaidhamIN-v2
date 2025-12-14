import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // "/api": "http://localhost:5000",
      "/api": "https://srisaidhamin-v2.onrender.com",
    },
    // build: {
    //   chunkSizeWarningLimit: 450, // Set your desired limit in KB (e.g., 1000 for 1MB)
    // },
  },
  // added below lines to fix render error
  optimizeDeps: {
    include: ["react", "@iconify/react"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
