/**
 * Nilex top navigation. Uses the in-app router (state) to switch pages.
 * Includes a mega-menu-style overlay for the mobile menu.
 */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useNilex } from "@/store/navigation";
import { navItems } from "@/lib/data";
import { Menu, X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const page = useNilex((s) => s.page);
  const setPage = useNilex((s) => s.setPage);
  const menuOpen = useNilex((s) => s.menuOpen);
  const setMenuOpen = useNilex((s) => s.setMenuOpen);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (key: typeof page) => {
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-navy border-b border-white/5" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-4 sm:px-6 py-3 sm:py-4 lg:px-12 lg:py-6">
          {/* Logo */}
          <button
            onClick={() => handleNav("home")}
            data-cursor="hover"
            className="group flex items-center gap-3"
            aria-label="Nilex Fashion House home"
          >
            <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-nilex-gold/40">
              <Image
                src="/images/nilex-logo.jpg"
                alt="Nilex Fashion House logo"
                fill
                sizes="44px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-xl font-semibold tracking-wide-luxe text-nilex-cream">
                NILEX
              </span>
              <span className="text-[10px] uppercase tracking-luxe text-nilex-gold/80">
                Fashion House
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-10 md:flex">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  onClick={() => handleNav(item.key)}
                  data-cursor="hover"
                  className={`link-underline text-sm uppercase tracking-wide-luxe transition-colors ${
                    page === item.key
                      ? "text-nilex-gold"
                      : "text-nilex-cream/80 hover:text-nilex-cream"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              data-cursor="hover"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-nilex-cream/80 transition-colors hover:bg-white/5 hover:text-nilex-gold md:flex"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              data-cursor="hover"
              aria-label="Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-nilex-cream/80 transition-colors hover:bg-white/5 hover:text-nilex-gold md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-nilex-navy-deep/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex min-h-full flex-col justify-between px-6 py-20 sm:px-8">
              <ul className="space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => handleNav(item.key)}
                      className="flex w-full items-baseline justify-between border-b border-white/10 py-4 sm:py-5 text-left"
                    >
                      <span
                        className={`font-display text-2xl sm:text-3xl md:text-4xl font-medium ${
                          page === item.key ? "text-nilex-gold" : "text-nilex-cream"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-xs text-white/40">
                        0{i + 1}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-8 space-y-2 text-xs sm:text-sm text-white/60"
              >
                <p className="uppercase tracking-luxe text-nilex-gold/80">Bishoftu, Next to Farmi Cafe</p>
                <p>
                  <a href="tel:0980818485" className="transition-colors hover:text-nilex-gold">
                    0980818485
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
