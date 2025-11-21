import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error instanceof Error ? error.message : error, error);
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error && (error as Error).stack ? (error as Error).stack : undefined;
    return NextResponse.json({ error: `Failed to fetch product: ${errMsg}`, stack: errStack }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    const updated = await prisma.product.update({ where: { id }, data: body });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating product:", error instanceof Error ? error.message : error, error);
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error && (error as Error).stack ? (error as Error).stack : undefined;
    return NextResponse.json({ error: `Failed to update product: ${errMsg}`, stack: errStack }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting product:", error instanceof Error ? error.message : error, error);
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error && (error as Error).stack ? (error as Error).stack : undefined;
    return NextResponse.json({ error: `Failed to delete product: ${errMsg}`, stack: errStack }, { status: 500 });
  }
}
