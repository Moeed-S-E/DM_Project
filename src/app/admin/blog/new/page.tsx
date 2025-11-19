"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function NewBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, coverImage }),
    });
    if (res.ok) router.push('/admin/blog');
    else alert('Failed to create');
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">New Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="w-full p-2 border rounded" placeholder="Cover image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
          <textarea required className="w-full p-2 border rounded" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary-blue text-white rounded">Create</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </main>
    </AdminAuthGuard>
  );
}
