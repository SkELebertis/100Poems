"use client";

import React, { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Create initial petals
    const initialPetals: Petal[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setPetals(initialPetals);

    // Add new petals periodically
    const interval = setInterval(() => {
      setPetals((prev) => [
        ...prev,
        {
          id: Date.now(),
          left: Math.random() * 100,
          delay: 0,
          duration: 8 + Math.random() * 4,
        },
      ]);
    }, 500);

    // Clean up old petals
    const cleanup = setInterval(() => {
      setPetals((prev) => {
        if (prev.length > 50) {
          return prev.slice(prev.length - 40);
        }
        return prev;
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="sakura-petal"
          style={
            {
              "--left": `${petal.left}%`,
              "--delay": `${petal.delay}s`,
              "--duration": `${petal.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </>
  );
}
