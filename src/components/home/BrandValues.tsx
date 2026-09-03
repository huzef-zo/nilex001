/**
 * BrandValues — 4 column values grid with hover-reveal.
 * Combined with a final CTA to get in touch.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandValues, STOCK_IMAGES } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BrandValues() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".values-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="section-y relative z-10 bg-nilex-navy px-6 lg:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 lg:mb-20">
          <SectionLabel>The House · What we believe</SectionLabel>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight text-nilex-cream md:text-5xl lg:text-6xl">
            Four ideas, kept <em className="italic text-nilex-gold">since the beginning</em>.
          </h2>
        </div>

        <div className="values-grid grid gap-px overflow-hidden rounded-sm bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {brandValues.map((v, i) => (
            <div
              key={v.title}
              className="value-item group relative bg-nilex-navy p-8 transition-colors duration-500 hover:bg-nilex-navy-soft lg:p-10"
              data-cursor="hover"
            >
              <span className="font-mono text-xs text-nilex-gold/60">0{i + 1}</span>
              <h3 className="mt-6 font-display text-2xl font-medium text-nilex-cream">
                {v.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-nilex-cream/60">
                {v.body}
              </p>
              <span className="mt-8 block h-px w-0 bg-nilex-gold transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* CTA band */}
        <div className="relative mt-16 overflow-hidden rounded-sm bg-nilex-navy-soft lg:mt-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="p-10 lg:p-16">
              <SectionLabel>Get In Touch</SectionLabel>
              <h3 className="mt-5 font-display text-3xl font-medium leading-tight text-nilex-cream md:text-4xl lg:text-5xl">
                Have a question? <em className="italic text-nilex-gold">We&apos;d love to hear from you.</em>
              </h3>
              <p className="mt-6 max-w-md text-base leading-relaxed text-nilex-cream/60">
                Reach out about sizing, fabric, or anything else — we read every
                message personally and get back to you quickly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <MagneticButton onClick={() => setPage("contact")} variant="primary">
                  Get in Touch
                </MagneticButton>
                <MagneticButton onClick={() => setPage("about")} variant="outline">
                  Our Story
                </MagneticButton>
              </div>
            </div>
            <div className="relative h-64 w-full overflow-hidden lg:h-full lg:min-h-[420px]">
              <Image
                src={STOCK_IMAGES.boutiqueYelp}
                alt="Nilex boutique interior"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-nilex-navy-soft via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
