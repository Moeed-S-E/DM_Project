
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const cacheKey = "blogs:list";
    let blogs = await getRedis(cacheKey);
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
      await setRedis(cacheKey, blogs, 300); // cache for 5 min
    }
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
