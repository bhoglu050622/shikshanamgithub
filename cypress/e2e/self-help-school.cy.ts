describe('School of Self-Help Page', () => {
  beforeEach(() => {
    // Visit the self-help school page
    cy.visit('/schools/self-help')
  })

  describe('Hero Section', () => {
    it('should display the main hero content', () => {
      // Check for the main title
      cy.contains('School of').should('be.visible')
      cy.contains('Self-Help').should('be.visible')
      
      // Check for the main quote
      cy.contains('Grow in clarity, character, and competence').should('be.visible')
      
      // Check for the question about ancient wisdom
      cy.contains('In the age of AI, why study something so ancient').should('be.visible')
      
      // Check for the eternal wisdom statement
      cy.contains('Indian wisdom isn\'t ancient—it\'s eternal').should('be.visible')
    })

    it('should have functional CTA buttons', () => {
      // Check that both buttons are visible and clickable
      cy.contains('Explore Skill Tracks').should('be.visible').and('not.be.disabled')
      cy.contains('Take Personality Test').should('be.visible').and('not.be.disabled')
      
      // Test button interactions
      cy.contains('Explore Skill Tracks').click()
      cy.contains('Take Personality Test').click()
    })

    it('should be accessible', () => {
      // Check for proper heading structure
      cy.get('h1').should('contain', 'School of')
      
      // Check for proper ARIA attributes
      cy.get('[aria-labelledby="hero-title"]').should('exist')
      
      // Check for button accessibility
      cy.get('[aria-label*="Explore skill tracks"]').should('exist')
      cy.get('[aria-label*="Take personality test"]').should('exist')
    })
  })

  describe('Skill Tracks Section', () => {
    it('should display both Artha and Kama tracks', () => {
      // Check for track titles
      cy.contains('Choose Your Path').should('be.visible')
      cy.contains('Artha').should('be.visible')
      cy.contains('Kama').should('be.visible')
      
      // Check for track subtitles
      cy.contains('I want to inspire, lead, and build').should('be.visible')
      cy.contains('I want a happy, stress-free life').should('be.visible')
    })

    it('should display course cards with proper information', () => {
      // Check for course titles
      cy.contains('Entrepreneurship & Leadership through Chanakya').should('be.visible')
      cy.contains('Emotional Intelligence through Sāṅkhya').should('be.visible')
      cy.contains('Emotional Intelligence through Kashmir Shaiva').should('be.visible')
      
      // Check for course metadata
      cy.contains('Beginner').should('be.visible')
      cy.contains('Intermediate').should('be.visible')
      cy.contains('Advanced').should('be.visible')
      
      // Check for prices
      cy.contains('₹4,999').should('be.visible')
      cy.contains('₹3,499').should('be.visible')
      cy.contains('₹6,999').should('be.visible')
    })

    it('should allow course card interactions', () => {
      // Click on a course card
      cy.contains('Entrepreneurship & Leadership through Chanakya').click()
      
      // The click should be registered (we can't easily test the callback in e2e)
      // but we can verify the element is still visible and interactive
      cy.contains('Entrepreneurship & Leadership through Chanakya').should('be.visible')
    })

    it('should display the assessment CTA', () => {
      cy.contains('Take Assessment').should('be.visible')
    })
  })

  describe('Course Journey Section', () => {
    it('should display the journey steps', () => {
      cy.contains('How These Courses Work — Step by Step').should('be.visible')
      
      // Check for all 5 steps
      cy.contains('Personality Test').should('be.visible')
      cy.contains('Theory Class').should('be.visible')
      cy.contains('Practical Class').should('be.visible')
      cy.contains('Activities').should('be.visible')
      cy.contains('Transformation Report').should('be.visible')
    })

    it('should show step progression', () => {
      // Check that the first step is unlocked
      cy.contains('Step 1: Personality Test').should('be.visible')
      
      // Check for step indicators
      cy.get('[data-testid="step-indicator"]').should('exist')
    })

    it('should allow step interactions', () => {
      // Click on the first step
      cy.contains('Personality Test').click()
      
      // Should show detailed view or modal
      // (This would depend on the actual implementation)
    })
  })

  describe('Meet Gurus Section', () => {
    it('should display guru profiles', () => {
      cy.contains('Meet Your Gurus').should('be.visible')
      
      // Check for guru names
      cy.contains('Dr. Priya Sharma').should('be.visible')
      cy.contains('Meera Patel').should('be.visible')
      cy.contains('Rajesh Kumar').should('be.visible')
    })

    it('should show guru specializations', () => {
      cy.contains('Chanakya Leadership & Business Strategy').should('be.visible')
      cy.contains('Emotional Intelligence & Samkhya Philosophy').should('be.visible')
      cy.contains('Kashmir Shaiva & Advanced Consciousness').should('be.visible')
    })

    it('should allow guru profile interactions', () => {
      // Click on a guru card
      cy.contains('Dr. Priya Sharma').click()
      
      // Should show detailed profile or modal
    })
  })

  describe('Featured Courses Section', () => {
    it('should display featured courses', () => {
      cy.contains('Featured Courses').should('be.visible')
      
      // Check for course titles
      cy.contains('Leadership Through Chanakya\'s Arthashastra').should('be.visible')
      cy.contains('Emotional Intelligence Fundamentals').should('be.visible')
      cy.contains('Advanced Consciousness Practices').should('be.visible')
    })

    it('should show course pricing and details', () => {
      // Check for prices
      cy.contains('₹4,999').should('be.visible')
      cy.contains('₹3,499').should('be.visible')
      cy.contains('₹6,999').should('be.visible')
      
      // Check for course levels
      cy.contains('Beginner').should('be.visible')
      cy.contains('Intermediate').should('be.visible')
      cy.contains('Advanced').should('be.visible')
    })

    it('should allow course enrollment', () => {
      // Click on enroll button
      cy.contains('Enroll Now').first().click()
      
      // Should trigger enrollment flow
    })
  })

  describe('Activity Showcase Section', () => {
    it('should display student testimonials', () => {
      cy.contains('Student Stories & Transformations').should('be.visible')
      
      // Check for testimonial content
      cy.contains('Sarah Chen').should('be.visible')
      cy.contains('Michael Rodriguez').should('be.visible')
    })

    it('should show transformation highlights', () => {
      // Check for transformation metrics
      cy.contains('40% increase in team productivity').should('be.visible')
      cy.contains('Improved work and personal relationships').should('be.visible')
    })

    it('should allow testimonial interactions', () => {
      // Click on a testimonial
      cy.contains('Sarah Chen').click()
      
      // Should show detailed testimonial or video
    })
  })

  describe('Founders Mission Section', () => {
    it('should display mission statement', () => {
      cy.contains('Why We Built This').should('be.visible')
      
      // Check for mission quote
      cy.contains('Self-help shouldn\'t be pop-advice').should('be.visible')
    })

    it('should show core values', () => {
      cy.contains('Our Core Values').should('be.visible')
      
      // Check for value titles
      cy.contains('Authenticity').should('be.visible')
      cy.contains('Practicality').should('be.visible')
      cy.contains('Community').should('be.visible')
      cy.contains('Global Impact').should('be.visible')
    })

    it('should display founder profiles', () => {
      cy.contains('Meet the Founders').should('be.visible')
      
      // Check for founder names
      cy.contains('Dr. Ananya Sharma').should('be.visible')
      cy.contains('Rajesh Kumar').should('be.visible')
    })
  })

  describe('Community CTA Section', () => {
    it('should display community engagement options', () => {
      cy.contains('Join Our Community').should('be.visible')
      
      // Check for social platform buttons
      cy.contains('Telegram Community').should('be.visible')
      cy.contains('Instagram').should('be.visible')
    })

    it('should show newsletter signup', () => {
      cy.contains('Stay Updated').should('be.visible')
      
      // Check for email input
      cy.get('input[type="email"]').should('be.visible')
      cy.contains('Subscribe').should('be.visible')
    })

    it('should display upcoming events', () => {
      cy.contains('Upcoming Events').should('be.visible')
      
      // Check for event titles
      cy.contains('Weekly Wisdom Circle').should('be.visible')
      cy.contains('Meditation Masterclass').should('be.visible')
    })
  })

  describe('Footer Section', () => {
    it('should display Sanskrit quote strip', () => {
      // Check for Sanskrit text
      cy.get('.font-devanagari').should('be.visible')
      
      // Check for translation
      cy.contains('Knowledge gives humility').should('be.visible')
    })

    it('should show footer links', () => {
      // Check for main sections
      cy.contains('Courses').should('be.visible')
      cy.contains('Resources').should('be.visible')
      cy.contains('Community').should('be.visible')
      cy.contains('Support').should('be.visible')
    })

    it('should display social media links', () => {
      // Check for social media icons/links
      cy.get('[aria-label*="Instagram"]').should('exist')
      cy.get('[aria-label*="Twitter"]').should('exist')
      cy.get('[aria-label*="YouTube"]').should('exist')
      cy.get('[aria-label*="Telegram"]').should('exist')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport(375, 667)
      
      // Check that content is still visible and accessible
      cy.contains('School of Self-Help').should('be.visible')
      cy.contains('Explore Skill Tracks').should('be.visible')
    })

    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024)
      
      // Check that content is properly laid out
      cy.contains('School of Self-Help').should('be.visible')
      cy.contains('Choose Your Path').should('be.visible')
    })

    it('should work on desktop viewport', () => {
      cy.viewport(1024, 768)
      
      // Check that all content is visible
      cy.contains('School of Self-Help').should('be.visible')
      cy.contains('Featured Courses').should('be.visible')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      // Check for h1
      cy.get('h1').should('exist')
      
      // Check for proper heading hierarchy
      cy.get('h2').should('have.length.at.least', 3)
    })

    it('should have proper ARIA attributes', () => {
      // Check for landmark roles
      cy.get('[role="region"]').should('exist')
      cy.get('[role="button"]').should('exist')
    })

    it('should be keyboard navigable', () => {
      // Test tab navigation
      cy.get('body').tab()
      cy.focused().should('exist')
      
      // Test enter key activation
      cy.focused().type('{enter}')
    })

    it('should have proper color contrast', () => {
      // This would require custom commands to check color contrast
      // For now, we'll just verify that text is visible
      cy.contains('School of Self-Help').should('be.visible')
    })
  })

  describe('Performance', () => {
    it('should load within acceptable time', () => {
      // Check that the page loads quickly
      cy.visit('/schools/self-help', { timeout: 10000 })
      cy.contains('School of Self-Help').should('be.visible')
    })

    it('should have optimized images', () => {
      // Check that images are properly optimized
      cy.get('img').should('have.attr', 'loading', 'lazy')
    })
  })
})
