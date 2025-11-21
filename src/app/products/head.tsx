const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com";

export default function Head() {
  return (
    <>
      <title>Products — MHMmobiles | Smartphones & Accessories</title>
      <meta name="description" content="Browse smartphones, mobile phones and accessories from Samsung, iPhone, Redmi, Vivo, Infinix and Tecno. Updated mobile prices and fast delivery across Pakistan." />
      <meta property="og:title" content="Products — MHMmobiles | Smartphones & Accessories" />
      <meta property="og:description" content="Browse smartphones, mobile phones and accessories from Samsung, iPhone, Redmi, Vivo, Infinix and Tecno. Updated mobile prices and fast delivery across Pakistan." />
      <meta property="og:url" content={`${base}/products`} />
      <link rel="canonical" href={`${base}/products`} />
    </>
  );
}
