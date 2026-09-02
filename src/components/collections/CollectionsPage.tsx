/**
 * CollectionsPage — full-bleed collection cards with hover-reveal,
 * plus an editorial gallery grid below.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collections, editorial, lookbook, STOCK_IMAGES } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollectionsPage() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".col-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      gsap.fromTo(
        ".ed-card",
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".ed-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="relative z-10 min-h-screen bg-nilex-navy-deep pt-32 text-nilex-cream lg:pt-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <SectionLabel>The Volumes · AW26</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.05] md:text-6xl lg:text-8xl">
            Four volumes, <em className="italic text-nilex-gold">one season</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-nilex-cream/60 md:text-lg">
            Each Nilex season is released in four small volumes — capsule
            collections that share a fabric story, a colour palette, and a
            single idea. They arrive one at a time, never all at once, so each
            one has the room to be properly seen.
          </p>
        </div>
      </div>

      {/* Collection cards */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="space-y-6 lg:space-y-12">
          {collections.map((c, i) => (
            <article
              key={c.id}
              className="col-card group relative grid cursor-pointer items-stretch overflow-hidden bg-nilex-navy-soft md:grid-cols-2"
              data-cursor="hover"
              onClick={() => setPage("shop")}
              onKeyDown={(e) => e.key === "Enter" && setPage("shop")}
              role="button"
              tabIndex={0}
            >
              <div
                className={`relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[460px] ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={c.cover}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/60 to-transparent md:bg-gradient-to-r" />
                <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-cream backdrop-blur-sm">
                  {c.season}
                </span>
              </div>
              <div className="flex flex-col justify-between p-8 lg:p-16">
                <div>
                  <span className="font-mono text-xs text-nilex-gold/60">0{i + 1} / 0{collections.length}</span>
                  <h2 className="mt-6 font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
                    {c.name}
                  </h2>
                  <p className="mt-4 max-w-md font-display text-xl italic text-nilex-gold">
                    {c.tagline}
                  </p>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-nilex-cream/70">
                    {c.description}
                  </p>
                </div>
                <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                  <div>
                    <p className="text-xs uppercase tracking-luxe text-nilex-cream/40">
                      {c.productCount} pieces
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MagneticButton onClick={() => setPage("shop")} variant="outline">
                      Explore Volume
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Editorial gallery */}
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <SectionLabel>The AW26 Campaign</SectionLabel>
            <h2 className="mt-5 font-display text-3xl font-medium md:text-4xl lg:text-5xl">
              Stills from the <em className="italic text-nilex-gold">campaign</em>.
            </h2>
          </div>
          <span className="font-mono text-xs text-nilex-cream/40">04 looks</span>
        </div>
        <div className="ed-grid grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {editorial.map((e, i) => (
            <figure
              key={i}
              className={`ed-card group relative overflow-hidden ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-square md:aspect-[4/5]" : "aspect-[3/4]"}`}>
                <Image
                  src={e.image}
                  alt={e.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/80 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-luxe text-nilex-gold">
                    {e.caption}
                  </p>
                  <p className="mt-1 font-display text-xl text-nilex-cream md:text-2xl">
                    {e.title}
                  </p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Lookbook strip */}
      <div className="bg-nilex-navy px-6 py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <SectionLabel>The Lookbook</SectionLabel>
              <h2 className="mt-5 font-display text-3xl font-medium md:text-4xl">
                Six looks, <em className="italic text-nilex-gold">every angle</em>.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
            {lookbook.map((look, i) => (
              <div key={i} className="group relative aspect-[3/4] overflow-hidden">
                <Image
                  src={look.image}
                  alt={look.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-nilex-navy-deep/30 opacity-0 transition-opacity group-hover:opacity-100" />
                <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-luxe text-nilex-cream opacity-0 transition-opacity group-hover:opacity-100">
                  Look 0{i + 1}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
