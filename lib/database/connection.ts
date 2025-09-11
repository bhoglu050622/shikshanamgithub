/**
 * Database Connection Management
 * Optimized connection pooling and query management
 */

import { PrismaClient } from '@prisma/client';

// Global Prisma client instance
let globalPrisma: PrismaClient;

declare global {
  var __prisma: PrismaClient | undefined;
}

// Connection configuration
const connectionConfig = {
  // Connection pool settings
  connectionLimit: parseInt(process.env.DATABASE_CONNECTION_LIMIT || '10'),
  poolTimeout: parseInt(process.env.DATABASE_POOL_TIMEOUT || '30000'),
  
  // Query settings
  queryTimeout: parseInt(process.env.DATABASE_QUERY_TIMEOUT || '30000'),
  transactionTimeout: parseInt(process.env.DATABASE_TRANSACTION_TIMEOUT || '60000'),
  
  // Logging
  logLevel: process.env.DATABASE_LOG_LEVEL || 'error',
  logQueries: process.env.DATABASE_LOG_QUERIES === 'true',
};

// Create Prisma client with optimized configuration
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: connectionConfig.logQueries 
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
    
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    
    // Connection pool configuration
    __internal: {
      engine: {
        connectTimeout: connectionConfig.poolTimeout,
        queryTimeout: connectionConfig.queryTimeout,
        transactionTimeout: connectionConfig.transactionTimeout,
      },
    },
  });
}

// Get or create Prisma client instance
export function getPrismaClient(): PrismaClient {
  if (process.env.NODE_ENV === 'production') {
    if (!globalPrisma) {
      globalPrisma = createPrismaClient();
    }
    return globalPrisma;
  } else {
    // In development, use global variable to prevent multiple instances
    if (!global.__prisma) {
      global.__prisma = createPrismaClient();
    }
    return global.__prisma;
  }
}

// Graceful shutdown
export async function disconnectPrisma(): Promise<void> {
  const client = getPrismaClient();
  await client.$disconnect();
}

// Health check
export async function checkDatabaseHealth(): Promise<{
  isHealthy: boolean;
  latency?: number;
  error?: string;
}> {
  try {
    const start = Date.now();
    await getPrismaClient().$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    
    return {
      isHealthy: true,
      latency,
    };
  } catch (error) {
    return {
      isHealthy: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Transaction helper
export async function withTransaction<T>(
  callback: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  const prisma = getPrismaClient();
  return await prisma.$transaction(callback, {
    timeout: connectionConfig.transactionTimeout,
  });
}

// Query performance monitoring
export function createQueryLogger() {
  return {
    logQuery: (query: string, duration: number, params?: any) => {
      if (connectionConfig.logQueries && duration > 100) { // Log slow queries
        console.warn(`Slow query detected: ${duration}ms`, {
          query: query.substring(0, 200) + '...',
          duration,
          params,
        });
      }
    },
  };
}

// Connection pool monitoring
export function getConnectionStats() {
  return {
    connectionLimit: connectionConfig.connectionLimit,
    poolTimeout: connectionConfig.poolTimeout,
    queryTimeout: connectionConfig.queryTimeout,
    transactionTimeout: connectionConfig.transactionTimeout,
  };
}

// Default export
export const prisma = getPrismaClient();
export default prisma;
