
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
      await setRedis(cacheKey, products, 300); // cache for 5 min
    }
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
