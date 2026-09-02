/**
 * Site footer — quiet, editorial. Includes location info,
 * sitemap, and the Nilex mark.
 */
"use client";

import Image from "next/image";
import { useNilex } from "@/store/navigation";
import { navItems } from "@/lib/data";
import { ArrowUp } from "lucide-react";
import { scrollTo } from "./SmoothScrollProvider";

export default function Footer() {
  const setPage = useNilex((s) => s.setPage);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-nilex-navy-deep text-nilex-cream">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Sitemap */}
        <div className="grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-nilex-gold/40">
                <Image
                  src="/images/nilex-logo.jpg"
                  alt="Nilex Fashion House"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-none">
                <p className="font-display text-xl font-semibold tracking-wide-luxe">NILEX</p>
                <p className="text-[10px] uppercase tracking-luxe text-nilex-gold/80">Fashion House</p>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              A modern menswear atelier. Considered design, honest materials, made to last.
            </p>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-luxe text-nilex-gold/80">House</p>
            <ul className="space-y-3 text-sm text-white/70">
              {navItems.map((item) => (
                <li key={item.key}>
                  <button
                    data-cursor="hover"
                    onClick={() => setPage(item.key)}
                    className="link-underline transition-colors hover:text-nilex-gold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-luxe text-nilex-gold/80">Client Care</p>
            <ul className="space-y-3 text-sm text-white/70">
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">Size Guide</button></li>
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">Contact Us</button></li>
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">Care & Repair</button></li>
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">FAQ</button></li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-luxe text-nilex-gold/80">Location</p>
            <p className="text-sm leading-relaxed text-white/70">
              Bishoftu, Ethiopia<br />
              Address coming soon
            </p>
            <p className="mt-4 text-xs text-white/40">
              Mon — Sat · 10:00 — 19:00
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/50 md:flex-row">
          <p>© {currentYear} Nilex Fashion House. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button data-cursor="hover" className="link-underline hover:text-nilex-gold">Privacy</button>
            <button data-cursor="hover" className="link-underline hover:text-nilex-gold">Terms</button>
            <button data-cursor="hover" className="link-underline hover:text-nilex-gold">Cookies</button>
            <button
              data-cursor="hover"
              onClick={() => scrollTo(0, { offset: 0 })}
              className="flex items-center gap-1 text-nilex-gold transition-colors hover:text-nilex-cream"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3 w-3" /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
