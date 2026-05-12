import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { poems } from "@/data/poems";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-200 via-purple-200 to-rose-300 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 sm:w-60 sm:h-60 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute -bottom-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-12 sm:py-20">
          <div className="mb-6 sm:mb-8 text-5xl sm:text-6xl md:text-7xl animate-pulse">💕</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 text-rose-900 leading-tight font-serif">
            A Poet&apos;s Library
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-rose-800/90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed font-serif">
            One hundred verses, each a carefully bound page of devotion for you. Open the shelves and discover poems written from the deepest places of the heart.
          </p>
          <Link
            href="/poems"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-300 to-pink-300 text-rose-900 text-sm sm:text-base font-semibold rounded hover:from-rose-200 hover:to-pink-200 hover:shadow-lg hover:shadow-rose-200/50 hover:scale-105 transition-all duration-300 font-serif"
          >
            Browse the Library
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 w-full">
        <div className="bg-gradient-to-r from-rose-200 to-pink-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 text-center border-2 border-rose-300 shadow-2xl shadow-rose-200/50">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-900 mb-3 sm:mb-4 font-serif">
            The Complete Anthology
          </h3>
          <p className="text-sm sm:text-base text-rose-800/90 mb-4 sm:mb-6 font-serif">
            Browse the full collection, organized by year, theme, and treasured memories.
          </p>
          <Link
            href="/poems"
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-rose-300 to-pink-300 text-rose-900 text-sm sm:text-base font-semibold rounded hover:from-rose-200 hover:to-pink-200 hover:shadow-lg hover:shadow-rose-300/50 transition-all duration-300 font-serif"
          >
            View All Poems
          </Link>
        </div>
      </section>
    </div>
  );
}
