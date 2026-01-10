'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/lib/validators';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variantId?: string, scentId?: string) => void;
  setQty: (slug: string, qty: number, variantId?: string, scentId?: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) => 
          item.slug === newItem.slug && 
          item.variantId === newItem.variantId &&
          item.scentId === newItem.scentId
      );
      if (existingItem) {
        return prev.map((item) =>
          item.slug === newItem.slug && 
          item.variantId === newItem.variantId &&
          item.scentId === newItem.scentId
            ? { ...item, qty: item.qty + newItem.qty }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (slug: string, variantId?: string, scentId?: string) => {
    setItems((prev) => prev.filter((item) => !(
      item.slug === slug && 
      item.variantId === variantId &&
      item.scentId === scentId
    )));
  };

  const setQty = (slug: string, qty: number, variantId?: string, scentId?: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.slug === slug && 
        item.variantId === variantId &&
        item.scentId === scentId 
          ? { ...item, qty: Math.max(1, qty) } 
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clearCart, total }}>
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
