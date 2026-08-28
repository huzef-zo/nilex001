/**
 * Lookbook — horizontal-scroll gallery with scroll-triggered reveal.
 * Each look is a full-bleed image with a label that slides in from the side.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lookbook } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Lookbook() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Horizontal scroll on desktop (translate X as user scrolls vertically).
      if (window.innerWidth >= 1024) {
        const track = root.current!.querySelector(".lb-track") as HTMLElement;
        const totalWidth = track.scrollWidth;
        gsap.to(track, {
          x: -(totalWidth - window.innerWidth + 96),
          ease: "none",
          scrollTrigger: {
            trigger: ".lb-wrap",
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: true,
            pin: true,
          },
        });
      }

      // Each image: zoom-in reveal.
      gsap.utils.toArray<HTMLElement>(".lb-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.2, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "left center",
              containerAnimation: undefined,
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="lb-wrap relative z-10 overflow-hidden bg-nilex-navy-deep py-20 lg:py-0"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12 lg:pt-24">
        <div className="mb-12 flex items-end justify-between lg:mb-20">
          <div>
            <SectionLabel>The Lookbook · AW26</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-nilex-cream md:text-5xl lg:text-6xl">
              Six looks, one <em className="italic text-nilex-gold">season</em>.
            </h2>
          </div>
          <button
            data-cursor="hover"
            onClick={() => setPage("collections")}
            className="hidden border-b border-nilex-cream/30 pb-0.5 text-xs uppercase tracking-luxe text-nilex-cream transition-colors hover:border-nilex-gold hover:text-nilex-gold md:block"
          >
            Open full lookbook →
          </button>
        </div>
      </div>

      <div className="lb-track flex gap-6 px-6 lg:px-12">
        {lookbook.map((look, i) => (
          <article
            key={i}
            className="lb-img relative aspect-[3/4] w-[78vw] flex-shrink-0 overflow-hidden md:w-[42vw] lg:w-[28vw]"
            data-cursor="hover"
          >
            <Image
              src={look.image}
              alt={look.label}
              fill
              sizes="(max-width: 768px) 78vw, (max-width: 1024px) 42vw, 28vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] uppercase tracking-luxe text-nilex-gold">
                Look 0{i + 1}
              </p>
              <p className="mt-1 font-display text-2xl text-nilex-cream">{look.label.split("— ")[1]}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 lg:hidden">
        <div className="mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-nilex-navy-deep/80 px-4 py-2 text-xs uppercase tracking-luxe text-nilex-cream backdrop-blur">
          ← swipe to explore →
        </div>
      </div>
    </section>
  );
}
