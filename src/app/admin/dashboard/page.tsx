import AdminAuthGuard from "@/components/AdminAuthGuard";

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-text-primary">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <a href="/admin/products" className="block p-8 rounded-lg bg-level1-bg border-2 border-level1-border text-level1-text font-semibold text-xl hover:shadow-custom transition">Manage Products</a>
          <a href="/admin/blog" className="block p-8 rounded-lg bg-level2-bg border-2 border-level2-border text-level2-text font-semibold text-xl hover:shadow-custom transition">Manage Blog Posts</a>
        </div>
      </main>
    </AdminAuthGuard>
  );
}

// curl -X POST "https://your-site.example.com/api/admin/flush-cache" \
  // -H "x-admin-token: "