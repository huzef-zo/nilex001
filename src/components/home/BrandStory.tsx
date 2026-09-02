/**
 * BrandStory — full-bleed editorial section with pinned text +
 * scrolling images. Uses GSAP scrollTrigger to pin the copy while
 * images pass behind / beside it.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STOCK_IMAGES, stats } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, {
          textContent: value,
          duration: 1.6,
          ease: "power1.out",
          snap: { textContent: 1 },
          onUpdate: function () {
            el.textContent = Math.round(Number(el.textContent || 0)) + suffix;
          },
        });
      },
    });
    return () => st.kill();
  }, [value, suffix]);
  return <span ref={ref} className="tabular-nums">0{suffix}</span>;
}

export default function BrandStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Pin the left text and let the right column scroll.
      if (window.innerWidth >= 1024) {
        ScrollTrigger.create({
          trigger: ".bs-grid",
          start: "top top",
          end: "bottom bottom",
          pin: ".bs-left",
          pinSpacing: false,
        });
      }

      // Reveal images as they enter.
      gsap.utils.toArray<HTMLElement>(".bs-img").forEach((img, i) => {
        gsap.fromTo(
          img,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
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
      className="section-y relative z-10 overflow-hidden bg-nilex-navy px-6 lg:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="bs-grid grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left — pinned text */}
          <div className="bs-left">
            <SectionLabel>The House · Est. 2026</SectionLabel>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-nilex-cream md:text-5xl lg:text-6xl">
              A small house, a single <em className="italic text-nilex-gold">point of view</em>.
            </h2>

            <div className="mt-8 max-w-md space-y-5 text-base leading-relaxed text-nilex-cream/70">
              <p>
                Nilex opened this year with a simple idea: modern menswear — footwear,
                knitwear and outerwear — doesn&apos;t need to be loud to be noticed. We
                started with twelve pieces. We plan to keep it that way each season.
              </p>
              <p>
                Every garment is cut from Italian and British fabrics, finished by
                hand in our atelier, and built with construction that lets it be
                re-soled, re-lined, re-worn for years. We name our materials because
                we believe you should know what you&apos;re wearing.
              </p>
              <p>
                What we don&apos;t make is just as important. We don&apos;t follow
                trends, we don&apos;t chase seasons, and we don&apos;t make more than
                we can finish well. Quiet, considered, made to last.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-4xl font-medium text-nilex-gold md:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-luxe text-nilex-cream/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — scrolling image stack */}
          <div className="space-y-8">
            <div className="bs-img relative aspect-[4/5] overflow-hidden">
              <Image
                src={STOCK_IMAGES.boutiqueDries}
                alt="Nilex atelier interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="text-xs uppercase tracking-luxe text-nilex-cream">
                  The Atelier · Bishoftu
                </span>
                <span className="font-mono text-xs text-nilex-cream/60">01</span>
              </div>
            </div>

            <div className="bs-img relative aspect-[3/2] overflow-hidden">
              <Image
                src={STOCK_IMAGES.portraitDeposit1}
                alt="Nilex craftsman at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="bs-img grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={STOCK_IMAGES.accTimeResistance}
                  alt="Leather detailing"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={STOCK_IMAGES.boutiqueAlamy}
                  alt="Boutique interior detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="bs-img relative aspect-[16/9] overflow-hidden">
              <Image
                src={STOCK_IMAGES.portraitUnsplash}
                alt="The Nilex man"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/70 to-transparent" />
              <p className="absolute bottom-5 left-5 max-w-md font-display text-xl italic text-nilex-cream md:text-2xl">
                &ldquo;We design for the man who doesn&apos;t need to announce himself.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
