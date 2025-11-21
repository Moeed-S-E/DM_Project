const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

function titleFromSlug(slug: string) {
  return slug ? slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Product';
}

export default function Head({ params }: { params: { slug: string } }) {
  const slug = params?.slug || '';
  const title = titleFromSlug(slug);

  return (
    <>
      <title>{title} — MHMmobiles</title>
      <meta name="description" content={`${title} — Check specs, price and availability at MHMmobiles. Genuine products and fast delivery across Pakistan.`} />
      <meta property="og:title" content={`${title} — MHMmobiles`} />
      <meta property="og:description" content={`${title} — Check specs, price and availability at MHMmobiles.`} />
      <meta property="og:url" content={`${base}/products/${slug}`} />
      <link rel="canonical" href={`${base}/products/${slug}`} />
    </>
  );
}
