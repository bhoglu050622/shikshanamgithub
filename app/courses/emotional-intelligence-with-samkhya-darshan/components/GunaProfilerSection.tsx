'use client'

import { useEffect, useState, useRef } from 'react'

interface GunaScores {
  sattva: number
  rajas: number
  tamas: number
}

interface UserDetails {
  name: string
  email: string
  mobile: string
}

interface Question {
  q: string
  a: [string, string, string]
}

const questions: Question[] = [
  { q: "How do you typically wake up?", a: ["Calm and refreshed", "Anxious, ready to go", "Sluggish, want more sleep"] },
  { q: "What motivates your actions?", a: ["Clarity and purpose", "Goals and ambitions", "Habit or comfort"] },
  { q: "How do you handle stress?", a: ["Detach and reflect", "Push through harder", "Avoid or numb it"] },
  { q: "Your reaction to conflict is to...", a: ["Seek peace and understanding", "Argue or defend assertively", "Withdraw or shut down"] },
  { q: "When you are alone, you usually...", a: ["Meditate, read, or contemplate", "Plan, scroll, or multitask", "Sleep or binge-watch"] },
  { q: "How do you relate to food?", a: ["Choose light, pure foods", "Crave stimulating or spicy foods", "Prefer heavy or comfort foods"] },
  { q: "How do you learn best?", a: ["Through insight and reflection", "Through challenge and debate", "With repetition"] },
  { q: "You are drawn to people who are...", a: ["Calm and wise", "Energetic and driven", "Quiet and dependable"] },
  { q: "Your daily energy is...", a: ["Even and consistent", "Spiky—highs and lows", "Low and sluggish"] },
  { q: "How do you typically speak?", a: ["Clearly, gently, and meaningfully", "Fast, persuasively, and effectively", "Minimally, vaguely, or confused"] },
  { q: "How do you feel about change?", a: ["Embrace it with awareness", "Chase it to avoid boredom", "Resist it unless forced"] },
  { q: "When complimented, you...", a: ["Acknowledge and let go", "Feel motivated to do more", "Feel suspicious or indifferent"] },
  { q: "How do you make decisions?", a: ["After balanced reflection", "Quickly, on impulse", "Delay or avoid deciding"] },
  { q: "Your ideal environment is...", a: ["Natural and well-ordered", "Busy and full of action", "Dim, cozy, and isolated"] },
  { q: "At night, how does your mind feel?", a: ["Settled and content", "Racing with thoughts", "Foggy or restless"] },
  { q: "How do you approach your work or daily tasks?", a: ["With mindfulness and a sense of higher purpose", "With a focus on efficiency and achieving results", "I do what's necessary to get by"] },
  { q: "What kind of music do you prefer?", a: ["Calm, meditative, or classical music", "Upbeat, energetic, and powerful music", "Familiar, comforting, or melancholic tunes"] },
  { q: "When faced with a new opportunity, you feel...", a: ["Open and curious about its potential for growth", "Excited by the challenge and possibility of reward", "Hesitant and prefer to stick with what you know"] },
  { q: "Your living space tends to be...", a: ["Clean, organized, and filled with natural light", "Vibrant, full of personal projects, sometimes a bit messy", "Cozy and comfortable, but can become cluttered"] },
  { q: "How do you view wealth and possessions?", a: ["As tools for good, to be used with detachment", "As symbols of success and a means to enjoy life", "As a source of security and comfort"] }
]

