"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax background */}
      <div
        className="absolute inset-0 w-full h-full bg-fixed bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/parallax-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-primary-blue/60 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
        <Image
          src="/logo.webp"
          alt="MHMmobiles brand logo"
          width={120}
          height={120}
          className="mx-auto mb-4 drop-shadow-lg"
          priority
        />
        <h1 className="text-4xl md:text-6xl font-bold text-base-white mb-2 drop-shadow-lg">
          MHMmobiles
        </h1>
        <p className="text-lg md:text-2xl text-soft-gray mb-6">
          Premium Mobiles & Accessories at the Best Prices
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/products"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg !bg-[var(--text-link)] !text-white visited:!text-white dark:!bg-[var(--text-link)] dark:!text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
          >
            Shop Now
          </a>
          <a
            href="/products?category=accessories"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg !bg-[var(--text-link)] !text-white visited:!text-white dark:!bg-[var(--text-link)] dark:!text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition transform text-sm sm:text-base md:text-lg whitespace-nowrap"
          >
            Explore Accessories
          </a>
        </div>
      </div>
    </section>
  );
}
