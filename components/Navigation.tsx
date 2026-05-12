"use client";

import Link from "next/link";
import { useState } from "react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-rose-300 via-pink-300 to-rose-300 border-b-2 border-rose-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <div className="text-2xl sm:text-3xl animate-pulse">💕</div>
          <span className="text-sm sm:text-lg md:text-xl font-serif font-bold text-rose-900 truncate">
            100 Poems for Allaine
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-8 items-center">
          <Link
            href="/poems"
            className="text-rose-800 hover:text-rose-900 transition-colors font-serif font-medium text-sm sm:text-base"
          >
            Library
          </Link>
          <Link
            href="/"
            className="text-rose-800 hover:text-rose-900 transition-colors font-serif font-medium text-sm sm:text-base"
          >
            Home
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-rose-800 hover:text-rose-900 transition-colors"
        >
          <span className="text-lg">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-rose-400 bg-pink-300">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            <Link
              href="/poems"
              className="text-rose-800 hover:text-rose-900 transition-colors font-serif font-medium py-2 px-3 rounded hover:bg-rose-300"
              onClick={() => setIsOpen(false)}
            >
              Library
            </Link>
            <Link
              href="/"
              className="text-rose-800 hover:text-rose-900 transition-colors font-serif font-medium py-2 px-3 rounded hover:bg-rose-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
