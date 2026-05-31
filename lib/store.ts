'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Variant, CartItem } from './types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: Variant) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  totalSavings: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id && item.variant.id === variant.id
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id && item.variant.id === variant.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { product, variant, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.variant.id === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId && item.variant.id === variantId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0),

      totalSavings: () =>
        get().items.reduce(
          (sum, item) =>
            sum + (item.variant.comparePrice - item.variant.price) * item.quantity,
          0
        ),
    }),
    {
      name: 'nirognature-cart',
    }
  )
);

interface ConsultationState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useConsultationStore = create<ConsultationState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
