'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/hooks/useCart';
import Button from '@/components/Button';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeItem } = useCart();

  // Format currency
  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
              Your cart is empty
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8">
              Discover our collection and find something you'll love.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-2 animate-fade-in">
          Shopping Cart
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 animate-fade-in stagger-1">
          {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item, index) => (
              <div
                key={item.variantId}
                className={`group flex gap-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-2xl animate-fade-in stagger-${(index % 4) + 1}`}
              >
                {/* Product Image */}
                <Link href={`/products/${item.handle}`} className="shrink-0">
                  <div className="relative w-28 h-28 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="112px"
                    />
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${item.handle}`}>
                      <h3 className="font-semibold text-lg text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      {item.variant}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-black dark:text-white mt-2">
                    {formatPrice(item.price * item.quantity, item.currency)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-black dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-8 bg-neutral-50 dark:bg-neutral-900 rounded-2xl animate-fade-in stagger-2">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.total, cart.currency)}</span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 mb-8">
                <div className="flex justify-between text-xl font-bold text-black dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(cart.total, cart.currency)}</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full rounded-full">
                  Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/products" className="block mt-4">
                <Button variant="ghost" size="lg" className="w-full rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
