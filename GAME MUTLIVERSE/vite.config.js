import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  cacheDir: path.resolve(__dirname, '.vite_cache'),
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
}) 