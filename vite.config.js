import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CuotaDia/', // ← DEBE coincidir con el nombre del repo
  build: {
    outDir: 'dist',
  }
})