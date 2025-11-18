"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);

  // Dynamic alt tag generation
  let alt = `${product.title} - ${product.category} at MHMmobiles`;
  if (product.image) {
    const keywords = product.image.match(/([\w-]+)/g)?.join(" ");
    if (keywords) alt += ` - ${keywords}`;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="bg-[var(--card-bg)] rounded-lg shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col">
        <div className="relative w-full aspect-square bg-[var(--level1-bg)] flex items-center justify-center overflow-hidden">
          {product.image ? (
            <Image
              src={`/products/${product.image}`}
              alt={alt}
              width={240}
              height={240}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--level1-bg)] to-[var(--level1-border)] flex items-center justify-center">
              <span className="text-[var(--text-muted)]">No image</span>
            </div>
          )}
          {product.salePrice && (
            <div className="absolute top-2 right-2 bg-[var(--sale-badge)] text-white px-2 py-1 rounded text-xs font-bold">
              Sale
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-sm md:text-base font-semibold text-[var(--text-color)] mb-1 line-clamp-2 hover:text-[var(--primary-blue)]">
            {product.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3">{product.category}</p>

          <div className="flex items-center gap-2 mb-3">
            {product.salePrice ? (
              <>
                <span className="text-lg md:text-xl font-bold text-[var(--primary-blue)]">
                  PKR {product.salePrice.toFixed(0)}
                </span>
                <span className="line-through text-[var(--text-muted)] text-xs md:text-sm">
                  PKR {product.price.toFixed(0)}
                </span>
              </>
            ) : (
              <span className="text-lg md:text-xl font-bold text-[var(--primary-blue)]">
                PKR {product.price.toFixed(0)}
              </span>
            )}
          </div>

          <div className="mb-3">
            <span
              className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                product.stock > 0
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
              }`}
            >
              {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
            </span>
          </div>

          <div className="mt-auto space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="px-2 py-1 bg-[var(--level1-bg)] hover:bg-[var(--level1-border)] rounded transition text-xs"
              >
                −
              </button>
              <span className="flex-1 text-center text-sm">{quantity}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuantity(Math.min(product.stock, quantity + 1));
                }}
                className="px-2 py-1 bg-[var(--level1-bg)] hover:bg-[var(--level1-border)] rounded transition text-xs"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full px-3 py-2 bg-[var(--primary-blue)] text-white rounded font-semibold text-xs md:text-sm hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
