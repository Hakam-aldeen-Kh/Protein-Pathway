import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  // Configure public assets directory to ensure enzymes.json.gz is properly served
  publicDir: "public",
  // Ensure .gz files are properly served with the correct MIME type
  server: {
    fs: {
      // Allow serving files from one level up (project root)
      allow: [".."],
    },
  },
  build: {
    // Copy enzymes.json.gz to the dist directory during build
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
  // Configure assets that should be included without being imported
  assetsInclude: ["**/*.gz"],
});
