import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  preview: {
    host: '0.0.0.0', // REQUIRED for Render
    port: process.env.PORT || 4173,
    strictPort: true,
    allowedHosts: ['karibuyako-front.onrender.com']
  }
})
