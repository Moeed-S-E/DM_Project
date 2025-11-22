
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
        await setRedis(cacheKey, blog, 300); // cache for 5 min
      }
    }
    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
