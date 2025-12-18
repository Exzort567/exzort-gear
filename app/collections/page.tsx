import { Metadata } from 'next';
import { fetchShopify } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Collections - Exzort Gear',
  description: 'Browse our product collections',
};

export default async function CollectionsPage() {
  const { data } = await fetchShopify({
    query: `
      query Collections {
        collections(first: 10) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
              products(first: 1) {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  const collections = data?.collections?.edges || [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
          Collections
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Explore our curated product collections
        </p>
      </div>

      {collections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-600 dark:text-zinc-400">No collections found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map(({ node }: any) => (
            <Link 
              key={node.id} 
              href={`/collections/${node.handle}`}
              className="group"
            >
              <div className="relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Collection Image */}
                <div className="aspect-video relative w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  {node.image ? (
                    <Image
                      src={node.image.url}
                      alt={node.image.altText || node.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-400">
                      {node.title}
                    </div>
                  )}
                </div>

                {/* Collection Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                    {node.title}
                  </h3>
                  {node.description && (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {node.description}
                    </p>
                  )}
                  <div className="mt-4">
                    <span className="text-sm text-black dark:text-white font-medium underline">
                      View Collection →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
