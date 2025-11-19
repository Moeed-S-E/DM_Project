"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/admin/products/${params.id}`)
      .then((r) => r.json())
      .then((data) => setProduct(data))
      .catch(console.error);
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) router.push('/admin/products');
    else alert('Failed to update');
  };

  if (!product) return <p className="p-4">Loading…</p>;

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
          <input type="number" className="w-full p-2 border rounded" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
          <input type="number" className="w-full p-2 border rounded" value={product.stock} onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })} />
          <input className="w-full p-2 border rounded" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} />
          <input className="w-full p-2 border rounded" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} />
          <textarea className="w-full p-2 border rounded" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary-blue text-white rounded">Save</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </main>
    </AdminAuthGuard>
  );
}
