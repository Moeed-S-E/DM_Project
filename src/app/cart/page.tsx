'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  const calculateTotal = (items: any[]) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setTotal(0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-color)] text-[var(--text-color)] px-4">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
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
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--level1-border)] shadow-sm"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-[var(--level1-bg)] rounded flex items-center justify-center">
                  {item.image ? (
                    (() => {
                      const src = item.image?.startsWith('http')
                        ? item.image
                        : item.image?.startsWith('/')
                        ? item.image
                        : `/products/${item.image}`;
                      return (
                        <Image
                          src={src}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover rounded"
                        />
                      );
                    })()
                  ) : (
                    <span className="text-[var(--text-muted)]">No image</span>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm mb-2">{item.category}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[var(--primary-blue)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <span className="text-sm text-[var(--text-muted)]">
                      ${item.price.toFixed(2)} each
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-[var(--level1-bg)] rounded hover:bg-[var(--level1-border)] transition"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-[var(--level1-bg)] rounded hover:bg-[var(--level1-border)] transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start text-[var(--error)] hover:text-red-700 font-semibold"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-[var(--card-bg)] p-6 rounded-lg border border-[var(--level1-border)] h-fit shadow-sm">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6 pb-4 border-b border-[var(--level1-border)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Shipping</span>
                <span>$0.00 (Free)</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="block w-full px-6 py-3 bg-[var(--primary-blue)] text-white rounded-lg font-semibold hover:opacity-90 transition text-center mb-3"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => (window.location.href = '/products')}
              className="block w-full px-6 py-3 bg-[var(--level1-bg)] text-[var(--level1-text)] rounded-lg font-semibold hover:opacity-80 transition mb-3"
            >
              Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="block w-full px-6 py-3 text-[var(--error)] border border-[var(--error)] rounded-lg font-semibold hover:bg-red-50 dark:hover:bg-red-950 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
