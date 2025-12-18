import { Metadata } from 'next';
import { fetchShopify } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'All Products - Exzort Gear',
  description: 'Browse our full collection of premium tech gear',
};

export default async function ProductsPage() {
  const { data } = await fetchShopify({
    query: `
      query AllProducts {
        products(first: 24) {
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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="max-w-2xl mb-16 animate-fade-in">
          <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2 block">
            Our Collection
          </span>
          <h1 className="text-5xl font-bold text-black dark:text-white mb-4">
            All Products
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Explore our curated selection of premium tech gear designed for professionals.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg">
              Connect your Shopify store to display products here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map(({ node }: any, index: number) => (
              <div key={node.id} className={`animate-fade-in stagger-${(index % 6) + 1}`}>
                <ProductCard product={node} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
