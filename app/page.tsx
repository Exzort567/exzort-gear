import Image from "next/image";
import Link from "next/link";
import { fetchShopify } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

export default async function Home() {
  const { data } = await fetchShopify({
    query: `
      query FeaturedProducts {
        products(first: 6, sortKey: BEST_SELLING) {
          edges {
            node {
              id
              title
              handle
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  const products = data?.products?.edges || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6 tracking-tight">
              Premium Tech Gear
              <br />
              <span className="bg-linear-to-r from-zinc-600 to-zinc-900 dark:from-zinc-400 dark:to-white bg-clip-text text-transparent">
                For Professionals
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              Elevate your workspace with our curated collection of premium keyboards, 
              mice, headphones, and accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8">
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/collections">
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Browse Collections
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Experience unmatched performance and responsiveness
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Built to last with the finest materials
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-black dark:text-white mb-2">
                Free Shipping
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Fast and free delivery on all orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-zinc-50 dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Discover our most popular tech gear, carefully selected for quality and performance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map(({ node }: any) => (
              <ProductCard key={node.id} product={node} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button size="lg">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black dark:bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-black mb-4">
            Ready to Upgrade Your Setup?
          </h2>
          <p className="text-xl text-zinc-300 dark:text-zinc-700 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust Exzort Gear for their workspace needs
          </p>
          <Link href="/products">
            <Button variant="outline" size="lg" className="border-white dark:border-black text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}