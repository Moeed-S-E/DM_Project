"use client";
import Breadcrumbs from "@/components/Breadcrumbs";
export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
      ]} />
      <h1 className="text-3xl font-bold mb-4 text-text-primary">About MHMmobiles</h1>
      <div className="space-y-4">
        <p className="text-lg text-text-secondary mb-4">
          MHMmobiles is your trusted destination for premium smartphones and accessories across Pakistan. We partner with authorized distributors to bring genuine devices from top brands including Samsung, Apple (iPhone), Redmi, Vivo, Infinix and Tecno. Whether you're looking for an affordable mobile phone or the latest flagship with the best camera, we make it simple to compare specs, read honest reviews, and buy with confidence.
        </p>

        <p className="text-text-secondary mb-4">
          We focus on three things: authenticity, transparent pricing, and great service. Every product we list is verified for authenticity; our team updates mobile prices frequently so you always see current offers. Orders are dispatched quickly with trackable shipping and customer support available for setup help, warranty claims, and returns.
        </p>

        <h2 className="text-xl font-semibold mt-2">What we offer</h2>
        <ul className="list-disc pl-6 text-text-muted mb-4">
          <li>100% genuine products and manufacturer warranties where applicable</li>
          <li>Updated mobile prices and regular promotions</li>
          <li>Fast, trackable delivery to major cities across Pakistan</li>
          <li>Helpful buying advice for android phones, camera phones and budget mobiles</li>
        </ul>

        <h2 className="text-xl font-semibold mt-2">Our mission</h2>
        <p className="text-text-secondary">
          Our mission is to make purchasing a new mobile phone easy and worry-free. We aim to educate buyers with clear product information and honest reviews, offer fair prices, and provide reliable after-sales support so customers can enjoy their devices without hassles.
        </p>

        <p className="text-text-secondary">
          If you have questions about a product or need personalized recommendations, our team is ready to help — use the contact form to get in touch and we'll respond promptly.
        </p>
      </div>
    </main>
  );
}
