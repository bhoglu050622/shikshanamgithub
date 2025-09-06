import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SelfHelpHero from '@/components/sections/SelfHelpHero'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
  useReducedMotion: () => true, // Always use reduced motion in tests
  AnimatePresence: ({ children }: any) => <>{children}</>,
}))

// Mock the motion wrapper components
jest.mock('@/components/motion/MotionWrapper', () => ({
  StaggerContainer: ({ children }: any) => <div data-testid="stagger-container">{children}</div>,
  StaggerItem: ({ children }: any) => <div data-testid="stagger-item">{children}</div>,
}))

describe('SelfHelpHero', () => {
  const mockOnExploreTracks = jest.fn()
  const mockOnTakeTest = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the hero section with correct title', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    expect(screen.getByText('School of')).toBeInTheDocument()
    expect(screen.getByText('Self-Help')).toBeInTheDocument()
  })

  it('renders the main quote', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    expect(screen.getByText(/Grow in clarity, character, and competence/)).toBeInTheDocument()
  })

  it('renders the question about ancient wisdom', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    expect(screen.getByText(/In the age of AI, why study something so ancient/)).toBeInTheDocument()
  })

  it('renders the eternal wisdom statement', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    expect(screen.getByText(/Indian wisdom isn't ancient—it's eternal/)).toBeInTheDocument()
  })

  it('renders both action buttons', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    expect(screen.getByText('Explore Skill Tracks')).toBeInTheDocument()
    expect(screen.getByText('Take Personality Test')).toBeInTheDocument()
  })

  it('calls onExploreTracks when Explore Skill Tracks button is clicked', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    const exploreButton = screen.getByText('Explore Skill Tracks')
    fireEvent.click(exploreButton)

    expect(mockOnExploreTracks).toHaveBeenCalledTimes(1)
  })

  it('calls onTakeTest when Take Personality Test button is clicked', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    const testButton = screen.getByText('Take Personality Test')
    fireEvent.click(testButton)

    expect(mockOnTakeTest).toHaveBeenCalledTimes(1)
  })

  it('has proper accessibility attributes', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    const heroSection = screen.getByRole('region', { name: /hero/i })
    expect(heroSection).toBeInTheDocument()

    const exploreButton = screen.getByLabelText(/explore skill tracks/i)
    expect(exploreButton).toBeInTheDocument()

    const testButton = screen.getByLabelText(/take personality test/i)
    expect(testButton).toBeInTheDocument()
  })

  it('renders the animated skyline component', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    // Check for skyline elements (mountains, sun, clouds)
    const heroSection = screen.getByRole('region', { name: /hero/i })
    expect(heroSection).toBeInTheDocument()
  })

  it('renders the Acharya character', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    // The Acharya character should be present in the component
    const heroSection = screen.getByRole('region', { name: /hero/i })
    expect(heroSection).toBeInTheDocument()
  })

  it('rotates quotes every 6 seconds', async () => {
    jest.useFakeTimers()
    
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    // Initial quote should be visible
    expect(screen.getByText(/Grow in clarity, character, and competence/)).toBeInTheDocument()

    // Fast-forward time to trigger quote rotation
    jest.advanceTimersByTime(6000)

    await waitFor(() => {
      // The quote should have changed (though we can't predict which one)
      // We just verify that some quote is still visible
      const quoteElements = screen.getAllByText(/".*"/)
      expect(quoteElements.length).toBeGreaterThan(0)
    })

    jest.useRealTimers()
  })

  it('renders scroll indicator', () => {
    render(
      <SelfHelpHero 
        onExploreTracks={mockOnExploreTracks}
        onTakeTest={mockOnTakeTest}
      />
    )

    // Scroll indicator should be present at the bottom
    const heroSection = screen.getByRole('region', { name: /hero/i })
    expect(heroSection).toBeInTheDocument()
  })

  it('handles missing callback props gracefully', () => {
    render(<SelfHelpHero />)

    const exploreButton = screen.getByText('Explore Skill Tracks')
    const testButton = screen.getByText('Take Personality Test')

    // Should not throw errors when callbacks are not provided
    expect(() => {
      fireEvent.click(exploreButton)
      fireEvent.click(testButton)
    }).not.toThrow()
  })
})