const archetypes: Record<string, { archetype: string; description: string }> = {
  SRT: { archetype: "The Balanced Leader", description: "You have a powerful mix of clear vision (Sattva), passionate energy (Rajas), and grounded stability (Tamas). This makes you a natural and effective leader who can inspire people, drive action, and ensure things get done right." },
  STR: { archetype: "The Wise Strategist", description: "Your greatest strength is your clear, calm mind (Sattva). You ground your ideas in practical reality (Tamas) before taking action (Rajas). This makes you a master planner who builds things that last." },
  RST: { archetype: "The Passionate Teacher", description: "You are fueled by a powerful energy (Rajas) and guided by a clear wisdom (Sattva). This combination makes you a natural teacher and motivator, able to make complex ideas exciting and easy to understand for everyone." },
  RTS: { archetype: "The Driven Pragmatist", description: "You are a powerhouse of action (Rajas) who is also incredibly practical and grounded (Tamas). You have a rare ability to get things done in the real world, using your wisdom (Sattva) to make your efforts even more effective." },
  TSR: { archetype: "The Grounded Innovator", description: "Your foundation is your stability (Tamas), but it's lit up by bright ideas (Sattva) and a surprising amount of energy (Rajas). You don't just resist change; you create meaningful, lasting improvements from a solid base." },
  TRS: { archetype: "The Resilient Caretaker", description: "You are the rock for your family and community. Your stability (Tamas) is fueled by a strong inner drive (Rajas) and a deep sense of compassion (Sattva). You provide the safety and support that helps others thrive." },
  SR: { archetype: "The Pure Achiever", description: "You are a potent mix of clear vision (Sattva) and powerful action (Rajas). You can turn ideas into reality with amazing speed because you have very little holding you back. You're an idealist who gets things done." },
  ST: { archetype: "The Peaceful Anchor", description: "You combine clear wisdom (Sattva) with deep stability (Tamas). This makes you a profoundly calming presence in a chaotic world. People come to you for your steady and peaceful perspective." },
  RS: { archetype: "The Dynamic Creator", description: "You are a whirlwind of creative energy (Rajas) guided by clear insight (Sattva). You are a charismatic and innovative force, constantly coming up with new ideas and inspiring others to join you." },
  RT: { archetype: "The Powerful Executor", description: "You have the unstoppable drive of Rajas and the grounding endurance of Tamas. This makes you a master of getting things done. You have the energy to start and the stability to finish, no matter the obstacle." },
  TS: { archetype: "The Steady Guide", description: "Your deep stability (Tamas) is illuminated by a clear, guiding wisdom (Sattva). This makes you a patient, trustworthy, and compassionate guide. You move deliberately, and your actions are always filled with purpose." },
  TR: { archetype: "The Determined Builder", description: "You have a powerful combination of endurance (Tamas) and drive (Rajas). You are a master builder, able to take on long, difficult projects and see them through with unwavering determination." }
}

