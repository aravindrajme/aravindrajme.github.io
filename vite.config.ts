import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../dist"
  },
  plugins: [tailwindcss()]
});
