import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is './' so the built site works when served from a sub-path (e.g. GitHub Pages project page).
export default defineConfig({
  plugins: [react()],
  base: './',
})
