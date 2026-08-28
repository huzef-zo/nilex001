/**
 * ShopPage — full product listing with filter sidebar + grid.
 * Includes a quick-view modal.
 */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Product } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X, Check, Plus, Minus } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const categories = ["All", "Knitwear", "Footwear", "Tailoring", "Outerwear", "Accessories"] as const;
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "A — Z" },
] as const;

export default function ShopPage() {
  const root = useRef<HTMLDivElement>(null);
  const addToCart = useNilex((s) => s.addToCart);
  const setCartOpen = useNilex((s) => s.setCartOpen);

  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]["value"]>("newest");
  const [priceMax, setPriceMax] = useState(1000);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= priceMax);
    if (category !== "All") list = list.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [category, sort, priceMax]);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".shop-product-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ".shop-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [filtered]);

  // Set the default size when opening quick-view. Done in the click
  // handler (not a useEffect) to avoid the lint rule about setState-in-effect.
  const openQuickView = (p: Product) => {
    setSelectedSize(p.sizes[0] ?? "");
    setQuickView(p);
  };

  const handleAdd = (p: Product) => {
    addToCart(p.id, selectedSize || p.sizes[0]);
    setQuickView(null);
    setCartOpen(true);
  };

  return (
    <main ref={root} className="relative z-10 min-h-screen bg-nilex-cream pt-32 text-nilex-navy lg:pt-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 border-b border-nilex-navy/10 pb-10 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel>The Shop · All Pieces</SectionLabel>
            <h1 className="mt-5 font-display text-5xl font-medium leading-tight md:text-6xl lg:text-7xl">
              Every piece, <em className="italic">in one place</em>.
            </h1>
          </div>
          <div className="max-w-md text-sm leading-relaxed text-nilex-navy/60">
            The full Nilex collection — knitwear, tailoring, footwear, outerwear
            and accessories. Filter by category, sort by price, and tap any
            piece for details, fabric and sizing.
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
          {/* Filter sidebar */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-2 text-xs uppercase tracking-luxe text-nilex-navy/60">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} />
              Filter
            </div>

            <div className="mt-6 border-t border-nilex-navy/10 pt-6">
              <p className="mb-3 text-xs uppercase tracking-luxe text-nilex-navy/40">
                Category
              </p>
              <ul className="space-y-2">
                {categories.map((c) => (
                  <li key={c}>
                    <button
                      data-cursor="hover"
                      onClick={() => setCategory(c)}
                      className={`flex w-full items-center justify-between py-1 text-sm transition-colors ${
                        category === c
                          ? "text-nilex-gold"
                          : "text-nilex-navy/70 hover:text-nilex-navy"
                      }`}
                    >
                      <span>{c}</span>
                      <span className="font-mono text-xs text-nilex-navy/40">
                        {c === "All"
                          ? products.length
                          : products.filter((p) => p.category === c).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-nilex-navy/10 pt-6">
              <p className="mb-3 text-xs uppercase tracking-luxe text-nilex-navy/40">
                Max Price
              </p>
              <input
                type="range"
                min={100}
                max={1000}
                step={50}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-nilex-gold"
              />
              <div className="mt-2 flex justify-between text-xs text-nilex-navy/60">
                <span>$100</span>
                <span className="font-semibold text-nilex-navy">${priceMax}</span>
              </div>
            </div>

            <div className="mt-8 border-t border-nilex-navy/10 pt-6">
              <p className="mb-3 text-xs uppercase tracking-luxe text-nilex-navy/40">
                Sort by
              </p>
              <ul className="space-y-2">
                {sortOptions.map((o) => (
                  <li key={o.value}>
                    <button
                      data-cursor="hover"
                      onClick={() => setSort(o.value)}
                      className={`flex w-full items-center justify-between py-1 text-sm transition-colors ${
                        sort === o.value
                          ? "text-nilex-gold"
                          : "text-nilex-navy/70 hover:text-nilex-navy"
                      }`}
                    >
                      {o.label}
                      {sort === o.value && <Check className="h-3 w-3" />}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-nilex-navy/10 pt-6">
              <p className="text-xs leading-relaxed text-nilex-navy/50">
                Complimentary shipping on orders over $250. Free returns within 30
                days. Made-to-measure available on tailoring.
              </p>
            </div>
          </aside>

          {/* Product grid */}
          <div className="shop-grid">
            <p className="mb-6 text-xs uppercase tracking-luxe text-nilex-navy/50">
              {filtered.length} pieces
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
              {filtered.map((p) => (
                <article
                  key={p.id}
                  className="shop-product-card group cursor-pointer"
                  data-cursor="hover"
                  onClick={() => openQuickView(p)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-nilex-navy/5">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className="absolute left-3 top-3 rounded-full bg-nilex-navy px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-cream">
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        data-cursor="hover"
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(p);
                        }}
                        className="w-full bg-nilex-navy py-3 text-xs uppercase tracking-luxe text-nilex-cream transition-colors hover:bg-nilex-gold hover:text-nilex-navy"
                      >
                        Quick view
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-1">
                    <p className="text-[10px] uppercase tracking-luxe text-nilex-navy/50">
                      {p.category}
                    </p>
                    <h3 className="text-base font-medium">{p.name}</h3>
                    <p className="text-xs text-nilex-navy/50">{p.colorway}</p>
                    <p className="mt-1 text-sm font-semibold tabular-nums">${p.price}</p>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
                <p className="font-display text-3xl text-nilex-navy">
                  No pieces match those filters.
                </p>
                <p className="text-sm text-nilex-navy/60">
                  Try widening your price range or choosing a different category.
                </p>
                <button
                  data-cursor="hover"
                  onClick={() => {
                    setCategory("All");
                    setPriceMax(1000);
                  }}
                  className="mt-2 border border-nilex-navy/20 px-6 py-2.5 text-xs uppercase tracking-luxe text-nilex-navy transition-colors hover:border-nilex-gold hover:text-nilex-gold"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick view modal */}
      <AnimatePresence>
        {quickView && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickView(null)}
              className="fixed inset-0 z-80 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-1/2 top-1/2 z-90 w-[94vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-nilex-cream text-nilex-navy"
            >
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[560px]">
                  <Image
                    src={quickView.image}
                    alt={quickView.name}
                    fill
                    sizes="(max-width: 768px) 94vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col p-8 lg:p-10">
                  <button
                    data-cursor="hover"
                    onClick={() => setQuickView(null)}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-nilex-navy/10"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <p className="text-[10px] uppercase tracking-luxe text-nilex-navy/40">
                    {quickView.category} · {quickView.colorway}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-medium">
                    {quickView.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold tabular-nums">${quickView.price}</span>
                    {quickView.compareAt && (
                      <span className="text-sm text-nilex-navy/40 line-through">
                        ${quickView.compareAt}
                      </span>
                    )}
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-nilex-navy/70">
                    {quickView.description}
                  </p>

                  <div className="mt-6 border-t border-nilex-navy/10 pt-5">
                    <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">
                      Fabric
                    </p>
                    <p className="mt-1 text-sm text-nilex-navy/70">{quickView.fabric}</p>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-xs uppercase tracking-luxe text-nilex-navy/40">
                      Size {selectedSize && <span className="text-nilex-navy">· {selectedSize}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickView.sizes.map((s) => (
                        <button
                          key={s}
                          data-cursor="hover"
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-12 border px-3 py-2 text-xs uppercase tracking-luxe transition-colors ${
                            selectedSize === s
                              ? "border-nilex-navy bg-nilex-navy text-nilex-cream"
                              : "border-nilex-navy/20 text-nilex-navy hover:border-nilex-navy"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <MagneticButton
                      onClick={() => handleAdd(quickView)}
                      variant="primary"
                      className="flex-1"
                    >
                      Add to Cart
                    </MagneticButton>
                  </div>

                  <p className="mt-6 text-xs text-nilex-navy/50">
                    Complimentary shipping · Free 30-day returns · Made-to-measure available on tailoring
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
