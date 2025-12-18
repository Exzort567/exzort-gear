import Link from 'next/link';
import Button from '@/components/Button';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 mx-auto text-green-500 mb-6" />
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2">
            Thank you for your order.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400">
            We've sent a confirmation email with your order details.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-black dark:text-white mb-4">
            What's Next?
          </h2>
          <ul className="text-left space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Order confirmation sent to your email</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>We'll notify you when your order ships</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Track your package with the tracking number provided</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg">Back to Home</Button>
          </Link>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-8">
          Need help? Contact our support team at support@exzortgear.com
        </p>
      </div>
    </div>
  );
}
