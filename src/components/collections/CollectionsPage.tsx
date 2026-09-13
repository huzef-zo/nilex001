/**
 * CollectionsPage — browsable category grid of 5 collections.
 */
"use client";

import Image from "next/image";
import { collections } from "@/lib/data";
import SectionLabel from "@/components/shared/SectionLabel";
import { useNilex } from "@/store/navigation";

export default function CollectionsPage() {
  const setPage = useNilex((s) => s.setPage);
  const setSelectedCollectionId = useNilex((s) => s.setSelectedCollectionId);

  const handleTileClick = (collectionId: string) => {
    setSelectedCollectionId(collectionId);
    setPage("collectionDetail");
  };

  return (
    <main className="relative z-10 min-h-screen bg-nilex-navy-deep pt-32 pb-24 text-nilex-cream lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <SectionLabel>Categories</SectionLabel>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl lg:text-7xl">
            Our Collections
          </h1>
        </div>

        {/* 5-tile Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {collections.map((c) => (
            <article
              key={c.id}
              className="group relative cursor-pointer overflow-hidden flex flex-col"
              data-cursor="hover"
              onClick={() => handleTileClick(c.id)}
              onKeyDown={(e) => e.key === "Enter" && handleTileClick(c.id)}
              role="button"
              tabIndex={0}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-nilex-navy-soft">
                {c.cover ? (
                  <Image
                    src={c.cover}
                    alt={c.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center border border-nilex-gold/30 bg-nilex-navy-soft p-4 text-center">
                    <span className="font-mono text-xs uppercase tracking-luxe text-nilex-gold/60">
                      Coming soon
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-nilex-navy-deep/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <h2 className="font-display text-lg font-medium text-nilex-cream group-hover:text-nilex-gold transition-colors">
                  {c.name}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
