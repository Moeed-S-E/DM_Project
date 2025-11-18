"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setStatus("Message sent!");
    else setStatus("Failed to send. Try again.");
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-text-primary">Contact Us</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-3 rounded border"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="p-3 rounded border"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          className="p-3 rounded border"
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-primary-blue text-base-white font-semibold shadow hover:bg-secondary-teal transition"
        >
          Send Message
        </button>
        {status && <p className="text-sm text-info mt-2">{status}</p>}
      </form>
    </main>
  );
}
