import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const base = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://mhmmobiles.com';

    const blogs = await prisma.blog.findMany({ select: { slug: true, createdAt: true } });
    const products = await prisma.product.findMany({ select: { slug: true, createdAt: true } });

    const pages = [
      { url: '', priority: 1.0 },
      { url: 'products', priority: 0.9 },
      { url: 'blog', priority: 0.9 },
      { url: 'contact', priority: 0.6 },
      { url: 'about', priority: 0.6 },
    ];

    const urls: string[] = [];

    // Static pages
    pages.forEach((p) => {
      urls.push(`
  <url>
    <loc>${base}/${p.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
    });

    // Blog pages
    blogs.forEach((b) => {
      const lastmod = b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString();
      urls.push(`
  <url>
    <loc>${base}/blog/${b.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

    // Product pages
    products.forEach((p) => {
      const lastmod = p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString();
      urls.push(`
  <url>
    <loc>${base}/products/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`);
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return new NextResponse('failed', { status: 500 });
  }
}
