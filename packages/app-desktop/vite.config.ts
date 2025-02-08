import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import electron from "vite-plugin-electron/simple";
import tailwind from "@tailwindcss/vite"

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: path.resolve("src/electron/main.ts"),
        vite: {
          build: {
            rollupOptions: {
              external: ["typeorm", "dotenv"],
            },
          },
          resolve: {
            alias: {
              "@main": path.resolve("src/electron/"),
            },
          },
        },
      },
      preload: {
        input: path.resolve("src/electron/preload/preload.ts"),
      },
    }),
    tailwind()
  ],
  resolve: {
    alias: {
      "@renderer": path.resolve("src/"),
    },
  },
  build: {
    outDir: path.resolve("dist"),
  },
});
