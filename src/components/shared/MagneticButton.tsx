/**
 * MagneticButton — a button that drifts toward the cursor on hover.
 * Uses refs only, no per-frame state (per the spec).
 */
"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs uppercase tracking-luxe transition-colors duration-300 overflow-hidden";
  const variants: Record<string, string> = {
    primary: "bg-nilex-gold text-nilex-navy hover:bg-nilex-cream",
    ghost: "bg-transparent text-nilex-cream hover:text-nilex-gold",
    outline:
      "border border-white/30 text-nilex-cream hover:border-nilex-gold hover:text-nilex-gold",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={ariaLabel}
      data-cursor="hover"
      style={{ x: springX, y: springY }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </motion.button>
  );
}
