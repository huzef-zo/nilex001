/**
 * SectionLabel — small eyebrow text used above section titles.
 * Animated reveal on scroll via Framer Motion.
 */
"use client";

import { motion } from "framer-motion";

export default function SectionLabel({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className="gold-rule" />
      <span className="text-xs uppercase tracking-luxe text-nilex-gold">
        {children}
      </span>
    </motion.div>
  );
}
