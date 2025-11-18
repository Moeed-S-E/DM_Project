'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const sum = parsedCart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
      setTotal(sum);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setOrderPlaced(true);
      localStorage.removeItem('cart');
      setIsProcessing(false);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-[var(--text-muted)] mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <p className="text-lg font-semibold mb-8">Order Total: ${total.toFixed(2)}</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-lg text-[var(--text-muted)] mb-6">Your cart is empty</p>
        <Link href="/products" className="px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg hover:opacity-90 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)]">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="col-span-2 px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)]">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number (1234 5678 9012 3456)"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength={5}
                    required
                    className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength={4}
                    required
                    className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)] h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 pb-4 border-b border-[var(--level1-border)]">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.title} x {item.quantity}
                  </span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Shipping</span>
                <span>$0.00 (Free)</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-[var(--level1-border)] pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/cart"
              className="block text-center px-4 py-2 text-[var(--primary-blue)] border border-[var(--primary-blue)] rounded-lg hover:bg-[var(--level1-bg)] transition"
            >
              Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
