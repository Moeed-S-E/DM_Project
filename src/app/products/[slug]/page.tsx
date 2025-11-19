"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (params?.slug) {
      fetch(`/api/products/${params.slug}`)
        .then(async (res) => {
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setStock(data.stock ?? 0);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  }, [params?.slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (quantity <= 0) return;
    if ((stock ?? product.stock) <= 0) {
      alert('Product out of stock');
      return;
    }

    try {
      const res = await fetch('/api/cart/decrement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, quantity }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data && data.stock !== undefined) setStock(data.stock);
        alert(data?.error || 'Could not add to cart');
        return;
      }

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find((item: any) => item.id === product.id);
      if (existingItem) existingItem.quantity += quantity;
      else cart.push({ ...product, quantity });
      localStorage.setItem('cart', JSON.stringify(cart));

      setStock((s) => (s !== null ? s - quantity : (product.stock ?? 0) - quantity));
      setQuantity(1);
      alert('Added to cart!');
    } catch (err) {
      console.error(err);
      alert('Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-[var(--text-muted)] mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:opacity-90 transition">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  let alt = `${product.title} - ${product.category} at MHMmobiles`;
  if (product.image && product.image.match) {
    const keywords = product.image.match(/(\w-]+)/g)?.join(" ");
    if (keywords) alt += ` - ${keywords}`;
  }

  const productImageSrc = product.image?.startsWith('http') ? product.image : `/products/${product.image}`;

  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--primary-blue)]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--primary-blue)]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[var(--text-color)]">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-[var(--card-bg)] rounded-lg p-4 md:p-8">
            {product.image ? (
              <Image
                src={productImageSrc}
                alt={alt}
                width={500}
                height={500}
                className="rounded-lg object-contain max-w-full max-h-[500px]"
              />
            ) : (
              <div className="w-full aspect-square bg-[var(--level1-bg)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--text-muted)]">No image available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-3">{product.title}</h1>
              <p className="text-lg text-[var(--text-muted)]">{product.category}</p>
            </div>

            {/* Price Section */}
            <div className="mb-6 pb-6 border-b border-[var(--level1-border)]">
              <div className="flex items-center gap-4 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-4xl font-bold text-[var(--primary-blue)]">
                      PKR {product.salePrice.toFixed(0)}
                    </span>
                    <div>
                      <span className="line-through text-[var(--text-muted)] text-lg">
                        PKR {product.price.toFixed(0)}
                      </span>
                      <div className="text-red-500 font-bold text-sm mt-1">
                        Save PKR {(product.price - product.salePrice).toFixed(0)} ({Math.round((1 - product.salePrice / product.price) * 100)}%)
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-[var(--primary-blue)]">
                    PKR {product.price.toFixed(0)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg font-semibold">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100 px-4 py-2 rounded-lg font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart Section */}
            {product.stock > 0 && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-3">Quantity</label>
                  <div className="flex items-center gap-4 bg-[var(--card-bg)] w-fit p-2 rounded-lg border border-[var(--level1-border)]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-[var(--level1-bg)] rounded transition font-bold"
                    >
                      −
                    </button>
                    <span className="text-xl font-bold px-4">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-4 py-2 hover:bg-[var(--level1-bg)] rounded transition font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-[var(--primary-blue)] text-white rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg"
                >
                  Add to Cart
                </button>

                <Link
                  href="/checkout"
                  className="block w-full px-6 py-4 bg-[var(--accent-coral)] text-white rounded-lg font-bold text-lg hover:opacity-90 transition text-center"
                >
                  Buy Now
                </Link>
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto pt-6 border-t border-[var(--level1-border)]">
              <div className="bg-[var(--level1-bg)] p-4 rounded-lg">
                <div className="font-bold text-[var(--level1-text)] mb-1">Fast Delivery</div>
                <p className="text-sm text-[var(--text-muted)]">Free shipping on orders over $50</p>
              </div>
              <div className="bg-[var(--level1-bg)] p-4 rounded-lg">
                <div className="font-bold text-[var(--level1-text)] mb-1">Authentic</div>
                <p className="text-sm text-[var(--text-muted)]">100% genuine product guaranteed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 pt-8 border-t border-[var(--level1-border)]">
          <h2 className="text-2xl font-bold mb-6">Continue Shopping</h2>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-[var(--primary-blue)] text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </main>
  );
}
