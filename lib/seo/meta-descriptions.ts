/**
 * SEO Meta Descriptions
 * 
 * Centralized meta descriptions for all pages to improve SEO
 */

export const courseMetaDescriptions = {
  'chanakya-code': 'Master ancient business wisdom and negotiation strategies from Chanakya\'s teachings. Learn timeless principles of leadership, strategy, and business tactics that shaped empires.',
  'advaita-vedanta': 'Explore the profound philosophy of Advaita Vedanta with expert guidance. Understand non-dualism, consciousness, and the path to self-realization through ancient Vedantic wisdom.',
  'isha-upanishad-course': 'Study the Isha Upanishad, one of the most important philosophical texts. Discover the essence of Vedic wisdom, karma yoga, and the nature of reality.',
  'prashna-upanishad': 'Dive deep into the Prashna Upanishad through structured learning. Explore the six profound questions about existence, breath, and consciousness.',
  'yoga-darshan-course': 'Learn Yoga Darshan (Patanjali\'s Yoga Sutras) with comprehensive guidance. Master the eight limbs of yoga and the philosophy behind ancient yogic practices.',
  'sanskrit-bhasha-pragya': 'Develop Sanskrit language proficiency from basics to conversation. Master Devanagari script, grammar, and practical communication in the language of the gods.',
  'emotional-intelligence-with-samkhya-darshan': 'Enhance emotional intelligence using Samkhya philosophy principles. Learn to understand and manage emotions through ancient Indian psychological wisdom.',
  'durgasaptashi': 'Study the Durgasaptashi, the powerful 700-verse hymn to Goddess Durga. Understand the spiritual significance and transformative power of this sacred text.',
  'kashmir-shaivism': 'Explore Kashmir Shaivism, the non-dual tantric philosophy. Discover consciousness, Shiva-Shakti principles, and the path to divine recognition.',
  'nyaya-darshan-course': 'Master Nyaya Darshan, the ancient Indian school of logic and epistemology. Learn systematic reasoning, debate, and the foundations of Indian philosophy.',
  'samkhya-darshan-course': 'Study Samkhya Darshan, one of the six classical schools of Indian philosophy. Understand Purusha-Prakriti, the evolution of consciousness, and liberation.',
  'vaisheshik-darshan-course': 'Explore Vaisheshika Darshan, the atomistic school of Indian philosophy. Learn about categories of existence, atomic theory, and metaphysics.',
}

export const schoolMetaDescriptions = {
  'darshana': 'Explore the six classical Darshana schools of Indian philosophy. Study Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, and Vedanta with expert guidance.',
  'nyaya': 'Master Nyaya philosophy, the school of logic and epistemology. Learn systematic reasoning, debate techniques, and the foundations of Indian logical thought.',
  'vaisheshika': 'Study Vaisheshika, the atomistic school of Indian philosophy. Understand categories of existence, atomic theory, and ancient Indian metaphysics.',
  'samkhya': 'Explore Samkhya philosophy, the dualistic school analyzing reality. Learn about Purusha and Prakriti, evolution of consciousness, and path to liberation.',
  'yoga': 'Discover Yoga Darshan, Patanjali\'s philosophy of yoga. Master the eight limbs of yoga and understand the philosophical foundations of yogic practice.',
  'mimamsa': 'Study Mimamsa, the school of Vedic interpretation and ritual. Learn hermeneutics, dharma principles, and systematic Vedic analysis.',
  'vedanta': 'Explore Vedanta, the culmination of Vedic wisdom. Study Advaita, Vishishtadvaita, and Dvaita schools, and understand the nature of ultimate reality.',
  'sanskrit': 'Learn Sanskrit, the language of ancient Indian wisdom. Master Devanagari script, grammar, and conversation in the sacred language of the Vedas.',
  'self-help': 'Transform your life with ancient Indian self-help wisdom. Learn emotional intelligence, stress management, and personal development through timeless teachings.',
}

export const packageMetaDescriptions = {
  'all-para-courses': 'Access all Para Vidya (transcendental knowledge) courses in one bundle. Complete package for serious students of Indian philosophy and spirituality.',
  'para-apara-all-courses': 'Master both Para (transcendental) and Apara (practical) knowledge. Comprehensive bundle covering philosophy, Sanskrit, and self-development.',
  'ultimate-sankhya-bundle': 'Complete Samkhya philosophy bundle. Master Samkhya Darshan, emotional intelligence, and practical applications of ancient psychological wisdom.',
  'samkhya-emotional-intelligence': 'Transform your emotional life with Samkhya philosophy. Learn ancient techniques for emotional mastery and psychological well-being.',
  'eradication-suffering-samkhya-yoga': 'End suffering through Samkhya and Yoga philosophy. Comprehensive course on the path to liberation and lasting peace.',
  'sanskrit-darshan-upanishad-special': 'Special bundle combining Sanskrit, Darshan, and Upanishad studies. Complete foundation in Indian philosophical tradition.',
  'isha-prashna-upanishad-bundle': 'Study both Isha and Prashna Upanishads together. Deep dive into Vedantic wisdom and existential questions.',
  'hindu-philosophies-upanishads': 'Comprehensive bundle of Hindu philosophies and Upanishads. Complete introduction to Indian philosophical thought.',
  'sanskrit-philosophies-bundle': 'Master Sanskrit language and Indian philosophies together. Essential bundle for serious students of Indian tradition.',
  'nyaya-vaisheshik-enlightenment': 'Achieve philosophical clarity through Nyaya and Vaisheshika. Master logic, epistemology, and metaphysics.',
  'sanatan-chatushtay': 'Study the four fundamental paths of Sanatan Dharma. Comprehensive course on dharma, artha, kama, and moksha.',
  'sanskrit-basics-to-conversation': 'Learn Sanskrit from alphabet to conversation. Complete course taking you from beginner to conversational fluency.',
  'vedanta-shaivism-bundle': 'Explore both Vedanta and Shaivism philosophies. Comprehensive study of non-dual wisdom traditions.',
}

export function getCourseMetaDescription(slug: string): string {
  return courseMetaDescriptions[slug as keyof typeof courseMetaDescriptions] || 
    'Learn ancient Indian wisdom through comprehensive courses on Sanskrit, Darshanas, and self-development. Expert instruction in traditional knowledge systems.'
}

export function getSchoolMetaDescription(slug: string): string {
  return schoolMetaDescriptions[slug as keyof typeof schoolMetaDescriptions] || 
    'Explore ancient Indian schools of philosophy and knowledge. Study classical texts and traditions with expert guidance at Shikshanam.'
}

export function getPackageMetaDescription(slug: string): string {
  return packageMetaDescriptions[slug as keyof typeof packageMetaDescriptions] || 
    'Comprehensive course bundle for mastering ancient Indian wisdom. Save with our curated packages combining multiple courses and learning paths.'
}

