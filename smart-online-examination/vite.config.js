import { fileURLToPath, URL } from 'node:url'
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis' // 👈 fix the global error
      }
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
     host: 'localhost',
    port: 5173
}

})
