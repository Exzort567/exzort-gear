import Link from 'next/link';
import Button from '@/components/Button';
import { CheckCircle, Package, Mail, Truck } from 'lucide-react';

export default function CheckoutSuccessPage() {
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
            <p className="text-neutral-500 dark:text-neutral-500">
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
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Back to Home</Button>
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
