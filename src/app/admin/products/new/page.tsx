"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, stock, category, image, description }),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Failed to create product');
    }
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="number" className="w-full p-2 border rounded" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <input type="number" className="w-full p-2 border rounded" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          <input className="w-full p-2 border rounded" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Image filename (e.g. phone.jpg)" value={image} onChange={(e) => setImage(e.target.value)} />
          <textarea className="w-full p-2 border rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary-blue text-white rounded">Create</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </main>
    </AdminAuthGuard>
  );
}
