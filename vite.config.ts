import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      //@ts-ignore
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
})
