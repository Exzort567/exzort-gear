'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '@/lib/types';

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    currency: 'USD',
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('exzort-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exzort-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(
        item => item.variantId === newItem.variantId
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        // Update quantity if item exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Add new item
        updatedItems = [...prevCart.items, newItem];
      }

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        items: updatedItems,
        total,
        currency: newItem.currency,
      };
    });
  };

  const removeItem = (variantId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(
        item => item.variantId !== variantId
      );

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prevCart,
        items: updatedItems,
        total,
      };
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(variantId);
      return;
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      );

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...prevCart,
        items: updatedItems,
        total,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      currency: 'USD',
    });
  };

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
