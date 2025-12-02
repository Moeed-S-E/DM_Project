"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/xdm/blog`)
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/xdm/blog/${id}`, { method: 'DELETE' });
    setPosts((p) => p.filter((x) => x.id !== id));
  };

  return (
    <AdminAuthGuard>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Blog</h1>
          <Link href="/xdm/blog/new" className="btn">New Post</Link>
        </div>

        <div className="space-y-4">
          {posts.map((p) => (
            <div key={p.id} className="p-4 rounded bg-[var(--card-bg)] border-[var(--level1-border)]">
              <h3 className="font-semibold">{p.title}</h3>
              <div className="mt-2 flex gap-2">
                <Link href={`/xdm/blog/${p.id}/edit`} className="px-3 py-1 bg-primary-blue text-white rounded">Edit</Link>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AdminAuthGuard>
  );
}
