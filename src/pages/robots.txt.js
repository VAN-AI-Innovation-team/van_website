import { basePath } from '../data/site.js'

export const prerender = true

export function GET({ site }) {
  const sitemap = new URL(basePath('/sitemap.xml'), site)
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap.href}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
