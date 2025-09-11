/**
 * Database Barrel Export
 * Centralized exports for all database utilities and queries
 */

// Connection management
export * from './connection';

// Optimized queries
export * from './queries';

// Migration utilities
export * from './migrations';

// Re-export Prisma client
export { prisma } from './connection';
export { PrismaClient } from '@prisma/client';
