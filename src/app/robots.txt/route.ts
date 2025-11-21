import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://mhmmobiles.com';
  const sitemapUrl = `${base.replace(/\/$/, '')}/sitemap.xml`;

  // Disallow admin pages and admin API endpoints from being crawled
  const body = `User-agent: *
Disallow: /admin
Disallow: /admin/
Disallow: /api/admin
Disallow: /api/admin/
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
