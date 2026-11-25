import React, { createContext, useContext, useCallback } from 'react';
import type { CartItem, Product, PotOption } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { clamp } from '../utils/helpers';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  discountCode: string;
  discountAmount: number;
  addToCart: (product: Product, quantity?: number, selectedPot?: PotOption) => void;
  removeFromCart: (productId: string, potId?: string) => void;
  updateQuantity: (productId: string, quantity: number, potId?: string) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => boolean;
  removeDiscount: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const DISCOUNT_CODES: Record<string, number> = {
  PLANTIFY10: 0.1,
  XANH20: 0.2,
  WELCOME15: 0.15,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('plantify_cart', []);
  const [discountCode, setDiscountCode] = useLocalStorage<string>('plantify_discount_code', '');
  const [discountAmount, setDiscountAmount] = useLocalStorage<number>('plantify_discount_amount', 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const totalPrice = Math.max(0, subtotal - discountAmount);

  const addToCart = useCallback(
    (product: Product, quantity = 1, selectedPot?: PotOption) => {
      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) =>
            item.product.id === product.id &&
            (item.selectedPot?.id ?? null) === (selectedPot?.id ?? null)
        );
        if (existingIndex >= 0) {
          return prev.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: clamp(item.quantity + quantity, 1, 99) }
              : item
          );
        }
        return [...prev, { product, quantity: clamp(quantity, 1, 99), selectedPot }];
      });
    },
    [setItems]
  );

  const removeFromCart = useCallback(
    (productId: string, potId?: string) => {
      setItems((prev) =>
        prev.filter(
          (item) =>
            !(
              item.product.id === productId &&
              (item.selectedPot?.id ?? undefined) === potId
            )
        )
      );
    },
    [setItems]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, potId?: string) => {
      if (quantity < 1) {
        removeFromCart(productId, potId);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && (item.selectedPot?.id ?? undefined) === potId
            ? { ...item, quantity: clamp(quantity, 1, 99) }
            : item
        )
      );
    },
    [setItems, removeFromCart]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
  }, [setItems, setDiscountCode, setDiscountAmount]);

  const applyDiscount = useCallback(
    (code: string): boolean => {
      const rate = DISCOUNT_CODES[code.toUpperCase()];
      if (rate === undefined) return false;
      setDiscountCode(code.toUpperCase());
      setDiscountAmount(Math.round(subtotal * rate));
      return true;
    },
    [subtotal, setDiscountCode, setDiscountAmount]
  );

  const removeDiscount = useCallback(() => {
    setDiscountCode('');
    setDiscountAmount(0);
  }, [setDiscountCode, setDiscountAmount]);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        discountCode,
        discountAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyDiscount,
        removeDiscount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
