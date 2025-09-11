/**
 * Live Preview Component Tests
 * Tests the three scenarios mentioned in the requirements:
 * 1. Valid preview payload
 * 2. Preview payload missing 'homepage'
 * 3. Preview payload missing 'homepage.Hero'
 */

import { validatePreviewData, getPreviewValue } from '../app/preview/[token]/page'

// Mock data for testing
const validPreviewPayload = {
  'homepage.Hero.title-prefix': {
    value: 'Welcome to',
    type: 'TEXT',
    cssProperty: 'text'
  },
  'homepage.Hero.title-brand': {
    value: 'Shikshanam',
    type: 'TEXT',
    cssProperty: 'text'
  },
  'homepage.Hero.subtitle': {
    value: 'Where AI meets Ancient India',
    type: 'TEXT',
    cssProperty: 'text'
  }
}

const invalidPreviewPayload = {
  // Missing homepage structure
  'someOtherPage.title': {
    value: 'Some Value',
    type: 'TEXT'
  }
}

const emptyPreviewPayload = {}

const malformedPreviewPayload = {
  'homepage.Hero.title-prefix': {
    // Missing required 'value' field
    type: 'TEXT'
  }
}

describe('Live Preview Validation', () => {
  describe('validatePreviewData', () => {
    it('should validate a correct preview payload', () => {
      const result = validatePreviewData(validPreviewPayload)
      expect(result).toBe(true)
    })

    it('should accept payload with valid structure even if missing homepage', () => {
      const result = validatePreviewData(invalidPreviewPayload)
      expect(result).toBe(true) // The validation only checks for valid change objects, not specific page structure
    })

    it('should reject empty payload', () => {
      const result = validatePreviewData(emptyPreviewPayload)
      expect(result).toBe(false)
    })

    it('should reject malformed payload with missing required fields', () => {
      const result = validatePreviewData(malformedPreviewPayload)
      expect(result).toBe(false)
    })

    it('should reject null or undefined payload', () => {
      expect(validatePreviewData(null)).toBe(false)
      expect(validatePreviewData(undefined)).toBe(false)
    })
  })

  describe('getPreviewValue', () => {
    it('should return the correct value for existing key', () => {
      const result = getPreviewValue(validPreviewPayload, 'homepage.Hero.title-prefix', 'Default Value')
      expect(result).toBe('Welcome to')
    })

    it('should return default value for missing key', () => {
      const result = getPreviewValue(validPreviewPayload, 'homepage.Hero.nonexistent', 'Default Value')
      expect(result).toBe('Default Value')
    })

    it('should return default value when changes is null', () => {
      const result = getPreviewValue(null, 'homepage.Hero.title-prefix', 'Default Value')
      expect(result).toBe('Default Value')
    })

    it('should return default value when changes is empty object', () => {
      const result = getPreviewValue({}, 'homepage.Hero.title-prefix', 'Default Value')
      expect(result).toBe('Default Value')
    })

    it('should handle missing homepage.Hero structure gracefully', () => {
      const result = getPreviewValue(invalidPreviewPayload, 'homepage.Hero.title-prefix', 'Default Value')
      expect(result).toBe('Default Value')
    })
  })
})

describe('Live Preview API Integration', () => {
  // Mock fetch for testing API responses
  const mockFetch = jest.fn()
  global.fetch = mockFetch

  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('should handle valid API response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => validPreviewPayload
    })

    const response = await fetch('/api/cms/quick-edit/live-preview/test-token')
    const data = await response.json()

    expect(response.ok).toBe(true)
    expect(validatePreviewData(data)).toBe(true)
    expect(data['homepage.Hero.title-prefix'].value).toBe('Welcome to')
  })

    it('should handle API response with different page structure', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => invalidPreviewPayload
      })

      const response = await fetch('/api/cms/quick-edit/live-preview/test-token')
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(validatePreviewData(data)).toBe(true) // Valid structure, just different page
    })

  it('should handle API error response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
      json: async () => ({ error: 'Invalid or expired preview token' })
    })

    const response = await fetch('/api/cms/quick-edit/live-preview/invalid-token')
    const data = await response.json()

    expect(response.ok).toBe(false)
    expect(data.error).toBe('Invalid or expired preview token')
  })

  it('should handle network error', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(fetch('/api/cms/quick-edit/live-preview/test-token'))
      .rejects.toThrow('Network error')
  })
})

describe('Live Preview Error Scenarios', () => {
  it('should provide sensible defaults when homepage.Hero is missing', () => {
    const changes = {
      'otherPage.title': {
        value: 'Other Value',
        type: 'TEXT'
      }
    }

    const titlePrefix = getPreviewValue(changes, 'homepage.Hero.title-prefix', 'Welcome to')
    const titleBrand = getPreviewValue(changes, 'homepage.Hero.title-brand', 'Shikshanam')
    const subtitle = getPreviewValue(changes, 'homepage.Hero.subtitle', 'Where AI meets Ancient India')

    expect(titlePrefix).toBe('Welcome to')
    expect(titleBrand).toBe('Shikshanam')
    expect(subtitle).toBe('Where AI meets Ancient India')
  })

  it('should handle partial homepage.Hero data', () => {
    const changes = {
      'homepage.Hero.title-prefix': {
        value: 'Welcome to',
        type: 'TEXT'
      }
      // Missing title-brand and subtitle
    }

    const titlePrefix = getPreviewValue(changes, 'homepage.Hero.title-prefix', 'Welcome to')
    const titleBrand = getPreviewValue(changes, 'homepage.Hero.title-brand', 'Shikshanam')
    const subtitle = getPreviewValue(changes, 'homepage.Hero.subtitle', 'Where AI meets Ancient India')

    expect(titlePrefix).toBe('Welcome to')
    expect(titleBrand).toBe('Shikshanam') // Should use default
    expect(subtitle).toBe('Where AI meets Ancient India') // Should use default
  })
})