const analysisData: Record<string, { interplay: string; balance: string; shadow: string }> = {
  SRT: { 
    interplay: "Think of it like this: Sattva is your clear idea, Rajas is the energy to act on it, and Tamas is the steady hand that keeps you grounded. All three work together beautifully.", 
    balance: "To stay in harmony, notice what you need. Feeling scattered? Rest and recharge your Tamas. Feeling stuck? Reconnect with your 'why' to spark your Sattva.", 
    shadow: "Your challenge can be feeling like you have to be 'perfect' in all areas. This can be exhausting! Remember that true balance is about flowing with life, not being rigid." 
  },
  STR: { 
    interplay: "You think things through. Your clear ideas (Sattva) are first checked against reality (Tamas) before you act (Rajas). This makes your actions smart and effective.", 
    balance: "To avoid overthinking, make time for fun and action! Try a new hobby or a friendly competition to get your Rajas energy flowing.", 
    shadow: "Your challenge can be planning too much and being afraid to be spontaneous. Trust your gut feelings (your Sattva) more often—they are usually right!" 
  },
  RST: { 
    interplay: "You have a gift for making things happen. Your energy (Rajas) is guided by your wisdom (Sattva), making your passion purposeful. Your stability (Tamas) keeps you from burning out.", 
    balance: "Make sure your actions match your values. Before you jump into something, ask: 'Does this feel right?' This will keep your energy focused and prevent you from getting tired.", 
    shadow: "Your challenge can be thinking your way is the only way. Because you're so passionate and wise, you might get impatient with others. Practice listening to different views." 
  },
  RTS: { 
    interplay: "You are a practical powerhouse. Your energy (Rajas) is focused on what works (Tamas). Your wisdom (Sattva) then helps you improve what you're already doing.", 
    balance: "It's important for you to make time for quiet and beauty. Meditate, enjoy nature, or listen to music. This will give your powerful actions a deeper meaning.", 
    shadow: "Your challenge can be focusing so much on winning that you forget about people's feelings. Remember to use your compassion (Sattva) to build strong relationships." 
  },
  TSR: { 
    interplay: "You are a 'slow-burn' innovator. You start with a solid foundation (Tamas), get a great idea (Sattva), and then use your energy (Rajas) to slowly bring it to life. What you build is made to last.", 
    balance: "To avoid feeling stuck, you need to actively seek out energy! Regular exercise, exciting music, and dynamic people will help you get your fire going.", 
    shadow: "Your challenge can be waiting for the 'perfect' idea for so long that you never start. Sometimes, 'good enough' is the perfect place to begin." 
  },
  TRS: { 
    interplay: "You are the rock for others. Your stability (Tamas) is powered by a strong inner drive (Rajas) and a deep sense of caring (Sattva). You are strong, resilient, and create safety.", 
    balance: "Don't let your stability turn into being stuck. Actively choose exciting activities (Rajas) and uplifting books or movies (Sattva) to keep your energy fresh and flowing.", 
    shadow: "Your challenge can be stubbornness. Your stability is a strength, but it can make you resist changes that are good for you. Listen to your inner wisdom when it tells you it's time to move." 
  },
  SR: { 
    interplay: "You are a manifesting machine! Your clear vision (Sattva) and powerful energy (Rajas) work together to make things happen fast.", 
    balance: "You can burn out easily. You have to schedule time to rest and relax—it won't happen automatically. Your 'off' switch is manual!", 
    shadow: "Your challenge is impatience. You might start many great projects but have trouble finishing them because you lack the steady, long-term energy of Tamas." 
  },
  ST: { 
    interplay: "You are an unshakable pillar of calm. Your wisdom (Sattva) is deeply rooted in your stability (Tamas), making you a source of peace for others.", 
    balance: "You need to seek out action (Rajas) to avoid getting stuck in your head. Share your wisdom with the world by taking on a project or helping someone.", 
    shadow: "Your challenge can be avoiding difficult situations because they disturb your peace. True wisdom means facing life's challenges with your calm strength." 
  },
  RS: { 
    interplay: "You are a charismatic and inspiring leader. Your energy (Rajas) is guided by your wisdom (Sattva), making your passion both intelligent and contagious.", 
    balance: "You have a lot of energy! Grounding practices, like walking in nature, are essential to keep you from feeling scattered and to focus your dynamic power.", 
    shadow: "Your challenge can be arrogance. Because you're smart and energetic, you might think you're always right. Practice being open to other people's ideas." 
  },
  RT: { 
    interplay: "You are the ultimate finisher. You have the drive (Rajas) to start and the endurance (Tamas) to see things through, no matter how hard they get.", 
    balance: "You need to connect with your 'why'. Without a sense of purpose (Sattva), your hard work can feel empty. Take time for art, philosophy, or quiet reflection.", 
    shadow: "Your challenge is working hard without a clear direction. You might be very busy but not on the right things. Pause and ask if your work has a higher purpose." 
  },
  TS: { 
    interplay: "You are a wise and patient guide. Your stability (Tamas) provides a solid foundation for your deep insights (Sattva) to grow.", 
    balance: "To avoid getting stuck, you need to find ways to take action (Rajas). Your wisdom is a gift—share it! Start a project or mentor someone who needs your guidance.", 
    shadow: "Your challenge is inaction. You may have wonderful ideas but fail to share them because you're too comfortable with how things are. Dare to act on your wisdom." 
  },
  TR: { 
    interplay: "You are a master builder. Your endurance (Tamas) is fueled by a powerful engine of energy (Rajas). You can handle long, tough projects with amazing determination.", 
    balance: "Your main challenge is to connect with your purpose (Sattva). Without a clear 'why', your hard work can feel meaningless. Regularly ask yourself: 'Who or what am I doing this for?'", 
    shadow: "Your challenge is becoming so focused on the task that you resist new ideas. Be open to new information (Sattva) that could make your work even better." 
  }
}

