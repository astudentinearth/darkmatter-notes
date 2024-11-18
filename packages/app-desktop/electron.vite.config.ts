import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import path from "path";
export default defineConfig({
    main: {
        plugins: [],
        build: {
            target: "node20",
            rollupOptions: {
                output: {
                    format: "cjs",
                },
            },
        },
    },
    preload: {
        plugins: [externalizeDepsPlugin()],
        build: {
            target: "node20",
            rollupOptions: {
                output: {
                    format: "cjs",
                },
            },
        },
    },
    renderer: {
        plugins: [react()],
        resolve: {
            alias: {
                "@renderer": path.resolve("src/renderer/src"),
                "@common": path.resolve("src/common"),
            },
        },
    },
});
