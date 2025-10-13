'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { sanskritCourseFlashcards } from '@/lib/courses/flashcardData';

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

  // Use first 4 flashcards
  const displayCards = sanskritCourseFlashcards.slice(0, 4);

  return (
    <section className="flashcards-section">
      <div className="flashcards-header">
        <h2>संस्कृत सीखें मज़ेदार तरीके से</h2>
        <p>Learn Sanskrit Through Interactive Flashcards - Click to Reveal Meanings</p>
      </div>
      <div className="flashcards-container">
        {displayCards.map((card, index) => (
          <div
            key={index}
            className="flashcard"
            data-card-id={index.toString()}
            ref={(el) => { cardRefs.current[index.toString()] = el; }}
          >
            <div className="flashcard-inner">
              <div className="flashcard-front">
                <div className="flashcard-icon-container">
                  <span>?</span>
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

