const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

export default function Head() {
  return (
    <>
      <title>About MHMmobiles — Premium Mobiles in Pakistan</title>
      <meta name="description" content="Learn about MHMmobiles — genuine smartphones, best mobile prices in Pakistan, fast delivery and reliable after-sales support." />
      <meta property="og:title" content="About MHMmobiles — Premium Mobiles in Pakistan" />
      <meta property="og:description" content="Learn about MHMmobiles — genuine smartphones, best mobile prices in Pakistan, fast delivery and reliable after-sales support." />
      <meta property="og:url" content={`${base}/about`} />
      <link rel="canonical" href={`${base}/about`} />
    </>
  );
}
