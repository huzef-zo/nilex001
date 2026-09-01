/**
 * Site footer — quiet, editorial. Includes newsletter, store info,
 * sitemap, and the Nilex mark.
 */
"use client";

import Image from "next/image";
import { useState } from "react";
import { useNilex } from "@/store/navigation";
import { navItems } from "@/lib/data";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { scrollTo } from "./SmoothScrollProvider";

export default function Footer() {
  const setPage = useNilex((s) => s.setPage);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer className="mt-auto border-t border-white/10 bg-nilex-navy-deep text-nilex-cream">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Top band — newsletter */}
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-luxe text-nilex-gold/80">Stay close to the house</p>
            <h3 className="mt-3 font-display text-3xl font-medium leading-tight md:text-4xl">
              The Nilex Letter — new arrivals, private appointments, and the occasional essay on
              craft.
            </h3>
          </div>
          <div className="flex flex-col justify-end">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="group relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-lg text-nilex-cream placeholder:text-white/30 focus:border-nilex-gold focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="hover"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-nilex-gold transition-transform hover:translate-x-1"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="h-6 w-6" strokeWidth={1.4} />
                </button>
              </div>
              {submitted && (
                <p className="text-sm text-nilex-gold">
                  Thank you. A welcome letter is on its way.
                </p>
              )}
              <p className="text-xs text-white/40">
                We send no more than two letters a month. Unsubscribe in one click.
              </p>
            </form>
          </div>
        </div>

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
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">Book an Appointment</button></li>
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">Care & Repair</button></li>
              <li><button data-cursor="hover" className="link-underline hover:text-nilex-gold">FAQ</button></li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-xs uppercase tracking-luxe text-nilex-gold/80">The Atelier</p>
            <p className="text-sm leading-relaxed text-white/70">
              14 Savile Row<br />
              London W1S 3PR<br />
              United Kingdom
            </p>
            <p className="mt-4 text-sm text-white/70">
              +44 20 7946 0958<br />
              atelier@nilexfashion.com
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
