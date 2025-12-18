import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Exzort Gear',
  description: 'Learn more about Exzort Gear',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
          About Exzort Gear
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Portfolio Project
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              This e-commerce application is a showcase of modern web development skills, 
              built specifically to demonstrate proficiency in creating full-featured 
              Shopify-integrated stores using cutting-edge technologies.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Technology Stack
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><strong>Next.js 16</strong> - React framework with App Router</li>
              <li><strong>TypeScript</strong> - Type-safe development</li>
              <li><strong>Tailwind CSS v4</strong> - Utility-first styling</li>
              <li><strong>Shopify Storefront API</strong> - Headless commerce integration</li>
              <li><strong>React 19</strong> - Latest React features</li>
              <li><strong>Server Components</strong> - Performance optimization</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Features Implemented
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Dynamic product catalog with Shopify integration</li>
              <li>Product detail pages with variant selection</li>
              <li>Shopping cart with localStorage persistence</li>
              <li>Checkout flow with form validation</li>
              <li>Search functionality</li>
              <li>Collection browsing</li>
              <li>Responsive design for all devices</li>
              <li>Dark mode support</li>
              <li>Optimized images with Next.js Image component</li>
              <li>SEO-friendly with dynamic metadata</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Best Practices
            </h2>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Type-safe TypeScript throughout</li>
              <li>Server-side rendering for SEO</li>
              <li>Component-based architecture</li>
              <li>Custom React hooks for state management</li>
              <li>Responsive and accessible UI</li>
              <li>Performance optimized with code splitting</li>
              <li>Clean, maintainable code structure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Developer Skills Demonstrated
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              This project showcases the ability to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>Integrate with third-party APIs (Shopify Storefront API)</li>
              <li>Build complex user interfaces with React</li>
              <li>Implement state management without heavy libraries</li>
              <li>Create type-safe applications with TypeScript</li>
              <li>Design and implement complete e-commerce workflows</li>
              <li>Write clean, professional code</li>
              <li>Deploy and maintain production-ready applications</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
