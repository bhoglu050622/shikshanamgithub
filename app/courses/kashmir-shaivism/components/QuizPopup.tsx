'use client';

interface QuizPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuizPopup({ isOpen, onClose }: QuizPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="quiz-popup-overlay" onClick={onClose}>
      <div className="quiz-popup" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="close-popup-btn"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <h3>Let's Find Your Current Rhythm!</h3>
        <p className="text-gray-300 mb-6">
          Discover how closely your life aligns with Shiva's cosmic rhythm. Answer simple questions to find your flow.
        </p>
        <a 
          href="/how-aligned-are-you"
          onClick={onClose}
        >
          <button className="bg-gradient-to-b from-[#f0b94b] to-[#e59f28] hover:from-[#e59f28] hover:to-[#d18e22] text-black font-bold py-3 px-8 rounded-lg transition-shadow duration-300 shadow-[0_4px_15px_0px_rgba(229,159,40,0.4)] hover:shadow-[0_4px_20px_0px_rgba(229,159,40,0.6)] w-full">
            Take the Free Quiz Now
          </button>
        </a>
      </div>
    </div>
  );
}
