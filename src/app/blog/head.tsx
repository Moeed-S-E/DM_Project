const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

export default function Head() {
  return (
    <>
      <title>Blog — MHMmobiles | Mobile News & Reviews</title>
      <meta name="description" content="Read the latest mobile news, reviews and buying guides for smartphones and accessories in Pakistan. Expert tips on android phones, camera phones, and best mobile deals." />
      <meta property="og:title" content="Blog — MHMmobiles | Mobile News & Reviews" />
      <meta property="og:description" content="Read the latest mobile news, reviews and buying guides for smartphones and accessories in Pakistan. Expert tips on android phones, camera phones, and best mobile deals." />
      <meta property="og:url" content={`${base}/blog`} />
      <link rel="canonical" href={`${base}/blog`} />
    </>
  );
}
