"use client";

import { useEffect, useState } from "react";
import { apiBase } from '@/lib/apiBase';
import AdminAuthGuard from "@/components/AdminAuthGuard";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiBase()}/api/xdm/products`)
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`${apiBase()}/api/xdm/products/${id}`, { method: 'DELETE' });
    setProducts((p) => p.filter((x) => x.id !== id));
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <Link href="/xdm/products/new" className="btn">New Product</Link>
        </div>

        {loading ? (
          <p>Loading…</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="p-4 rounded bg-[var(--card-bg)] border-[var(--level1-border)]">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{p.category} — PKR {Math.round(p.price)}</p>
                <div className="mt-2 flex gap-2">
                  <Link href={`/xdm/products/${p.id}/edit`} className="px-3 py-1 bg-primary-blue text-white rounded">Edit</Link>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AdminAuthGuard>
  );
}
