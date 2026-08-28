/**
 * Custom cursor — gold dot + lagging ring.
 * Disabled on touch devices via CSS media query.
 */
"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const overInteractive = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a, button, [data-cursor='hover'], input, textarea, select, label")
      ) {
        dot.classList.add("is-hovering");
        ring.classList.add("is-hovering");
      }
    };
    const outInteractive = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a, button, [data-cursor='hover'], input, textarea, select, label")
      ) {
        dot.classList.remove("is-hovering");
        ring.classList.remove("is-hovering");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overInteractive);
    window.addEventListener("mouseout", outInteractive);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overInteractive);
      window.removeEventListener("mouseout", outInteractive);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="nilex-cursor" aria-hidden="true" />
      <div ref={ringRef} className="nilex-cursor-ring" aria-hidden="true" />
    </>
  );
}
