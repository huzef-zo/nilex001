/**
 * useScrollReveal — applies a GSAP scroll-reveal timeline to a ref.
 *
 * Per the spec: every transform update uses scrub:true / fromTo with
 * easing. We never assign transforms directly to elements outside
 * of GSAP.
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
  once?: boolean;
  stagger?: number;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const { y = 40, duration = 1, delay = 0, start = "top 85%", once = true, stagger = 0 } = options;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? Array.from(el.children) : el;
      gsap.fromTo(
        targets,
        { y, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration,
          delay,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * useScrollProgress — exposes the current scroll progress (0–1) of an
 * element via a ref. Useful for driving secondary animations.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });
    return () => st.kill();
  }, []);

  return { ref, progressRef };
}
