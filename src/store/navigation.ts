/**
 * Nilex navigation + UI store.
 * Drives the in-page router (since only the `/` route is user-visible)
 * and the small UI bits like the cart drawer and mobile menu.
 */
import { create } from "zustand";
import type { PageKey } from "@/lib/data";

type NilexState = {
  page: PageKey;
  prevPage: PageKey | null;
  setPage: (page: PageKey) => void;

  // Menu + cart
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Cart
  cart: { id: string; qty: number; size: string }[];
  addToCart: (id: string, size: string) => void;
  removeFromCart: (id: string, size: string) => void;
  clearCart: () => void;

  // UI
  cursorReady: boolean;
  setCursorReady: (ready: boolean) => void;

  // Mobile detection for 3D degradation
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;

  // Loading state for first paint
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
};

export const useNilex = create<NilexState>((set) => ({
  page: "home",
  prevPage: null,
  setPage: (page) => set((s) => ({ prevPage: s.page, page, menuOpen: false })),

  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),

  cart: [],
  addToCart: (id, size) =>
    set((s) => {
      const existing = s.cart.find((c) => c.id === id && c.size === size);
      if (existing) {
        return {
          cart: s.cart.map((c) =>
            c.id === id && c.size === size ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      }
      return { cart: [...s.cart, { id, qty: 1, size }] };
    }),
  removeFromCart: (id, size) =>
    set((s) => ({
      cart: s.cart.filter((c) => !(c.id === id && c.size === size)),
    })),
  clearCart: () => set({ cart: [] }),

  cursorReady: false,
  setCursorReady: (cursorReady) => set({ cursorReady }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));