const recommendations = {
  dietary: {
    sattva: ["Fresh fruits and vegetables", "Whole grains like rice and oats", "Lightly cooked meals", "Herbal teas"],
    rajas: ["Spicy foods in moderation", "Sour and salty flavors", "Stimulants like coffee/tea (mindfully)", "A variety of tastes and textures"],
    tamas: ["Freshly cooked, light, and warm meals", "Foods that are easy to digest", "Mild spices like ginger and turmeric", "Avoiding leftovers and processed foods"]
  },
  activities: {
    sattva: ["Meditation and Yoga", "Spending quiet time in nature", "Reading spiritual texts", "Gentle morning walks"],
    rajas: ["Regular vigorous exercise", "Competitive sports", "Engaging in challenging projects", "Learning new skills"],
    tamas: ["Gentle stretching and Tai Chi", "Gardening or pottery", "Restorative yoga", "Maintaining a consistent sleep schedule"]
  },
  challenges: {
    sattva: {
      challenge: "The risk for you is becoming too passive or detached, staying in the world of ideas without bringing them into reality.",
      solution: "This week, pick one small, practical task you've been putting off. Complete it from start to finish. Notice how good it feels to turn your clear thoughts into a finished action."
    },
    rajas: {
      challenge: "Your biggest risk is burnout. Your constant drive can leave you feeling exhausted and restless if you don't manage it wisely.",
      solution: "Schedule a 15-minute 'do nothing' break into your day. No phone, no planning—just sit or walk quietly. This intentional pause will recharge your energy for more effective action later."
    },
    tamas: {
      challenge: "Your greatest challenge is inertia or getting 'stuck' in a routine. Comfort can sometimes keep you from growing.",
      solution: "This week, do one thing that is slightly outside your comfort zone. Try a new type of exercise, cook a new recipe, or take a different route to work. The goal is to gently shake up your energy."
    }
  }
}

const colorTherapy = {
  sattva: { 
    colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Light Blue", hex: "#ADD8E6" }, { name: "Pale Yellow", hex: "#FFFFE0" }, { name: "Pastels", hex: "#F1E4E8" }], 
    colorInfo: "These colors promote purity, tranquility, and clarity. They help calm the mind and elevate consciousness.", 
    howToUse: ["Wear white or light-colored clothes during meditation or spiritual practice.", "Paint the walls of your meditation or study room with these colors.", "Use light-colored bed linens for peaceful sleep."],
    problem: "An excess of light colors can sometimes make you feel 'spacey' or disconnected from reality. You might feel a lack of grounding energy needed for practical tasks.",
    solution: "Balance your Sattvic colors with small, grounding accents. A dark brown cushion, a small grey stone on your desk, or even dark green plants can provide the earthy stability you need."
  },
  rajas: { 
    colors: [{ name: "Red", hex: "#FF0000" }, { name: "Orange", hex: "#FFA500" }, { name: "Bright Pink", hex: "#FF69B4" }, { name: "Gold", hex: "#FFD700" }], 
    colorInfo: "These vibrant colors stimulate energy, passion, and action. Use them to invigorate and energize your space.", 
    howToUse: ["Use as accent colors (cushions, art) in your living room or home office to boost dynamism.", "Wear these colors when you need a boost of confidence or energy, like for a workout.", "Avoid overusing them in the bedroom as they can be over-stimulating."],
    problem: "Too much Rajasic color can lead to overstimulation, restlessness, and even aggression. It can make it hard to relax and switch off your mind.",
    solution: "Use these powerful colors as accents, not as the main event. A single red cushion is better than a red wall. Balance them with calming, Sattvic colors like white or light blue to create a space that is both energetic and peaceful."
  },
  tamas: { 
    colors: [{ name: "Dark Blue", hex: "#00008B" }, { name: "Brown", hex: "#A52A2A" }, { name: "Grey", hex: "#808080" }, { name: "Earthy Tones", hex: "#D2B48C" }], 
    colorInfo: "These colors provide stability, grounding, and a sense of security. They are ideal for creating a cozy and protected environment.", 
    howToUse: ["Incorporate these colors in flooring, rugs, or heavy furniture to feel more grounded.", "Create a cozy reading nook with dark, earthy-toned blankets and cushions.", "Balance with lighter colors on the walls to prevent the space from feeling heavy or stagnant."],
    problem: "An over-reliance on dark, Tamasic colors can create an environment that feels heavy, stagnant, or even depressing, reinforcing feelings of inertia.",
    solution: "The key is balance. Use these grounding colors for furniture or floors, but keep your walls light and bright (Sattvic white or pastels). Add pops of vibrant, Rajasic color like orange or gold to bring in energy and inspiration."
  }
}

