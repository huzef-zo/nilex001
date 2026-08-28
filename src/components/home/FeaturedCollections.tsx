/**
 * FeaturedCollections — parallax collection cards.
 * Each card has an image that scales subtly + a label that slides in.
 * GSAP scrollTrigger pins and scrubs the cards' inner images.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedCollections() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Each card's image: parallax + slight zoom as it enters viewport.
      gsap.utils.toArray<HTMLElement>(".collection-card").forEach((card) => {
        const img = card.querySelector(".collection-img") as HTMLElement;
        const label = card.querySelector(".collection-label") as HTMLElement;
        if (img) {
          gsap.fromTo(
            img,
            { y: -40, scale: 1.15 },
            {
              y: 40,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
        if (label) {
          gsap.fromTo(
            label,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Header reveal
      gsap.fromTo(
        ".fc-header > *",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".fc-header",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section-y relative z-10 bg-nilex-navy-deep px-6 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="fc-header mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-20">
          <div>
            <SectionLabel>The House · AW26</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight text-nilex-cream md:text-5xl lg:text-6xl">
              Four volumes, one <em className="italic text-nilex-gold">point of view</em>.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-nilex-cream/60">
            Each season we release four small volumes — capsule collections that
            share a fabric story, a colour palette, and a single idea. Explore
            the volumes below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {collections.map((c, i) => (
            <article
              key={c.id}
              className={`collection-card group relative overflow-hidden ${
                i % 2 === 0 ? "md:translate-y-0" : "md:translate-y-12"
              }`}
              data-cursor="hover"
              onClick={() => setPage("collections")}
              onKeyDown={(e) => e.key === "Enter" && setPage("collections")}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-nilex-navy-soft">
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="collection-img object-cover transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/90 via-nilex-navy-deep/20 to-transparent" />

                {/* Top meta */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-cream backdrop-blur-sm">
                    {c.season}
                  </span>
                  <span className="font-mono text-[10px] text-nilex-cream/60">
                    0{i + 1} / 0{collections.length}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="collection-label absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <h3 className="font-display text-3xl font-medium text-nilex-cream md:text-4xl">
                    {c.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-nilex-cream/70">
                    {c.tagline}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-luxe text-nilex-gold">
                      {c.productCount} pieces
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-nilex-gold/40 text-nilex-gold transition-all duration-500 group-hover:bg-nilex-gold group-hover:text-nilex-navy">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M1 7h12M13 7L7 1M13 7l-6 6"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
