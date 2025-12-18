import Image from "next/image";
import Link from "next/link";
import { fetchShopify } from "@/lib/shopify";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import { ArrowRight, Zap, Shield, Truck, Star, Sparkles } from "lucide-react";

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
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center bg-white dark:bg-black overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated blobs */}
          <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 h-48 md:w-72 md:h-72 bg-neutral-100 dark:bg-neutral-900 rounded-full blur-3xl opacity-70 animate-blob" />
          <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-56 h-56 md:w-96 md:h-96 bg-neutral-100 dark:bg-neutral-900 rounded-full blur-3xl opacity-60" style={{ animation: 'blob 7s ease-in-out infinite', animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-1/3 w-64 h-64 md:w-[500px] md:h-[500px] bg-neutral-50 dark:bg-neutral-950 rounded-full blur-3xl opacity-50" style={{ animation: 'blob 10s ease-in-out infinite', animationDelay: '4s' }} />
          
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full opacity-60" style={{ animation: 'floatSlow 6s ease-in-out infinite' }} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full opacity-50" style={{ animation: 'floatSlow 8s ease-in-out infinite', animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full opacity-60" style={{ animation: 'floatSlow 7s ease-in-out infinite', animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 mb-6 md:mb-8 animate-fade-in">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-neutral-700 dark:text-neutral-300" />
              <span className="text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">Premium Tech Essentials</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 animate-fade-in stagger-1 leading-tight">
              <span className="text-black dark:text-white">Gear That</span>
              <br />
              <span className="gradient-text">Defines You</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in stagger-2 px-4">
              Curated collection of premium keyboards, mice, and accessories 
              for professionals who demand excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in stagger-3 px-4">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full group bg-black dark:bg-white text-white dark:text-black border-0 hover:shadow-xl hover:shadow-black/30 dark:hover:shadow-white/20 transition-all duration-300 hover:bg-neutral-800 dark:hover:bg-neutral-100">
                  Explore Collection 
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full border-2 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-12 md:mt-16 animate-fade-in stagger-4 text-sm md:text-base">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current text-neutral-800 dark:text-neutral-200" />
                  ))}
                </div>
                <span className="text-xs md:text-sm font-medium">5.0 Rating</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
              <span className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">2,000+ Happy Customers</span>
              <div className="hidden sm:block h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
              <span className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">Free Worldwide Shipping</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-6 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-neutral-600 dark:bg-neutral-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Experience unmatched performance with zero lag" },
              { icon: Shield, title: "Built to Last", desc: "Premium materials that withstand the test of time" },
              { icon: Truck, title: "Free Shipping", desc: "Complimentary delivery on all orders worldwide" }
            ].map((feature, i) => (
              <div 
                key={feature.title}
                className={`group text-center p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover-lift animate-fade-in stagger-${i + 1} hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300`}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-black dark:bg-white text-white dark:text-black mb-4 md:mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-2 md:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
            <div className="animate-fade-in">
              <span className="text-xs md:text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-2 block">
                Featured Collection
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white">
                Best Sellers
              </h2>
            </div>
            <Link href="/products" className="mt-4 md:mt-0 animate-fade-in">
              <span className="inline-flex items-center text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group text-sm md:text-base">
                View all products 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-600 dark:text-neutral-400">
                Connect your Shopify store to display products here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map(({ node }: any, index: number) => (
                <div key={node.id} className={`animate-fade-in stagger-${(index % 6) + 1}`}>
                  <ProductCard product={node} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-black dark:bg-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Animated blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-neutral-800 dark:bg-neutral-200 rounded-full blur-3xl opacity-30" style={{ animation: 'blob 8s ease-in-out infinite' }} />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-neutral-800 dark:bg-neutral-200 rounded-full blur-3xl opacity-30" style={{ animation: 'blob 10s ease-in-out infinite', animationDelay: '3s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dark:text-black mb-4 md:mb-6 animate-fade-in">
              Elevate Your Workspace
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 dark:text-neutral-700 mb-8 md:mb-10 animate-fade-in stagger-1">
              Experience the perfect blend of performance and aesthetics with our premium collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in stagger-2">
              <Link href="/products">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-3 md:py-4 rounded-full border-2 border-white dark:border-black text-white dark:text-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}