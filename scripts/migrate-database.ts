#!/usr/bin/env ts-node

/**
 * Database Migration Script
 * Applies database optimizations and migrations
 */

import { runMigrations } from '../lib/database/migrations';
import { checkDatabaseHealth } from '../lib/database/connection';

async function main() {
  console.log('🚀 Starting database migration...\n');

  // Check database health first
  console.log('📊 Checking database health...');
  const healthCheck = await checkDatabaseHealth();
  
  if (!healthCheck.isHealthy) {
    console.error('❌ Database health check failed:', healthCheck.error);
    process.exit(1);
  }
  
  console.log(`✅ Database is healthy (latency: ${healthCheck.latency}ms)\n`);

  // Run migrations
  console.log('🔄 Running database migrations...');
  const migrationResult = await runMigrations();

  // Display results
  console.log('\n📋 Migration Results:');
  console.log('='.repeat(50));
  
  migrationResult.results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.message}`);
    
    if (result.recordsAffected !== undefined) {
      console.log(`   Records affected: ${result.recordsAffected}`);
    }
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  // Display summary
  console.log('\n📊 Migration Summary:');
  console.log('='.repeat(50));
  console.log(`Total migrations: ${migrationResult.results.length}`);
  console.log(`Successful: ${migrationResult.results.filter(r => r.success).length}`);
  console.log(`Failed: ${migrationResult.results.filter(r => !r.success).length}`);

  if (migrationResult.errors.length > 0) {
    console.log('\n❌ Errors:');
    migrationResult.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
  }

  // Final health check
  console.log('\n📊 Final database health check...');
  const finalHealthCheck = await checkDatabaseHealth();
  
  if (finalHealthCheck.isHealthy) {
    console.log(`✅ Database is healthy after migration (latency: ${finalHealthCheck.latency}ms)`);
  } else {
    console.error('❌ Database health check failed after migration:', finalHealthCheck.error);
  }

  // Exit with appropriate code
  process.exit(migrationResult.success ? 0 : 1);
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

// Run the migration
main().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
