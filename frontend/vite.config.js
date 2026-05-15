import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    process.env.NODE_ENV = 'development'
  }
  return {
    plugins: [react()],
  }
})
