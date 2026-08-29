import { basePath, languages, routeEntries, routePath } from '../data/conference.js'
import { archiveItems } from '../data/archive.js'
import { getConferenceEdition } from '../data/conferenceEditions.js'

export const prerender = true

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;')

export function GET({ site }) {
  const imageUrl = (pathname) => new URL(pathname.startsWith('/') ? basePath(pathname) : pathname, site).href
  const routeSlugs = [
    ...routeEntries.map(({ slug }) => slug),
    ...archiveItems.ko.map(({ slug }) => `archive/${slug}`),
  ]
  const urls = languages.flatMap((language) => routeSlugs.map((slug) => {
    const location = new URL(basePath(routePath(language, slug)), site).href
    const korean = new URL(basePath(routePath('ko', slug)), site).href
    const english = new URL(basePath(routePath('en', slug)), site).href
    const archiveSlug = slug.startsWith('archive/') ? slug.replace('archive/', '') : null
    const archivePost = archiveSlug
      ? archiveItems[language].find((post) => post.slug === archiveSlug)
      : null
    const archiveImage = archivePost?.cover
      ? new URL(basePath(archivePost.cover), site).href
      : null
    const editionRoute = routeEntries.find((route) => route.slug === slug && route.kind === 'edition')
    const edition = editionRoute ? getConferenceEdition(editionRoute.year, language) : null
    const visibleStatuses = new Set(['confirmed', 'published', 'archived'])
    const editionImages = edition
      ? [
          ...(edition.archive.cover ? [edition.archive.cover] : []),
          ...(edition.gallery?.items || []).filter((image) => visibleStatuses.has(image.status) && image.src),
        ].map((image) => ({
          location: imageUrl(image.src),
          title: image.alt || edition.archive.title,
        }))
      : []
    const pageImages = [
      ...(archiveImage ? [{ location: archiveImage, title: archivePost.title }] : []),
      ...editionImages,
    ]

    return [
      '  <url>',
      `    <loc>${location}</loc>`,
      `    <xhtml:link rel="alternate" hreflang="ko" href="${korean}" />`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${english}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${korean}" />`,
      ...pageImages.flatMap((image) => [
        '    <image:image>',
        `      <image:loc>${escapeXml(image.location)}</image:loc>`,
        `      <image:title>${escapeXml(image.title)}</image:title>`,
        '    </image:image>',
      ]),
      '  </url>',
    ].join('\n')
  }))

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
