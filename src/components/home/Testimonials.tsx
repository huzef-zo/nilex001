/**
 * Testimonials — quote slider with auto-rotation + manual control.
 */
"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { testimonials } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    gsap.fromTo(
      ".testimonial-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [active]);

  return (
    <section
      className="section-y relative z-10 overflow-hidden bg-nilex-cream px-4 sm:px-6 text-nilex-navy lg:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 sm:mb-12 flex items-center justify-between lg:mb-16">
          <SectionLabel>From the Client</SectionLabel>
          <span className="font-mono text-xs text-nilex-navy/40">
            0{active + 1} / 0{testimonials.length}
          </span>
        </div>

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <p className="font-display text-5xl sm:text-6xl font-medium leading-none text-nilex-gold md:text-8xl">
              &ldquo;
            </p>
            <p className="mt-2 sm:mt-4 text-xs uppercase tracking-luxe text-nilex-navy/60">
              What they&apos;re saying
            </p>
          </div>

          <div>
            <blockquote
              key={active}
              className="testimonial-text font-display text-xl sm:text-2xl font-medium italic leading-snug md:text-4xl lg:text-5xl"
            >
              {testimonials[active].quote}
            </blockquote>
            <div className="mt-10 flex items-end justify-between">
              <div>
                <p className="text-base font-semibold">{testimonials[active].author}</p>
                <p className="text-sm text-nilex-navy/60">{testimonials[active].role}</p>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    data-cursor="hover"
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`h-1.5 transition-all duration-500 ${
                      active === i
                        ? "w-10 bg-nilex-gold"
                        : "w-4 bg-nilex-navy/20 hover:bg-nilex-navy/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
