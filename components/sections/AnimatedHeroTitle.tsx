"use client";

import { useEffect, useState } from "react";

const phrases = [
  "reliable web products.",
  "scalable cloud systems.",
  "clear digital experiences.",
] as const;

const PHRASE_DURATION = 3400;

export function AnimatedHeroTitle() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, PHRASE_DURATION);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="hero-phrase-window" aria-hidden="true">
      <span className="hero-phrase" key={phrases[phraseIndex]}>
        {phrases[phraseIndex]}
      </span>
    </span>
  );
}
