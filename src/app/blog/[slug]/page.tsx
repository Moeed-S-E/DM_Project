"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (params?.slug) {
      fetch(`/api/blog/${params.slug}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('Blog not found');
          return res.json();
        })
        .then((data) => setBlog(data))
        .catch(() => setBlog(null));
    }
  }, [params?.slug]);

  if (blog === null) return <div className="p-8 text-center text-red-500">Blog post not found.</div>;
  if (!blog) return <div className="p-8">Loading...</div>;

  let alt = `Cover image for blog post: ${blog.title} — MHMmobiles Blog`;
  if (blog.coverImage && blog.coverImage.match) {
    const keywords = blog.coverImage.match(/(\w-]+)/g)?.slice(1).join(" ");
    if (keywords) alt += ` — ${keywords.replace(/-/g, ' ')}`;
  }

  const blogImageSrc = blog.coverImage?.startsWith('http')
    ? blog.coverImage
    : blog.coverImage?.startsWith('/')
    ? blog.coverImage
    : `/blog/${blog.coverImage}`;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 bg-[var(--bg-color)] text-[var(--text-color)]">
      <Image
        src={blogImageSrc}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg object-cover mb-6 shadow-lg border border-[var(--level1-border)]"
      />
      <h1 className="text-3xl font-bold mb-2 text-[var(--primary-blue)]">{blog.title}</h1>
      <p className="text-[var(--text-muted)] mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <article className="prose prose-lg text-[var(--text-secondary)] max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </main>
  );
}
