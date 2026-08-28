/**
 * AboutPage — long-form brand story with editorial blocks.
 * Includes timeline, values, the atelier, and a CTA.
 */
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STOCK_IMAGES, brandValues, stats } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const timeline = [
  {
    year: "2012",
    title: "The First Room",
    body: "Nilex opens above a tailor's shop on Savile Row. A cutting table, one assistant, twelve pieces — and a single idea: that modern menswear doesn't need to be loud.",
  },
  {
    year: "2015",
    title: "Italian Fabrics",
    body: "We travel to Biella and sign our first fabric contracts with a mill that's been weaving wool since 1682. Our worsteds and knits begin to carry their name on the inside seam.",
  },
  {
    year: "2018",
    title: "The Knitwear Programme",
    body: "Our first full knitwear line launches — fine-gauge merino cardigans, quarter-zips and polo collars, all finished by hand in our atelier. The Atelier Quarter-Zip becomes our first bestseller.",
  },
  {
    year: "2021",
    title: "Footwear, Sculpted",
    body: "We partner with a third-generation shoe-maker in Marche, Italy. The Drift Low Trainer launches as our first sneaker — sculpted, quiet, and built on a single last that we still use today.",
  },
  {
    year: "2024",
    title: "Cities Worldwide",
    body: "Nilex opens appointment-only ateliers in nine cities, from London to Tokyo. We still make twelve pieces a season — they're just seen by more people.",
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
            scrub: true,
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
        <Image
          src={STOCK_IMAGES.boutiqueDries}
          alt="The Nilex atelier"
          fill
          sizes="100vw"
          className="about-hero-img object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nilex-navy-deep/40 via-transparent to-nilex-navy-deep" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-12">
            <SectionLabel>The Atelier · Est. 2012</SectionLabel>
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
            Nilex began in 2012 above a tailor&apos;s shop on Savile Row — a small
            room, a cutting table, and an idea: that modern menswear
            didn&apos;t need to be loud to be noticed.
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
              Fourteen years on, the house is in nine cities and the atelier is
              still above a tailor&apos;s shop. The cutting table is the same
              one. The point of view hasn&apos;t moved.
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
            <SectionLabel>The House · A Brief History</SectionLabel>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
              Fourteen years, <em className="italic text-nilex-gold">told briefly</em>.
            </h2>
          </div>

          <div className="tl-track relative grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
            {/* Vertical line on the right column */}
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <p className="text-sm leading-relaxed text-nilex-cream/60">
                  From a single room on Savile Row to nine cities worldwide.
                  The pieces, the people, and the moments that built the house.
                </p>
                <MagneticButton
                  onClick={() => setPage("contact")}
                  variant="primary"
                  className="mt-8"
                >
                  Visit the Atelier
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
              <Image
                src={STOCK_IMAGES.boutiqueAlamy}
                alt="Atelier cutting room"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-5">
              <Image
                src={STOCK_IMAGES.portraitDeposit1}
                alt="The maker"
                fill
                sizes="(max-width: 768px) 50vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-1 aspect-[3/4] overflow-hidden md:col-span-5">
              <Image
                src={STOCK_IMAGES.accTimeResistance}
                alt="Leather detailing"
                fill
                sizes="(max-width: 768px) 50vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden md:col-span-7">
              <Image
                src={STOCK_IMAGES.portraitUnsplash}
                alt="The Nilex man"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel align="center">Visit the Atelier</SectionLabel>
          <h2 className="mt-6 font-display text-4xl font-medium leading-tight md:text-5xl lg:text-6xl">
            Come see how a Nilex piece is <em className="italic text-nilex-gold">made</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-nilex-cream/60 md:text-lg">
            Private appointments at Savile Row run Monday through Saturday.
            A 90-minute session with one of our senior cutters.
          </p>
          <div className="mt-10 flex justify-center">
            <MagneticButton onClick={() => setPage("contact")} variant="primary">
              Book an Appointment
            </MagneticButton>
          </div>
        </div>
      </section>
    </main>
  );
}
