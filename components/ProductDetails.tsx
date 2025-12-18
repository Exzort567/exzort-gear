'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Check, Truck, Shield, RotateCcw } from 'lucide-react';
import AddToCartButton from '@/components/AddToCartButton';

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  image?: ProductImage | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
}

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    handle: string;
    vendor: string | null;
    availableForSale: boolean;
    descriptionHtml: string;
    tags: string[];
  };
  images: ProductImage[];
  variants: ProductVariant[];
}

export default function ProductDetails({ product, images, variants }: ProductDetailsProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const selectedVariant = variants[selectedVariantIndex];
  
  // Format currency
  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  // Handle variant selection
  const handleVariantSelect = (index: number) => {
    setSelectedVariantIndex(index);
    
    const variant = variants[index];
    
    // Method 1: If this variant has its own image assigned in Shopify
    if (variant.image?.url) {
      const imageIndex = images.findIndex(img => img.url === variant.image?.url);
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
        return;
      }
    }
    
    // Method 2: Fallback - try to match image by variant option value (e.g., "Black", "White")
    // This works by checking if the image alt text or URL contains the variant option value
    const variantOption = variant.selectedOptions.find(opt => 
      opt.name.toLowerCase() === 'color' || 
      opt.name.toLowerCase() === 'colour' ||
      opt.name.toLowerCase() === 'style'
    );
    
    if (variantOption) {
      const searchTerm = variantOption.value.toLowerCase();
      const matchedImageIndex = images.findIndex(img => 
        img.altText?.toLowerCase().includes(searchTerm) ||
        img.url.toLowerCase().includes(searchTerm)
      );
      
      if (matchedImageIndex !== -1) {
        setSelectedImageIndex(matchedImageIndex);
        return;
      }
    }
    
    // Method 3: If no match found, try matching by variant title
    const variantTitle = variant.title.toLowerCase();
    const titleMatchIndex = images.findIndex(img => 
      img.altText?.toLowerCase().includes(variantTitle) ||
      img.url.toLowerCase().includes(variantTitle)
    );
    
    if (titleMatchIndex !== -1) {
      setSelectedImageIndex(titleMatchIndex);
    }
  };

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  // Get the current display image
  const currentImage = images[selectedImageIndex] || images[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Product Images */}
      <div className="space-y-4 animate-fade-in">
        {images.length > 0 ? (
          <>
            <div className="aspect-square relative w-full bg-neutral-50 dark:bg-neutral-900 rounded-3xl overflow-hidden">
              <Image
                src={currentImage.url}
                alt={currentImage.altText || product.title}
                fill
                className="object-cover transition-all duration-500"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                key={currentImage.url}
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`aspect-square relative bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden transition-all duration-300 ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-black dark:ring-white'
                        : 'hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-700'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 12vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="aspect-square flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 rounded-3xl">
            <span className="text-neutral-400">No images available</span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col animate-fade-in stagger-1">
        {product.vendor && (
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
            {product.vendor}
          </p>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
          {product.title}
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-bold text-black dark:text-white transition-all duration-300">
            {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
          </span>
          {selectedVariant.availableForSale ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
              <Check className="h-4 w-4" />
              In Stock
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              Out of Stock
            </span>
          )}
        </div>

        {/* Description */}
        {product.descriptionHtml && (
          <div className="prose dark:prose-invert prose-neutral mb-8 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </div>
        )}

        {/* Variants */}
        {variants.length > 1 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Select Option
            </h3>
            <div className="flex flex-wrap gap-3">
              {variants.map((variant, index) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantSelect(index)}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedVariantIndex === index
                      ? 'bg-black dark:bg-white text-white dark:text-black scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  disabled={!variant.availableForSale}
                >
                  {variant.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <div className="mb-8">
          <AddToCartButton 
            product={{
              id: product.id,
              title: product.title,
              handle: product.handle,
              image: currentImage?.url || '',
              variant: selectedVariant,
            }}
            disabled={!selectedVariant.availableForSale}
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-t border-neutral-200 dark:border-neutral-800">
          {[
            { icon: Truck, label: 'Free Shipping', desc: 'On all orders' },
            { icon: Shield, label: '2 Year Warranty', desc: 'Full coverage' },
            { icon: RotateCcw, label: 'Easy Returns', desc: '30 day policy' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-black dark:text-white">{label}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <h3 className="text-sm font-semibold text-black dark:text-white mb-4 uppercase tracking-wider">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
