/**
 * NewArrivals — product grid with hover-swap and add-to-cart.
 * Includes Nilex uploaded product photos + stock imagery.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import SectionLabel from "@/components/shared/SectionLabel";
import { useNilex } from "@/store/navigation";
import { Eye } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NewArrivals() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".product-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, [visible]);

  const visibleProducts = products.slice(0, visible);

  return (
    <section
      ref={root}
      className="section-y relative z-10 bg-nilex-cream px-6 text-nilex-navy lg:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-16">
          <div>
            <SectionLabel>The Edit · This Week</SectionLabel>
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              New arrivals, freshly <em className="italic">cut</em>.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-nilex-navy/60">
              Showing {visibleProducts.length} of {products.length}
            </span>
            <button
              data-cursor="hover"
              onClick={() => setPage("shop")}
              className="border-b border-nilex-navy/40 pb-0.5 text-xs uppercase tracking-luxe text-nilex-navy transition-colors hover:border-nilex-gold hover:text-nilex-gold"
            >
              View all →
            </button>
          </div>
        </div>

        <div className="product-grid grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {visibleProducts.map((p) => (
            <article
              key={p.id}
              className="product-card group cursor-pointer"
              data-cursor="hover"
              onClick={() => {
                setPage("shop");
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-nilex-navy/5">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                ) : (
                  <PlaceholderImage className="absolute inset-0 h-full w-full" />
                )}
                {p.hoverImage && (
                  p.hoverImage ? (
                    <Image
                      src={p.hoverImage}
                      alt={`${p.name} alternate view`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  ) : (
                    <PlaceholderImage className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  )
                )}

                {/* Badge */}
                {p.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-nilex-navy px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-cream">
                    {p.badge}
                  </span>
                )}
                {p.compareAt && (
                  <span className="absolute right-3 top-3 rounded-full bg-nilex-gold px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-navy">
                    Save ${p.compareAt - p.price}
                  </span>
                )}

                {/* Quick actions */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <button
                    data-cursor="hover"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPage("shop");
                    }}
                    className="flex w-full items-center justify-center gap-2 bg-nilex-navy py-3 text-xs uppercase tracking-luxe text-nilex-cream transition-colors hover:bg-nilex-gold hover:text-nilex-navy"
                    aria-label="Quick view"
                  >
                    <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> Quick view
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-luxe text-nilex-navy/50">
                    {p.category}
                  </p>
                  <p className="text-[10px] text-nilex-navy/50">{p.colorway}</p>
                </div>
                <h3 className="text-base font-medium leading-tight">{p.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold tabular-nums">${p.price}</span>
                  {p.compareAt && (
                    <span className="text-xs text-nilex-navy/40 line-through tabular-nums">
                      ${p.compareAt}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {visible < products.length && (
          <div className="mt-12 flex justify-center">
            <button
              data-cursor="hover"
              onClick={() => setVisible((v) => Math.min(v + 4, products.length))}
              className="border border-nilex-navy/20 px-8 py-3.5 text-xs uppercase tracking-luxe text-nilex-navy transition-colors hover:border-nilex-gold hover:bg-nilex-gold hover:text-nilex-navy"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
