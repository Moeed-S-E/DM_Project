
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cacheKey = `blog:${slug}`;
    let blog = await getRedis(cacheKey);
    if (!blog) {
      blog = await prisma.blog.findUnique({
        where: { slug },
      });
      if (blog) {
        // cache in redis for 7 days
        await setRedis(cacheKey, blog, 60 * 60 * 24 * 7);
      }
    }
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blog, {
      headers: {
        "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
