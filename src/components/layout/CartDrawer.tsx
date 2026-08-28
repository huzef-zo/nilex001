/**
 * CartDrawer — slide-in cart panel.
 */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useNilex } from "@/store/navigation";
import { products } from "@/lib/data";

export default function CartDrawer() {
  const cartOpen = useNilex((s) => s.cartOpen);
  const setCartOpen = useNilex((s) => s.setCartOpen);
  const cart = useNilex((s) => s.cart);
  const addToCart = useNilex((s) => s.addToCart);
  const removeFromCart = useNilex((s) => s.removeFromCart);
  const setPage = useNilex((s) => s.setPage);

  const items = cart
    .map((c) => {
      const product = products.find((p) => p.id === c.id);
      return product ? { ...product, qty: c.qty, size: c.size } : null;
    })
    .filter(Boolean) as (typeof products)[number] & { qty: number; size: string }[];

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col bg-nilex-navy-soft text-nilex-cream"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-gold/80">Your Selection</p>
                <p className="font-display text-2xl font-semibold">
                  Cart ({items.length})
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                data-cursor="hover"
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <ShoppingBag className="h-12 w-12 text-white/30" strokeWidth={1} />
                  <div>
                    <p className="font-display text-xl">Your cart is empty</p>
                    <p className="mt-2 text-sm text-white/50">
                      Pieces you love will appear here.
                    </p>
                  </div>
                  <button
                    data-cursor="hover"
                    onClick={() => {
                      setCartOpen(false);
                      setPage("shop");
                    }}
                    className="bg-nilex-gold px-6 py-3 text-xs uppercase tracking-luxe text-nilex-navy transition-colors hover:bg-nilex-cream"
                  >
                    Explore the collection
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 border-b border-white/10 pb-5"
                    >
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-nilex-navy">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-sm text-nilex-gold">
                            ${item.price * item.qty}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-white/50">
                          {item.colorway} · Size {item.size}
                        </p>
                        <div className="mt-auto flex items-center gap-3 pt-3">
                          <div className="flex items-center gap-2 border border-white/15">
                            <button
                              data-cursor="hover"
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="px-2 py-1 transition-colors hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-6 text-center text-xs tabular-nums">
                              {item.qty}
                            </span>
                            <button
                              data-cursor="hover"
                              onClick={() => addToCart(item.id, item.size)}
                              className="px-2 py-1 transition-colors hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            data-cursor="hover"
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-xs text-white/40 underline transition-colors hover:text-nilex-gold"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-white/70">Subtotal</span>
                  <span className="font-display text-2xl text-nilex-gold tabular-nums">
                    ${subtotal}
                  </span>
                </div>
                <p className="mb-4 text-xs text-white/50">
                  Shipping and duties calculated at checkout. Complimentary shipping on orders over $250.
                </p>
                <button
                  data-cursor="hover"
                  className="w-full bg-nilex-gold py-4 text-xs uppercase tracking-luxe text-nilex-navy transition-colors hover:bg-nilex-cream"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
