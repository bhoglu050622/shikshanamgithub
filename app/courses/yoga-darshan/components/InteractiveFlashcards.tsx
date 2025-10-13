'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { yogaDarshanFlashcards } from '@/lib/courses/flashcardData';

export default function InteractiveFlashcards() {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const cardTimers = useMemo(() => ({} as { [key: string]: NodeJS.Timeout }), []);

  const startAutoFlipTimer = useCallback((card: HTMLDivElement) => {
    const cardId = card.dataset.cardId;
    if (!cardId) return;

    if (cardTimers[cardId]) {
      clearTimeout(cardTimers[cardId]);
    }

    cardTimers[cardId] = setTimeout(() => {
      card.classList.toggle('is-flipped');
      startAutoFlipTimer(card);
    }, 40000);
  }, [cardTimers]);

  const handleCardClick = useCallback((card: HTMLDivElement) => {
    card.classList.toggle('is-flipped');
    startAutoFlipTimer(card);
  }, [startAutoFlipTimer]);

  useEffect(() => {
    const cards = Object.values(cardRefs.current).filter(Boolean) as HTMLDivElement[];

    cards.forEach(card => {
      card.addEventListener('click', () => handleCardClick(card));
      startAutoFlipTimer(card);
    });

    return () => {
      Object.values(cardTimers).forEach(timer => clearTimeout(timer));
    };
  }, [cardTimers, handleCardClick, startAutoFlipTimer]);

  const displayCards = yogaDarshanFlashcards.slice(0, 4);

  return (
    <section className="yoga-flashcards-section">
      <div className="flashcards-header">
        <h2>योग सूत्रों की सरल झलक</h2>
        <p>Explore Key Concepts from Patanjali's Yoga Sutras - Click to Reveal</p>
      </div>
      <div className="flashcards-container">
        {displayCards.map((card, index) => (
          <div
            key={index}
            className="flashcard yoga-flashcard"
            data-card-id={index.toString()}
            ref={(el) => { cardRefs.current[index.toString()] = el; }}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="flashcard-icon-container">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="flashcard-text-content">
                  <p className="flashcard-sanskrit-text">{card.sanskrit}</p>
                  <p className="flip-indicator-text">Tap for meaning</p>
                </div>
              </div>
              <div className="flashcard-back">
                <div className="flip-back-indicator" title="Tap to flip back">
                  <i className="fa-solid fa-rotate-right"></i>
                </div>
                <div className="translation-group">
                  <p className="lang-label">हिन्दी</p>
                  <p className="translation-text hindi-text">{card.hindi}</p>
                </div>
                <div className="translation-group">
                  <p className="lang-label">English</p>
                  <p className="translation-text">{card.english}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

