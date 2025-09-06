describe('Unsure Path Journey E2E', () => {
  beforeEach(() => {
    cy.visit('/test-unsure-path')
  })

  it('should load the component and show initial state', () => {
    cy.contains('Unsure Where to Begin?').should('be.visible')
    cy.contains('Darshana Basics').should('be.visible')
    cy.contains('Step 1 of 7').should('be.visible')
  })

  it('should navigate through steps using next button', () => {
    // Click next button
    cy.get('[aria-label="Next step"]').click()
    
    // Should show step 2
    cy.contains('Step 2 of 7').should('be.visible')
    cy.contains('Nyaya').should('be.visible')
    
    // Click next again
    cy.get('[aria-label="Next step"]').click()
    
    // Should show step 3
    cy.contains('Step 3 of 7').should('be.visible')
    cy.contains('Vaisheshika').should('be.visible')
  })

  it('should allow direct navigation to any step', () => {
    // All steps should be accessible from the start
    cy.get('[data-testid="lock-icon"]').should('have.length', 0)
    
    // Click directly on Nyaya step
    cy.contains('Nyaya').click()
    
    // Should show step 2
    cy.contains('Step 2 of 7').should('be.visible')
    cy.contains('Currently viewing: Nyaya').should('be.visible')
  })

  it('should handle auto-play functionality', () => {
    // Start auto-play
    cy.get('[aria-label="Start auto-play"]').click()
    
    // Should show pause button
    cy.get('[aria-label="Pause auto-play"]').should('be.visible')
    
    // Wait for auto-advance and pause
    cy.wait(2000)
    cy.get('[aria-label="Pause auto-play"]').click()
    
    // Should show play button again
    cy.get('[aria-label="Start auto-play"]').should('be.visible')
  })

  it('should handle speed controls', () => {
    // Start auto-play
    cy.get('[aria-label="Start auto-play"]').click()
    
    // Change speed to fast
    cy.contains('fast').click()
    
    // Should show fast as selected
    cy.contains('fast').should('have.class', 'bg-saffron-500')
  })

  it('should handle keyboard navigation', () => {
    // Use right arrow to advance
    cy.get('body').type('{rightarrow}')
    
    // Should show step 2
    cy.contains('Step 2 of 7').should('be.visible')
    
    // Use left arrow to go back
    cy.get('body').type('{leftarrow}')
    
    // Should show step 1
    cy.contains('Step 1 of 7').should('be.visible')
    
    // Use spacebar to play/pause
    cy.get('body').type(' ')
    
    // Should show pause button
    cy.get('[aria-label="Pause auto-play"]').should('be.visible')
  })

  it('should handle touch swipe gestures on mobile', () => {
    // Set mobile viewport
    cy.viewport(375, 667)
    
    // Swipe left to advance
    cy.get('[data-cy="main-content"]').swipe('left')
    
    // Should show step 2
    cy.contains('Step 2 of 7').should('be.visible')
    
    // Swipe right to go back
    cy.get('[data-cy="main-content"]').swipe('right')
    
    // Should show step 1
    cy.contains('Step 1 of 7').should('be.visible')
  })

  it('should open quiz when CTA is clicked', () => {
    // Click quiz CTA
    cy.contains('See which Darshana you should Start with!').click()
    
    // Should show quiz modal
    cy.contains('Quiz Integration Demo').should('be.visible')
    
    // Close modal
    cy.contains('Close Demo').click()
    
    // Modal should be closed
    cy.contains('Quiz Integration Demo').should('not.exist')
  })

  it('should be responsive on different screen sizes', () => {
    // Desktop layout
    cy.viewport(1200, 800)
    cy.get('.grid-cols-12').should('be.visible')
    
    // Tablet layout
    cy.viewport(768, 1024)
    cy.get('.grid-cols-12').should('not.exist')
    
    // Mobile layout
    cy.viewport(375, 667)
    cy.get('.space-y-8').should('be.visible')
  })

  it('should show progress indicator', () => {
    // Check initial progress
    cy.contains('14% Complete').should('be.visible')
    cy.contains('Currently viewing: Darshana Basics').should('be.visible')
    
    // Advance and check updated progress
    cy.get('[aria-label="Next step"]').click()
    cy.contains('29% Complete').should('be.visible')
    cy.contains('Currently viewing: Nyaya').should('be.visible')
  })

  it('should handle accessibility features', () => {
    // Check for proper ARIA roles
    cy.get('[role="region"]').should('exist')
    cy.get('[role="navigation"]').should('exist')
    cy.get('[role="progressbar"]').should('exist')
    
    // Check for live region
    cy.get('[aria-live="polite"]').should('exist')
    
    // Check for proper labels
    cy.get('[aria-label*="step"]').should('have.length.at.least', 2)
  })

  it('should show text-only fallback for no-JS users', () => {
    // Disable JavaScript
    cy.window().then((win) => {
      win.document.documentElement.setAttribute('data-js', 'false')
    })
    
    // Should show noscript content
    cy.contains('Darshana Learning Path').should('be.visible')
  })
})

// Custom command for swipe gestures
declare global {
  namespace Cypress {
    interface Chainable {
      swipe(direction: 'left' | 'right' | 'up' | 'down'): Chainable<Element>
    }
  }
}

Cypress.Commands.add('swipe', { prevSubject: 'element' }, (subject, direction) => {
  const element = subject[0]
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  let startX, startY, endX, endY
  
  switch (direction) {
    case 'left':
      startX = centerX + 50
      endX = centerX - 50
      startY = endY = centerY
      break
    case 'right':
      startX = centerX - 50
      endX = centerX + 50
      startY = endY = centerY
      break
    case 'up':
      startY = centerY + 50
      endY = centerY - 50
      startX = endX = centerX
      break
    case 'down':
      startY = centerY - 50
      endY = centerY + 50
      startX = endX = centerX
      break
  }
  
  cy.wrap(element)
    .trigger('touchstart', { touches: [{ clientX: startX, clientY: startY }] })
    .trigger('touchmove', { touches: [{ clientX: endX, clientY: endY }] })
    .trigger('touchend')
  
  return cy.wrap(element)
})
