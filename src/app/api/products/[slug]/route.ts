
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getRedis, setRedis } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const cacheKey = `product:${slug}`;
    let product = await getRedis(cacheKey);
    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug },
      });
      if (product) {
        await setRedis(cacheKey, product, 300); // cache for 5 min
      }
    }
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
