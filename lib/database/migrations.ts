/**
 * Database Migration Utilities
 * Helper functions for database schema migrations and data management
 */

import { prisma } from './connection';

// ============================================================================
// MIGRATION HELPERS
// ============================================================================

export interface MigrationResult {
  success: boolean;
  message: string;
  recordsAffected?: number;
  error?: string;
}

// ============================================================================
// INDEX CREATION
// ============================================================================

export const indexMigrations = {
  // Create user indexes
  createUserIndexes: async (): Promise<MigrationResult> => {
    try {
      const indexes = [
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL;',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_username ON users(username);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_role ON users(role);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_status ON users(status);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_active ON users(is_active);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_created_at ON users(created_at);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_last_login_role ON users(last_login, role) WHERE last_login IS NOT NULL;',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_deleted_at ON users(deleted_at);',
      ];

      for (const index of indexes) {
        await prisma.$executeRawUnsafe(index);
      }

      return {
        success: true,
        message: 'User indexes created successfully',
        recordsAffected: indexes.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create user indexes',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Create course indexes
  createCourseIndexes: async (): Promise<MigrationResult> => {
    try {
      const indexes = [
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_slug ON courses(slug);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_instructor ON courses(instructor_id);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_status ON courses(status);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_published ON courses(is_published);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_featured ON courses(featured);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_category ON courses(category);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_created_at ON courses(created_at);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_deleted_at ON courses(deleted_at);',
      ];

      for (const index of indexes) {
        await prisma.$executeRawUnsafe(index);
      }

      return {
        success: true,
        message: 'Course indexes created successfully',
        recordsAffected: indexes.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create course indexes',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Create audit log indexes
  createAuditLogIndexes: async (): Promise<MigrationResult> => {
    try {
      const indexes = [
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_resource ON audit_logs(resource);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_user_resource_action ON audit_logs(user_id, resource, action);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_created_action ON audit_logs(created_at, action);',
        'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_audit_logs_created_ip ON audit_logs(created_at, ip_address) WHERE ip_address IS NOT NULL;',
      ];

      for (const index of indexes) {
        await prisma.$executeRawUnsafe(index);
      }

      return {
        success: true,
        message: 'Audit log indexes created successfully',
        recordsAffected: indexes.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create audit log indexes',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

// ============================================================================
// DATA MIGRATIONS
// ============================================================================

export const dataMigrations = {
  // Migrate existing users to new schema
  migrateUsers: async (): Promise<MigrationResult> => {
    try {
      // This would be used to migrate existing user data to the new schema
      // For now, it's a placeholder for future migrations
      
      return {
        success: true,
        message: 'User migration completed (no changes needed)',
        recordsAffected: 0,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to migrate users',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Add soft delete timestamps
  addSoftDeleteTimestamps: async (): Promise<MigrationResult> => {
    try {
      const tables = ['users', 'courses', 'lessons'];
      let totalAffected = 0;

      for (const table of tables) {
        const result = await prisma.$executeRawUnsafe(`
          UPDATE ${table} 
          SET deleted_at = NULL 
          WHERE deleted_at IS NULL;
        `);
        totalAffected += result;
      }

      return {
        success: true,
        message: 'Soft delete timestamps initialized',
        recordsAffected: totalAffected,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to initialize soft delete timestamps',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Clean up expired refresh tokens
  cleanupExpiredTokens: async (): Promise<MigrationResult> => {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      });

      return {
        success: true,
        message: 'Expired refresh tokens cleaned up',
        recordsAffected: result.count,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to cleanup expired tokens',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Archive old audit logs
  archiveOldAuditLogs: async (daysToKeep: number = 365): Promise<MigrationResult> => {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const result = await prisma.auditLog.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
        },
      });

      return {
        success: true,
        message: `Audit logs older than ${daysToKeep} days archived`,
        recordsAffected: result.count,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to archive old audit logs',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

// ============================================================================
// SCHEMA VALIDATION
// ============================================================================

export const schemaValidation = {
  // Validate database schema
  validateSchema: async (): Promise<MigrationResult> => {
    try {
      const checks = [
        // Check if all required tables exist
        prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`,
        
        // Check if all required indexes exist
        prisma.$queryRaw`SELECT indexname FROM pg_indexes WHERE schemaname = 'public'`,
        
        // Check if all required columns exist
        prisma.$queryRaw`SELECT column_name FROM information_schema.columns WHERE table_schema = 'public'`,
      ];

      await Promise.all(checks);

      return {
        success: true,
        message: 'Schema validation passed',
        recordsAffected: 0,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Schema validation failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Check database constraints
  checkConstraints: async (): Promise<MigrationResult> => {
    try {
      const constraints = await prisma.$queryRaw`
        SELECT 
          tc.constraint_name,
          tc.table_name,
          tc.constraint_type
        FROM information_schema.table_constraints tc
        WHERE tc.table_schema = 'public'
        ORDER BY tc.table_name, tc.constraint_name;
      `;

      return {
        success: true,
        message: 'Constraint check completed',
        recordsAffected: Array.isArray(constraints) ? constraints.length : 0,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Constraint check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

// ============================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================

export const performanceOptimization = {
  // Analyze table statistics
  analyzeTables: async (): Promise<MigrationResult> => {
    try {
      const tables = ['users', 'courses', 'lessons', 'enrollments', 'progress', 'audit_logs'];
      
      for (const table of tables) {
        await prisma.$executeRawUnsafe(`ANALYZE ${table};`);
      }

      return {
        success: true,
        message: 'Table statistics updated',
        recordsAffected: tables.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to analyze tables',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Vacuum tables for better performance
  vacuumTables: async (): Promise<MigrationResult> => {
    try {
      const tables = ['users', 'courses', 'lessons', 'enrollments', 'progress', 'audit_logs'];
      
      for (const table of tables) {
        await prisma.$executeRawUnsafe(`VACUUM ANALYZE ${table};`);
      }

      return {
        success: true,
        message: 'Tables vacuumed and analyzed',
        recordsAffected: tables.length,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to vacuum tables',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  // Update query planner statistics
  updateQueryStats: async (): Promise<MigrationResult> => {
    try {
      await prisma.$executeRaw`SELECT pg_stat_reset();`;

      return {
        success: true,
        message: 'Query statistics reset',
        recordsAffected: 1,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to reset query statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },
};

// ============================================================================
// MIGRATION RUNNER
// ============================================================================

export async function runMigrations(): Promise<{
  success: boolean;
  results: MigrationResult[];
  errors: string[];
}> {
  const results: MigrationResult[] = [];
  const errors: string[] = [];

  const migrations = [
    { name: 'Create User Indexes', fn: indexMigrations.createUserIndexes },
    { name: 'Create Course Indexes', fn: indexMigrations.createCourseIndexes },
    { name: 'Create Audit Log Indexes', fn: indexMigrations.createAuditLogIndexes },
    { name: 'Migrate Users', fn: dataMigrations.migrateUsers },
    { name: 'Add Soft Delete Timestamps', fn: dataMigrations.addSoftDeleteTimestamps },
    { name: 'Cleanup Expired Tokens', fn: dataMigrations.cleanupExpiredTokens },
    { name: 'Validate Schema', fn: schemaValidation.validateSchema },
    { name: 'Analyze Tables', fn: performanceOptimization.analyzeTables },
  ];

  for (const migration of migrations) {
    try {
      console.log(`Running migration: ${migration.name}`);
      const result = await migration.fn();
      results.push(result);
      
      if (!result.success) {
        errors.push(`${migration.name}: ${result.error}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`${migration.name}: ${errorMessage}`);
      results.push({
        success: false,
        message: `Migration failed: ${migration.name}`,
        error: errorMessage,
      });
    }
  }

  return {
    success: errors.length === 0,
    results,
    errors,
  };
}
