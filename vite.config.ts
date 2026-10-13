import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { project, externalUrl } from './src/config/project.ts'

const xml = (value: string) =>
  value.replace(
    /[<>&"']/g,
    (char) =>
      ({
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&apos;',
      })[char]!,
  )

function projectMetadata(): Plugin {
  const configured = externalUrl(project.publicUrl)
  const normalized = configured ? new URL(configured) : undefined
  if (normalized) {
    normalized.search = ''
    normalized.hash = ''
    normalized.pathname = `${normalized.pathname.replace(/\/+$/, '')}/`
  }
  const url = normalized?.href
  return {
    name: 'project-metadata',
    transformIndexHtml: () =>
      url
        ? [
            {
              tag: 'link',
              attrs: { rel: 'canonical', href: url },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: { property: 'og:url', content: url },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: {
                property: 'og:image',
                content: new URL(project.logo, url).href,
              },
              injectTo: 'head',
            },
            {
              tag: 'meta',
              attrs: {
                property: 'og:image:alt',
                content:
                  'Sign Language Recognition project logo: a signing hand and a speech bubble.',
              },
              injectTo: 'head',
            },
          ]
        : [],
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${url ? `Sitemap: ${url}sitemap.xml\n` : '# Set project.publicUrl and rebuild to generate sitemap.xml.\n'}`,
      })
      if (url)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${xml(url)}</loc></url></urlset>\n`,
        })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), projectMetadata()],
  server: { host: '127.0.0.1' },
})
