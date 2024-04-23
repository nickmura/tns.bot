import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  build: {
    outDir: './docs'
  },
  base: '/tnsbot/',
  optimizeDeps: {
    esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
            global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
            NodeGlobalsPolyfillPlugin({
                buffer: true
            })
        ]
    }
}
});

