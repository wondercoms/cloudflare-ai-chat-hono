import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx',
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/htmx.org/dist/htmx.min.js',
          dest: 'static',
        },
      ],
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
})
