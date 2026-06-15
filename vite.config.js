import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    host: true,
    port: 5173
  },

  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text"],
    },
    env: {
      VITE_API_URL: 'http://localhost:3000',
    },
  },
})