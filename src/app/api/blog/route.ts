
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const cacheKey = "blogs:list";
    const url = new URL(request.url);
    const refresh = url.searchParams.get("refresh") || url.searchParams.get("r");

    // If refresh flag is provided, bypass cache and fetch fresh data
    let blogs = null;
    if (!refresh) {
      blogs = await getRedis(cacheKey);
    }
    if (!blogs) {
      blogs = await prisma.blog.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          coverImage: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
      // cache in redis for 1 day (reduce long-stale responses)
      await setRedis(cacheKey, blogs, 60 * 60 * 24);
    }
    return NextResponse.json(blogs, {
      headers: {
        "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
