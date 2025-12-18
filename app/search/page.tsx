import { Metadata } from 'next';
import Link from 'next/link';
import { fetchShopify } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import { Search, ArrowRight } from 'lucide-react';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: 'Search - Exzort Gear',
  description: 'Search for products',
};

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = params.q || '';

  let products = [];

  if (query) {
    const { data } = await fetchShopify({
      query: `
        query SearchProducts($query: String!) {
          products(first: 24, query: $query) {
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
      `,
      variables: { query }
    });

    products = data?.products?.edges || [];
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Search className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Search Results
            </h1>
          </div>
          {query && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              {products.length > 0 
                ? <>Found <span className="font-semibold text-black dark:text-white">{products.length}</span> result{products.length !== 1 ? 's' : ''} for "<span className="font-semibold text-black dark:text-white">{query}</span>"</>
                : <>No results found for "<span className="font-semibold text-black dark:text-white">{query}</span>"</>
              }
            </p>
          )}
        </div>

        {!query ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Search className="h-10 w-10 text-neutral-400" />
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-2">
              Enter a search term to find products
            </p>
            <p className="text-neutral-500">
              Try searching for categories, brands, or product names
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Search className="h-10 w-10 text-neutral-400" />
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-4">
              No products found
            </p>
            <p className="text-neutral-500 mb-8">
              Try searching with different keywords
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center gap-2 text-black dark:text-white hover:gap-3 transition-all duration-300"
            >
              Browse all products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(({ node }: any, index: number) => (
              <div 
                key={node.id} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={node} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
