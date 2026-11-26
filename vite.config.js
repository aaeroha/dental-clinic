import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const jsxInJsPlugin = () => ({
  name: "treat-js-files-as-jsx",
  enforce: "pre",
  transform(code, id) {
    if (!id.endsWith(".js") || id.includes("node_modules")) return null;
    return transformWithOxc(code, id, { lang: "jsx" });
  },
});

export default defineConfig({
  base: "./",
  plugins: [
    jsxInJsPlugin(),
    react({
      include: /\.(js|jsx|ts|tsx)$/,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["import"],
      },
    },
  },
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        ".js": "jsx",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 700,
  },
});
