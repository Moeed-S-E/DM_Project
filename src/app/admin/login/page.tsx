export default function AdminLoginPage() {
  return (
    <main className="max-w-xs mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6 text-text-primary">Admin Login</h1>
      <form className="flex flex-col gap-4">
        <input className="p-3 rounded border" name="username" placeholder="Username" required />
        <input className="p-3 rounded border" name="password" type="password" placeholder="Password" required />
        <button type="submit" className="px-6 py-3 rounded-lg bg-primary-blue text-base-white font-semibold shadow hover:bg-secondary-teal transition">Login</button>
      </form>
    </main>
  );
}
