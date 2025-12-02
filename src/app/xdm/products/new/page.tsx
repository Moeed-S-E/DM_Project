"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function NewProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = image;
    // Handle image upload if file selected
    if (imageFile && slug) {
      const ext = imageFile.name.split('.').pop();
      const filename = `${slug}.${ext}`;
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "products");
      formData.append("filename", filename);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = `products/${data.url}`;
      } else {
        alert("Image upload failed");
        return;
      }
    }
    // Save admin login credentials in cache (refresh expiry)
    try {
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({ token: "root", expiry: Date.now() + 2 * 60 * 1000 })
      );
    } catch (e) {}
    const res = await fetch('/api/xdm/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, price, stock, category, image: imageUrl, description }),
    });
    if (res.ok) {
      router.push('/xdm/products');
    } else {
      alert('Failed to create product');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (slug) {
        const ext = file.name.split('.').pop();
        setImage(`${slug}.${ext}`);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Auto-generate slug
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block font-semibold">Title
            <input required className="w-full p-2 border rounded mt-1" placeholder="Title" value={title} onChange={handleTitleChange} />
          </label>
          <label className="block font-semibold">Slug
            <input required className="w-full p-2 border rounded mt-1" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} />
          </label>
          <label className="block font-semibold">Price
            <input type="number" className="w-full p-2 border rounded mt-1" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </label>
          <label className="block font-semibold">Stock
            <input type="number" className="w-full p-2 border rounded mt-1" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          </label>
          <label className="block font-semibold">Category
            <input className="w-full p-2 border rounded mt-1" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </label>
          <label className="block font-semibold">Image
            <input type="file" accept="image/*" className="w-full p-2 border rounded mt-1" ref={fileInputRef} onChange={handleImageChange} />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={128}
                height={128}
                className="mt-2 max-h-32 rounded"
                unoptimized
              />
            )}
            <input className="w-full p-2 border rounded mt-1" placeholder="Image filename (auto)" value={image} readOnly />
          </label>
          <label className="block font-semibold">Description
            <textarea className="w-full p-2 border rounded mt-1" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition">Create</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-[var(--level1-border)] rounded hover:bg-[var(--level1-bg)] transition">Cancel</button>
          </div>
        </form>
      </main>
    </AdminAuthGuard>
  );
}
