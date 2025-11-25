import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { delRedis } from "@/lib/redis";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const body = await request.json();
    // fetch existing to get slug for cache invalidation
    const existing = await prisma.blog.findUnique({ where: { id } });
    const updated = await prisma.blog.update({ where: { id }, data: body });

    try {
      await delRedis("blogs:list");
      if (existing?.slug) await delRedis(`blog:${existing.slug}`);
      if (updated?.slug && updated.slug !== existing?.slug) await delRedis(`blog:${updated.slug}`);
    } catch (err) {
      console.error("Failed to invalidate blog cache", err);
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    const existing = await prisma.blog.findUnique({ where: { id } });
    await prisma.blog.delete({ where: { id } });

    try {
      await delRedis("blogs:list");
      if (existing?.slug) await delRedis(`blog:${existing.slug}`);
    } catch (err) {
      console.error("Failed to invalidate blog cache after delete", err);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
