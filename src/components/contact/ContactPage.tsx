/**
 * ContactPage — contact form and location info.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { MapPin, Phone, Send, Check, ExternalLink } from "lucide-react";

const stores = [
  {
    city: "Bishoftu",
    tagline: "Flagship Atelier",
    address: "Bishoftu, Next to Farmi Cafe",
    phone: "0980818485",
    mapUrl: "https://maps.app.goo.gl/r3yCgR7Ek4SWK1767?g_st=atm",
  },
];
import { useToast } from "@/hooks/use-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    subject: "General Inquiry",
    message: "",
  });

  useEffect(() => {
    if (!root.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setSent(true);
    toast({
      title: "Message sent",
      description: "We'll be in touch within one business day.",
    });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", contact: "", subject: "General Inquiry", message: "" });
    }, 3000);
  };

  return (
    <main ref={root} className="relative z-10 min-h-screen bg-nilex-cream pt-32 pb-24 text-nilex-navy lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <SectionLabel>Get in Touch</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.05] md:text-6xl lg:text-8xl">
            Come and see <em className="italic">the house</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-nilex-navy/60 md:text-lg">
            We respond to every message personally, usually within one business
            day. Use the form below to get in touch.
          </p>
        </div>

        {/* Contact grid */}
        <div className="contact-grid grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* Left — info */}
          <div className="space-y-8">
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">The Atelier</p>
                <p className="mt-1 text-lg leading-relaxed">Bishoftu, Next to Farmi Cafe</p>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">By Phone</p>
                <p className="mt-1 text-lg leading-relaxed">
                  <a href="tel:0980818485" className="transition-colors hover:text-nilex-gold">
                    0980818485
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">To place your order</p>
                <p className="mt-1 text-lg leading-relaxed">
                  <a
                    href="https://t.me/ezana62"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-nilex-gold"
                  >
                    @ezana62
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.68 6.34 6.34 0 009.34 22a6.34 6.34 0 006.34-6.34V9.27a8.16 8.16 0 004.91 1.62V7.44a4.85 4.85 0 01-1-.05z"/>
              </svg>
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">TikTok</p>
                <p className="mt-1 text-lg leading-relaxed">
                  <a
                    href="https://www.tiktok.com/@nilexfashion1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-nilex-gold"
                  >
                    @nilexfashion1
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="contact-item space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-luxe text-nilex-navy/40">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2 w-full border-b border-nilex-navy/20 bg-transparent py-3 text-lg text-nilex-navy placeholder:text-nilex-navy/30 focus:border-nilex-gold focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contact" className="block text-xs uppercase tracking-luxe text-nilex-navy/40">
                  How can we reach you?
                </label>
                <input
                  id="contact"
                  type="text"
                  required
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  placeholder="Phone number, Instagram, or other contact info"
                  className="mt-2 w-full border-b border-nilex-navy/20 bg-transparent py-3 text-lg text-nilex-navy placeholder:text-nilex-navy/30 focus:border-nilex-gold focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-xs uppercase tracking-luxe text-nilex-navy/40">
                Subject
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="mt-2 w-full border-b border-nilex-navy/20 bg-transparent py-3 text-lg text-nilex-navy focus:border-nilex-gold focus:outline-none"
              >
                <option>General Inquiry</option>
                <option>Product Question</option>
                <option>Press & Collaboration</option>
                <option>Wholesale</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-luxe text-nilex-navy/40">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us a little about what you're looking for — a piece, an occasion, a wardrobe."
                className="mt-2 w-full border-b border-nilex-navy/20 bg-transparent py-3 text-lg text-nilex-navy placeholder:text-nilex-navy/30 focus:border-nilex-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
              <p className="max-w-xs text-xs text-nilex-navy/50">
                We respond to every message personally, usually within one business day. Your details are never shared.
              </p>
              <MagneticButton
                onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                variant="primary"
              >
                {sent ? (
                  <>
                    <Check className="h-3 w-3" strokeWidth={2} /> Sent
                  </>
                ) : (
                  <>
                    Send Message <Send className="h-3 w-3" strokeWidth={1.5} />
                  </>
                )}
              </MagneticButton>
            </div>
          </form>
        </div>
        {/* Store Location Section */}
        <div className="mt-24 border-t border-nilex-navy/10 pt-16 lg:mt-32 lg:pt-20">
          <div className="mb-12">
            <SectionLabel>Our Location</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-medium md:text-4xl lg:text-5xl">
              One house, one location.
            </h2>
            <p className="mt-4 max-w-xl text-nilex-navy/60">
              Visit our flagship atelier in Bishoftu. Experience our collections in person and consult with our tailors.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <div
                key={store.city}
                className="contact-item border border-nilex-navy/10 bg-nilex-cream/50 p-8 transition-all duration-300 hover:border-nilex-gold/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-medium text-nilex-navy">{store.city}</h3>
                  <span className="text-xs uppercase tracking-luxe text-nilex-gold">{store.tagline}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-nilex-navy/70">{store.address}</p>
                <p className="mt-2 text-sm text-nilex-navy/70">
                  <a href={`tel:${store.phone}`} className="transition-colors hover:text-nilex-gold">
                    {store.phone}
                  </a>
                </p>
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-nilex-navy hover:text-nilex-gold transition-colors"
                >
                  Open in Maps <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
