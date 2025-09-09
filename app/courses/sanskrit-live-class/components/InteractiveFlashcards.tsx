'use client';

import { useEffect, useRef } from 'react';

interface FlashcardData {
  sanskrit: string;
  hindi: string;
  english: string;
}

export default function InteractiveFlashcards() {
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Data for the flashcards with multiple variations
  const cardDataSets: { [key: string]: FlashcardData[] } = {
    '1': [
      { sanskrit: 'कथम् अस्ति?', hindi: 'आप कैसी हैं?', english: 'How are you?' },
      { sanskrit: 'शुभ प्रभातम्।', hindi: 'सुप्रभात।', english: 'Good morning.' }
    ],
    '2': [
      { sanskrit: 'तव नाम किम्?', hindi: 'आपका नाम क्या है?', english: 'What is your name?' },
      { sanskrit: 'मम नामः आर्यः।', hindi: 'मेरा नाम आर्य है।', english: 'My name is Arya.' }
    ],
    '3': [
      { sanskrit: 'अहं कुशली अस्मि।', hindi: 'मैं ठीक हूँ।', english: 'I am fine.' },
      { sanskrit: 'चिन्ता मास्तु।', hindi: 'चिंता मत करो।', english: 'Don\'t worry.' }
    ],
    '4': [
      { sanskrit: 'धन्यवादः।', hindi: 'धन्यवाद।', english: 'Thank you.' },
      { sanskrit: 'पुनः मिलामः।', hindi: 'फिर मिलेंगे।', english: 'See you again.' }
    ]
  };

  const cardIndexes: { [key: string]: number } = { '1': 0, '2': 0, '3': 0, '4': 0 };
  const cardTimers: { [key: string]: NodeJS.Timeout } = {};

  useEffect(() => {
    const startAutoFlipTimer = (card: HTMLDivElement) => {
      const cardId = card.dataset.cardId;
      if (!cardId) return;

      // Clear any existing timer for this card
      if (cardTimers[cardId]) {
        clearTimeout(cardTimers[cardId]);
      }

      // Set a new timer
      cardTimers[cardId] = setTimeout(() => {
        card.classList.toggle('is-flipped');
        startAutoFlipTimer(card); // Restart the timer for the next flip
      }, 40000); // 40 seconds
    };

    const updateCardContent = (cardId: string) => {
      const dataSet = cardDataSets[cardId];
      if (!dataSet) return;

      const currentIndex = cardIndexes[cardId];
      const nextIndex = (currentIndex + 1) % dataSet.length;
      cardIndexes[cardId] = nextIndex;
      
      const nextData = dataSet[nextIndex];

      const card = cardRefs.current[cardId];
      if (!card) return;

      const frontSanskrit = card.querySelector('.flashcard-sanskrit-text');
      const backHindi = card.querySelector('.flashcard-back .hindi-text');
      const backEnglish = card.querySelector('.flashcard-back .translation-text:not(.hindi-text)');
      
      if (frontSanskrit) frontSanskrit.textContent = nextData.sanskrit;
      if (backHindi) backHindi.textContent = nextData.hindi;
      if (backEnglish) backEnglish.textContent = nextData.english;
    };

    const handleCardClick = (card: HTMLDivElement) => {
      card.classList.toggle('is-flipped');
      // When user interacts, reset the timer
      startAutoFlipTimer(card);
    };

    const handleTransitionEnd = (event: TransitionEvent, card: HTMLDivElement) => {
      // Only update content when the main flip transition ends
      if (event.propertyName === 'transform' && event.target === card.querySelector('.flashcard-inner')) {
        if (!card.classList.contains('is-flipped')) {
          const cardId = card.dataset.cardId;
          if (cardId) {
            updateCardContent(cardId);
          }
        }
      }
    };

    // Initialize all cards
    Object.keys(cardDataSets).forEach(cardId => {
      const card = cardRefs.current[cardId];
      if (card) {
        const cardInner = card.querySelector('.flashcard-inner');
        
        if (cardInner) {
          cardInner.addEventListener('transitionend', (e) => handleTransitionEnd(e as TransitionEvent, card));
        }

        card.addEventListener('click', () => handleCardClick(card));
        
        // Start the initial timer for each card
        startAutoFlipTimer(card);
      }
    });

    // Cleanup function
    return () => {
      Object.values(cardTimers).forEach(timer => clearTimeout(timer));
    };
  }, [cardDataSets, cardIndexes, cardTimers]);

  return (
    <section id="interactive-flashcards-section">
      <div className="flashcards-header">
        <h2>Learn Through Interaction</h2>
        <p>Engage with the Sanskrit language in a fun and memorable way. Click on any card to reveal its meaning and deepen your understanding.</p>
      </div>
      <div className="flashcards-container">
        {/* Card 1 */}
        <div 
          className="flashcard" 
          data-card-id="1"
          ref={(el) => { cardRefs.current['1'] = el; }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="flashcard-icon-container">
                <span>?</span>
              </div>
              <div className="flashcard-text-content">
                <p className="flashcard-sanskrit-text">कथम् अस्ति?</p>
                <p className="flip-indicator-text">Tap for meaning</p>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="flip-back-indicator" title="Tap to flip back">
                <i className="fa-solid fa-rotate-right"></i>
              </div>
              <div className="translation-group">
                <p className="lang-label">Hindi</p>
                <p className="translation-text hindi-text">आप कैसी हैं?</p>
              </div>
              <div className="translation-group">
                <p className="lang-label">English</p>
                <p className="translation-text">How are you?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          className="flashcard" 
          data-card-id="2"
          ref={(el) => { cardRefs.current['2'] = el; }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="flashcard-icon-container">
                <span>?</span>
              </div>
              <div className="flashcard-text-content">
                <p className="flashcard-sanskrit-text">तव नाम किम्?</p>
                <p className="flip-indicator-text">Tap for meaning</p>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="flip-back-indicator" title="Tap to flip back">
                <i className="fa-solid fa-rotate-right"></i>
              </div>
              <div className="translation-group">
                <p className="lang-label">Hindi</p>
                <p className="translation-text hindi-text">आपका नाम क्या है?</p>
              </div>
              <div className="translation-group">
                <p className="lang-label">English</p>
                <p className="translation-text">What is your name?</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div 
          className="flashcard" 
          data-card-id="3"
          ref={(el) => { cardRefs.current['3'] = el; }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="flashcard-icon-container">
                <span>?</span>
              </div>
              <div className="flashcard-text-content">
                <p className="flashcard-sanskrit-text">अहं कुशली अस्मि।</p>
                <p className="flip-indicator-text">Tap for meaning</p>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="flip-back-indicator" title="Tap to flip back">
                <i className="fa-solid fa-rotate-right"></i>
              </div>
              <div className="translation-group">
                <p className="lang-label">Hindi</p>
                <p className="translation-text hindi-text">मैं ठीक हूँ।</p>
              </div>
              <div className="translation-group">
                <p className="lang-label">English</p>
                <p className="translation-text">I am fine.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div 
          className="flashcard" 
          data-card-id="4"
          ref={(el) => { cardRefs.current['4'] = el; }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="flashcard-icon-container">
                <span>?</span>
              </div>
              <div className="flashcard-text-content">
                <p className="flashcard-sanskrit-text">धन्यवादः।</p>
                <p className="flip-indicator-text">Tap for meaning</p>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="flip-back-indicator" title="Tap to flip back">
                <i className="fa-solid fa-rotate-right"></i>
              </div>
              <div className="translation-group">
                <p className="lang-label">Hindi</p>
                <p className="translation-text hindi-text">धन्यवाद।</p>
              </div>
              <div className="translation-group">
                <p className="lang-label">English</p>
                <p className="translation-text">Thank you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
