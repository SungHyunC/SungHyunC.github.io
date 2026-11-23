import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' keeps asset paths relative, so the build works both on
// https://<user>.github.io/ and on a project page such as /portfolio/.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // React + Motion + brand icons make one ~500 kB (≈170 kB gzip) bundle; that is fine here.
  build: { chunkSizeWarningLimit: 700 },
})
