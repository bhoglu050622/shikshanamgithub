import { NextRequest, NextResponse } from 'next/server'

// Time to Sanskrit phrase mapping
const timeToSanskritMap: Record<string, { phrase: string; transliteration: string; meaning: string }> = {
  '00:00': { phrase: 'मध्यरात्रिः', transliteration: 'madhyarātriḥ', meaning: 'midnight' },
  '00:30': { phrase: 'मध्यरात्र्यर्धम्', transliteration: 'madhyarātryardham', meaning: 'half past midnight' },
  '01:00': { phrase: 'एकवादनम्', transliteration: 'ekavādanam', meaning: 'one o\'clock' },
  '01:30': { phrase: 'एकवादनमर्धम्', transliteration: 'ekavādanamardham', meaning: 'half past one' },
  '02:00': { phrase: 'द्विवादनम्', transliteration: 'dvivādanam', meaning: 'two o\'clock' },
  '02:30': { phrase: 'द्विवादनमर्धम्', transliteration: 'dvivādanamardham', meaning: 'half past two' },
  '03:00': { phrase: 'त्रिवादनम्', transliteration: 'trivādanam', meaning: 'three o\'clock' },
  '03:30': { phrase: 'त्रिवादनमर्धम्', transliteration: 'trivādanamardham', meaning: 'half past three' },
  '04:00': { phrase: 'चतुर्वादनम्', transliteration: 'caturvādanam', meaning: 'four o\'clock' },
  '04:30': { phrase: 'चतुर्वादनमर्धम्', transliteration: 'caturvādanamardham', meaning: 'half past four' },
  '05:00': { phrase: 'पञ्चवादनम्', transliteration: 'pañcavādanam', meaning: 'five o\'clock' },
  '05:30': { phrase: 'पञ्चवादनमर्धम्', transliteration: 'pañcavādanamardham', meaning: 'half past five' },
  '06:00': { phrase: 'प्रातःकालः', transliteration: 'prātaḥkālaḥ', meaning: 'morning' },
  '06:30': { phrase: 'प्रातःकाल्यर्धम्', transliteration: 'prātaḥkālyardham', meaning: 'half past six' },
  '07:00': { phrase: 'सप्तवादनम्', transliteration: 'saptavādanam', meaning: 'seven o\'clock' },
  '07:30': { phrase: 'सप्तवादनमर्धम्', transliteration: 'saptavādanamardham', meaning: 'half past seven' },
  '08:00': { phrase: 'अष्टवादनम्', transliteration: 'aṣṭavādanam', meaning: 'eight o\'clock' },
  '08:30': { phrase: 'अष्टवादनमर्धम्', transliteration: 'aṣṭavādanamardham', meaning: 'half past eight' },
  '09:00': { phrase: 'नववादनम्', transliteration: 'navavādanam', meaning: 'nine o\'clock' },
  '09:30': { phrase: 'नववादनमर्धम्', transliteration: 'navavādanamardham', meaning: 'half past nine' },
  '10:00': { phrase: 'दशवादनम्', transliteration: 'daśavādanam', meaning: 'ten o\'clock' },
  '10:30': { phrase: 'दशवादनमर्धम्', transliteration: 'daśavādanamardham', meaning: 'half past ten' },
  '11:00': { phrase: 'एकादशवादनम्', transliteration: 'ekādaśavādanam', meaning: 'eleven o\'clock' },
  '11:30': { phrase: 'एकादशवादनमर्धम्', transliteration: 'ekādaśavādanamardham', meaning: 'half past eleven' },
  '12:00': { phrase: 'मध्यान्हम्', transliteration: 'madhyānham', meaning: 'noon' },
  '12:30': { phrase: 'मध्यान्हमर्धम्', transliteration: 'madhyānhamardham', meaning: 'half past twelve' },
  '13:00': { phrase: 'त्रयोदशवादनम्', transliteration: 'trayodaśavādanam', meaning: 'one o\'clock pm' },
  '13:30': { phrase: 'त्रयोदशवादनमर्धम्', transliteration: 'trayodaśavādanamardham', meaning: 'half past one pm' },
  '14:00': { phrase: 'चतुर्दशवादनम्', transliteration: 'chaturdaśavādanam', meaning: 'two o\'clock pm' },
  '14:30': { phrase: 'चतुर्दशवादनमर्धम्', transliteration: 'chaturdaśavādanamardham', meaning: 'half past two pm' },
  '15:00': { phrase: 'पञ्चदशवादनम्', transliteration: 'pañcadaśavādanam', meaning: 'three o\'clock pm' },
  '15:30': { phrase: 'पञ्चदशवादनमर्धम्', transliteration: 'pañcadaśavādanamardham', meaning: 'half past three pm' },
  '16:00': { phrase: 'षोडशवादनम्', transliteration: 'ṣoḍaśavādanam', meaning: 'four o\'clock pm' },
  '16:30': { phrase: 'षोडशवादनमर्धम्', transliteration: 'ṣoḍaśavādanamardham', meaning: 'half past four pm' },
  '17:00': { phrase: 'सप्तदशवादनम्', transliteration: 'saptadaśavādanam', meaning: 'five o\'clock pm' },
  '17:30': { phrase: 'सप्तदशवादनमर्धम्', transliteration: 'saptadaśavādanamardham', meaning: 'half past five pm' },
  '18:00': { phrase: 'सायं', transliteration: 'sāyaṃ', meaning: 'evening' },
  '18:30': { phrase: 'सायमर्धम्', transliteration: 'sāyamardham', meaning: 'half past six pm' },
  '19:00': { phrase: 'एकोनविंशतिवादनम्', transliteration: 'ekonaviṁśativādanam', meaning: 'seven o\'clock pm' },
  '19:30': { phrase: 'एकोनविंशतिवादनमर्धम्', transliteration: 'ekonaviṁśativādanamardham', meaning: 'half past seven pm' },
  '20:00': { phrase: 'विंशतिवादनम्', transliteration: 'viṁśativādanam', meaning: 'eight o\'clock pm' },
  '20:30': { phrase: 'विंशतिवादनमर्धम्', transliteration: 'viṁśativādanamardham', meaning: 'half past eight pm' },
  '21:00': { phrase: 'एकविंशतिवादनम्', transliteration: 'ekaviṁśativādanam', meaning: 'nine o\'clock pm' },
  '21:30': { phrase: 'एकविंशतिवादनमर्धम्', transliteration: 'ekaviṁśativādanamardham', meaning: 'half past nine pm' },
  '22:00': { phrase: 'द्वाविंशतिवादनम्', transliteration: 'dvāviṁśativādanam', meaning: 'ten o\'clock pm' },
  '22:30': { phrase: 'द्वाविंशतिवादनमर्धम्', transliteration: 'dvāviṁśativādanamardham', meaning: 'half past ten pm' },
  '23:00': { phrase: 'त्रयोविंशतिवादनम्', transliteration: 'trayoviṁśativādanam', meaning: 'eleven o\'clock pm' },
  '23:30': { phrase: 'त्रयोविंशतिवादनमर्धम्', transliteration: 'trayoviṁśativādanamardham', meaning: 'half past eleven pm' }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const time = searchParams.get('time')
    
    if (!time) {
      return NextResponse.json(
        { error: 'Time parameter is required' },
        { status: 400 }
      )
    }
    
    // Validate time format (HH:MM)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(time)) {
      return NextResponse.json(
        { error: 'Invalid time format. Use HH:MM format' },
        { status: 400 }
      )
    }
    
    const sanskritPhrase = timeToSanskritMap[time]
    
    if (!sanskritPhrase) {
      return NextResponse.json(
        { error: 'Sanskrit phrase not found for the given time' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      time,
      phrase_deva: sanskritPhrase.phrase,
      transliteration: sanskritPhrase.transliteration,
      meaning: sanskritPhrase.meaning
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    })
  } catch (error) {
    console.error('Error fetching Sanskrit phrase:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Sanskrit phrase' },
      { status: 500 }
    )
  }
}
