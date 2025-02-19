import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import electron from "vite-plugin-electron/simple";
import tailwind from "@tailwindcss/vite";

const plugins: PluginOption[] = [react(), tailwind()];

if (process.env["DW_WITHOUT_ELECTRON"] != "1")
  plugins.push(
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
  );

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@renderer": path.resolve("src/"),
    },
  },
  build: {
    outDir: path.resolve("dist"),
  },
});
