import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchShopify } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  
  const { data } = await fetchShopify({
    query: `
      query CollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          title
          description
        }
      }
    `,
    variables: { handle }
  });

  return {
    title: data?.collectionByHandle?.title || 'Collection',
    description: data?.collectionByHandle?.description || '',
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  
  const { data } = await fetchShopify({
    query: `
      query CollectionByHandle($handle: String!) {
        collectionByHandle(handle: $handle) {
          id
          title
          description
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
      }
    `,
    variables: { handle }
  });

  const collection = data?.collectionByHandle;

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl">
            {collection.description}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No products in this collection.</p>
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
