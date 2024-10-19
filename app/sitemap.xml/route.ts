import { MetadataRoute } from 'next'
 
export async function GET() {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://archdcl.com</loc>
        <lastmod>2024-10-19</lastmod>
      </url>
      <url>
        <loc>https://archdcl.com/about</loc>
        <lastmod>2024-10-19</lastmod>
      </url>
      <url>
        <loc>https://archdcl.com/contact</loc>
        <lastmod>2024-10-19</lastmod>
      </url>
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  )
}