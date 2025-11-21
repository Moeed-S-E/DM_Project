const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

export default function Head() {
  return (
    <>
      <title>Contact — MHMmobiles</title>
      <meta name="description" content="Get in touch with MHMmobiles for order support, warranty claims, or product questions. We're here to help with mobile purchases across Pakistan." />
      <meta property="og:title" content="Contact — MHMmobiles" />
      <meta property="og:description" content="Get in touch with MHMmobiles for order support, warranty claims, or product questions. We're here to help with mobile purchases across Pakistan." />
      <meta property="og:url" content={`${base}/contact`} />
      <link rel="canonical" href={`${base}/contact`} />
    </>
  );
}
