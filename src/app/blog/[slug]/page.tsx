"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState<any | undefined>(undefined);
  const [imageBroken, setImageBroken] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [capWidth, setCapWidth] = useState<number | null>(null);

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

  if (blog === undefined) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 bg-[var(--bg-color)] text-[var(--text-color)]">
        <div className="w-full h-56 bg-[var(--level1-bg)] rounded-lg mb-6 animate-pulse" />
        <div className="h-8 w-3/4 bg-[var(--level1-bg)] rounded mb-4 animate-pulse" />
        <div className="h-4 w-1/2 bg-[var(--level1-bg)] rounded mb-2 animate-pulse" />
        <div className="space-y-3 mt-6">
          <div className="h-4 bg-[var(--level1-bg)] rounded w-full animate-pulse" />
          <div className="h-4 bg-[var(--level1-bg)] rounded w-11/12 animate-pulse" />
          <div className="h-4 bg-[var(--level1-bg)] rounded w-10/12 animate-pulse" />
        </div>
      </main>
    );
  }

  if (blog === null) return <div className="p-8 text-center text-red-500">Blog post not found.</div>;

  let alt = `Cover image for blog post: ${blog.title} — MHMmobiles Blog`;
  if (blog.coverImage && blog.coverImage.match) {
    const keywords = blog.coverImage.match(/(\w-]+)/g)?.slice(1).join(" ");
    if (keywords) alt += ` — ${keywords.replace(/-/g, ' ')}`;
  }

  // Treat obvious placeholder values as "no image"
  const hasValidCover = blog.coverImage && typeof blog.coverImage === 'string' && blog.coverImage !== 'xyz' && blog.coverImage.trim() !== '';

  const blogImageSrc = hasValidCover
    ? blog.coverImage.startsWith('http')
      ? blog.coverImage
      : blog.coverImage.startsWith('/')
      ? blog.coverImage
      : `/blog/${blog.coverImage}`
    : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 bg-[var(--bg-color)] text-[var(--text-color)] overflow-x-hidden">
      {blogImageSrc && !imageBroken ? (
        <div ref={wrapperRef} className="w-full mb-6">
          <Image
            src={blogImageSrc}
            alt={alt}
            width={100}
            height={90}
            priority
            quality={90}
            placeholder="empty"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="rounded-lg object-cover shadow-lg border border-[var(--level1-border)] w-full max-h-64 md:max-h-80 md:scale-90"
            onLoadingComplete={(res) => {
              try {
                const natural = res?.naturalWidth || 0;
                const container = wrapperRef.current?.clientWidth || 0;
                if (natural && container && natural < container) setCapWidth(natural);
              } catch (e) {}
            }}
            onError={() => setImageBroken(true)}
            style={capWidth ? { maxWidth: `${capWidth}px`, marginLeft: "auto", marginRight: "auto" } : undefined}
          />
        </div>
      ) : null}
      <h1 className={`text-3xl font-bold mb-2 text-[var(--primary-blue)] ${blogImageSrc ? '' : 'mt-2'}`}>{blog.title}</h1>
      <p className="text-[var(--text-muted)] mb-4">{new Date(blog.createdAt).toLocaleDateString()}</p>
      <article className="prose prose-lg blog-content text-[var(--text-secondary)] max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </main>
  );
}

// AT5PAAIncDI1ZTU5ZThkY2RiYjE0YzEyYWU0YTg4MWJiZWVkZTE0NHAyMTU5NTE