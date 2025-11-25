import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen sm:min-h-[600px] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div
          className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center z-0"
        />
        <div className="absolute inset-0 bg-[var(--level1-bg)] z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-16 md:py-0">
          <Image
            alt="MHMmobiles brand logo"
            width={100}
            height={100}
            className="mx-auto mb-3 sm:mb-4 drop-shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 640px) 5rem, (max-width: 1024px) 6rem, 8rem"
            src="/logo.webp"
            priority
          />
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-[var(--text-primary)] mb-2 sm:mb-3 drop-shadow-lg tracking-tight">
            MHMmobiles
          </h1>
                    <p className="text-[var(--text-primary)] text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
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
  );
}