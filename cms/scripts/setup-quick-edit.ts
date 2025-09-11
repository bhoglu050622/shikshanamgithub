// Setup Script for Quick Edit System
// Initializes the database with default quick edit items for all pages

import { prisma } from '../lib/prisma'
import { QuickEditType } from '../lib/generated/prisma'

interface QuickEditItemData {
  key: string
  type: QuickEditType
  page: string
  component: string
  element: string
  value: string
  defaultValue: string
  metadata?: any
}

// Default quick edit items for the homepage
const defaultHomepageItems: QuickEditItemData[] = [
  // Hero Section
  {
    key: 'homepage.Hero.title-prefix',
    type: 'TEXT',
    page: 'homepage',
    component: 'Hero',
    element: 'title-prefix',
    value: 'Welcome to',
    defaultValue: 'Welcome to',
    metadata: {
      maxLength: 50,
      placeholder: 'Enter title prefix'
    }
  },
  {
    key: 'homepage.Hero.title-brand',
    type: 'TEXT',
    page: 'homepage',
    component: 'Hero',
    element: 'title-brand',
    value: 'Shikshanam',
    defaultValue: 'Shikshanam',
    metadata: {
      maxLength: 30,
      placeholder: 'Enter brand name'
    }
  },
  {
    key: 'homepage.Hero.subtitle',
    type: 'TEXT',
    page: 'homepage',
    component: 'Hero',
    element: 'subtitle',
    value: 'Where AI meets Ancient India',
    defaultValue: 'Where AI meets Ancient India',
    metadata: {
      maxLength: 100,
      placeholder: 'Enter subtitle'
    }
  },
  {
    key: 'homepage.Hero.question',
    type: 'TEXT',
    page: 'homepage',
    component: 'Hero',
    element: 'question',
    value: 'What do you seek?',
    defaultValue: 'What do you seek?',
    metadata: {
      maxLength: 50,
      placeholder: 'Enter question text'
    }
  },
  // CTA Buttons
  {
    key: 'homepage.Hero.cta-primary',
    type: 'BUTTON_LABEL',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-primary',
    value: 'School of Sanskrit',
    defaultValue: 'School of Sanskrit',
    metadata: {
      maxLength: 30,
      placeholder: 'Enter button text'
    }
  },
  {
    key: 'homepage.Hero.cta-primary-color',
    type: 'BUTTON_COLOR',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-primary-color',
    value: '#3B82F6',
    defaultValue: '#3B82F6',
    metadata: {
      colorType: 'hex',
      description: 'Primary button background color'
    }
  },
  {
    key: 'homepage.Hero.cta-secondary',
    type: 'BUTTON_LABEL',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-secondary',
    value: 'School of Darshan',
    defaultValue: 'School of Darshan',
    metadata: {
      maxLength: 30,
      placeholder: 'Enter button text'
    }
  },
  {
    key: 'homepage.Hero.cta-secondary-color',
    type: 'BUTTON_COLOR',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-secondary-color',
    value: '#8B4513',
    defaultValue: '#8B4513',
    metadata: {
      colorType: 'hex',
      description: 'Secondary button background color'
    }
  },
  {
    key: 'homepage.Hero.cta-tertiary',
    type: 'BUTTON_LABEL',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-tertiary',
    value: 'School of Life Skills',
    defaultValue: 'School of Life Skills',
    metadata: {
      maxLength: 30,
      placeholder: 'Enter button text'
    }
  },
  {
    key: 'homepage.Hero.cta-tertiary-color',
    type: 'BUTTON_COLOR',
    page: 'homepage',
    component: 'Hero',
    element: 'cta-tertiary-color',
    value: '#FF8C00',
    defaultValue: '#FF8C00',
    metadata: {
      colorType: 'hex',
      description: 'Tertiary button background color'
    }
  }
]

// Default quick edit items for other pages
const defaultAboutPageItems: QuickEditItemData[] = [
  {
    key: 'about.Hero.title',
    type: 'TEXT',
    page: 'about',
    component: 'Hero',
    element: 'title',
    value: 'About Shikshanam',
    defaultValue: 'About Shikshanam',
    metadata: {
      maxLength: 50,
      placeholder: 'Enter page title'
    }
  },
  {
    key: 'about.Hero.subtitle',
    type: 'TEXT',
    page: 'about',
    component: 'Hero',
    element: 'subtitle',
    value: 'Discover our mission to preserve and share ancient wisdom',
    defaultValue: 'Discover our mission to preserve and share ancient wisdom',
    metadata: {
      maxLength: 100,
      placeholder: 'Enter page subtitle'
    }
  }
]

// Default quick edit items for courses page
const defaultCoursesPageItems: QuickEditItemData[] = [
  {
    key: 'courses.Hero.title',
    type: 'TEXT',
    page: 'courses',
    component: 'Hero',
    element: 'title',
    value: 'Our Courses',
    defaultValue: 'Our Courses',
    metadata: {
      maxLength: 50,
      placeholder: 'Enter page title'
    }
  },
  {
    key: 'courses.Hero.subtitle',
    type: 'TEXT',
    page: 'courses',
    component: 'Hero',
    element: 'subtitle',
    value: 'Explore our comprehensive curriculum of Sanskrit and philosophy',
    defaultValue: 'Explore our comprehensive curriculum of Sanskrit and philosophy',
    metadata: {
      maxLength: 100,
      placeholder: 'Enter page subtitle'
    }
  }
]

