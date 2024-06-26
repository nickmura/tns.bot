import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import {nodePolyfills} from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    basicSsl(),
    nodePolyfills({
      globals:{
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      }
    })
  ],
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 2600, 
  },
  resolve: {
    alias: {
      process: "process/browser"
    }
  },
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
        ],
    }
}
});

