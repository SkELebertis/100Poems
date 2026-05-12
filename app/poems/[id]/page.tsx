import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { poems } from "@/data/poems";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  return poems.map((poem) => ({
    id: poem.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const poem = poems.find((p) => p.id === resolvedParams.id);
  if (!poem) return {};

  return {
    title: `${poem.title} | Poems of Love`,
    description: poem.excerpt,
  };
}

export default async function PoemPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params;
  const poem = poems.find((p) => p.id === resolvedParams.id);

  if (!poem) {
    notFound();
  }

  const currentIndex = poems.findIndex((p) => p.id === resolvedParams.id);
  const previousPoem = currentIndex > 0 ? poems[currentIndex - 1] : null;
  const nextPoem = currentIndex < poems.length - 1 ? poems[currentIndex + 1] : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <div className="flex-1">
        {/* Poem Header */}
        <div className="bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 border-b-2 border-rose-400">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <Link href="/poems" className="text-rose-800 hover:text-rose-900 font-serif font-medium mb-3 sm:mb-4 inline-block text-sm sm:text-base transition-colors">
              ← Back to Library
            </Link>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-rose-900 mb-3 sm:mb-4 leading-tight font-serif">
              {poem.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-rose-800/80 text-xs sm:text-sm font-serif">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-rose-200 text-rose-900 rounded border border-rose-400">
                {poem.category}
              </span>
              <span>{poem.date}</span>
            </div>
          </div>
        </div>

        {/* Poem Content */}
        <article className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="whitespace-pre-wrap text-rose-900 leading-relaxed text-base sm:text-lg md:text-lg font-light mb-8 sm:mb-12 font-serif">
            {poem.content}
          </div>

          {/* Author */}
          <div className="border-t border-rose-300/30 pt-6 sm:pt-8 mt-8 sm:mt-12">
            <p className="text-rose-800/80 italic text-sm sm:text-base font-serif">
              — {poem.author}
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 border-t border-rose-300/30">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <Link
              href="/poems"
              className="text-rose-800 hover:text-rose-900 font-serif font-medium text-sm sm:text-base order-2 sm:order-1 transition-colors"
            >
              Other Poems
            </Link>
            {nextPoem ? (
              <Link
                href={`/poems/${nextPoem.id}`}
                className="flex items-center gap-2 text-rose-800 hover:text-rose-900 font-serif font-medium text-xs sm:text-base truncate order-1 sm:order-2 transition-colors"
              >
                <span className="truncate">{nextPoem.title}</span> →
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
