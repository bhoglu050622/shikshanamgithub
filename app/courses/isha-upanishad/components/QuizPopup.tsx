'use client';

interface QuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizPopup({ isOpen, onClose }: QuizPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="quiz-popup-overlay">
      <div className="quiz-popup">
        <button 
          onClick={onClose}
          className="close-popup-btn"
          aria-label="Close popup"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <h3>Find Your Spiritual Path</h3>
        <p className="text-gray-300 mb-6">
          Take our free quiz to discover which aspect of the Isha Upanishad resonates most with your current spiritual journey.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-pink-400">✓</span>
            <span>Personalized spiritual guidance</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-pink-400">✓</span>
            <span>Understanding your current state</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span className="text-pink-400">✓</span>
            <span>Recommended study path</span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="quiz-button w-full py-3 px-6 rounded-lg font-semibold text-lg"
        >
          Start Free Quiz
        </button>
      </div>
    </div>
  );
}
