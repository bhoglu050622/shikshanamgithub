import { NextRequest, NextResponse } from 'next/server'

// Sample flashcards data as specified in the requirements
const flashcardsData = [
  {
    id: 1,
    english: "I am eating food.",
    sanskrit: "अहं अन्नं खादामि।",
    transliteration: "ahaṁ annaṁ khādāmi",
    difficulty: "beginner"
  },
  {
    id: 2,
    english: "She is reading a book.",
    sanskrit: "सा पुस्तकम् पठति।",
    transliteration: "sā pustakam paṭhati",
    difficulty: "beginner"
  },
  {
    id: 3,
    english: "He is going to school.",
    sanskrit: "सः विद्यालयं गच्छति।",
    transliteration: "saḥ vidyālayaṁ gacchati",
    difficulty: "beginner"
  },
  {
    id: 4,
    english: "Where is the water?",
    sanskrit: "जलं कुत्र अस्ति?",
    transliteration: "jalaṁ kutra asti?",
    difficulty: "beginner"
  },
  {
    id: 5,
    english: "Please speak slowly.",
    sanskrit: "कृपया मन्दं भाषत।",
    transliteration: "kṛpayā mandaṁ bhāṣata",
    difficulty: "beginner"
  },
  {
    id: 6,
    english: "I love learning Sanskrit.",
    sanskrit: "मम संस्कृतम् अध्ययनं रोचते।",
    transliteration: "mama saṁskṛtam adhyayanaṁ rocate",
    difficulty: "intermediate"
  },
  {
    id: 7,
    english: "Open the door.",
    sanskrit: "द्वारं उद्घाटय।",
    transliteration: "dvāraṁ udghāṭaya",
    difficulty: "beginner"
  },
  {
    id: 8,
    english: "Come here.",
    sanskrit: "अत्र आगच्छ।",
    transliteration: "atra āgaccha",
    difficulty: "beginner"
  },
  {
    id: 9,
    english: "Thank you for your help.",
    sanskrit: "तव साहाय्याय धन्यवादाः।",
    transliteration: "tava sāhāyyāya dhanyavādāḥ",
    difficulty: "intermediate"
  },
  {
    id: 10,
    english: "I will return tomorrow.",
    sanskrit: "अहं श्वः आगमिष्यामि।",
    transliteration: "ahaṁ śvaḥ āgamiṣyāmi",
    difficulty: "intermediate"
  },
  {
    id: 11,
    english: "What is your name?",
    sanskrit: "तव नाम किम्?",
    transliteration: "tava nāma kim?",
    difficulty: "beginner"
  },
  {
    id: 12,
    english: "My name is ___.",
    sanskrit: "मम नाम ___ अस्ति।",
    transliteration: "mama nāma ___ asti",
    difficulty: "beginner"
  },
  {
    id: 13,
    english: "I don't understand.",
    sanskrit: "मम न अवगच्छति।",
    transliteration: "mama na avagacchati",
    difficulty: "intermediate"
  },
  {
    id: 14,
    english: "Can you repeat that?",
    sanskrit: "पुनः कृत्वा वद।",
    transliteration: "punaḥ kṛtvā vada",
    difficulty: "intermediate"
  },
  {
    id: 15,
    english: "How much does this cost?",
    sanskrit: "एतत् किं मूल्यं?",
    transliteration: "etat kiṁ mūlyaṁ?",
    difficulty: "intermediate"
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    
    let filteredCards = flashcardsData
    
    // Filter by difficulty level if provided
    if (level && ['beginner', 'intermediate', 'advanced'].includes(level)) {
      filteredCards = flashcardsData.filter(card => card.difficulty === level)
    }
    
    return NextResponse.json(filteredCards, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error fetching flashcards:', error)
    return NextResponse.json(
      { error: 'Failed to fetch flashcards' },
      { status: 500 }
    )
  }
}