export default function GunaProfilerSection() {
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'quiz' | 'registration' | 'results'>('intro')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [scores, setScores] = useState<GunaScores>({ sattva: 0, rajas: 0, tamas: 0 })
  const [userDetails, setUserDetails] = useState<UserDetails>({ name: '', email: '', mobile: '' })
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'recommendations' | 'colorTherapy'>('overview')
  const [personalityArchetype, setPersonalityArchetype] = useState('')
  const [gunaTraitCode, setGunaTraitCode] = useState('')
  const [dominantGuna, setDominantGuna] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const calculatePersonality = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0) || 1
    const percentages = { 
      sattva: Math.round((scores.sattva / totalScore) * 100), 
      rajas: Math.round((scores.rajas / totalScore) * 100), 
      tamas: Math.round((scores.tamas / totalScore) * 100) 
    }
    
    const sortedGunas = Object.entries(scores).sort(([,a],[,b]) => b - a)
    const dominant = sortedGunas[0][0]
    const traitCode = sortedGunas.map(([key]) => key.charAt(0).toUpperCase()).join('')

    setDominantGuna(dominant)
    setGunaTraitCode(traitCode)
    setPersonalityArchetype(traitCode)

    return { percentages, dominant, traitCode }
  }

  const handleAnswerSelect = (gunaType: 'sattva' | 'rajas' | 'tamas') => {
    setScores(prev => ({ ...prev, [gunaType]: prev[gunaType] + 1 }))
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      setCurrentScreen('registration')
    }
  }

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentScreen('results')
    calculatePersonality()
  }

  const resetQuiz = () => {
    setCurrentScreen('intro')
    setCurrentQuestionIndex(0)
    setScores({ sattva: 0, rajas: 0, tamas: 0 })
    setUserDetails({ name: '', email: '', mobile: '' })
    setActiveTab('overview')
    setPersonalityArchetype('')
    setGunaTraitCode('')
    setDominantGuna('')
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const archetypeData = archetypes[personalityArchetype]

  return (
    <>
      <style jsx>{`
        .option-btn {
          background-color: white;
          border: 2px solid #e5e7eb;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }
        .option-btn:hover {
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          border-color: #fcd34d;
          transform: translateY(-2px);
        }
        .option-btn.selected {
          background-image: linear-gradient(to right, #fffbeb, #fef3c7);
          border-color: #f59e0b;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          transform: translateY(-1px);
        }
        .tab-button {
          color: #4b5563;
          border-bottom-width: 2px;
          border-color: transparent;
          transition: all 0.3s ease;
          font-size: 1.05rem;
          font-weight: 500;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          margin: 0 0.25rem;
          white-space: nowrap;
        }
        .tab-button:hover {
          color: #f97316;
          background-color: #fffbeb;
        }
        .tab-button.active {
          color: #f97316;
          border-color: #f97316;
          font-weight: 700;
          background-color: #ffffff;
          box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
          z-index: 10;
          position: relative;
          border-bottom-color: #ffffff;
        }
        .guna-bar {
          transition: width 1.2s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .sattva-bar { background-color: #f59e0b; }
        .rajas-bar { background-color: #ec4899; }
        .tamas-bar { background-color: #8b5cf6; }
        .personality-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }
        .problem-box { 
          background: linear-gradient(to right, #fff1f2, #ffe4e6); 
          border-left: 4px solid #f87171; 
        }
        .solution-box { 
          background: linear-gradient(to right, #f0fdf4, #dcfce7); 
          border-left: 4px solid #4ade80; 
        }
        .recommendation-card { 
          transition: all 0.3s ease; 
        }
        .recommendation-card:hover { 
          transform: translateY(-5px); 
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
        }
      `}</style>
      
      <section 
        ref={sectionRef}
        className="py-16 bg-parchment-ivory text-slate-800"
      >
        <div className="max-w-5xl mx-auto px-4">
          {/* Header */}
          <div 
            className="text-center mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
              transition: 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-transparent bg-clip-text mb-4">
              Guṇa Profiler
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Discover your inner nature through ancient Vedic wisdom.
            </p>
          </div>

          {/* Main Content */}
          {currentScreen === 'intro' && (
            <div className="bg-white shadow-xl rounded-lg p-8 border-t-4 border-orange-500">
              <p className="text-lg text-slate-700 mb-6 text-center">
                If you are on a quest for peace, balance, and spiritual insight, our Guṇa Profiler will simplify your journey.
              </p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-slate-700 mb-3 flex items-center justify-center gap-2">
                  What You'll Discover:
                </h3>
                <ul className="list-none space-y-2 text-slate-600 max-w-md mx-auto">
                  <li className="flex items-start">
                    <span className="mr-2">🔹</span>
                    <span>Your Nature: Understand the unique mix of Sattva, Rajas, and Tamas in your personality.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔹</span>
                    <span>Personal Insights: See how this combination influences your thoughts, decisions, and emotions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">🔹</span>
                    <span>Path to Balance: Receive practical tips for diet, colors, and daily activities.</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => setCurrentScreen('quiz')}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 font-semibold text-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  🔸 Begin My Journey!
                </button>
              </div>
            </div>
          )}

          {currentScreen === 'quiz' && (
            <div>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="text-sm flex justify-between items-center mb-2 text-slate-500">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{currentQuestionIndex}/{questions.length} answered</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-amber-500 h-3 rounded-full transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white shadow-xl rounded-lg p-8 text-center">
                <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-800">
                  {currentQuestion.q}
                </h3>
                <div className="space-y-4">
                  {currentQuestion.a.map((answer, index) => {
                    const gunaTypes: ('sattva' | 'rajas' | 'tamas')[] = ['sattva', 'rajas', 'tamas']
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(gunaTypes[index])}
                        className="option-btn w-full text-left p-4 md:p-5 rounded-xl flex justify-between items-center"
                      >
                        <span className="text-base md:text-lg font-medium text-slate-700">
                          {answer}
                        </span>
                        <span className="w-5 h-5 border-2 border-gray-300 rounded-full"></span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {currentScreen === 'registration' && (
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">
                Get Your Full Report
              </h2>
              <p className="text-slate-600 text-center mb-6">
                You're one step away! Provide your details to see your complete, personalized Guṇa profile.
              </p>
              
              <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={userDetails.email}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={userDetails.mobile}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, mobile: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter your mobile number"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Reveal My Result
                </button>
              </form>
            </div>
          )}

          {currentScreen === 'results' && archetypeData && (
            <div className="space-y-8">
              {/* Results Header */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-orange-600">
                  Your Guṇa Profile
                </h2>
                <p className="text-md md:text-lg text-slate-500">
                  Your personality analysis based on ancient Vedic wisdom.
                </p>
              </div>

              {/* Tabs Navigation */}
              <div className="border-b border-gray-300">
                <nav className="flex flex-wrap justify-center -mb-px" aria-label="Tabs">
                  <button 
                    className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analysis')}
                  >
                    In-Depth Analysis
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'recommendations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recommendations')}
                  >
                    Suggestions
                  </button>
                  <button 
                    className={`tab-button ${activeTab === 'colorTherapy' ? 'active' : ''}`}
                    onClick={() => setActiveTab('colorTherapy')}
                  >
                    Color Therapy
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="relative">
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Personality Card */}
                    <div className="personality-card">
                      <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                        {archetypeData.archetype}
                      </h2>
                      <div className="text-lg font-medium bg-white/20 inline-block px-4 py-2 rounded-full mb-4">
                        {gunaTraitCode}
                      </div>
                      <p className="text-lg leading-relaxed max-w-3xl mx-auto opacity-90">
                        {archetypeData.description}
                      </p>
                    </div>

                    {/* Guna Breakdown */}
                    {(() => {
                      const { percentages } = calculatePersonality()
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                          <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-amber-500">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-semibold text-amber-600 flex items-center gap-2">
                                <span>☀️</span>
                                <span>Sattva</span>
                              </h3>
                              <span className="font-bold text-lg">{percentages.sattva}%</span>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                              <div 
                                className="sattva-bar guna-bar rounded-full h-3" 
                                style={{ width: `${percentages.sattva}%` }}
                              />
                            </div>
                            <p className="text-3xl font-bold text-amber-500 mt-2 text-center">
                              {scores.sattva}
                            </p>
                          </div>

                          <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-pink-500">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-semibold text-pink-600 flex items-center gap-2">
                                <span>🔥</span>
                                <span>Rajas</span>
                              </h3>
                              <span className="font-bold text-lg">{percentages.rajas}%</span>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                              <div 
                                className="rajas-bar guna-bar rounded-full h-3" 
                                style={{ width: `${percentages.rajas}%` }}
                              />
                            </div>
                            <p className="text-3xl font-bold text-pink-500 mt-2 text-center">
                              {scores.rajas}
                            </p>
                          </div>

                          <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-violet-500">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-xl font-semibold text-violet-600 flex items-center gap-2">
                                <span>🌙</span>
                                <span>Tamas</span>
                              </h3>
                              <span className="font-bold text-lg">{percentages.tamas}%</span>
                            </div>
                            <div className="relative w-full bg-gray-200 rounded-full h-3 mb-2">
                              <div 
                                className="tamas-bar guna-bar rounded-full h-3" 
                                style={{ width: `${percentages.tamas}%` }}
                              />
                            </div>
                            <p className="text-3xl font-bold text-violet-500 mt-2 text-center">
                              {scores.tamas}
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div className="space-y-6">
                    {(() => {
                      const analysis = analysisData[personalityArchetype]
                      if (!analysis) return null
                      
                      return (
                        <>
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">
                              How Your Gunas Work Together
                            </h3>
                            <p className="text-slate-700">{analysis.interplay}</p>
                          </div>
                          
                          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-500">
                            <h3 className="text-xl font-semibold text-purple-700 mb-2">
                              Your Path to Balance
                            </h3>
                            <p className="text-slate-700">{analysis.balance}</p>
                          </div>
                          
                          <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-6 rounded-lg border-l-4 border-pink-500">
                            <h3 className="text-xl font-semibold text-pink-700 mb-2">
                              Your Hidden Challenge
                            </h3>
                            <p className="text-slate-700">{analysis.shadow}</p>
                          </div>
                        </>
                      )
                    })()}
                  </div>
                )}

                {activeTab === 'recommendations' && (
                  <div className="space-y-6">
                    <div className="recommendation-card bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <span>🍽️</span>
                        <span>Food to Feel Your Best</span>
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        {recommendations.dietary[dominantGuna as keyof typeof recommendations.dietary].map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="recommendation-card bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <span>🏃‍♂️</span>
                        <span>Activities for Harmony</span>
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        {recommendations.activities[dominantGuna as keyof typeof recommendations.activities].map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="recommendation-card bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <span>🌱</span>
                        <span>A Challenge for Growth</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="problem-box p-5 rounded-lg">
                          <h4 className="text-lg font-semibold text-red-700 mb-2">Your Challenge</h4>
                          <p className="text-slate-700">
                            {recommendations.challenges[dominantGuna as keyof typeof recommendations.challenges].challenge}
                          </p>
                        </div>
                        <div className="solution-box p-5 rounded-lg">
                          <h4 className="text-lg font-semibold text-green-700 mb-2">An Actionable Step</h4>
                          <p className="text-slate-700">
                            {recommendations.challenges[dominantGuna as keyof typeof recommendations.challenges].solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'colorTherapy' && (
                  <div className="space-y-6">
                    <div className="recommendation-card bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-3">
                        <span>🎨</span>
                        <span>Colors for Your Energy</span>
                      </h3>
                      <div className="flex flex-wrap gap-4 items-center mb-4">
                        {colorTherapy[dominantGuna as keyof typeof colorTherapy].colors.map((color, index) => (
                          <div key={index} className="text-center">
                            <div 
                              className="w-12 h-12 rounded-full mx-auto shadow-md border-2 border-white" 
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-sm mt-2 text-slate-600">{color.name}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-slate-700 mb-4">{colorTherapy[dominantGuna as keyof typeof colorTherapy].colorInfo}</p>
                      <h4 className="font-semibold text-slate-800 mb-2">How to use:</h4>
                      <ul className="list-disc pl-5 space-y-2 text-slate-700">
                        {colorTherapy[dominantGuna as keyof typeof colorTherapy].howToUse.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="problem-box p-5 rounded-lg">
                        <h3 className="text-xl font-semibold text-red-700 mb-2">Color Challenge</h3>
                        <p className="text-slate-700">
                          {colorTherapy[dominantGuna as keyof typeof colorTherapy].problem}
                        </p>
                      </div>
                      <div className="solution-box p-5 rounded-lg">
                        <h3 className="text-xl font-semibold text-green-700 mb-2">Color Solution</h3>
                        <p className="text-slate-700">
                          {colorTherapy[dominantGuna as keyof typeof colorTherapy].solution}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button 
                  onClick={resetQuiz}
                  className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-400 transition-colors flex items-center gap-2"
                >
                  <span>🔄</span>
                  <span>Retake Assessment</span>
                </button>
                <button 
                  onClick={() => window.open('https://shikshanam.in/emotional-intelligence-with-samkhya-darshan/', '_blank')}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <span>Explore Course</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
