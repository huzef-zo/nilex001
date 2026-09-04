/**
 * AboutPage — long-form brand story with editorial blocks.
 * Includes timeline, values, the atelier, and a CTA.
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brandValues, stats } from "@/lib/data";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  {
    year: "2026",
    title: "The House Opens",
    body: "Nilex opens as a small house built around footwear, knitwear and outerwear — considered design, honest materials, and no more than we can finish well.",
  },
  {
    year: "2026",
    title: "The First Collection",
    body: "Twelve pieces mark our first season: sculpted trainers, technical outerwear and fine-gauge knitwear, built to be worn for years, not seasons.",
  },
  {
    year: "Coming Soon",
    title: "Try It On",
    body: "We're building a way to try on Nilex pieces virtually before you commit — so you can see exactly how each piece looks on you before it arrives.",
  },
];

export default function AboutPage() {
  const root = useRef<HTMLDivElement>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      // Timeline items — staggered reveal.
      gsap.utils.toArray<HTMLElement>(".tl-item").forEach((item) => {
        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Vertical progress line.
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".tl-track",
            start: "top 70%",
            end: "bottom bottom",
            scrub: 1.2,
          },
        }
      );

      // Hero parallax.
      gsap.to(".about-hero-img", {
        y: 80,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Counters.
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const suffix = el.dataset.suffix || "";
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          onEnter: () => {
            gsap.to(el, {
              textContent: target,
              duration: 1.6,
              ease: "power1.out",
              snap: { textContent: 1 },
              onUpdate: function () {
                el.textContent = Math.round(Number(el.textContent || 0)) + suffix;
              },
            });
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={root} className="relative z-10 bg-nilex-navy-deep pt-32 text-nilex-cream lg:pt-40">
      {/* Hero */}
      <section className="about-hero relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <PlaceholderImage className="about-hero-img absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-nilex-navy-deep/40 via-transparent to-nilex-navy-deep" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
            <SectionLabel>The House · Est. 2026</SectionLabel>
            <h1 className="mt-5 max-w-5xl font-display text-5xl font-medium leading-[1.05] md:text-6xl lg:text-8xl">
              A small house, <em className="italic text-nilex-gold">a single point of view</em>.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro essay */}
      <section className="section-y px-6 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-2xl italic leading-relaxed text-nilex-cream/90 md:text-3xl lg:text-4xl">
            Nilex opened this year with a simple idea: modern menswear doesn&apos;t need to be loud to be noticed.
          </p>
          <div className="mt-12 space-y-6 text-base leading-relaxed text-nilex-cream/70 md:text-lg">
            <p>
              We started with twelve pieces. We still make twelve pieces a
              season — it&apos;s not a marketing decision, it&apos;s the only way
              we know how to work. Every garment is cut from Italian and British
              fabrics, finished by hand, and built with construction that lets
              it be re-soled, re-lined, re-worn for years.
            </p>
            <p>
              We name our materials because we believe you should know what
              you&apos;re wearing. We don&apos;t follow trends, we don&apos;t
              chase seasons, and we don&apos;t make more than we can finish well.
              Quiet, considered, made to last.
            </p>
            <p>
              The house is new, but the point of view isn&apos;t rushed. Every piece still starts on the page, gets sketched, draped, and refined until it earns its place.
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-white/10 bg-nilex-navy px-6 py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div
                className="stat-num font-display text-5xl font-medium text-nilex-gold md:text-6xl lg:text-7xl"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <p className="mt-3 text-xs uppercase tracking-luxe text-nilex-cream/60">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y px-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12 lg:mb-20">
            <SectionLabel>The House · Where We&apos;re Headed</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              A new house, <em className="italic text-nilex-gold">told honestly</em>.
            </h2>
          </div>

          <div className="tl-track relative grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Vertical line on the right column */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-sm leading-relaxed text-nilex-cream/60">
                  A new house with big plans — get in touch to be part of the story from the start.
                </p>
                <MagneticButton
                  onClick={() => setPage("contact")}
                  variant="primary"
                  className="mt-8"
                >
                  Get in Touch
                </MagneticButton>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
              <div className="tl-line absolute left-0 top-0 h-full w-px origin-top bg-nilex-gold" />
              <ul className="space-y-12">
                {timeline.map((t) => (
                  <li key={t.year} className="tl-item relative">
                    <span className="absolute -left-[34px] top-2 flex h-3 w-3 items-center justify-center rounded-full bg-nilex-gold ring-4 ring-nilex-navy-deep" />
                    <p className="font-mono text-sm text-nilex-gold">{t.year}</p>
                    <h3 className="mt-2 font-display text-2xl font-medium md:text-3xl">
                      {t.title}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-nilex-cream/70 md:text-base">
                      {t.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-nilex-navy px-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-14 lg:mb-20">
            <SectionLabel>The House · What we believe</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              Four ideas, kept <em className="italic text-nilex-gold">since the beginning</em>.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {brandValues.map((v, i) => (
              <div
                key={v.title}
                className="bg-nilex-navy p-8 lg:p-10"
              >
                <span className="font-mono text-xs text-nilex-gold/60">0{i + 1}</span>
                <h3 className="mt-6 font-display text-2xl font-medium">
                  {v.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-nilex-cream/60">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atelier gallery */}
      <section className="section-y px-6 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-12">
            <SectionLabel>The Atelier · In Pictures</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-5xl">
              Where the <em className="italic text-nilex-gold">pieces are made</em>.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden md:col-span-7">
              <PlaceholderImage className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-5">
              <PlaceholderImage className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-5">
              <PlaceholderImage className="absolute inset-0 h-full w-full" />
            </div>
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden md:col-span-7">
              <PlaceholderImage className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Get In Touch</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Come see how a Nilex piece is <em className="italic text-nilex-gold">made</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-nilex-cream/60 md:text-lg">
            Have questions about fit, fabric, or what&apos;s coming next? We&apos;d love to hear from you.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton onClick={() => setPage("contact")} variant="primary">
              Get in Touch
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
