"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;
    fetch(`/api/admin/blog/${params.id}`)
      .then((r) => r.json())
      .then((data) => setPost(data))
      .catch(console.error);
  }, [params?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/blog/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) router.push('/admin/blog');
    else alert('Failed to update');
  };

  if (!post) return <p className="p-4">Loading…</p>;

  return (
    <AdminAuthGuard>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full p-2 border rounded" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
          <input className="w-full p-2 border rounded" value={post.coverImage} onChange={(e) => setPost({ ...post, coverImage: e.target.value })} />
          <textarea className="w-full p-2 border rounded" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-primary-blue text-white rounded">Save</button>
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded">Cancel</button>
          </div>
        </form>
      </main>
    </AdminAuthGuard>
  );
}
