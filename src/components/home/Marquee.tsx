/**
 * Marquee — endless horizontal text band. Pure CSS animation.
 */
"use client";

export default function Marquee() {
  const phrases = [
    "Knitwear from Italian merino",
    "Tailoring cut by hand",
    "Footwear built to last",
    "Accessories in full-grain leather",
    "Made in our atelier",
    "Quietly modern",
    "Considered design",
  ];
  const items = [...phrases, ...phrases, ...phrases];

  return (
    <section
      id="nilex-marquee"
      className="relative z-10 overflow-hidden border-y border-white/10 bg-nilex-navy py-6 text-nilex-cream"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((p, i) => (
          <div key={i} className="flex items-center">
            <span className="px-8 font-display text-2xl italic text-nilex-cream/80 md:text-3xl">
              {p}
            </span>
            <span className="text-nilex-gold/60">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
