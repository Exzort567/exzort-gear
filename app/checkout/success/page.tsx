'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { CheckCircle, Package, Mail, Truck, Copy, Check } from 'lucide-react';
import { getOrderByNumber } from '@/lib/orderStorage';
import { Order } from '@/lib/types/order';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderNumber) {
      const foundOrder = getOrderByNumber(orderNumber);
      setOrder(foundOrder);
    }
  }, [orderNumber]);

  const copyOrderNumber = () => {
    if (orderNumber) {
      navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="animate-fade-in stagger-1">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">
              Thank you for your order.
            </p>
            {order && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Order Number:</span>
                <span className="text-sm font-bold text-black dark:text-white">{order.orderNumber}</span>
                <button
                  onClick={copyOrderNumber}
                  className="p-1 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded transition-colors"
                  title="Copy order number"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-neutral-400" />
                  )}
                </button>
              </div>
            )}
            <p className="text-neutral-500 dark:text-neutral-500 mt-4">
              We've sent a confirmation email with your order details.
            </p>
          </div>

          {/* What's Next Card */}
          <div className="mt-12 p-8 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl animate-fade-in stagger-2">
            <h2 className="text-xl font-bold text-black dark:text-white mb-6">
              What's Next?
            </h2>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'Order confirmation sent to your email' },
                { icon: Package, text: "We'll notify you when your order ships" },
                { icon: Truck, text: 'Track your package with the tracking number provided' },
              ].map(({ icon: Icon, text }, index) => (
                <div 
                  key={text}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-left text-neutral-700 dark:text-neutral-300">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in stagger-3">
            {order && (
              <Link href={`/orders/${order.orderNumber}`}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Package className="h-4 w-4 mr-2" />
                  Track Order
                </Button>
              </Link>
            )}
            <Link href="/products">
              <Button variant={order ? "outline" : "primary"} size="lg" className="w-full sm:w-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support Text */}
          <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-10 animate-fade-in stagger-4">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@exzortgear.com" className="text-black dark:text-white hover:underline">
              support@exzortgear.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-neutral-200 dark:border-neutral-800 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
