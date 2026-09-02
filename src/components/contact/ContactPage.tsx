/**
 * ContactPage — contact form and location info.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/shared/SectionLabel";
import MagneticButton from "@/components/shared/MagneticButton";
import { MapPin, Phone, Clock, Send, Check } from "lucide-react";
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
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">Our Location</p>
                <p className="mt-1 text-lg leading-relaxed">Bishoftu, Ethiopia<br />Address coming soon</p>
              </div>
            </div>
            <div className="contact-item flex items-start gap-4 border-t border-nilex-navy/10 pt-6">
              <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-nilex-gold" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-luxe text-nilex-navy/40">By Phone</p>
                <p className="mt-1 text-lg leading-relaxed">Details coming soon</p>
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
      </div>
    </main>
  );
}
