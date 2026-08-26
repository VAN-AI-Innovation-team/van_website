import { basePath, languages, routeEntries, routePath } from '../data/conference.js'

export const prerender = true

export function GET({ site }) {
  const urls = languages.flatMap((language) => routeEntries.map(({ slug }) => {
    const location = new URL(basePath(routePath(language, slug)), site).href
    const korean = new URL(basePath(routePath('ko', slug)), site).href
    const english = new URL(basePath(routePath('en', slug)), site).href

    return [
      '  <url>',
      `    <loc>${location}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="ko" href="${korean}" />`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${english}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${korean}" />`,
      '  </url>',
    ].join('\n')
  }))

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
