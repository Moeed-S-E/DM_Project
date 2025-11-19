import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity } = body;
    if (!id || !quantity) {
      return NextResponse.json({ error: 'Missing id or quantity' }, { status: 400 });
    }

    // fetch product
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    if (product.stock < quantity) {
      return NextResponse.json({ error: 'Insufficient stock', stock: product.stock }, { status: 409 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: { stock: product.stock - quantity },
    });

    return NextResponse.json({ ok: true, product: updated });
  } catch (err) {
    console.error('Error decrementing stock:', err);
    return NextResponse.json({ error: 'Failed to decrement' }, { status: 500 });
  }
}
