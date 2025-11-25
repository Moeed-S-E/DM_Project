
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const cacheKey = "products:list";
    let products = await getRedis(cacheKey);
    if (!products) {
      products = await prisma.product.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          salePrice: true,
          stock: true,
          image: true,
          category: true,
        },
        orderBy: { createdAt: "desc" },
      });
      // cache in redis for 7 days (in seconds)
      await setRedis(cacheKey, products, 60 * 60 * 24 * 7);
    }
    return NextResponse.json(products, {
      headers: {
        // allow CDN and browser to cache for 7 days
        "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
