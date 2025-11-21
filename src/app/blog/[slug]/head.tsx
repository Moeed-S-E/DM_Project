import { notFound } from 'next/navigation';

const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

function titleFromSlug(slug: string) {
  return slug ? slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Blog Post';
}

export default function Head({ params }: { params: { slug: string } }) {
  const slug = params?.slug || '';
  const title = titleFromSlug(slug);
  if (!slug) return notFound();

  return (
    <>
      <title>{title} — MHMmobiles Blog</title>
      <meta name="description" content={`Read ${title} — insights, reviews and buying advice from MHMmobiles.`} />
      <meta property="og:title" content={`${title} — MHMmobiles Blog`} />
      <meta property="og:description" content={`Read ${title} — insights, reviews and buying advice from MHMmobiles.`} />
      <meta property="og:url" content={`${base}/blog/${slug}`} />
      <link rel="canonical" href={`${base}/blog/${slug}`} />
    </>
  );
}
