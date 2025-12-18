import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchShopify } from '@/lib/shopify';
import ProductDetails from '@/components/ProductDetails';
import { ArrowLeft } from 'lucide-react';

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
    title: data?.productByHandle?.title ? `${data.productByHandle.title} - Exzort Gear` : 'Product',
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
          images(first: 10) {
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
                image {
                  url
                  altText
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

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link 
          href="/products" 
          className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-8 group animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <ProductDetails 
          product={{
            id: product.id,
            title: product.title,
            handle: handle,
            vendor: product.vendor,
            availableForSale: product.availableForSale,
            descriptionHtml: product.descriptionHtml,
            tags: product.tags,
          }}
          images={images}
          variants={variants}
        />
      </div>
    </div>
  );
}
