import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { delRedis } from "@/lib/redis";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, salePrice, stock, image, category, slug } = body;
    if (!title || !description) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        title,
        slug: finalSlug,
        description,
        price: Number(price) || 0,
        salePrice: salePrice ? Number(salePrice) : null,
        stock: Number(stock) || 0,
        image: image || "",
        category: category || "",
      },
    });

    // invalidate list cache so next request fetches fresh data
    try {
      await delRedis("products:list");
    } catch (err) {
      console.error("Failed to invalidate products:list cache", err);
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error instanceof Error ? error.message : error, error);
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error && (error as Error).stack ? (error as Error).stack : undefined;
    return NextResponse.json({ error: `Failed to create product: ${errMsg}`, stack: errStack }, { status: 500 });
  }
}