// Default theme settings
const defaultThemeSettings = [
  {
    name: 'primary',
    category: 'colors',
    value: '#3B82F6',
    cssVariable: '--color-primary',
    description: 'Primary brand color'
  },
  {
    name: 'secondary',
    category: 'colors',
    value: '#8B4513',
    cssVariable: '--color-secondary',
    description: 'Secondary brand color'
  },
  {
    name: 'accent',
    category: 'colors',
    value: '#FF8C00',
    cssVariable: '--color-accent',
    description: 'Accent color'
  },
  {
    name: 'background',
    category: 'colors',
    value: '#FFFFFF',
    cssVariable: '--color-background',
    description: 'Background color'
  },
  {
    name: 'text',
    category: 'colors',
    value: '#1F2937',
    cssVariable: '--color-text',
    description: 'Primary text color'
  },
  {
    name: 'heading-font',
    category: 'typography',
    value: 'Inter, sans-serif',
    cssVariable: '--font-heading',
    description: 'Heading font family'
  },
  {
    name: 'body-font',
    category: 'typography',
    value: 'Inter, sans-serif',
    cssVariable: '--font-body',
    description: 'Body font family'
  },
  {
    name: 'border-radius',
    category: 'spacing',
    value: '0.5rem',
    cssVariable: '--border-radius',
    description: 'Default border radius'
  }
]

// Setup function
export async function setupQuickEditSystem() {
  console.log('🚀 Setting up Quick Edit System...')

  try {
    // Get or create a default admin user
    let adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (!adminUser) {
      console.log('Creating default admin user...')
      adminUser = await prisma.user.create({
        data: {
          username: 'admin',
          email: 'admin@shikshanam.com',
          passwordHash: 'hashed_password_here', // In production, use proper hashing
          role: 'ADMIN',
          isActive: true
        }
      })
    }

    // Create quick edit items
    console.log('Creating quick edit items...')
    const allItems = [
      ...defaultHomepageItems,
      ...defaultAboutPageItems,
      ...defaultCoursesPageItems
    ]

    for (const itemData of allItems) {
      const existing = await prisma.quickEditItem.findUnique({
        where: { key: itemData.key }
      })

      if (!existing) {
        await prisma.quickEditItem.create({
          data: {
            ...itemData,
            createdById: adminUser.id
          }
        })
        console.log(`✅ Created quick edit item: ${itemData.key}`)
      } else {
        console.log(`⏭️  Quick edit item already exists: ${itemData.key}`)
      }
    }

    // Create theme settings
    console.log('Creating theme settings...')
    for (const settingData of defaultThemeSettings) {
      const existing = await prisma.themeSetting.findUnique({
        where: { name: settingData.name }
      })

      if (!existing) {
        await prisma.themeSetting.create({
          data: {
            ...settingData,
            createdById: adminUser.id
          }
        })
        console.log(`✅ Created theme setting: ${settingData.name}`)
      } else {
        console.log(`⏭️  Theme setting already exists: ${settingData.name}`)
      }
    }

    console.log('🎉 Quick Edit System setup completed successfully!')
    console.log(`📊 Created ${allItems.length} quick edit items`)
    console.log(`🎨 Created ${defaultThemeSettings.length} theme settings`)
    console.log(`👤 Using admin user: ${adminUser.username}`)

    return {
      success: true,
      itemsCreated: allItems.length,
      settingsCreated: defaultThemeSettings.length,
      adminUser: adminUser.username
    }

  } catch (error) {
    console.error('❌ Failed to setup Quick Edit System:', error)
    throw error
  }
}

// Cleanup function
export async function cleanupQuickEditSystem() {
  console.log('🧹 Cleaning up Quick Edit System...')

  try {
    // Delete all quick edit items
    const deletedItems = await prisma.quickEditItem.deleteMany({})
    console.log(`🗑️  Deleted ${deletedItems.count} quick edit items`)

    // Delete all quick edit revisions
    const deletedRevisions = await prisma.quickEditRevision.deleteMany({})
    console.log(`🗑️  Deleted ${deletedRevisions.count} quick edit revisions`)

    // Delete all theme settings
    const deletedSettings = await prisma.themeSetting.deleteMany({})
    console.log(`🗑️  Deleted ${deletedSettings.count} theme settings`)

    // Delete all live preview tokens
    const deletedTokens = await prisma.livePreviewToken.deleteMany({})
    console.log(`🗑️  Deleted ${deletedTokens.count} live preview tokens`)

    console.log('✅ Quick Edit System cleanup completed!')

    return {
      success: true,
      deletedItems: deletedItems.count,
      deletedRevisions: deletedRevisions.count,
      deletedSettings: deletedSettings.count,
      deletedTokens: deletedTokens.count
    }

  } catch (error) {
    console.error('❌ Failed to cleanup Quick Edit System:', error)
    throw error
  }
}

// Export functions for use in scripts
export { defaultHomepageItems, defaultAboutPageItems, defaultCoursesPageItems, defaultThemeSettings }
