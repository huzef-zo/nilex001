/**
 * PageLoader — brief loader shown on first paint. Fades out
 * once the page is ready. Drives the "loaded" state in the Nilex store.
 */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useNilex } from "@/store/navigation";

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const setLoaded = useNilex((s) => s.setLoaded);

  useEffect(() => {
    const t = setTimeout(() => {
      setHidden(true);
      setLoaded(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-200 flex items-center justify-center bg-nilex-navy-deep"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-nilex-gold/40"
            >
              <Image
                src="/images/nilex-logo.jpg"
                alt="Nilex"
                fill
                sizes="80px"
                className="object-cover"
              />
            </motion.div>
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-display text-2xl font-semibold tracking-wide-luxe text-nilex-cream"
              >
                NILEX
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-1 text-[10px] uppercase tracking-luxe text-nilex-gold/80"
              >
                Fashion House
              </motion.p>
            </div>
            <div className="loader-bar h-px w-32 bg-white/10" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
