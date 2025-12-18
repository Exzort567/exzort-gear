import { Metadata } from 'next';
import { fetchShopify } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          Search Results
        </h1>
        {query && (
          <p className="text-zinc-600 dark:text-zinc-400">
            {products.length > 0 
              ? `Found ${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`
            }
          </p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">
            Enter a search term to find products
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Try searching with different keywords
          </p>
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
