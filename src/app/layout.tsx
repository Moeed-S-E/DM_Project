import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    url: "https://mhmmobiles.com",
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
    <html lang="en">
      <head>
        {/* Preconnect to CDN for faster resource loading */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.webp" as="image" />
        
        {/* Optimize for slow connections */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        
        {/* Performance optimization - reduce Cumulative Layout Shift */}
        <meta name="theme-color" content="#4F46E5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
        <div className="min-h-[80vh] flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
