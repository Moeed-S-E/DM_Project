import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Canonical from "@/components/Canonical";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["700", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MHMmobiles | Premium Mobiles & Accessories in Pakistan",
  description:
    "Shop Samsung, iPhone, Infinix, Tecno, Redmi, Vivo mobiles at the best prices in Pakistan. Genuine products with fast delivery. Buy premium mobile phones and accessories from MHMmobiles.",
  keywords: ["mobiles", "smartphones", "Samsung", "iPhone", "Pakistan", "online shopping", "best prices", "accessories"],
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://mhmmobiles.vercel.app",
    siteName: "MHMmobiles",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "Shop premium mobiles and accessories at the best prices in Pakistan.",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "MHMmobiles - Premium Mobile Phones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "Shop premium mobiles at the best prices in Pakistan.",
    images: ["/logo.webp"],
  },
  // Provide a base URL so Next can resolve open graph/twitter images reliably
  metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to CDN for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Canonical />
        {/* Critical image requests are handled via `next/image` priority — remove manual preload */}
        
        {/* Optimize for slow connections */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        
        {/* Performance optimization - reduce Cumulative Layout Shift */}
        <meta name="theme-color" content="#4F46E5" />
        <meta name="description" content="MHMmobiles - Premium mobiles at best prices in Pakistan" />
        {/* Open Graph / Twitter meta tags for social cards */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MHMmobiles" />
        <meta property="og:title" content="MHMmobiles | Premium Mobiles & Accessories" />
        <meta property="og:description" content="Shop premium mobiles and accessories at the best prices in Pakistan." />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000"} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000"}/logo.webp`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MHMmobiles | Premium Mobiles & Accessories" />
        <meta name="twitter:description" content="Shop premium mobiles and accessories at the best prices in Pakistan." />
        <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_METADATA_BASE || "http://localhost:3000"}/logo.webp`} />
        {/* Canonical link for the site (uses NEXT_PUBLIC_METADATA_BASE if set) */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com"} />
        {/* JSON-LD structured data for Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "MHMmobiles",
                  "url": process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com",
                  "logo": `${process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com"}/logo.webp`,
                  "sameAs": []
                },
                {
                  "@type": "WebSite",
                  "url": process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.com"}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} ${poppins.variable} antialiased`}
      >

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(registrations => {
                  registrations.forEach(reg => reg.unregister());
                });
              }
            `,
          }}
        />
        <Navbar />
        <div id="content" className="min-h-[80vh] flex flex-col">
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
