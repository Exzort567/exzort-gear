// Shopify Product Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  availableForSale: boolean;
  tags: string[];
  vendor: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  image?: {
    url: string;
    altText: string | null;
  };
}

// Cart Types
export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  variant: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  handle: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  currency: string;
}

// Shopify Collection Type
export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText: string | null;
  };
}

// Search and Filter Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  available?: boolean;
  sortBy?: 'TITLE' | 'PRICE_ASC' | 'PRICE_DESC' | 'CREATED_AT' | 'BEST_SELLING';
}
