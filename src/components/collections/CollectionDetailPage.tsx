/**
 * CollectionDetailPage — displays product grid or coming soon for a selected category collection.
 */
"use client";

import Image from "next/image";
import { collections, products } from "@/lib/data";
import PlaceholderImage from "@/components/shared/PlaceholderImage";
import SectionLabel from "@/components/shared/SectionLabel";
import { useNilex } from "@/store/navigation";
import { ArrowLeft } from "lucide-react";

export default function CollectionDetailPage() {
  const selectedCollectionId = useNilex((s) => s.selectedCollectionId);
  const setPage = useNilex((s) => s.setPage);

  const collection = collections.find((c) => c.id === selectedCollectionId) ?? collections[0];

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === collection.name.toLowerCase()
  );

  return (
    <main className="relative z-10 min-h-screen bg-nilex-cream pt-24 pb-16 text-nilex-navy lg:pt-40">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-12">
        {/* Back button */}
        <button
          data-cursor="hover"
          onClick={() => setPage("collections")}
          className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-nilex-navy/60 transition-colors hover:text-nilex-navy"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Collections
        </button>

        {/* Header */}
        <div className="mb-12 border-b border-nilex-navy/10 pb-8 sm:pb-10 lg:mb-16">
          <SectionLabel>Collection Detail</SectionLabel>
          <h1 className="mt-4 font-display text-3xl sm:text-5xl font-medium leading-tight md:text-6xl lg:text-7xl">
            {collection.name} Collection
          </h1>
        </div>

        {/* Content */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <article key={p.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden bg-nilex-navy/5">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <PlaceholderImage className="absolute inset-0 h-full w-full" />
                  )}
                  {p.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-nilex-navy px-3 py-1 text-[10px] uppercase tracking-luxe text-nilex-cream">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <p className="text-[10px] uppercase tracking-luxe text-nilex-navy/50">
                    {p.category}
                  </p>
                  <h3 className="text-base font-medium">{p.name}</h3>
                  <p className="text-xs text-nilex-navy/50">{p.colorway}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 py-32 text-center">
            <h2 className="font-display text-4xl text-nilex-navy md:text-5xl">
              Coming soon
            </h2>
            <p className="max-w-md text-sm text-nilex-navy/60">
              Pieces for the {collection.name} collection are currently being crafted in our atelier.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
