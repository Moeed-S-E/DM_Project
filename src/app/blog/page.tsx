"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-[var(--text-muted)]">Latest news and insights about mobile technology</p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-[var(--text-muted)]">Loading blog posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-[var(--text-muted)]">No blog posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map((blog: any) => {
              let alt = `Cover image for: ${blog.title}`;
              return (
                <Link key={blog.id} href={`/blog/${blog.slug}`}>
                  <article className="bg-[var(--card-bg)] rounded-lg shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col cursor-pointer group">
                    <div className="relative w-full aspect-video bg-[var(--level1-bg)] overflow-hidden">
                      {blog.coverImage ? (
                        <Image
                          src={blog.coverImage.startsWith('http') ? blog.coverImage : `/blog/${blog.coverImage}`}
                          alt={alt}
                          width={600}
                          height={340}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--level1-bg)] to-[var(--level1-border)] flex items-center justify-center">
                          <span className="text-[var(--text-muted)]">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <h2 className="text-lg md:text-xl font-semibold text-[var(--text-color)] mb-2 line-clamp-2 group-hover:text-[var(--primary-blue)] transition">
                        {blog.title}
                      </h2>
                      <p className="text-xs md:text-sm text-[var(--text-muted)] mb-4 line-clamp-3">
                        {blog.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
                      </p>
                      <div className="mt-auto flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <span className="text-[var(--primary-blue)] font-semibold group-hover:translate-x-1 transition">
                          Read →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
