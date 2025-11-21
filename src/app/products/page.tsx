"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = category
      ? products.filter((p: any) => p.category === category)
      : products;

    filtered = [...filtered].sort((a: any, b: any) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.title.localeCompare(b.title);
      if (sort === "name-desc") return b.title.localeCompare(a.title);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredProducts(filtered);
  }, [category, sort, products]);

  const categories = ["Samsung", "iPhone", "Redmi", "Infinix", "Tecno", "Vivo", "Earbuds", "Chargers"];

  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[var(--text-color)]">Products</h1>
          <p className="text-sm sm:text-base text-[var(--text-muted)]">{filteredProducts.length} products found</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 pb-8 border-b border-[var(--level1-border)]">
          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-[var(--text-color)]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[var(--level1-border)] bg-[var(--card-bg)] text-[var(--text-color)] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold mb-2 text-[var(--text-color)]">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[var(--level1-border)] bg-[var(--card-bg)] text-[var(--text-color)] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            >
              <option value="newest">Newest</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-end">
            <Link
              href="/cart"
              className="w-full px-3 sm:px-4 py-2 bg-[var(--accent-coral)] text-white rounded-lg font-semibold hover:opacity-90 transition text-center text-xs sm:text-sm"
            >
              View Cart
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm sm:text-base text-[var(--text-muted)]">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg sm:text-xl text-[var(--text-muted)] mb-4">No products found</p>
            <button
              onClick={() => {
                setCategory("");
                setSort("newest");
              }}
              className="px-4 sm:px-6 py-2 bg-[var(--primary-blue)] text-white rounded-lg hover:opacity-90 transition text-xs sm:text-sm font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

