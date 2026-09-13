/**
 * Nilex navigation + UI store.
 * Drives the in-page router (since only the `/` route is user-visible)
 * and the small UI bits like the cart drawer and mobile menu.
 */
import { create } from "zustand";
import type { PageKey } from "@/lib/data";

export type ActivePage = PageKey | "collectionDetail";

type NilexState = {
  page: ActivePage;
  prevPage: ActivePage | null;
  setPage: (page: ActivePage) => void;

  // Selected collection detail
  selectedCollectionId: string | null;
  setSelectedCollectionId: (id: string | null) => void;

  // Menu
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;

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

  selectedCollectionId: null,
  setSelectedCollectionId: (selectedCollectionId) => set({ selectedCollectionId }),

  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),

  cursorReady: false,
  setCursorReady: (cursorReady) => set({ cursorReady }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  loaded: false,
  setLoaded: (loaded) => set({ loaded }),
}));
