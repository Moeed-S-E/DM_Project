import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--level1-bg)] border-t border-[var(--level1-border)] mt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div>
            <h3 className="font-bold text-[var(--level1-text)] mb-2 text-sm md:text-base">About MHMmobiles</h3>
            <p className="text-xs md:text-sm text-[var(--text-secondary)]">Premium mobiles and accessories at the best prices.</p>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--level1-text)] mb-2 text-sm md:text-base">Phone Brands</h4>
            <ul className="text-xs md:text-sm space-y-1 text-[var(--level1-text)]">
              <li><Link href="/products" className="hover:opacity-80 transition">Samsung</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition">iPhone</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition">Redmi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--level1-text)] mb-2 text-sm md:text-base">Accessories</h4>
            <ul className="text-xs md:text-sm space-y-1 text-[var(--level1-text)]">
              <li><Link href="/products" className="hover:opacity-80 transition">Earbuds</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition">Chargers</Link></li>
              <li><Link href="/products" className="hover:opacity-80 transition">Cases</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[var(--level1-text)] mb-2 text-sm md:text-base">Support</h4>
            <ul className="text-xs md:text-sm space-y-1 text-[var(--level1-text)]">
              <li><Link href="/contact" className="hover:opacity-80 transition">Contact Us</Link></li>
              <li><Link href="/about" className="hover:opacity-80 transition">About Us</Link></li>
              <li><Link href="/blog" className="hover:opacity-80 transition">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--level1-border)] pt-4 md:pt-6 text-center text-xs md:text-sm text-[var(--level1-text)]">
          <p>&copy; {new Date().getFullYear()} MHMmobiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
