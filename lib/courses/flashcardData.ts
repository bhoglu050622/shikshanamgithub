// Philosophy-specific flashcard content for interactive learning

export interface FlashcardData {
  sanskrit: string;
  hindi: string;
  english: string;
}

export const sanskritCourseFlashcards: FlashcardData[] = [
  { sanskrit: 'नमस्ते', hindi: 'नमस्कार', english: 'Greetings' },
  { sanskrit: 'धन्यवादः', hindi: 'धन्यवाद', english: 'Thank you' },
  { sanskrit: 'कथम् अस्ति?', hindi: 'आप कैसे हैं?', english: 'How are you?' },
  { sanskrit: 'शुभ प्रभातम्', hindi: 'सुप्रभात', english: 'Good morning' },
  { sanskrit: 'तव नाम किम्?', hindi: 'आपका नाम क्या है?', english: 'What is your name?' },
  { sanskrit: 'अहं कुशली अस्मि', hindi: 'मैं ठीक हूँ', english: 'I am fine' }
];

export const yogaDarshanFlashcards: FlashcardData[] = [
  { sanskrit: 'योगः चित्तवृत्ति निरोधः', hindi: 'योग चित्त की वृत्तियों का निरोध है', english: 'Yoga is the cessation of mental modifications' },
  { sanskrit: 'अभ्यास', hindi: 'निरंतर अभ्यास', english: 'Constant practice' },
  { sanskrit: 'वैराग्य', hindi: 'वैराग्य', english: 'Detachment' },
  { sanskrit: 'समाधि', hindi: 'समाधि', english: 'State of absorption' },
  { sanskrit: 'यम', hindi: 'नैतिक संयम', english: 'Ethical restraints' },
  { sanskrit: 'नियम', hindi: 'व्यक्तिगत अनुशासन', english: 'Personal observances' }
];

export const ishaUpanishadFlashcards: FlashcardData[] = [
  { sanskrit: 'ईशा वास्यमिदं सर्वम्', hindi: 'यह सब ईश्वर से व्याप्त है', english: 'All this is pervaded by the Lord' },
  { sanskrit: 'तेन त्यक्तेन भुञ्जीथाः', hindi: 'त्याग से भोगो', english: 'Enjoy through renunciation' },
  { sanskrit: 'ब्रह्म', hindi: 'परम सत्य', english: 'Supreme Reality' },
  { sanskrit: 'आत्मा', hindi: 'अपना स्वरूप', english: 'The Self' },
  { sanskrit: 'कुर्वन्नेव इह कर्माणि', hindi: 'यहाँ कर्म करते हुए', english: 'While performing actions here' },
  { sanskrit: 'जीजीविषेत्', hindi: 'जीने की इच्छा करे', english: 'One should desire to live' }
];

export const advaitaVedantaFlashcards: FlashcardData[] = [
  { sanskrit: 'दृक्', hindi: 'द्रष्टा', english: 'The Seer' },
  { sanskrit: 'दृश्य', hindi: 'दृश्य', english: 'The Seen' },
  { sanskrit: 'माया', hindi: 'भ्रम', english: 'Illusion' },
  { sanskrit: 'साक्षी', hindi: 'साक्षी भाव', english: 'Witness Consciousness' },
  { sanskrit: 'अद्वैत', hindi: 'अद्वैत', english: 'Non-duality' },
  { sanskrit: 'विवेक', hindi: 'विवेक', english: 'Discrimination' }
];

export const nyayaDarshanFlashcards: FlashcardData[] = [
  { sanskrit: 'प्रमाण', hindi: 'ज्ञान के साधन', english: 'Means of valid knowledge' },
  { sanskrit: 'अनुमान', hindi: 'अनुमान', english: 'Inference' },
  { sanskrit: 'तर्क', hindi: 'तर्क', english: 'Reasoning' },
  { sanskrit: 'हेत्वाभास', hindi: 'तर्क दोष', english: 'Fallacies' },
  { sanskrit: 'प्रत्यक्ष', hindi: 'प्रत्यक्ष ज्ञान', english: 'Direct perception' },
  { sanskrit: 'उपमान', hindi: 'तुलना द्वारा ज्ञान', english: 'Knowledge by comparison' }
];

