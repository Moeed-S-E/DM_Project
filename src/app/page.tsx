

import Image from "next/image";
// import HeroSection from "@/components/HeroSection";

export const metadata = {
  title: "MHMmobiles | Premium Mobiles & Accessories",
  description: "Premium Mobiles & Accessories at the Best Prices. Shop Samsung, iPhone, Infinix, Tecno, Redmi, Vivo, and more at MHMmobiles.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhmmobiles.com",
    site_name: "MHMmobiles",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "Premium Mobiles & Accessories at the Best Prices. Shop Samsung, iPhone, Infinix, Tecno, Redmi, Vivo, and more at MHMmobiles."
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhmmobiles",
    title: "MHMmobiles | Premium Mobiles & Accessories",
    description: "Premium Mobiles & Accessories at the Best Prices. Shop Samsung, iPhone, Infinix, Tecno, Redmi, Vivo, and more at MHMmobiles."
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen sm:min-h-[600px] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Desktop video */}
        <video 
          className="hidden md:block absolute inset-0 w-full h-full object-cover z-0" 
          src="/hero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="/logo.webp"
        />
        {/* Mobile fallback - gradient background */}
        <div className="md:hidden absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-blue-700 to-black z-0" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-blue-900/70 z-10" />
        
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 md:py-0">
          <img 
            alt="MHMmobiles brand logo" 
            width={100} 
            height={100} 
            className="mx-auto mb-3 sm:mb-4 drop-shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32" 
            src="/logo.webp" 
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
            MHMmobiles
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-zinc-100 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Premium Mobiles & Accessories at the Best Prices
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <a 
              href="/products" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-white text-[var(--primary-blue)] font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              Shop Now
            </a>
            <a 
              href="/products" 
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-white text-[var(--accent-coral)] font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
            >
              Explore Accessories
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-20 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Fast Delivery</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Get your devices delivered quickly and safely to your doorstep.</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Genuine Products</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">We only sell 100% authentic mobiles and accessories from top brands.</p>
        </div>
        <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center text-center border border-[var(--level1-border)] hover:shadow-xl transition">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-[var(--primary-blue)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h3 className="font-bold text-base sm:text-lg mb-2 text-[var(--text-color)]">Best Prices</h3>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Unbeatable prices on Samsung, iPhone, Infinix, Tecno, Redmi, Vivo, and more.</p>
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
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"Super fast delivery and the phone was exactly as described. Will buy again!"</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">A</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Ayesha K.</span>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 border border-[var(--level1-border)] hover:shadow-xl transition">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"Best prices in town and genuine products. Highly recommended!"</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">M</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Muneeb R.</span>
            </div>
          </div>
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-6 border border-[var(--level1-border)] hover:shadow-xl transition">
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">"Customer support was very helpful and responsive. 5 stars!"</p>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--primary-blue)]/20 flex items-center justify-center font-bold text-xs sm:text-sm text-[var(--primary-blue)]">S</span>
              <span className="font-semibold text-xs sm:text-sm text-[var(--text-color)]">Sadia L.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[var(--text-muted)] text-sm">
        &copy; {new Date().getFullYear()} MHMmobiles. All rights reserved.
      </footer>
    </div>
  );
}
