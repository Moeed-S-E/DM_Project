import { prisma } from "@/lib/prisma";
import ProductsList from "./ProductsList.client";

export default async function ProductsPage() {
  // Server-side fetch to render initial HTML and reduce client JS
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      salePrice: true,
      stock: true,
      image: true,
      category: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return <ProductsList initialProducts={products} />;
}