export const vaisheshikDarshanFlashcards: FlashcardData[] = [
  { sanskrit: 'द्रव्य', hindi: 'पदार्थ', english: 'Substance' },
  { sanskrit: 'गुण', hindi: 'गुण', english: 'Quality' },
  { sanskrit: 'कर्म', hindi: 'क्रिया', english: 'Action' },
  { sanskrit: 'सामान्य', hindi: 'सामान्य', english: 'Generality' },
  { sanskrit: 'परमाणु', hindi: 'परमाणु', english: 'Atom' },
  { sanskrit: 'विशेष', hindi: 'विशिष्टता', english: 'Particularity' }
];

export const tantraDarshanFlashcards: FlashcardData[] = [
  { sanskrit: 'शक्ति', hindi: 'शक्ति', english: 'Divine Energy' },
  { sanskrit: 'शिव', hindi: 'शिव', english: 'Pure Consciousness' },
  { sanskrit: 'कुण्डलिनी', hindi: 'कुण्डलिनी शक्ति', english: 'Serpent Power' },
  { sanskrit: 'चक्र', hindi: 'ऊर्जा केंद्र', english: 'Energy Center' },
  { sanskrit: 'यन्त्र', hindi: 'पवित्र ज्यामिति', english: 'Sacred Geometry' },
  { sanskrit: 'मन्त्र', hindi: 'पवित्र ध्वनि', english: 'Sacred Sound' }
];

export const prashnaUpanishadFlashcards: FlashcardData[] = [
  { sanskrit: 'प्रश्न', hindi: 'प्रश्न', english: 'Question' },
  { sanskrit: 'प्राण', hindi: 'प्राण शक्ति', english: 'Life Force' },
  { sanskrit: 'ओङ्कार', hindi: 'ओम्', english: 'Sacred syllable Om' },
  { sanskrit: 'षट् प्रश्नाः', hindi: 'छः प्रश्न', english: 'Six Questions' },
  { sanskrit: 'आत्मविद्या', hindi: 'आत्म ज्ञान', english: 'Self-Knowledge' },
  { sanskrit: 'ब्रह्मविद्या', hindi: 'ब्रह्म का ज्ञान', english: 'Knowledge of Brahman' }
];

export const yogaAdvancedFlashcards: FlashcardData[] = [
  { sanskrit: 'संयम', hindi: 'संयम', english: 'Perfect Control' },
  { sanskrit: 'विभूति', hindi: 'सिद्धियाँ', english: 'Supernatural Powers' },
  { sanskrit: 'कैवल्य', hindi: 'परम मुक्ति', english: 'Absolute Liberation' },
  { sanskrit: 'धारणा', hindi: 'धारणा', english: 'Concentration' },
  { sanskrit: 'ध्यान', hindi: 'ध्यान', english: 'Meditation' },
  { sanskrit: 'समाधि', hindi: 'समाधि', english: 'Absorption' }
];

export const chanakyaCodeFlashcards: FlashcardData[] = [
  { sanskrit: 'राजनीति', hindi: 'राजनीति', english: 'Statecraft' },
  { sanskrit: 'अर्थशास्त्र', hindi: 'अर्थशास्त्र', english: 'Economics & Politics' },
  { sanskrit: 'नीति', hindi: 'नीति', english: 'Ethics & Policy' },
  { sanskrit: 'दण्ड', hindi: 'दण्ड नीति', english: 'Justice System' },
  { sanskrit: 'राजधर्म', hindi: 'राजा के कर्तव्य', english: 'Duties of a Ruler' },
  { sanskrit: 'कूटनीति', hindi: 'कूटनीति', english: 'Diplomacy' }
];

