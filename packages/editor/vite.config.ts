import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react-dom", "@darkwrite/ui", "lucide-react"]
    },
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
    }
  }
})
