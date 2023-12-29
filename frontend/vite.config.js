import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/login": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/api/books": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
})
