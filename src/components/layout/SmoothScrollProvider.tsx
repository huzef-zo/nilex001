/**
 * Nilex smooth-scroll provider.
 *
 * Implements the contract from 3D-SCROLL-ARCHITECTURE-AGENT-SPEC.md §4:
 *   1. Mount the persistent canvas (done in Scene3D).
 *   2. Install and start Lenis FIRST.
 *   3. Register ScrollTrigger.scrollerProxy() against Lenis immediately after.
 *   4. Sync Lenis RAF to the GSAP ticker (single clock).
 *   5. GSAP timelines use scrollTrigger with scrub:true — done per component.
 *
 * Skipping step 3 is the #1 cause of DOM-vs-3D desync.
 */
"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNilex } from "@/store/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const setPage = useNilex((s) => s.setPage);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    useNilex.getState().setIsMobile(isMobile);

    // 1) Lenis owns the scroll.
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      touchMultiplier: 1.6,
      wheelMultiplier: 1.0,
      lerp: 0.09,
    });
    lenisRef.current = lenis;

    // 2) Tell ScrollTrigger to use Lenis as the scroll source.
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value: number | undefined) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    // 3) Single clock — GSAP ticker drives Lenis RAF.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after Lenis takes over.
    ScrollTrigger.refresh();

    // 4) Keep ScrollTrigger updated when Lenis emits.
    lenis.on("scroll", ScrollTrigger.update);

    // 5) Resize handler updates renderer / camera aspect (handled by R3F's Canvas)
    //    but we still need ScrollTrigger to recompute triggers.
    const onResize = () => {
      ScrollTrigger.refresh();
      useNilex.getState().setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", onResize);

    // Expose lenis globally so other components can call lenis.scrollTo.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(document.body, null as never);
      window.removeEventListener("resize", onResize);
      lenisRef.current = null;
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);

  // When the page changes, scroll to top smoothly.
  const page = useNilex((s) => s.page);
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    // Refresh after the page swap so new triggers bind correctly.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [page]);

  return <>{children}</>;
}

/**
 * Helper to programmatically scroll to a target. Used by nav links
 * and the "back to top" button.
 */
export function scrollTo(target: string | number, opts?: { offset?: number }) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (!lenis) return;
  lenis.scrollTo(target, { offset: opts?.offset ?? 0, duration: 1.2 });
}
