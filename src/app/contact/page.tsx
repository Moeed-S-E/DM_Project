
"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Auto-close modal after a short delay
  useEffect(() => {
    if (!showModal) return;
    const t = setTimeout(() => setShowModal(false), 5000);
    return () => clearTimeout(t);
  }, [showModal]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSending(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setShowModal(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data?.error || "Failed to send. Try again later.");
      }
    } catch (err: any) {
      setError(err?.message || "Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Contact', href: '/contact' },
      ]} />
      <h1 className="text-3xl font-bold mb-6 text-text-primary">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Intro / Contact details */}
        <aside className="prose prose-sm text-[var(--text-secondary)]">
          <p className="mb-4">
            Have a question about a product, an order, or warranty? We're here to help. Fill the form and our support team will respond within 24 hours on business days. For urgent order issues, include your order number in the message.
          </p>

          <h3 className="text-lg font-semibold">Other ways to reach us</h3>
          <ul className="list-inside list-disc mb-4">
            <li>Email: <a href="mailto:support@mhmmobiles.com" className="text-[var(--primary-blue)]">support@mhmmobiles.com</a></li>
            <li>Phone: <a href="tel:+923001234567" className="text-[var(--primary-blue)]">+92 300 1234567</a> (Mon-Fri, 9am–6pm)</li>
          </ul>

          <h3 className="text-lg font-semibold">Before you send</h3>
          <p className="mb-2">To help us respond faster, please include:</p>
          <ul className="list-inside list-disc text-[var(--text-muted)]">
            <li>Order number (if applicable)</li>
            <li>Device model and serial/IMEI (for warranty inquiries)</li>
            <li>A clear description of the issue or question</li>
          </ul>
        </aside>

        {/* Right: Form */}
        <section>
          <form className="bg-[var(--card-bg)] border border-[var(--level1-border)] rounded-xl shadow-sm p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-[var(--text-color)]">Your Name</label>
        <input
          className="p-3 rounded border border-[var(--level1-border)] bg-[var(--bg-color)] text-[var(--text-color)]"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium text-[var(--text-color)]">Email</label>
        <input
          className="p-3 rounded border border-[var(--level1-border)] bg-[var(--bg-color)] text-[var(--text-color)]"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium text-[var(--text-color)]">Message</label>
        <textarea
          className="p-3 rounded border border-[var(--level1-border)] bg-[var(--bg-color)] text-[var(--text-color)] resize-none custom-scrollbar"
          name="message"
          placeholder="Your message..."
          value={form.message}
          onChange={handleChange}
          required
          rows={8}
          maxLength={4000}
        />

        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={sending}
            className={`px-6 py-3 rounded-lg bg-[var(--primary-blue)] text-white font-semibold shadow hover:opacity-95 transition ${sending ? 'opacity-60 cursor-wait' : ''}`}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {error && <p className="text-sm text-[var(--text-muted)]">{error}</p>}
        </div>
          </form>
          {/* Success modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
              <div className="relative bg-[var(--card-bg)] border border-[var(--level1-border)] rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-color)]">Message Sent</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">Thanks for contacting MHMmobiles. We'll get back to you shortly.</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-[var(--primary-blue)] text-white font-semibold hover:opacity-95 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
