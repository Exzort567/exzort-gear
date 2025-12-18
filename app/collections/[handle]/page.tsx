import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchShopify } from '@/lib/shopify';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Package } from 'lucide-react';

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
    title: data?.collectionByHandle?.title ? `${data.collectionByHandle.title} - Exzort Gear` : 'Collection',
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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/collections" 
          className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-8 group animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          All Collections
        </Link>

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl">
              {collection.description}
            </p>
          )}
          <p className="mt-4 text-sm text-neutral-500">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Package className="h-10 w-10 text-neutral-400" />
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              No products in this collection.
            </p>
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
