import HeroSection from "@/components/HeroSection";

export const metadata = {
  title: "MHMmobiles | Premium Mobiles & Accessories",
  description: "MHMmobiles — Pakistan's trusted store for premium mobiles, smartphones and accessories. Find the best prices on Samsung, iPhone, Redmi, Vivo, Infinix and Tecno with fast delivery, genuine products, easy returns, and responsive support.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhmmobiles.vercel.app",
    site_name: "MHMmobiles",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "MHMmobiles — Pakistan's trusted store for premium mobiles, smartphones and accessories. Find the best prices on Samsung, iPhone, Redmi, Vivo, Infinix and Tecno with fast delivery, genuine products, easy returns, and responsive support."
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhmmobiles",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "MHMmobiles — Pakistan's trusted store for premium mobiles, smartphones and accessories. Find the best prices on Samsung, iPhone, Redmi, Vivo, Infinix and Tecno with fast delivery, genuine products, easy returns, and responsive support."
  }
};

export default function Home() {
  const base = process.env.NEXT_PUBLIC_METADATA_BASE || "https://mhmmobiles.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "MHMmobiles - Premium Mobiles & Accessories",
        "url": base,
        "description": "MHMmobiles — Pakistan's trusted store for premium mobiles, smartphones and accessories. Find the best prices on Samsung, iPhone, Redmi, Vivo, Infinix and Tecno with fast delivery, genuine products, easy returns, and responsive support.",
        "inLanguage": "en"
      },
      {
        "@type": "ElectronicsStore",
        "name": "MHMmobiles",
        "url": base,
        "logo": `${base}/logo.webp`,
        "description": "Retailer of premium mobile phones, smartphones and accessories in Pakistan. Genuine products, fast delivery, and reliable customer support.",
        "priceRange": "PKR",
        "areaServed": "Pakistan",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PK"
        },
        "sameAs": []
      }
    ]
  };
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen sm:min-h-[600px] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center z-0"
        />
        <div className="absolute inset-0 bg-[var(--level1-bg)] z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 md:py-0">
          <img 
            alt="MHMmobiles brand logo" 
            width={100} 
            height={100} 
            className="mx-auto mb-3 sm:mb-4 drop-shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
            src="/logo.webp" 
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
            MHMmobiles
          </h1>
          <p className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-2xl mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Premium Mobiles and Accessories at the Best Prices, Made Easy for Everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <a 
              href="/products" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-[var(--primary-blue)] !text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              Shop Now
            </a>
            <a 
              href="/products" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-[var(--primary-blue)] !text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              Explore Accessories
            </a>
          </div>
        </div>
      </section>

      {/* About Section - added to increase visible text content for SEO */}
      <section className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[var(--primary-blue)]">About MHMmobiles</h2>
        <div className="prose prose-sm sm:prose base:prose-lg mx-auto text-[var(--text-muted)]">
          <p>
            MHMmobiles began with a simple mission: to make premium mobile phones and accessories accessible across Pakistan. We carefully source devices from authorized distributors and verified suppliers, ensuring every smartphone and accessory listed on our site is genuine and covered by the manufacturer's warranty where applicable. From budget-friendly mobile phones to flagship smartphones and the latest camera phones, our catalog is curated to help you find the right device for your needs.
          </p>
          <p>
            Our buying experience is tailored for convenience — clear product pages with up-to-date mobile prices, helpful comparison information, and a responsive support team ready to help by chat or phone. We offer fast delivery to major cities and trackable shipping for peace of mind. If you need advice on picking an android phone, comparing specs across brands, or selecting the best mobile for photography, our team provides the guidance you need to decide with confidence.
          </p>
          <p>
            We also focus on after-sales service: simple returns, warranty handling support, and an evolving set of accessories to protect and enhance your device. Shopping for a new mobile should be easy — at MHMmobiles we combine honest pricing, genuine products, and reliable service to make that possible.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Fast Delivery</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Get your new mobile delivered fast, safe, and right to your doorstep. Whether you shop for smartphones, budget mobiles, or the latest mobile phones in Pakistan, we make sure your order reaches you without delays.</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Genuine Products</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Every device we sell is original and verified. You get 100 percent authentic smartphones, accessories, and top mobile brands in Pakistan. No clones, no used stock, only genuine mobiles you can trust.</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Best Prices</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">We offer the best mobile prices in Pakistan with real value on Samsung, iPhone, Infinix, Tecno, Redmi, Vivo, and more. From low price mobiles to the latest smartphones, you get updated mobile prices and deals that fit every budget.</p>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--primary-blue)]">Trusted Brands</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 items-center">
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg transition">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/samsung.svg" alt="Samsung" loading="lazy" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 filter dark:invert" />
          </div>
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg transition">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/apple.svg" alt="Apple" loading="lazy" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 filter dark:invert" />
          </div>
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg transition">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/xiaomi.svg" alt="Redmi by Xiaomi" loading="lazy" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 filter dark:invert" />
          </div>
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-white/10 shadow-md hover:shadow-lg transition">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vivo.svg" alt="Vivo" loading="lazy" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 filter dark:invert" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-20 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-[var(--primary-blue)]">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 border border-[var(--level1-border)] hover:shadow-xl transition">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"I was amazed by the selection of smartphones and the smooth ordering process. The delivery was prompt and the support team guided me to pick the perfect mobile phones for my family — excellent value and genuine products. Highly recommend MHMmobiles for anyone shopping for new devices."</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">A</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Ayesha K.</span>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 border border-[var(--level1-border)] hover:shadow-xl transition">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"MHMmobiles had the best camera phone I could find — the images are crisp and the features match the description. Their prices are competitive and the team helped me compare specs across android phones so I could choose confidently. Outstanding shopping experience overall."</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">M</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Muneeb R.</span>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 border border-[var(--level1-border)] hover:shadow-xl transition">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"I bought the best mobile for my needs and received the latest mobile update advice from the support team. Device setup was easy and performance is excellent. Customer support was very helpful and responsive throughout — 5 stars for product quality and service."</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">S</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Sadia L.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[var(--text-muted)] text-sm">
        <div className="h-card inline-flex items-center justify-center gap-3 mb-3">
          <img src="/logo.webp" alt="MHMmobiles logo" className="u-logo w-8 h-8 rounded" />
          <div>
            <div className="p-name font-semibold text-[var(--text-color)]">MHMmobiles</div>
            <a className="u-url text-xs text-[var(--text-muted)]" href={base}>{base.replace(/^https?:\/\//, '')}</a>
          </div>
        </div>
        &copy; {new Date().getFullYear()} MHMmobiles. All rights reserved.
      </footer>
    </div>
  );
}
