import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.SITE_URL || 'https://van-website-kappa.vercel.app',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
})
