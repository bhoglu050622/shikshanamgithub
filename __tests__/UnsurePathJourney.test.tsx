import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UnsurePathJourney from '@/components/sections/DarshanaCircularVisualization'

// Mock Framer Motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    line: ({ ...props }: any) => <line {...props} />,
    circle: ({ ...props }: any) => <circle {...props} />,
    polygon: ({ ...props }: any) => <polygon {...props} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useAnimation: () => ({
    start: jest.fn(),
  }),
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Play: () => <div data-testid="play-icon" />,
  Pause: () => <div data-testid="pause-icon" />,
  ChevronLeft: () => <div data-testid="chevron-left-icon" />,
  ChevronRight: () => <div data-testid="chevron-right-icon" />,
  Lock: () => <div data-testid="lock-icon" />,
  Unlock: () => <div data-testid="unlock-icon" />,
  ArrowDown: () => <div data-testid="arrow-down-icon" />,
  Target: () => <div data-testid="target-icon" />,
  BookOpen: () => <div data-testid="book-open-icon" />,
  Brain: () => <div data-testid="brain-icon" />,
  Atom: () => <div data-testid="atom-icon" />,
  Eye: () => <div data-testid="eye-icon" />,
  Heart: () => <div data-testid="heart-icon" />,
  Scale: () => <div data-testid="scale-icon" />,
  Lightbulb: () => <div data-testid="lightbulb-icon" />,
}))

describe('UnsurePathJourney', () => {
  const mockOnSelectDarshana = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component with initial step', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    expect(screen.getByText('Unsure Where to Begin?')).toBeInTheDocument()
    expect(screen.getByText('Darshana Basics')).toBeInTheDocument()
    expect(screen.getByText('Step 1 of 7')).toBeInTheDocument()
  })

  it('shows all steps as accessible initially', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // All steps should be accessible (no lock icons)
    expect(screen.getByText('Darshana Basics')).toBeInTheDocument()
    expect(screen.getByText('Nyaya')).toBeInTheDocument()
    expect(screen.getByText('Vaisheshika')).toBeInTheDocument()
    
    // No lock icons should be present
    const lockIcons = screen.queryAllByTestId('lock-icon')
    expect(lockIcons).toHaveLength(0)
  })

  it('navigates to next step when next button is clicked', async () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    const nextButton = screen.getByLabelText('Next step')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 7')).toBeInTheDocument()
      expect(screen.getByText('Nyaya')).toBeInTheDocument()
    })
  })

  it('allows navigation to any step directly', async () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // All steps should be clickable from the start
    const nyayaButton = screen.getByText('Nyaya')
    fireEvent.click(nyayaButton)

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 7')).toBeInTheDocument()
      expect(screen.getByText('Nyaya')).toBeInTheDocument()
    })
  })

  it('calls onDarshanaClick when a step is clicked', async () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // Click directly on Nyaya step
    const nyayaButton = screen.getByText('Nyaya')
    fireEvent.click(nyayaButton)

    await waitFor(() => {
      expect(mockOnSelectDarshana).toHaveBeenCalledWith('nyaya')
    })
  })

  it('calls onDarshanaClick when quiz CTA is clicked', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    const quizButton = screen.getByText('See which Darshana you should Start with!')
    fireEvent.click(quizButton)

    expect(mockOnSelectDarshana).toHaveBeenCalledWith('quiz')
  })

  it('toggles play/pause when play button is clicked', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    const playButton = screen.getByLabelText('Start auto-play')
    fireEvent.click(playButton)

    // Should show pause button after clicking play
    expect(screen.getByLabelText('Pause auto-play')).toBeInTheDocument()
  })

  it('respects reduced motion preference', () => {
    // Mock prefers-reduced-motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })

    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // Component should still render with reduced motion
    expect(screen.getByText('Unsure Where to Begin?')).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    expect(screen.getByText('Step 1 of 7 - 14% Complete')).toBeInTheDocument()
    expect(screen.getByText('Currently viewing: Darshana Basics')).toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // Test right arrow key
    fireEvent.keyDown(document, { key: 'ArrowRight' })
    
    // Should advance to next step
    expect(screen.getByText('Step 2 of 7')).toBeInTheDocument()
  })

  it('handles spacebar for play/pause', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // Test spacebar
    fireEvent.keyDown(document, { key: ' ' })
    
    // Should show pause button
    expect(screen.getByLabelText('Pause auto-play')).toBeInTheDocument()
  })

  it('shows text-only fallback for no-JS users', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={mockOnSelectDarshana}
      />
    )

    // Check for noscript content
    expect(screen.getByText('Darshana Learning Path')).toBeInTheDocument()
  })
})

describe('Accessibility', () => {
  it('has proper ARIA attributes', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={jest.fn()}
      />
    )

    // Check for region role
    expect(screen.getByRole('region')).toBeInTheDocument()
    
    // Check for navigation role
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    // Check for progressbar role
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('has proper labels for interactive elements', () => {
    render(
      <UnsurePathJourney
        onDarshanaClick={jest.fn()}
      />
    )

    expect(screen.getByLabelText('Previous step')).toBeInTheDocument()
    expect(screen.getByLabelText('Next step')).toBeInTheDocument()
    expect(screen.getByLabelText('Start auto-play')).toBeInTheDocument()
  })
})
