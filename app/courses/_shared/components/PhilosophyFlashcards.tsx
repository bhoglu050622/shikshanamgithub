'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { FlashcardData } from '@/lib/courses/flashcardData';

interface Props {
  flashcards: FlashcardData[];
  title: string;
  subtitle: string;
  className?: string;
}

export default function PhilosophyFlashcards({ flashcards, title, subtitle, className = '' }: Props) {
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

  const displayCards = flashcards.slice(0, 4);

  return (
    <section className={`philosophy-flashcards-section ${className}`}>
      <div className="flashcards-header">
        <h2>{title}</h2>
        <p>{subtitle}</p>
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

