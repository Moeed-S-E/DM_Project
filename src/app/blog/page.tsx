import { prisma } from "@/lib/prisma";
import BlogList from "./BlogList.client";

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
      coverImage: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return <BlogList initialBlogs={blogs} />;
}
