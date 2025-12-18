'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/hooks/useCart';
import Button from '@/components/Button';
import { CreditCard, Lock, ArrowLeft, Shield, Truck } from 'lucide-react';
import { saveOrder, generateOrderNumber, generateTrackingNumber } from '@/lib/orderStorage';
import { Order } from '@/lib/types/order';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Redirect to cart if empty
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push('/cart');
    }
  }, [cart.items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create order object
    const orderNumber = generateOrderNumber();
    const trackingNumber = generateTrackingNumber();
    
    const order: Order = {
      id: crypto.randomUUID(),
      orderNumber,
      date: new Date().toISOString(),
      status: 'processing',
      customer: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: cart.items.map(item => ({
        id: item.variantId,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      subtotal: cart.total,
      tax: cart.total * 0.1,
      shipping: 0,
      total: cart.total * 1.1,
      currency: cart.currency,
      trackingNumber,
    };

    // Save order to local storage
    saveOrder(order);

    // Clear cart and redirect to success page with order number
    clearCart();
    router.push(`/checkout/success?orderNumber=${orderNumber}`);
  };

  // Format currency
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Show loading or nothing while redirecting
  if (cart.items.length === 0) {
    return null;
  }

  const inputClasses = "w-full px-4 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-white dark:bg-neutral-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-300 placeholder:text-neutral-400";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/cart" 
          className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-8 group animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Cart
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-12 animate-fade-in">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in">
            {/* Contact Information */}
            <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover-lift">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                Contact Information
              </h2>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover-lift">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl hover-lift">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Payment Information
                </h2>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm">Demo Mode</span>
                </div>
              </div>
              
              {/* Demo Notice */}
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Demo Store:</strong> No real payment will be processed. You can enter any card details.
                </p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 animate-fade-in stagger-1">
            <div className="sticky top-24 p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-black dark:text-white font-medium">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-y border-neutral-200 dark:border-neutral-800">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
                  <span className="text-black dark:text-white">{formatPrice(cart.total, cart.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600 dark:text-neutral-400">Tax (10%)</span>
                  <span className="text-black dark:text-white">{formatPrice(cart.total * 0.1, cart.currency)}</span>
                </div>
              </div>

              <div className="py-6 mb-6">
                <div className="flex justify-between text-xl font-bold text-black dark:text-white">
                  <span>Total</span>
                  <span>{formatPrice(cart.total * 1.1, cart.currency)}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mb-4"
                isLoading={isProcessing}
                disabled={isProcessing}
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs">Secure</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <Truck className="h-4 w-4" />
                  <span className="text-xs">Free Shipping</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
