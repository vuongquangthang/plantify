import React, { createContext, useContext, useCallback } from 'react';
import type { Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface WishlistContextValue {
  items: Product[];
  totalItems: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<Product[]>('plantify_wishlist', []);

  const totalItems = items.length;

  const addToWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id)) return prev;
        return [...prev, product];
      });
    },
    [setItems]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((p) => p.id !== productId));
    },
    [setItems]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((p) => p.id === product.id)) {
          return prev.filter((p) => p.id !== product.id);
        }
        return [...prev, product];
      });
    },
    [setItems]
  );

  const isInWishlist = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
