"use client";

import { useState, useMemo, useCallback } from "react";
import { Poem, poems } from "@/data/poems";

function BookPageTurnerContent() {
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

  const leftPoem = useMemo(() => poems[currentPoemIndex], [currentPoemIndex]);
  const rightPoem = useMemo(() => 
    currentPoemIndex + 1 < poems.length ? poems[currentPoemIndex + 1] : null, 
    [currentPoemIndex]
  );

  const nextPoem = useCallback(() => {
    if (currentPoemIndex + 1 < poems.length && !isFlipping) {
      setFlipDirection('forward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPoemIndex(currentPoemIndex + 2);
        setIsFlipping(false);
      }, 600);
    }
  }, [currentPoemIndex, isFlipping]);

  const prevPoem = useCallback(() => {
    if (currentPoemIndex - 1 >= 0 && !isFlipping) {
      setFlipDirection('backward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPoemIndex(Math.max(0, currentPoemIndex - 2));
        setIsFlipping(false);
      }, 600);
    }
  }, [currentPoemIndex, isFlipping]);

  const handleBookClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const midpoint = rect.width / 2;
    
    if (clickX < midpoint) {
      // Left side clicked - go to previous
      prevPoem();
    } else {
      // Right side clicked - go to next
      nextPoem();
    }
  }, [nextPoem, prevPoem]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 py-6 px-4 sm:py-8 flex flex-col items-center justify-center">
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Crimson+Text:400,700|Playfair+Display:400,700');

        * { box-sizing: border-box; }

        .book-container {
          perspective: 1500px;
          width: 100%;
          max-width: 900px;
          height: 600px;
          position: relative;
          margin: 0 auto 2rem;
          cursor: pointer;
        }

        .book-spine {
          position: absolute;
          left: 50%;
          top: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(90deg, #333 0%, #1a1a1a 50%, #333 100%);
          transform: translateX(-50%) translateZ(20px);
          z-index: 100;
          box-shadow: inset -3px 0 12px rgba(0, 0, 0, 0.8), inset 3px 0 12px rgba(255, 255, 255, 0.1), -2px 0 8px rgba(0, 0, 0, 0.4);
        }

        .pages-wrapper {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .book-page {
          position: absolute;
          top: 0;
          bottom: 0;
          background: linear-gradient(135deg, #fefbf7 0%, #f5f0e8 100%);
          border: 1px solid #d4a574;
          padding: 2rem 2.5rem;
          transform-style: preserve-3d;
          font-family: 'Crimson Text', serif;
          color: #333;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          backface-visibility: hidden;
        }

        .book-page.front {
          left: 0;
          width: 50%;
          transform-origin: right center;
          transform: rotateY(0deg);
          opacity: 1;
          z-index: 10;
        }

        .book-page.back {
          right: 0;
          width: 50%;
          transform-origin: left center;
          transform: rotateY(0deg);
          opacity: 1;
          z-index: 10;
        }

        .book-page.front.flipping.forward {
          animation: flipOutLeftForward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          z-index: 5;
        }

        .book-page.back.flipping.forward {
          animation: flipInRightForward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          z-index: 15;
        }

        .book-page.front.flipping.backward {
          animation: flipInLeftBackward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          z-index: 15;
        }

        .book-page.back.flipping.backward {
          animation: flipOutRightBackward 0.6s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
          z-index: 5;
        }

        @keyframes flipOutLeftForward {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }

        @keyframes flipInRightForward {
          0% {
            transform: rotateY(180deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }

        @keyframes flipOutRightBackward {
          0% {
            transform: rotateY(0deg);
            opacity: 1;
          }
          100% {
            transform: rotateY(180deg);
            opacity: 0;
          }
        }

        @keyframes flipInLeftBackward {
          0% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
          100% {
            transform: rotateY(0deg);
            opacity: 1;
          }
        }

        .book-shadow {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.1), inset -1px 0 3px rgba(0, 0, 0, 0.15), inset 1px 0 3px rgba(0, 0, 0, 0.15), 0 20px 60px rgba(0, 0, 0, 0.3);
          pointer-events: none;
          z-index: 100;
        }

        .page-header {
          display: none;
        }

        .poem-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #7c2d5f;
          margin: 0 0 0.8rem;
          text-align: center;
          letter-spacing: 0.05em;
        }

        .poem-title::before,
        .poem-title::after {
          content: '✦';
          display: block;
          font-size: 0.9rem;
          color: #d4a574;
          margin: 0.3rem 0;
        }

        .poem-author {
          text-align: center;
          font-style: italic;
          color: #8b5a6d;
          margin-bottom: 1.2rem;
          font-size: 0.9rem;
        }

        .poem-content {
          font-family: 'Crimson Text', serif;
          font-size: 0.95rem;
          line-height: 1.9;
          color: #333;
          text-align: center;
          white-space: pre-wrap;
          word-wrap: break-word;
          flex: 1;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .poem-content::-webkit-scrollbar {
          width: 4px;
        }

        .poem-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .poem-content::-webkit-scrollbar-thumb {
          background: #d4a574;
          border-radius: 2px;
        }

        .page-footer {
          display: none;
        }

        .controls-wrapper {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: 2px solid #d4a574;
          background: #fff;
          color: #7c2d5f;
          font-family: 'Crimson Text', serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.05em;
        }

        .btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #f5e6d3 0%, #f0dcc8 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 45, 95, 0.15);
        }

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #d4a574 0%, #c99563 100%);
          color: #fff;
          border-color: #c99563;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #c99563 0%, #bf8a52 100%);
          box-shadow: 0 6px 16px rgba(212, 165, 116, 0.3);
        }

        .progress-indicator {
          text-align: center;
          font-family: 'Playfair Display', serif;
          color: #7c2d5f;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .progress-bar {
          width: 100%;
          max-width: 900px;
          height: 3px;
          background: #e8dcc8;
          overflow: hidden;
          margin-bottom: 2rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4a574 0%, #7c2d5f 100%);
          transition: width 0.6s ease-out;
        }

        @media (max-width: 768px) {
          .book-container {
            height: 500px;
            margin: 0 auto 1.5rem;
          }

          .book-page {
            padding: 2rem 1.5rem;
          }

          .poem-title {
            font-size: 1.4rem;
          }

          .poem-content {
            font-size: 0.9rem;
          }

          .controls-wrapper {
            gap: 0.5rem;
          }

          .btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }

          .page-header,
          .page-footer {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .book-container {
            height: 450px;
            margin: 0 auto 1rem;
          }

          .book-page {
            padding: 1.5rem 1rem;
          }

          .poem-title {
            font-size: 1.2rem;
          }

          .poem-title::before,
          .poem-title::after {
            font-size: 0.7rem;
            margin: 0.2rem 0;
          }

          .poem-content {
            font-size: 0.85rem;
            line-height: 1.7;
          }

          .btn {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }

          .progress-indicator {
            font-size: 0.85rem;
            margin-bottom: 0.75rem;
          }

          .controls-wrapper {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>

      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-rose-900 mb-2 font-serif">
            📖 A Poet's Library
          </h1>
          <p className="text-rose-700/70 text-sm sm:text-base font-serif">
            Turn the pages • Explore the verses
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          Page {currentPoemIndex + 1}-{Math.min(currentPoemIndex + 2, poems.length)} of {poems.length}
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentPoemIndex + 1) / poems.length) * 100}%`,
            }}
          />
        </div>

        {/* Book Container */}
        <div className="book-container" onClick={handleBookClick}>
          <div className="book-spine" />
          <div className="pages-wrapper">
            {/* Left Page */}
            <div className={`book-page front ${isFlipping ? `flipping ${flipDirection}` : ""}`}>
              <div className="page-content">
                <h2 className="poem-title">{leftPoem.title}</h2>
                <div className="poem-author">— {leftPoem.author}</div>
                <div className="poem-content">{leftPoem.content}</div>
              </div>
            </div>

            {/* Right Page */}
            <div className={`book-page back ${isFlipping ? `flipping ${flipDirection}` : ""}`}>
              <div className="page-content">
                {rightPoem ? (
                  <>
                    <h2 className="poem-title">{rightPoem.title}</h2>
                    <div className="poem-author">— {rightPoem.author}</div>
                    <div className="poem-content">{rightPoem.content}</div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <p className="text-xl font-serif text-rose-900 mb-4">The End</p>
                      <p className="text-rose-700/60 font-serif text-sm">Thank you for reading</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="book-shadow" />
        </div>
      </div>
    </div>
  );
}

export const BookPageTurner = BookPageTurnerContent;
