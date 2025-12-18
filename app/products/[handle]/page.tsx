import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchShopify } from '@/lib/shopify';
import AddToCartButton from '@/components/AddToCartButton';

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  
  const { data } = await fetchShopify({
    query: `
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          title
          description
        }
      }
    `,
    variables: { handle }
  });

  return {
    title: data?.productByHandle?.title || 'Product',
    description: data?.productByHandle?.description || '',
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  
  const { data } = await fetchShopify({
    query: `
      query ProductByHandle($handle: String!) {
        productByHandle(handle: $handle) {
          id
          title
          description
          descriptionHtml
          availableForSale
          tags
          vendor
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    `,
    variables: { handle }
  });

  const product = data?.productByHandle;

  if (!product) {
    notFound();
  }

  const images = product.images.edges.map((edge: any) => edge.node);
  const variants = product.variants.edges.map((edge: any) => edge.node);
  const defaultVariant = variants[0];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {images.length > 0 ? (
            <>
              <div className="aspect-square relative w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                <Image
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1).map((image: any, index: number) => (
                    <div key={index} className="aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 12vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <span className="text-zinc-400">No images available</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
            {product.title}
          </h1>

          {product.vendor && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              by {product.vendor}
            </p>
          )}

          <div className="mb-6">
            <span className="text-3xl font-bold text-black dark:text-white">
              {parseFloat(defaultVariant.price.amount).toFixed(2)} {defaultVariant.price.currencyCode}
            </span>
          </div>

          {/* Availability */}
          <div className="mb-6">
            {product.availableForSale ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                In Stock
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert mb-8">
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>

          {/* Variants */}
          {variants.length > 1 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-black dark:text-white mb-3">
                Options:
              </h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((variant: any) => (
                  <button
                    key={variant.id}
                    className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-sm hover:border-black dark:hover:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!variant.availableForSale}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <AddToCartButton 
            product={{
              id: product.id,
              title: product.title,
              handle: handle,
              image: images[0]?.url || '',
              variant: defaultVariant,
            }}
            disabled={!product.availableForSale}
          />

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-semibold text-black dark:text-white mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
