/**
 * Nilex Fashion House — landing page.
 *
 * This is the only user-visible Next.js route. Multi-page navigation
 * is handled client-side via the Nilex store (`useNilex`), so the user
 * sees distinct pages (Home / Shop / Collections / Atelier / Contact)
 * with their own layouts, scroll positions and animations, but the URL
 * stays on `/`.
 *
 * The 3D scene (Scene3D) is mounted once at the top level and only
 * visible while the user is on the Home page — per the
 * 3D-SCROLL-ARCHITECTURE-AGENT-SPEC.md §3a: a single persistent canvas
 * for the full session, MUST NOT be recreated on section change.
 */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNilex } from "@/store/navigation";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import Cursor from "@/components/cursor/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import PageLoader from "@/components/layout/PageLoader";
import Scene3D from "@/components/three/Scene3D";
import HomePage from "@/components/home/HomePage";
import ShopPage from "@/components/shop/ShopPage";
import CollectionsPage from "@/components/collections/CollectionsPage";
import AboutPage from "@/components/about/AboutPage";
import ContactPage from "@/components/contact/ContactPage";

export default function Page() {
  const page = useNilex((s) => s.page);
  const [show3D, setShow3D] = useState(true);

  // Only render the 3D scene when on the home page.
  useEffect(() => {
    setShow3D(page === "home");
  }, [page]);

  return (
    <SmoothScrollProvider>
      <PageLoader />
      <Cursor />

      {/* Persistent 3D canvas (spec §3a) */}
      <Scene3D visible={show3D} />

      <div className="relative flex min-h-screen flex-col">
        <Navbar />

        {/* AnimatePresence drives the page transition */}
        <AnimatePresence mode="wait">
          <motion.main
            key={page}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            {page === "home" && <HomePage />}
            {page === "shop" && <ShopPage />}
            {page === "collections" && <CollectionsPage />}
            {page === "about" && <AboutPage />}
            {page === "contact" && <ContactPage />}
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>

      <CartDrawer />
    </SmoothScrollProvider>
  );
}
