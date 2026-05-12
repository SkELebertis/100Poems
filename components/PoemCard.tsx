"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Poem } from "@/data/poems";

interface PoemCardProps {
  poem: Poem;
}

const bookColors = [
  'book-color-1',
  'book-color-2',
  'book-color-3',
  'book-color-4',
  'book-color-5',
  'book-color-6',
  'book-color-7',
  'book-color-8',
];

export function PoemCard({ poem }: PoemCardProps) {
  const [isOpening, setIsOpening] = useState(false);
  const router = useRouter();
  const colorClass = bookColors[poem.id.length % bookColors.length];
  
  const handleClick = () => {
    setIsOpening(true);
    // Navigate after animation completes
    setTimeout(() => {
      router.push(`/poems/${poem.id}`);
    }, 700);
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`poem-card ${colorClass} group cursor-pointer relative transition-all ${isOpening ? 'book-opening' : 'hover:scale-105'}`}
    >
        {/* Decorative top band - thin - pink */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-900 via-pink-700 to-pink-900 opacity-70 pointer-events-none"></div>
        
        {/* Book spine content - scaled for thin books */}
        <div className="flex flex-col justify-between h-full w-full z-10 relative overflow-hidden" style={{ paddingTop: '6px', paddingBottom: '6px' }}>
          {/* Top spacing */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <h3 
              className="text-xs font-serif font-bold text-pink-50 text-center leading-relaxed drop-shadow-lg whitespace-normal" 
              style={{ 
                writingMode: 'vertical-rl', 
                transform: 'rotate(180deg)',
                maxHeight: '100%',
                overflow: 'hidden',
                wordBreak: 'break-word',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {poem.title}
            </h3>
          </div>

          {/* Middle spacer - ornate divider - thin - pink */}
          <div className="flex items-center justify-center gap-0.5 py-1">
            <div className="w-0.5 h-0.5 rounded-full bg-pink-100/60"></div>
            <div className="w-2 h-px bg-gradient-to-r from-transparent via-pink-100/50 to-transparent rounded"></div>
            <div className="w-0.5 h-0.5 rounded-full bg-pink-100/60"></div>
          </div>

          {/* Bottom info - reduced for thin books - pink text */}
          <div className="flex flex-col items-center justify-end pb-3">
            <p className="text-xs text-pink-100/80 font-serif leading-none">{poem.category}</p>
            <p className="text-xs text-pink-100/70 font-serif leading-none">{poem.date.split('-')[0]}</p>
          </div>
        </div>
        
        {/* Decorative bottom band - thin - pink */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-900 via-pink-700 to-pink-900 opacity-70 pointer-events-none"></div>
        
        {/* Side ornaments - left - subtle for thin books - pink */}
        <div className="absolute left-0.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-pink-200/25 via-transparent to-pink-200/25 pointer-events-none rounded"></div>
        
        {/* Side ornaments - right - subtle for thin books - pink */}
        <div className="absolute right-0.5 top-3 bottom-3 w-0.5 bg-gradient-to-b from-pink-200/25 via-transparent to-pink-200/25 pointer-events-none rounded"></div>

      {/* Magical light burst effect when opening */}
      {isOpening && (
        <>
          <div className="absolute inset-0 book-light-burst pointer-events-none"></div>
          <div className="absolute inset-0 book-glow-effect pointer-events-none"></div>
        </>
      )}
    </div>
  );
}
