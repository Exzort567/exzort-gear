import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/lib/types';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    availableForSale?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images.edges[0]?.node;
  const isAvailable = product.availableForSale !== false;

  return (
    <Link href={`/products/${product.handle}`}>
      <div className="group relative rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="aspect-square relative w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-zinc-400">
              No Image
            </div>
          )}
          
          {/* Availability Badge */}
          {!isAvailable && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Sold Out
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-black dark:text-white line-clamp-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
            {product.title}
          </h3>
          <p className="mt-2 text-lg font-bold text-black dark:text-white">
            {price.toFixed(2)} {currency}
          </p>
          
          {/* Quick View on Hover */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm text-zinc-600 dark:text-zinc-400 underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
