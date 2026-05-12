"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Poem, poems } from "@/data/poems";

interface BookReaderProps {
  initialPoemId?: string;
}

export function BookReader({ initialPoemId }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedPages, setFlippedPages] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (initialPoemId) {
      const index = poems.findIndex((p) => p.id === initialPoemId);
      if (index !== -1) setCurrentPage(index * 2 + 1);
    }
  }, [initialPoemId]);

  const handlePageClick = useCallback((pageNum: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setFlippedPages((prev) => {
      const newFlipped = new Set(prev);
      newFlipped.has(pageNum) ? newFlipped.delete(pageNum) : newFlipped.add(pageNum);
      return newFlipped;
    });

    setCurrentPage(Math.max(1, pageNum - (pageNum % 2)));
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating]);

  // Memoized poem content cache
  const poemContentCache = useMemo(() => {
    const cache = new Map<number, { poem: Poem | null; content: string }>();
    
    poems.forEach((poem, idx) => {
      const pageNum = idx * 2 + 3; // Page number for first page of poem
      
      // Split poem into paragraphs (better than line splitting)
      const paragraphs = poem.content.split("\n\n").filter(p => p.trim());
      const halfIdx = Math.ceil(paragraphs.length / 2);
      
      cache.set(pageNum, {
        poem,
        content: paragraphs.slice(0, halfIdx).join("\n\n"),
      });
      
      cache.set(pageNum + 1, {
        poem,
        content: paragraphs.slice(halfIdx).join("\n\n"),
      });
    });
    
    return cache;
  }, []);

  const getPoemForPage = useCallback((pageNum: number): Poem | null => {
    if (pageNum === 1 || pageNum === 2) return null;
    const cached = poemContentCache.get(pageNum);
    return cached?.poem || null;
  }, [poemContentCache]);

  const getPageContent = useCallback((pageNum: number) => {
    if (pageNum === 1) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-5xl mb-4 animate-pulse">📖</div>
          <h1 className="text-3xl font-serif font-bold text-rose-900 mb-3">
            A Poet&apos;s Library
          </h1>
          <p className="text-rose-800/80 font-serif text-sm">
            100 Poems of Devotion for you
          </p>
          <p className="text-rose-700/60 font-serif text-xs mt-8">
            for Allaine
          </p>
        </div>
      );
    }

    if (pageNum === 2) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-3">
          <div className="text-4xl mb-4 animate-pulse">💕</div>
          <p className="text-rose-800/80 font-serif text-xs leading-relaxed">
            Every page holds a verse crafted with love and devotion. Turn the pages to discover each poem&apos;s beauty.
          </p>
          <p className="text-rose-600/60 font-serif text-xs mt-8">
            Click any page to continue...
          </p>
        </div>
      );
    }

    const cached = poemContentCache.get(pageNum);
    if (!cached) return null;

    const { poem, content } = cached;
    if (!poem) return null;
    const isFirstHalf = (pageNum - 2) % 2 === 0;

    return (
      <div className="flex flex-col justify-between h-full">
        <div className="overflow-y-auto pr-1">
          <h3 className="text-base font-serif font-bold text-rose-900 mb-1.5 leading-tight">
            {poem.title}
          </h3>
          <p className="text-xs text-rose-700 font-serif mb-3">
            {poem.category} • {poem.date}
          </p>
          <p className="text-xs text-rose-900/90 font-serif leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
        {!isFirstHalf && (
          <div className="mt-2 pt-2 border-t border-rose-200">
            <p className="text-xs text-rose-700/70 font-serif italic">
              — {poem.author}
            </p>
          </div>
        )}
      </div>
    );
  }, [poemContentCache]);

  // Only render visible pages for performance
  const pageCount = Math.min(poems.length * 2 + 2, 200);
  const visiblePageRange = useMemo(() => {
    const current = currentPage;
    return {
      start: Math.max(1, current - 4),
      end: Math.min(pageCount, current + 4),
    };
  }, [currentPage, pageCount]);

  const pages = useMemo(
    () => Array.from({ length: pageCount }, (_, i) => i + 1),
    [pageCount]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-purple-200 to-rose-300 flex items-center justify-center py-8">
      <div className="perspective" style={{ perspective: "1200px" }}>
        {/* 3D Book Container */}
        <div
          className="book-container"
          style={{
            width: "700px",
            height: "480px",
            perspective: "1200px",
            transformStyle: "preserve-3d",
            transform: "rotateX(8deg) rotateY(-15deg)",
            position: "relative",
          }}
        >
          {/* Pages Stack */}
          <div
            className="book-stack"
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transformStyle: "preserve-3d",
            }}
          >
            {pages.map((pageNum) => {
              // Only render visible pages
              if (pageNum < visiblePageRange.start || pageNum > visiblePageRange.end) {
                return null;
              }

              const isFlipped = flippedPages.has(pageNum);
              const zIndex = pageCount - pageNum;
              const isOddPage = pageNum % 2 === 1;

              return (
                <div
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className="page-card group"
                  style={{
                    position: "absolute",
                    width: "350px",
                    height: "480px",
                    backgroundColor: pageNum === 1 ? "#9bc8d6" : "#f5f3f0",
                    borderRadius: "2px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3), inset -1px 0 3px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                    transformOrigin: isOddPage ? "0% 50%" : "100% 50%",
                    transform: isFlipped
                      ? isOddPage
                        ? "rotateY(-180deg) translateZ(1px)"
                        : "rotateY(180deg) translateZ(1px)"
                      : `translateZ(${-(pageNum - 1)}px)`,
                    right: isOddPage ? "0" : "auto",
                    left: !isOddPage ? "0" : "auto",
                    zIndex: isFlipped ? -zIndex : zIndex,
                  }}
                >
                  {/* Front Side */}
                  <div className="w-full h-full p-8 flex flex-col text-rose-900 relative" style={{ backfaceVisibility: "hidden" }}>
                    {/* Page Texture */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 2px,
                          rgba(0, 0, 0, 0.03) 2px,
                          rgba(0, 0, 0, 0.03) 4px
                        )`,
                      }}
                    ></div>

                    {/* Page Number */}
                    <div className="absolute top-4 right-4 text-xs font-serif text-rose-700/50">
                      {pageNum}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {getPageContent(pageNum)}
                    </div>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 w-full h-full p-8 flex items-center justify-center text-rose-700/40 font-serif text-sm"
                    style={{
                      backgroundColor: "#ede5e0",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    [Page {pageNum} - Back]
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Book Spine - 3D */}
        <div
          className="absolute"
          style={{
            left: "50%",
            transform: "translateX(-50%) translateZ(-20px)",
            top: "50%",
            marginTop: "-240px",
            width: "8px",
            height: "480px",
            background: "linear-gradient(to right, rgba(0,0,0,0.4), rgba(200,100,100,0.3), rgba(0,0,0,0.4))",
            boxShadow: "inset -2px 0 8px rgba(0,0,0,0.5), inset 2px 0 8px rgba(255,255,255,0.1), -4px 0 15px rgba(0,0,0,0.4)",
            borderRadius: "1px",
          }}
        ></div>
      </div>

      {/* Instructions */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg font-serif text-rose-900 text-center">
        <p>📖 Click pages to flip →</p>
      </div>

      {/* Page Counter */}
      <div className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg font-serif text-rose-900 text-sm">
        <p>
          Page <span className="font-bold">{currentPage}</span> of {pageCount}
        </p>
      </div>
    </div>
  );
}
