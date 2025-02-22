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
          include: ["react-tweet", "katex", "lucide-react"],
        },
      },
    },
    server: {
      deps: {
        inline: ["react-tweet", "katex", "lucide-react"],
      },
    },
    pool: "vmThreads",
    environmentMatchGlobs: [["src/electron/**/*", "node"]],
  },
  resolve: {
    alias: {
      "@renderer": path.resolve("src"),
      "@main": path.resolve("src/electron"),
    },
  },
  //root: path.resolve("src"),
});
