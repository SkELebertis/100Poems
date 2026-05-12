"use client";

import { useState, useEffect } from "react";
import { Poem, poems } from "@/data/poems";

interface BookReaderProps {
  initialPoemId?: string;
}

export function BookReader3D({ initialPoemId }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [flippedPages, setFlippedPages] = useState<Set<number>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (initialPoemId) {
      const index = poems.findIndex((p) => p.id === initialPoemId);
      if (index !== -1) setCurrentPage(index * 2 + 1);
    }
  }, [initialPoemId]);

  const handlePageClick = (pageNum: number) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newFlipped = new Set(flippedPages);

    if (newFlipped.has(pageNum)) {
      newFlipped.delete(pageNum);
    } else {
      newFlipped.add(pageNum);
    }

    setFlippedPages(newFlipped);

    // Calculate which poem we're on
    const poemIndex = Math.floor((pageNum - 1) / 2);
    setCurrentPage(Math.max(1, pageNum - (pageNum % 2)));

    setTimeout(() => setIsAnimating(false), 800);
  };

  const getPoemForPage = (pageNum: number): Poem | null => {
    if (pageNum === 1) return null; // Cover
    const poemIndex = Math.ceil((pageNum - 2) / 2);
    return poems[poemIndex] || null;
  };

  const getPageContent = (pageNum: number) => {
    if (pageNum === 1) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="text-6xl mb-6">📖</div>
          <h1 className="text-4xl font-serif font-bold text-rose-900 mb-4">
            A Poet&apos;s Library
          </h1>
          <p className="text-rose-800/80 font-serif text-lg">
            100 Poems of Devotion for you
          </p>
          <p className="text-rose-700/60 font-serif text-sm mt-12">
            for Allaine
          </p>
        </div>
      );
    }

    if (pageNum === 2) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          <div className="text-5xl mb-6">💕</div>
          <p className="text-rose-800/80 font-serif text-lg leading-relaxed max-w-xs">
            Every page holds a verse crafted with love and devotion. Turn the
            pages to discover each poem&apos;s beauty.
          </p>
          <p className="text-rose-600/60 font-serif text-sm mt-12">
            Click any page to continue...
          </p>
        </div>
      );
    }

    const poem = getPoemForPage(pageNum);
    if (!poem) return null;

    const isLeftPage = (pageNum - 1) % 4 === 0;
    const isFirstHalf = (pageNum - 2) % 4 === 0;

    const contentLines = poem.content.split("\n");
    const halfLength = Math.ceil(contentLines.length / 2);
    const displayContent = isFirstHalf
      ? contentLines.slice(0, halfLength).join("\n")
      : contentLines.slice(halfLength).join("\n");

    return (
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-sm font-serif font-bold text-rose-900 mb-2 opacity-70">
            Page {pageNum}
          </h2>
          <h3 className="text-xl font-serif font-bold text-rose-900 mb-3">
            {poem.title}
          </h3>
          <p className="text-xs text-rose-700 font-serif mb-4">
            {poem.category} • {poem.date}
          </p>
          <p className="text-sm text-rose-900/90 font-serif whitespace-pre-wrap leading-relaxed">
            {displayContent}
          </p>
        </div>
        {isFirstHalf === false && (
          <div className="mt-4 pt-4 border-t border-rose-200">
            <p className="text-xs text-rose-700/70 font-serif italic">
              — {poem.author}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Generate pages for the book
  const pageCount = Math.min(poems.length * 2 + 2, 200);
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-200 via-purple-200 to-rose-300 flex items-center justify-center py-8">
      <div className="perspective" style={{ perspective: "1200px" }}>
        {/* 3D Book Container */}
        <div
          className="book-container"
          style={{
            width: "900px",
            height: "600px",
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
              const isFlipped = flippedPages.has(pageNum);
              const zIndex = pageCount - pageNum;
              const isOddPage = pageNum % 2 === 1;

              return (
                <div
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className="page-card"
                  style={{
                    position: "absolute",
                    width: "450px",
                    height: "600px",
                    backgroundColor: pageNum === 1 ? "#9bc8d6" : "#f5f3f0",
                    borderRadius: "2px",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
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
                    backfaceVisibility: "hidden",
                    overflow: "hidden",
                  }}
                >
                  <div className="p-8 h-full flex flex-col text-rose-900 relative">
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
                    <div className="absolute top-4 left-4 text-xs font-serif text-rose-700/50">
                      {pageNum}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">{getPageContent(pageNum)}</div>

                    {/* Back side styling */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        backgroundColor: "#ede5e0",
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        color: "rgba(120, 90, 80, 0.3)",
                        fontFamily: "serif",
                      }}
                    >
                      [Page {pageNum}]
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Book Spine */}
        <div
          className="absolute"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: "50%",
            marginTop: "-300px",
            width: "4px",
            height: "600px",
            background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(200,150,150,0.3), rgba(0,0,0,0.2))",
            boxShadow: "inset -1px 0 5px rgba(0,0,0,0.3), inset 1px 0 5px rgba(255,255,255,0.2)",
          }}
        ></div>
      </div>

      {/* Instructions */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
        <p className="font-serif text-rose-900">Click pages to flip →</p>
      </div>

      {/* Page Counter */}
      <div className="fixed bottom-8 right-8 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
        <p className="font-serif text-rose-900 text-sm">
          Page <span className="font-bold">{currentPage}</span> of {pageCount}
        </p>
      </div>
    </div>
  );
}
