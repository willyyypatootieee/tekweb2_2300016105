import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tekweb1-2024-2300016105/',  // The repository name
  plugins: [react()],
})
