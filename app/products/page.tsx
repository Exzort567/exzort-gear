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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          All Products
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Explore our complete collection of premium tech gear
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(({ node }: any) => (
            <ProductCard key={node.id} product={node} />
          ))}
        </div>
      )}
    </div>
  );
}
