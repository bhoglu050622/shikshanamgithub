#!/usr/bin/env tsx

import { bootstrapAdmin } from '../lib/auth'
import { prisma } from '../lib/prisma'

async function bootstrap() {
  console.log('🚀 Bootstrapping Shikshanam CMS...')

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connected')

    // Bootstrap admin user
    await bootstrapAdmin()
    console.log('✅ Admin user bootstrapped')

    // Create default settings if they don't exist
    const settings = await prisma.settings.findUnique({
      where: { id: 'global' },
    })

    if (!settings) {
      await prisma.settings.create({
        data: {
          id: 'global',
          data: {
            siteName: 'Shikshanam',
            siteDescription: 'Ancient wisdom for modern living',
            logoLight: '/assets/logo-light.svg',
            logoDark: '/assets/logo-dark.svg',
            brandColors: {
              primary: '#ea580c',
              secondary: '#f59e0b',
            },
            defaultSEO: {
              title: 'Shikshanam - Ancient Wisdom for Modern Living',
              description: 'Learn Sanskrit, philosophy, and spiritual practices through comprehensive courses and guided learning.',
              keywords: 'sanskrit, philosophy, spirituality, vedanta, yoga, meditation',
              ogImage: '/assets/og-image.jpg',
            },
            analytics: {
              localStorageKey: 'analytics_queue_v1',
              endpointEnabled: true,
              endpoint: '/api/analytics/collect',
            },
            contact: {
              email: 'contact@shikshanam.com',
            },
            features: {
              registrationEnabled: true,
              commentsEnabled: true,
              ratingsEnabled: true,
              certificatesEnabled: true,
            },
          },
        },
      })
      console.log('✅ Default settings created')
    }

    // Clean expired refresh tokens
    const expiredTokens = await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })
    console.log(`✅ Cleaned ${expiredTokens.count} expired refresh tokens`)

    console.log('\n🎉 CMS bootstrap completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Start the development server: npm run dev')
    console.log('2. Visit http://localhost:3000/cms/login')
    console.log('3. Login with:')
    console.log('   Username: shikshanam')
    console.log('   Password: amanaman')
    console.log('\n⚠️  Remember to change the default password in production!')

  } catch (error) {
    console.error('❌ Bootstrap failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run bootstrap if this file is executed directly
if (require.main === module) {
  bootstrap()
}

export { bootstrap }
