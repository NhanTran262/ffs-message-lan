import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { defineConfig, type PluginOption } from 'vite'
import devtoolsJson from 'vite-plugin-devtools-json'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: { port: 3000 },
  preview: { port: 3000 },
  css: { devSourcemap: true },
  plugins: [
    tailwindcss() as PluginOption,
    reactRouter() as PluginOption,
    tsconfigPaths() as PluginOption,
    devtoolsJson() as PluginOption
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './app')
    }
  },
  optimizeDeps: {
    include: ['input-otp']
  }
})
