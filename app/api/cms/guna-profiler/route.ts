import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const GUNA_PROFILER_FILE = path.join(DATA_DIR, 'guna-profiler-content.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Default content structure
const defaultContent = {
  hero: {
    title: 'Discover Your Guna Profile',
    subtitle: 'Ancient Wisdom for Modern Self-Discovery',
    description: 'Take our comprehensive Guna assessment to understand your personality type and receive personalized recommendations for spiritual growth.',
    ctaText: 'Start Your Assessment',
    backgroundImage: null
  },
  quiz: {
    title: 'Guna Assessment Quiz',
    description: 'Answer these questions honestly to discover your dominant Guna type.',
    questions: []
  },
  results: {
    title: 'Your Guna Profile',
    description: 'Based on your responses, here is your personalized Guna analysis.',
    analysisTitle: 'Guna Analysis',
    recommendationsTitle: 'Personalized Recommendations'
  },
  analysis: {
    sattva: {
      title: 'Sattva Guna',
      description: 'The quality of purity, wisdom, and spiritual growth.',
      characteristics: ['Peaceful', 'Wise', 'Compassionate', 'Balanced'],
      color: '#4ade80'
    },
    rajas: {
      title: 'Rajas Guna',
      description: 'The quality of activity, passion, and ambition.',
      characteristics: ['Active', 'Ambitious', 'Passionate', 'Dynamic'],
      color: '#f59e0b'
    },
    tamas: {
      title: 'Tamas Guna',
      description: 'The quality of inertia, stability, and material focus.',
      characteristics: ['Stable', 'Practical', 'Grounded', 'Material'],
      color: '#6b7280'
    }
  },
  recommendations: {
    title: 'Personalized Recommendations',
    description: 'Based on your Guna profile, here are practices to help you grow spiritually.',
    practices: []
  },
  colorTherapy: {
    title: 'Color Therapy for Your Guna',
    description: 'Use these colors to balance and enhance your dominant Guna qualities.',
    colors: []
  }
};

// GET - Retrieve guna profiler content
export async function GET() {
  try {
    await ensureDataDir();
    
    try {
      const data = await fs.readFile(GUNA_PROFILER_FILE, 'utf8');
      const content = JSON.parse(data);
      return NextResponse.json(content);
    } catch (error) {
      // File doesn't exist, return default content
      return NextResponse.json(defaultContent);
    }
  } catch (error) {
    console.error('Error reading guna profiler content:', error);
    return NextResponse.json(
      { error: 'Failed to load guna profiler content' },
      { status: 500 }
    );
  }
}

// POST - Update guna profiler content
export async function POST(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const content = await request.json();
    
    // Validate content structure
    if (!content || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Invalid content format' },
        { status: 400 }
      );
    }

    // Ensure all required sections exist
    const validatedContent = {
      hero: { ...defaultContent.hero, ...content.hero },
      quiz: { ...defaultContent.quiz, ...content.quiz },
      results: { ...defaultContent.results, ...content.results },
      analysis: { ...defaultContent.analysis, ...content.analysis },
      recommendations: { ...defaultContent.recommendations, ...content.recommendations },
      colorTherapy: { ...defaultContent.colorTherapy, ...content.colorTherapy }
    };

    // Save to file
    await fs.writeFile(
      GUNA_PROFILER_FILE,
      JSON.stringify(validatedContent, null, 2),
      'utf8'
    );

    return NextResponse.json({
      success: true,
      message: 'Guna profiler content updated successfully'
    });
  } catch (error) {
    console.error('Error saving guna profiler content:', error);
    return NextResponse.json(
      { error: 'Failed to save guna profiler content' },
      { status: 500 }
    );
  }
}

// PUT - Update specific section
export async function PUT(request: NextRequest) {
  try {
    await ensureDataDir();
    
    const { section, data } = await request.json();
    
    if (!section || !data) {
      return NextResponse.json(
        { error: 'Section and data are required' },
        { status: 400 }
      );
    }

    // Load existing content
    let existingContent;
    try {
      const fileData = await fs.readFile(GUNA_PROFILER_FILE, 'utf8');
      existingContent = JSON.parse(fileData);
    } catch {
      existingContent = defaultContent;
    }

    // Update specific section
    existingContent[section] = { ...existingContent[section], ...data };

    // Save updated content
    await fs.writeFile(
      GUNA_PROFILER_FILE,
      JSON.stringify(existingContent, null, 2),
      'utf8'
    );

    return NextResponse.json({
      success: true,
      message: `${section} section updated successfully`
    });
  } catch (error) {
    console.error('Error updating guna profiler section:', error);
    return NextResponse.json(
      { error: 'Failed to update guna profiler section' },
      { status: 500 }
    );
  }
}

// DELETE - Reset to default content
export async function DELETE() {
  try {
    await ensureDataDir();
    
    // Save default content
    await fs.writeFile(
      GUNA_PROFILER_FILE,
      JSON.stringify(defaultContent, null, 2),
      'utf8'
    );

    return NextResponse.json({
      success: true,
      message: 'Guna profiler content reset to default'
    });
  } catch (error) {
    console.error('Error resetting guna profiler content:', error);
    return NextResponse.json(
      { error: 'Failed to reset guna profiler content' },
      { status: 500 }
    );
  }
}
