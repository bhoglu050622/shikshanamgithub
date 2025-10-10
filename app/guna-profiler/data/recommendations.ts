export const recommendations = {
  dietaryTitle: "Food to Feel Your Best",
  activityTitle: "Activities for Harmony",
  colorTitle: "Colors for Your Energy",
  colorHowTo: "How to use:",
  challengeTitle: "A Challenge for Growth",
  solutionTitle: "An Actionable Step",
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
  },
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
  colorTherapy: {
    problemTitle: "Color Challenge",
    solutionTitle: "Color Solution",
    sattva: { 
      colors: [ { name: "White", hex: "#FFFFFF" }, { name: "Light Blue", hex: "#ADD8E6" }, { name: "Pale Yellow", hex: "#FFFFE0" }, { name: "Pastels", hex: "#F1E4E8" } ], 
      colorInfo: "These colors promote purity, tranquility, and clarity. They help calm the mind and elevate consciousness.", 
      howToUse: ["Wear white or light-colored clothes during meditation or spiritual practice.", "Paint the walls of your meditation or study room with these colors.", "Use light-colored bed linens for peaceful sleep."],
      problem: "An excess of light colors can sometimes make you feel 'spacey' or disconnected from reality. You might feel a lack of grounding energy needed for practical tasks.",
      solution: "Balance your Sattvic colors with small, grounding accents. A dark brown cushion, a small grey stone on your desk, or even dark green plants can provide the earthy stability you need."
    },
    rajas: { 
      colors: [ { name: "Red", hex: "#FF0000" }, { name: "Orange", hex: "#FFA500" }, { name: "Bright Pink", hex: "#FF69B4" }, { name: "Gold", hex: "#FFD700" } ], 
      colorInfo: "These vibrant colors stimulate energy, passion, and action. Use them to invigorate and energize your space.", 
      howToUse: ["Use as accent colors (cushions, art) in your living room or home office to boost dynamism.", "Wear these colors when you need a boost of confidence or energy, like for a workout.", "Avoid overusing them in the bedroom as they can be over-stimulating."],
      problem: "Too much Rajasic color can lead to overstimulation, restlessness, and even aggression. It can make it hard to relax and switch off your mind.",
      solution: "Use these powerful colors as accents, not as the main event. A single red cushion is better than a red wall. Balance them with calming, Sattvic colors like white or light blue to create a space that is both energetic and peaceful."
    },
    tamas: { 
      colors: [ { name: "Dark Blue", hex: "#00008B" }, { name: "Brown", hex: "#A52A2A" }, { name: "Grey", hex: "#808080" }, { name: "Earthy Tones", hex: "#D2B48C" } ], 
      colorInfo: "These colors provide stability, grounding, and a sense of security. They are ideal for creating a cozy and protected environment.", 
      howToUse: ["Incorporate these colors in flooring, rugs, or heavy furniture to feel more grounded.", "Create a cozy reading nook with dark, earthy-toned blankets and cushions.", "Balance with lighter colors on the walls to prevent the space from feeling heavy or stagnant."],
      problem: "An over-reliance on dark, Tamasic colors can create an environment that feels heavy, stagnant, or even depressing, reinforcing feelings of inertia.",
      solution: "The key is balance. Use these grounding colors for furniture or floors, but keep your walls light and bright (Sattvic white or pastels). Add pops of vibrant, Rajasic color like orange or gold to bring in energy and inspiration."
    }
  }
}

export const ctaData = {
  sattva: {
    icon: "fa-sun",
    title: "Turn Your Vision Into Reality",
    subtitle: "Your Sattvic clarity is a gift, but it can lead to inaction. Our Sāṅkhya EI journey will give you the practical tools to overcome this challenge and bring your beautiful insights into the world.",
    button: "Overcome Your Challenges"
  },
  rajas: {
    icon: "fa-fire",
    title: "Turn Your Fire Into Focus",
    subtitle: "Your Rajasic drive is a superpower, but it can lead to burnout. Our Sāṅkhya EI journey will teach you to channel that fire effectively, helping you achieve your goals without sacrificing your peace.",
    button: "Overcome Your Challenges"
  },
  tamas: {
    icon: "fa-mountain",
    title: "Turn Your Stability Into Strength",
    subtitle: "Your Tamasic stability is your foundation, but it can lead to feeling stuck. Our Sāṅkhya EI journey will give you the spark to overcome inertia and transform that powerful energy into lasting achievements.",
    button: "Overcome Your Challenges"
  }
}
