import type { Meta, StoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import SelfHelpHero from '@/components/sections/SelfHelpHero'

const meta: Meta<typeof SelfHelpHero> = {
  title: 'Sections/SelfHelpHero',
  component: SelfHelpHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The hero section of the School of Self-Help page, featuring an animated skyline, Acharya character, and call-to-action buttons.',
      },
    },
  },
  argTypes: {
    onExploreTracks: {
      action: 'exploreTracksClicked',
      description: 'Callback function called when the "Explore Skill Tracks" button is clicked',
    },
    onTakeTest: {
      action: 'takeTestClicked',
      description: 'Callback function called when the "Take Personality Test" button is clicked',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelfHelpHero>

// Default story
export const Default: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
}

// Story with no callbacks
export const WithoutCallbacks: Story = {
  args: {},
}

// Interactive story with user interactions
export const Interactive: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    
    // Wait for the component to be fully rendered
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Check that the main title is present
    const title = canvas.getByText('School of')
    await expect(title).toBeInTheDocument()
    
    // Check that the subtitle is present
    const subtitle = canvas.getByText('Self-Help')
    await expect(subtitle).toBeInTheDocument()
    
    // Check that the main quote is present
    const quote = canvas.getByText(/Grow in clarity, character, and competence/)
    await expect(quote).toBeInTheDocument()
    
    // Check that both buttons are present
    const exploreButton = canvas.getByText('Explore Skill Tracks')
    const testButton = canvas.getByText('Take Personality Test')
    
    await expect(exploreButton).toBeInTheDocument()
    await expect(testButton).toBeInTheDocument()
    
    // Test button interactions
    await userEvent.click(exploreButton)
    await expect(args.onExploreTracks).toHaveBeenCalled()
    
    await userEvent.click(testButton)
    await expect(args.onTakeTest).toHaveBeenCalled()
  },
}

// Story showing the component in different viewport sizes
export const Responsive: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
}

// Story with reduced motion
export const ReducedMotion: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how the component behaves with reduced motion preferences enabled.',
      },
    },
  },
  decorators: [
    (Story) => {
      // Mock reduced motion preference
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
      
      return <Story />
    },
  ],
}

// Story showing accessibility features
export const Accessibility: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Check for proper ARIA attributes
    const heroSection = canvas.getByRole('region', { name: /hero/i })
    await expect(heroSection).toBeInTheDocument()
    
    // Check for proper button labels
    const exploreButton = canvas.getByLabelText(/explore skill tracks/i)
    const testButton = canvas.getByLabelText(/take personality test/i)
    
    await expect(exploreButton).toBeInTheDocument()
    await expect(testButton).toBeInTheDocument()
    
    // Check for proper heading structure
    const heading = canvas.getByRole('heading', { level: 1 })
    await expect(heading).toBeInTheDocument()
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the accessibility features of the SelfHelpHero component, including ARIA attributes and proper semantic structure.',
      },
    },
  },
}

// Story with custom styling
export const CustomStyling: Story = {
  args: {
    onExploreTracks: () => console.log('Explore tracks clicked'),
    onTakeTest: () => console.log('Take test clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story shows how the component can be customized with different styling approaches.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        padding: '2rem'
      }}>
        <Story />
      </div>
    ),
  ],
}
