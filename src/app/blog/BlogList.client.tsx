"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function BlogCard({ blog }: { blog: any }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [capWidth, setCapWidth] = useState<number | null>(null);
  const [imageBroken, setImageBroken] = useState(false);

  const onImageLoad = (result: { naturalWidth?: number; naturalHeight?: number }) => {
    try {
      const natural = result?.naturalWidth || 0;
      const container = wrapperRef.current?.clientWidth || 0;
      if (natural && container && natural < container) {
        setCapWidth(natural);
      }
    } catch (e) {
      // noop
    }
  };

  const alt = `Cover image for: ${blog.title}`;

  const hasValidCover = blog.coverImage && typeof blog.coverImage === 'string' && blog.coverImage !== 'xyz' && blog.coverImage.trim() !== '';
  const imageSrc = hasValidCover
    ? blog.coverImage.startsWith('http')
      ? blog.coverImage
      : blog.coverImage.startsWith('/')
      ? blog.coverImage
      : `/blog/${blog.coverImage}`
    : null;

  return (
    <Link key={blog.id} href={`/blog/${blog.slug}`}> 
      <article className="bg-[var(--card-bg)] rounded-lg shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col cursor-pointer group">
        <div ref={wrapperRef} className="relative w-full aspect-video bg-[var(--level1-bg)] overflow-hidden">
          {imageSrc && !imageBroken ? (
            <Image
              src={imageSrc}
              alt={alt}
              width={1200}
              height={675}
              loading="lazy"
              onLoadingComplete={onImageLoad}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={90}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              unoptimized={imageSrc.startsWith("http")}
              onError={() => setImageBroken(true)}
              style={capWidth ? { maxWidth: `${capWidth}px`, marginLeft: "auto", marginRight: "auto" } : undefined}
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
            {(blog.content ?? "").replace(/<[^>]*>/g, "").substring(0, 150)}{(blog.content ?? "").length > 150 ? "..." : ""}
          </p>
          <div className="mt-auto flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
            <span className="text-[var(--primary-blue)] font-semibold group-hover:translate-x-1 transition">Read →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogList({ initialBlogs }: { initialBlogs: any[] }) {
  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
          <p className="text-[var(--text-muted)]">Latest news and insights about mobile technology</p>
        </div>

        {/* Blog Grid */}
        {initialBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-xl text-[var(--text-muted)]">No blog posts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {initialBlogs.map((blog: any) => (
              <div key={blog.id}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}