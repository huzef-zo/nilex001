/**
 * ContactPage — contact form, store info, and a quiet "find us" panel.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { useNilex } from "@/store/navigation";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stores = [
  {
    city: "London",
    address: "14 Savile Row, W1S 3PR",
    phone: "+44 20 7946 0958",
    hours: "Mon — Sat · 10:00 — 19:00",
    flagship: true,
  },
  { city: "Milan", address: "Via Brera 12, 20121", phone: "+39 02 8765 4321", hours: "Mar — Sab · 10:00 — 19:30" },
  { city: "Tokyo", address: "Aoyama 3-12, Minato-ku", phone: "+81 3 5789 1234", hours: "月 — 土 · 11:00 — 20:00" },
  { city: "New York", address: "73 Greene St, SoHo", phone: "+1 212 555 0958", hours: "Mon — Sat · 10:00 — 19:00" },
  { city: "Dubai", address: "DIFC Gate Village 06", phone: "+971 4 555 0958", hours: "Sat — Thu · 10:00 — 22:00" },
  { city: "Lagos", address: "Victoria Island, Adeola Odeku 24", phone: "+234 1 555 0958", hours: "Mon — Sat · 10:00 — 19:00" },
];

export default function ContactPage() {
  const root = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const setPage = useNilex((s) => s.setPage);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Private appointment",
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
      gsap.utils.toArray<HTMLElement>(".store-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    toast({
      title: "Message sent",
      description: "We'll be in touch within one business day.",
    });
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", subject: "Private appointment", message: "" });
    }, 3000);
  };

  return (
    <main ref={root} className="relative z-10 min-h-screen bg-nilex-cream pt-32 text-nilex-navy lg:pt-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <SectionLabel>Get in Touch · By Appointment</SectionLabel>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-medium leading-[1.05] md:text-6xl lg:text-8xl">
            Come and see <em className="italic">the house</em>.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-nilex-navy/60 md:text-lg">
            We respond to every message personally, usually within one business
            day. For private appointments at the Savile Row atelier, use the
            form below and one of our senior cutters will reach out to find a
            time.
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
                <p className="mt-1 text-lg leading-relaxed">14 Savile Row<br />London W1S 3PR<br />United Kingdom</p>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">By Phone</p>
                <a href="tel:+442079460958" data-cursor="hover" className="mt-1 block text-lg link-underline hover:text-nilex-gold">
                  +44 20 7946 0958
                </a>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">By Email</p>
                <a href="mailto:atelier@nilexfashion.com" data-cursor="hover" className="mt-1 block text-lg link-underline hover:text-nilex-gold">
                  atelier@nilexfashion.com
                </a>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">Atelier Hours</p>
                <p className="mt-1 text-lg leading-relaxed">Monday — Saturday<br />10:00 — 19:00</p>
                <p className="mt-2 text-sm text-nilex-navy/50">Closed Sundays & bank holidays</p>
              </div>
            </div>

            <div className="contact-item mt-12 rounded-sm bg-nilex-navy p-6 text-nilex-cream">
              <p className="text-xs uppercase tracking-luxe text-nilex-gold/80">Private Appointment</p>
              <p className="mt-3 text-sm leading-relaxed text-nilex-cream/80">
                A 90-minute session with one of our senior cutters — measurements,
                fabric selection, and a conversation about what you wear and
                how you live in it. £80, redeemable against any made-to-measure
                commission.
              </p>
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
                <label htmlFor="email" className="block text-xs uppercase tracking-luxe text-nilex-navy/40">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
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
                <option>Private appointment</option>
                <option>Made-to-measure enquiry</option>
                <option>Press & collaboration</option>
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

        {/* Store list */}
        <div className="mt-24 mb-8 lg:mt-32">
          <SectionLabel>The Houses · Worldwide</SectionLabel>
          <h2 className="mt-5 font-display text-3xl font-medium md:text-4xl lg:text-5xl">
            Nine cities, <em className="italic">one point of view</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 pb-32 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {stores.map((s) => (
            <div
              key={s.city}
              className={`store-card group cursor-pointer border border-nilex-navy/10 p-6 transition-all duration-500 hover:border-nilex-gold hover:bg-nilex-navy hover:text-nilex-cream ${
                s.flagship ? "bg-nilex-navy text-nilex-cream" : "bg-white"
              }`}
              data-cursor="hover"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-medium">{s.city}</h3>
                {s.flagship && (
                  <span className="text-[10px] uppercase tracking-luxe text-nilex-gold">
                    Flagship
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{s.address}</p>
              <p className="mt-2 text-sm opacity-70">{s.phone}</p>
              <p className="mt-2 text-xs opacity-60">{s.hours}</p>
              <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-luxe text-nilex-gold opacity-0 transition-opacity group-hover:opacity-100">
                Open in Maps
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M13 7L7 1M13 7l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
