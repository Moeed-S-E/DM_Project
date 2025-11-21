"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save admin login credentials in cache (refresh expiry)
    try {
      localStorage.setItem(
        "adminAuth",
        JSON.stringify({ token: "root", expiry: Date.now() + 2 * 60 * 1000 })
      );
    } catch (e) {}
    let imageUrl = coverImage;
    if (imageFile && slug) {
      const ext = imageFile.name.split('.').pop();
      const filename = `${slug}.${ext}`;
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("folder", "blog");
      formData.append("filename", filename);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const data = await uploadRes.json();
        imageUrl = `blog/${data.url}`;
      } else {
        alert("Image upload failed");
        return;
      }
    }
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, content, coverImage: imageUrl }),
    });
    if (res.ok) router.push('/admin/blog');
    else alert('Failed to create');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      if (slug) {
        const ext = file.name.split('.').pop();
        setCoverImage(`${slug}.${ext}`);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block font-semibold">Title
            <input required className="w-full p-2 border rounded mt-1" placeholder="Title" value={title} onChange={handleTitleChange} />
          </label>
          <label className="block font-semibold">Slug
            <input required className="w-full p-2 border rounded mt-1" placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} />
          </label>
          <label className="block font-semibold">Cover Image
            <input type="file" accept="image/*" className="w-full p-2 border rounded mt-1" ref={fileInputRef} onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 max-h-32 rounded" />}
            <input className="w-full p-2 border rounded mt-1" placeholder="Cover image filename (auto)" value={coverImage} readOnly />
          </label>
          <label className="block font-semibold">Content
            <textarea required className="w-full p-2 border rounded mt-1" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
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
