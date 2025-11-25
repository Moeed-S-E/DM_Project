import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { delRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, coverImage, slug } = body;
    if (!title || !content) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: finalSlug,
        content,
        coverImage: coverImage || "",
      },
    });

    // invalidate blogs list cache
    try {
      await delRedis("blogs:list");
    } catch (err) {
      console.error("Failed to invalidate blogs:list cache", err);
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
