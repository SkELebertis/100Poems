"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PoemCard } from "@/components/PoemCard";
import { poems } from "@/data/poems";

export default function PoemsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      <Navigation />
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-900 font-serif mb-4">
            The Library
          </h1>
          <p className="text-rose-800 text-lg font-serif">
            A collection of {poems.length} poems
          </p>
        </div>

        <div className="bookshelf mx-auto overflow-hidden rounded-[2rem] border border-rose-200 bg-rose-50/90 shadow-[0_30px_80px_rgba(147,63,106,0.14)]">
          <div className="bookshelf-inner px-4 py-6 sm:px-6 sm:py-8">
            {Array.from({ length: Math.ceil(poems.length / 14) }, (_, rowIndex) => {
              const start = rowIndex * 14;
              const books = poems.slice(start, start + 14);
              return (
                <div key={rowIndex} className="bookshelf-row mb-6 last:mb-0">
                  <div className="bookshelf-books grid grid-cols-[repeat(14,minmax(34px,1fr))] gap-1 justify-center">
                    {books.map((poem) => (
                      <PoemCard key={poem.id} poem={poem} />
                    ))}
                  </div>
                  <div className="bookshelf-shelf mt-4" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
