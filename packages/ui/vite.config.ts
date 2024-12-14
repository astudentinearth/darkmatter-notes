import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
    },
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es"],
    },
    copyPublicDir: false,
  },
  plugins: [react(), dts({tsconfigPath: "./tsconfig.lib.json"})],
  resolve: {
    alias: {
      "@lib": resolve("lib/"),
    },
  }
});
