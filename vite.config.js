import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~fontawesome': path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free'),
    }
  }
})
