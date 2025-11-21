'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PKR = new Intl.NumberFormat('en-PK', {
  style: 'currency',
  currency: 'PKR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface CartItem {
  id: number;
  title: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  image: string;
  quantity: number;
}

export default function Checkout() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
    }
    setLoading(false);
  }, []);

  const getItemPrice = (item: CartItem) => {
    return item.salePrice && item.salePrice > 0 ? item.salePrice : item.price;
  };

  const calculateItemTotal = (item: CartItem) => {
    return getItemPrice(item) * item.quantity;
  };

  const subtotal = cart.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  const shippingCost = subtotal > 0 ? 500 : 0;
  const tax = Math.round(subtotal * 0.17);
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setOrderPlaced(true);
      localStorage.removeItem('cart');
      setIsProcessing(false);
    }, 1500);
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
          <p className="text-lg font-semibold mb-8">Order Total: {PKR.format(total)}</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-primary-blue text-white rounded-lg hover:opacity-90 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)]">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-4">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-lg text-[var(--text-muted)] mb-6">Your cart is empty</p>
        <Link href="/products" className="px-6 py-3 bg-primary-blue text-white rounded-lg hover:opacity-90 transition">
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
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="col-span-2 px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <textarea
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="col-span-2 px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="px-4 py-2 border rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--level1-border)] focus:outline-none focus:ring-2 focus:ring-primary-blue"
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)]">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-[var(--level1-border)] last:border-b-0">
                    <div className="w-20 h-20 flex-shrink-0">
                      <Image
                        src={`/${item.image}`}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-[var(--text-muted)]">Qty: {item.quantity}</p>
                      <div className="flex gap-2 mt-1">
                        {item.salePrice && item.salePrice > 0 ? (
                          <>
                            <span className="text-sm line-through text-[var(--text-muted)]">{PKR.format(item.price)}</span>
                            <span className="font-semibold text-success">{PKR.format(item.salePrice)}</span>
                          </>
                        ) : (
                          <span className="font-semibold">{PKR.format(item.price)}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{PKR.format(calculateItemTotal(item))}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)] h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4 pb-4 border-b border-[var(--level1-border)]">
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Subtotal</span>
                <span className="font-semibold">{PKR.format(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Shipping</span>
                <span className="font-semibold">{PKR.format(shippingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Tax (17% GST)</span>
                <span className="font-semibold">{PKR.format(tax)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-6 text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-primary-blue">{PKR.format(total)}</span>
            </div>

            <Link
              href="/cart"
              className="block text-center px-4 py-2 text-primary-blue border border-primary-blue rounded-lg hover:bg-[var(--level1-bg)] transition"
            >
              Edit Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
