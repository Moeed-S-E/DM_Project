import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const raw = fs.readFileSync('./recovered_products.json', 'utf-8');
  const products = JSON.parse(raw);

  console.log(`Restoring ${products.length} products with upsert...`);

  for (const p of products) {
    // Safety: ensure slug exists
    if (!p.slug) {
      console.warn('Skipping product missing slug', p);
      continue;
    }

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice ?? null,
        stock: p.stock,
        image: p.image,
        category: p.category,
      },
      create: p,
    });
  }

  console.log('Restore complete');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
