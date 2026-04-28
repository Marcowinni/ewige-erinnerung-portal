import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import os from "node:os";
import { componentTagger } from "lovable-tagger";

// Cache außerhalb von OneDrive (vermeidet EPERM beim Löschen von node_modules/.vite unter Windows)
const viteCacheDir = path.join(os.tmpdir(), "vite-cache-ewige-erinnerung-portal");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  cacheDir: viteCacheDir,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
