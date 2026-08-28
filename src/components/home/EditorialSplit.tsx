/**
 * EditorialSplit — alternating full-bleed editorial image + copy blocks.
 * Used to break up the page with longer-form brand moments.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STOCK_IMAGES } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EditorialSplit() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".ed-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.2, y: 60 },
          {
            scale: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ed-copy").forEach((copy) => {
        gsap.fromTo(
          copy,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: copy,
              start: "top 85%",
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
      className="relative z-10 bg-nilex-navy-deep"
    >
      {/* Block 1 — image left, copy right */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="ed-img relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:min-h-[80vh]">
          <Image
            src={STOCK_IMAGES.streetWwd}
            alt="AW26 editorial"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="ed-copy flex items-center bg-nilex-navy px-8 py-16 lg:px-16 lg:py-24">
          <div className="max-w-md">
            <SectionLabel>Volume III · Street Luxe</SectionLabel>
            <h3 className="mt-5 font-display text-3xl font-medium leading-tight text-nilex-cream md:text-4xl lg:text-5xl">
              Where the street meets the <em className="italic text-nilex-gold">atelier</em>.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-nilex-cream/70">
              Volume III takes the house signatures into the city. Sculpted
              sneakers in bone suede, technical parkas with taped seams, and knit
              hoodies in extra-fine merino — engineered for the street, finished
              with atelier craft.
            </p>
            <p className="mt-6 text-base leading-relaxed text-nilex-cream/70">
              Engineered fabrics, considered silhouettes, and the same quiet
              details the house is known for. Built to move.
            </p>
          </div>
        </div>
      </div>

      {/* Block 2 — copy left, image right */}
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="ed-copy order-2 flex items-center bg-nilex-navy px-8 py-16 lg:order-1 lg:px-16 lg:py-24">
          <div className="max-w-md">
            <SectionLabel>Volume II · City Tailoring</SectionLabel>
            <h3 className="mt-5 font-display text-3xl font-medium leading-tight text-nilex-cream md:text-4xl lg:text-5xl">
              Soft shoulders, <em className="italic text-nilex-gold">hard city</em>.
            </h3>
            <p className="mt-6 text-base leading-relaxed text-nilex-cream/70">
              Cut from Italian worsted wools with a half-canvas construction and a
              soft Neapolitan shoulder. The suit moves with you — from desk to
              dinner to the airport — without ever looking like you tried.
            </p>
            <p className="mt-6 text-base leading-relaxed text-nilex-cream/70">
              Two silhouettes (slim and relaxed), five core colourways, and the
              option to commission a made-to-measure piece in eight weeks.
            </p>
          </div>
        </div>
        <div className="ed-img order-1 relative aspect-[4/5] overflow-hidden lg:order-2 lg:aspect-auto lg:min-h-[80vh]">
          <Image
            src={STOCK_IMAGES.suitMassimo}
            alt="City tailoring editorial"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
