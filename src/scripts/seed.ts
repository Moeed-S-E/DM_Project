import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.blog.deleteMany();
  await prisma.product.deleteMany();

  // Create products from CSV data
  const products = await prisma.product.createMany({
    data: [
      {
        title: "Samsung Galaxy A15",
        slug: "samsung-galaxy-a15",
        description: "Premium Samsung smartphone with excellent display and camera",
        price: 299.99,
        salePrice: 249.99,
        category: "Samsung",
        image: "samsung-a15.webp",
        stock: 50,
      },
      {
        title: "Samsung Galaxy S24",
        slug: "samsung-galaxy-s24",
        description: "Latest Samsung flagship with advanced AI features",
        price: 799.99,
        salePrice: 699.99,
        category: "Samsung",
        image: "samsung-s24.webp",
        stock: 15,
      },
      {
        title: "iPhone 15 Pro",
        slug: "iphone-15-pro",
        description: "Apple iPhone 15 Pro with A17 Pro chip",
        price: 999.99,
        salePrice: 899.99,
        category: "iPhone",
        image: "iphone-15-pro.webp",
        stock: 20,
      },
      {
        title: "Redmi Note 13",
        slug: "redmi-note-13",
        description: "Excellent budget smartphone with 120Hz display",
        price: 249.99,
        salePrice: null,
        category: "Redmi",
        image: "redmi-note-13.webp",
        stock: 30,
      },
      {
        title: "Infinix Zero 30",
        slug: "infinix-zero-30",
        description: "Premium design with fast charging",
        price: 349.99,
        salePrice: 299.99,
        category: "Infinix",
        image: "infinix-zero-30.webp",
        stock: 12,
      },
      {
        title: "Tecno Spark 20",
        slug: "tecno-spark-20",
        description: "Affordable phone with big battery",
        price: 179.99,
        salePrice: null,
        category: "Tecno",
        image: "tecno-spark-20.webp",
        stock: 25,
      },
      {
        title: "Vivo X100",
        slug: "vivo-x100",
        description: "Innovative camera system",
        price: 599.99,
        salePrice: 549.99,
        category: "Vivo",
        image: "vivo-x100.webp",
        stock: 10,
      },
      {
        title: "Wireless Earbuds Pro",
        slug: "wireless-earbuds-pro",
        description: "Premium noise-cancelling earbuds",
        price: 129.99,
        salePrice: 99.99,
        category: "Earbuds",
        image: "earbuds-pro.webp",
        stock: 50,
      },
      {
        title: "Fast Charger 65W",
        slug: "fast-charger-65w",
        description: "Ultra-fast charging for all devices",
        price: 49.99,
        salePrice: null,
        category: "Chargers",
        image: "charger-65w.webp",
        stock: 100,
      },
      {
        title: "iPhone 17",
        slug: "iphone-17",
        description: "Latest apple flagship with advanced AI features and camera",
        price: 500000,
        salePrice: 450000,
        category: "iPhone",
        image: "iphone-17.webp",
        stock: 10,
      },
    ],
  });

  // Create blogs
  const blogs = await prisma.blog.createMany({
    data: [
      {
        title: "Latest Smartphone Trends 2024",
        slug: "latest-smartphone-trends-2024",
        content:
          "<h2>AI-Powered Cameras</h2><p>Modern smartphones now feature advanced AI chips dedicated to photography...</p><h2>Battery Innovation</h2><p>New fast-charging technologies are pushing limits...</p>",
        coverImage: "https://via.placeholder.com/600x400?text=Smartphone+Trends",
      },
      {
        title: "How to Choose the Right Laptop",
        slug: "how-to-choose-right-laptop",
        content:
          "<h2>Processing Power</h2><p>Consider your workflow requirements...</p><h2>Display Quality</h2><p>Resolution and refresh rates matter for productivity...</p>",
        coverImage: "https://via.placeholder.com/600x400?text=Laptop+Guide",
      },
      {
        title: "Wireless Technology Explained",
        slug: "wireless-technology-explained",
        content:
          "<h2>Bluetooth Evolution</h2><p>From Bluetooth 4.0 to 5.4, learn the improvements...</p><h2>WiFi 6E</h2><p>The next generation of wireless networking...</p>",
        coverImage: "https://via.placeholder.com/600x400?text=Wireless+Tech",
      },
    ],
  });

  console.log(`✓ Seeded ${products.count} products`);
  console.log(`✓ Seeded ${blogs.count} blogs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
