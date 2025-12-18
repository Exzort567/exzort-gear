import { Metadata } from 'next';
import { fetchShopify } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Folder } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Folder className="h-6 w-6 text-neutral-600 dark:text-neutral-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
              Collections
            </h1>
          </div>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Explore our curated product collections
          </p>
        </div>

        {collections.length === 0 ? (
          <div className="text-center py-24 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <Folder className="h-10 w-10 text-neutral-400" />
            </div>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              No collections found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map(({ node }: any, index: number) => (
              <Link 
                key={node.id} 
                href={`/collections/${node.handle}`}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden hover-lift">
                  {/* Collection Image */}
                  <div className="aspect-[16/10] relative w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                    {node.image ? (
                      <Image
                        src={node.image.url}
                        alt={node.image.altText || node.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-neutral-400">
                        <span className="text-lg font-medium">{node.title}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Title on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {node.title}
                      </h3>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="p-6">
                    {node.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                        {node.description}
                      </p>
                    )}
                    <div className="flex items-center text-black dark:text-white font-medium group-hover:gap-3 gap-2 transition-all duration-300">
                      View Collection
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
