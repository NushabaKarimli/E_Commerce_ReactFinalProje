import React, { createContext, useContext, useMemo, useState } from "react";
import { Product } from "../assets/data/products";

type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalQty: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.product.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { product, qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    totalQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

