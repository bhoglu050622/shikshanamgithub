import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SkillTracks from '@/components/sections/SkillTracks'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  useReducedMotion: () => true,
}))

// Mock the motion wrapper components
jest.mock('@/components/motion/MotionWrapper', () => ({
  StaggerContainer: ({ children }: any) => <div data-testid="stagger-container">{children}</div>,
  StaggerItem: ({ children }: any) => <div data-testid="stagger-item">{children}</div>,
}))

describe('SkillTracks', () => {
  const mockOnCourseClick = jest.fn()
  const mockOnTrackSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the skill tracks section with correct title', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText('Choose Your Path')).toBeInTheDocument()
  })

  it('renders both Artha and Kama tracks', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText('Artha')).toBeInTheDocument()
    expect(screen.getByText('Kama')).toBeInTheDocument()
  })

  it('renders track subtitles', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText(/I want to inspire, lead, and build/)).toBeInTheDocument()
    expect(screen.getByText(/I want a happy, stress-free life/)).toBeInTheDocument()
  })

  it('renders course cards for each track', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    // Should render course titles
    expect(screen.getByText(/Entrepreneurship & Leadership through Chanakya/)).toBeInTheDocument()
    expect(screen.getByText(/Emotional Intelligence through Sāṅkhya/)).toBeInTheDocument()
    expect(screen.getByText(/Emotional Intelligence through Kashmir Shaiva/)).toBeInTheDocument()
  })

  it('displays course metadata (level, duration, price)', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    // Check for course levels
    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()

    // Check for durations
    expect(screen.getByText('8 weeks')).toBeInTheDocument()
    expect(screen.getByText('6 weeks')).toBeInTheDocument()
    expect(screen.getByText('10 weeks')).toBeInTheDocument()

    // Check for prices
    expect(screen.getByText('₹4,999')).toBeInTheDocument()
    expect(screen.getByText('₹3,499')).toBeInTheDocument()
    expect(screen.getByText('₹6,999')).toBeInTheDocument()
  })

  it('shows "Coming Soon" badge for upcoming courses', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText('Coming Soon')).toBeInTheDocument()
  })

  it('calls onCourseClick when a course card is clicked', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    const courseCard = screen.getByText(/Entrepreneurship & Leadership through Chanakya/)
    fireEvent.click(courseCard)

    expect(mockOnCourseClick).toHaveBeenCalledTimes(1)
    expect(mockOnCourseClick).toHaveBeenCalledWith(
      expect.objectContaining({
        title: expect.stringContaining('Entrepreneurship & Leadership'),
        level: 'Intermediate',
        price: '₹4,999'
      })
    )
  })

  it('renders the Purusharthas explanation', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText(/Purusharthas/)).toBeInTheDocument()
    expect(screen.getByText(/four aims of human life/)).toBeInTheDocument()
  })

  it('renders the assessment CTA button', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText('Take Assessment')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    const section = screen.getByRole('region', { name: /skill tracks/i })
    expect(section).toBeInTheDocument()

    // Check for proper heading structure
    const heading = screen.getByRole('heading', { name: /choose your path/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders track icons', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    // Icons should be present (we can't easily test the actual icons, but we can check for the containers)
    const trackHeaders = screen.getAllByText(/Artha|Kama/)
    expect(trackHeaders).toHaveLength(2)
  })

  it('handles missing callback props gracefully', () => {
    render(<SkillTracks />)

    const courseCard = screen.getByText(/Entrepreneurship & Leadership through Chanakya/)
    
    // Should not throw errors when callbacks are not provided
    expect(() => {
      fireEvent.click(courseCard)
    }).not.toThrow()
  })

  it('renders course descriptions', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    // Check for course descriptions
    expect(screen.getByText(/Master the art of leadership and business/)).toBeInTheDocument()
    expect(screen.getByText(/Develop emotional intelligence and self-awareness/)).toBeInTheDocument()
  })

  it('displays track descriptions', () => {
    render(
      <SkillTracks 
        onCourseClick={mockOnCourseClick}
        onTrackSelect={mockOnTrackSelect}
      />
    )

    expect(screen.getByText(/Master the art of leadership, entrepreneurship/)).toBeInTheDocument()
    expect(screen.getByText(/Develop emotional intelligence, relationships/)).toBeInTheDocument()
  })
})
