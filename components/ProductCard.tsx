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

  // Format currency
  const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative bg-white dark:bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden hover-lift border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300">
        {/* Product Image */}
        <div className="aspect-square relative w-full overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-neutral-100 dark:bg-neutral-800">
              <span className="text-neutral-400 dark:text-neutral-600">No Image</span>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Availability Badge */}
          {!isAvailable && (
            <div className="absolute top-3 left-3 md:top-4 md:left-4 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-black text-xs font-semibold">
              Sold Out
            </div>
          )}

          {/* Quick View Button */}
          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <div className="bg-black dark:bg-white text-white dark:text-black text-center py-2.5 md:py-3 rounded-full text-sm font-medium shadow-lg">
              Quick View
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5">
          <h3 className="font-medium text-base md:text-lg text-black dark:text-white line-clamp-2 mb-1.5 md:mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-base md:text-lg font-semibold text-black dark:text-white">
            {formatPrice(price, currency)}
          </p>
        </div>
      </div>
    </Link>
  );
}
