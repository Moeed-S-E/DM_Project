"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// Theme toggle is interactive but small — load it on client only to avoid adding it to initial bundle
const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[var(--card-bg)] border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.webp" alt="MHMmobiles" width={40} height={40} style={{ width: 'auto', height: 'auto' }} />
          <span className="text-base md:text-lg font-bold text-[var(--primary-blue)]">MHMmobiles</span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm md:text-base items-center">
          <Link href="/products" className="hover:text-[var(--primary-blue)]">Products</Link>
          <Link href="/blog" className="hover:text-[var(--primary-blue)]">Blog</Link>
          <Link href="/about" className="hover:text-[var(--primary-blue)]">About</Link>
          <Link href="/contact" className="hover:text-[var(--primary-blue)]">Contact</Link>
          <ThemeToggle />
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center border-0 outline-none focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span aria-hidden="true" className={`h-0.5 w-full bg-[var(--primary-blue)] transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span aria-hidden="true" className={`h-0.5 w-full bg-[var(--primary-blue)] transition-opacity ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span aria-hidden="true" className={`h-0.5 w-full bg-[var(--primary-blue)] transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[var(--card-bg)] border-t flex flex-col gap-2 p-4">
          <Link href="/products" className="py-2 px-3 hover:bg-[var(--level-1)] rounded" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/blog" className="py-2 px-3 hover:bg-[var(--level-1)] rounded" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link href="/about" className="py-2 px-3 hover:bg-[var(--level-1)] rounded" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="py-2 px-3 hover:bg-[var(--level-1)] rounded" onClick={() => setMenuOpen(false)}>Contact</Link>
          <div className="py-2 px-3"><ThemeToggle /></div>
        </div>
      )}
    </nav>
  );
}
