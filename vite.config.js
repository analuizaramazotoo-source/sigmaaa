import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O navegador usa a mesma origem do site; somente o Vite acessa a API local.
const proxy = {
  '/api': { target: 'http://127.0.0.1:3333', changeOrigin: true, rewrite: path => path.replace(/^\/api/, '') },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: { ignored: ['**/artifacts/**'] },
    proxy,
  },
  preview: { proxy },
})
