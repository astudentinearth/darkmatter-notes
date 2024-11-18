import path from "path";
import { defineProject } from "vitest/config";

export default defineProject({
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: "src/test/setup.ts",
        deps: {
            optimizer: {
                web: {
                    include: ["react-tweet", "katex"],
                },
            },
        },
        server: {
            deps: {
                inline: ["react-tweet", "katex"],
            },
        },
        pool: "vmThreads",
    },
    resolve: {
        alias: {
            "@renderer": path.resolve("src"),
        },
    },
    //root: path.resolve("src")
});
