import Image from "next/image";
import { fetchShopify } from "@/lib/shopify";

export default async function Home() {
  // 1. Fetch data from Shopify (Requesting 6 products to be safe)
  const { data } = await fetchShopify({
    query: `
      query Products {
        products(first: 6) {
          edges {
            node {
              id
              title
              handle
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
    `
  });

  // 2. Transform the data into a clean list
  // The '?' checks safely if data exists so the app doesn't crash if Shopify is slow
  const products = data?.products?.edges || [];

  // 3. Render the Grid
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black p-8 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
        Exzort Gear
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {products.map(({ node }: any) => (
          <div 
            key={node.id} 
            className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <div className="aspect-square relative w-full bg-zinc-100 dark:bg-zinc-800">
              {node.images.edges[0] ? (
                <Image
                  src={node.images.edges[0].node.url}
                  alt={node.images.edges[0].node.altText || node.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-400">
                  No Image
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-black dark:text-white truncate">
                {node.title}
              </h3>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                {parseFloat(node.priceRange.minVariantPrice.amount).toFixed(2)} {node.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}