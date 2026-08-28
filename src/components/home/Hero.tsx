/**
 * Hero — full-bleed intro section. The 3D scene (Scene3D) sits behind
 * as a fixed-position canvas; this section provides the headline,
 * scroll cue, and meta.
 *
 * Headline uses GSAP SplitText-style reveal on mount (we hand-roll it
 * via inline spans to avoid the GSAP SplitText premium plugin).
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      // Stagger-reveal the headline words.
      gsap.fromTo(
        ".hero-word",
        { y: "110%", opacity: 0, rotateZ: 4 },
        {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.2,
        }
      );
      gsap.fromTo(
        ".hero-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.12,
          delay: 0.8,
        }
      );

      // Parallax the meta + scroll cue as user scrolls past hero.
      gsap.to(".hero-meta", {
        y: -80,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-headline", {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nilex-hero"
      ref={rootRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-noise-navy px-6 pt-24 lg:px-12"
    >
      {/* Background gradient wash (sits above the 3D canvas for depth) */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        <div className="absolute inset-0 bg-gradient-to-b from-nilex-navy-deep/40 via-transparent to-nilex-navy-deep" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nilex-navy-deep to-transparent" />
      </div>

      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-nilex-gold/40 to-transparent" />

      {/* Eyebrow + meta row */}
      <div className="hero-meta relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between text-nilex-cream/60">
        <div className="flex items-center gap-3 text-xs uppercase tracking-luxe">
          <span className="h-px w-8 bg-nilex-gold/60" />
          <span>AW26 — The Quiet Confidence</span>
        </div>
        <div className="hidden text-xs uppercase tracking-luxe text-nilex-cream/40 md:block">
          Vol. I — IV · By appointment
        </div>
      </div>

      {/* Headline */}
      <div className="hero-headline relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="mt-12 lg:mt-16">
          <h1 className="font-display text-[clamp(2.75rem,9vw,9rem)] font-medium leading-[0.95] tracking-tight text-nilex-cream">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Modern</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block italic text-nilex-gold">
                menswear,
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">tailored for</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">the modern man.</span>
            </span>
          </h1>

          <div className="mt-10 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="hero-fade max-w-md text-base leading-relaxed text-nilex-cream/70 md:text-lg">
              Nilex Fashion House is a modern atelier — quietly luxurious knitwear,
              tailoring, footwear and accessories, made in honest materials and
              built to be worn for years, not seasons.
            </p>

            <div className="hero-fade flex flex-col gap-4 sm:flex-row">
              <MagneticButton onClick={() => setPage("shop")} variant="primary">
                Explore the Collection
              </MagneticButton>
              <MagneticButton onClick={() => setPage("collections")} variant="outline">
                View Lookbook
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: scroll cue + featured mark */}
      <div className="hero-meta absolute bottom-8 left-0 right-0 z-10 mx-auto flex max-w-[1600px] items-end justify-between px-6 lg:px-12">
        <button
          data-cursor="hover"
          onClick={() => {
            const el = document.getElementById("nilex-marquee");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-3 text-xs uppercase tracking-luxe text-nilex-cream/60 transition-colors hover:text-nilex-gold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-nilex-gold">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v12M7 13l5-5M7 13l-5-5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Scroll to explore
        </button>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-nilex-gold/40">
            <Image
              src="/images/nilex-logo.jpg"
              alt="Nilex mark"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold tracking-wide-luxe text-nilex-cream">
              NILEX
            </p>
            <p className="text-[10px] uppercase tracking-luxe text-nilex-gold/80">
              Fashion House · 2012
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
