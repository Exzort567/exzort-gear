'use client';

import { useState } from 'react';
import Button from './Button';
import { useCart } from '@/lib/hooks/useCart';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: {
    id: string;
    title: string;
    handle: string;
    image: string;
    variant: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
    };
  };
  disabled?: boolean;
}

export default function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    try {
      addItem({
        variantId: product.variant.id,
        productId: product.id,
        title: product.title,
        variant: product.variant.title,
        price: parseFloat(product.variant.price.amount),
        currency: product.variant.price.currencyCode,
        quantity: 1,
        image: product.image,
        handle: product.handle,
      });
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      isLoading={isAdding}
      size="lg"
      className="w-full"
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {disabled ? 'Out of Stock' : 'Add to Cart'}
    </Button>
  );
}
