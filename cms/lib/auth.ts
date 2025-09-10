import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'
import { prisma } from './prisma'
import { UserRole } from './generated/prisma'

export interface JWTPayload {
  userId: string
  username: string
  role: UserRole
  iat?: number
  exp?: number
}

export interface AuthUser {
  id: string
  username: string
  role: UserRole
  email?: string | null
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-this-in-production'

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message)
    this.name = 'AuthError'
  }
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Generate JWT tokens
export function generateTokens(user: AuthUser): { accessToken: string; refreshToken: string } {
  const payload: JWTPayload = {
    userId: user.id,
    username: user.username,
    role: user.role,
  }

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AuthError('Token expired', 401)
    }
    throw new AuthError('Invalid token', 401)
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string }
  } catch (error) {
    throw new AuthError('Invalid refresh token', 401)
  }
}

// Get user from request
export async function getUserFromRequest(request: NextRequest): Promise<AuthUser> {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader?.startsWith('Bearer ')) {
    throw new AuthError('No authorization header', 401)
  }

  const token = authHeader.substring(7)
  const payload = verifyToken(token)

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      username: true,
      role: true,
      email: true,
      isActive: true,
    },
  })

  if (!user || !user.isActive) {
    throw new AuthError('User not found or inactive', 401)
  }

  return user
}

// Check if user has required role
export function hasRole(user: AuthUser, requiredRole: UserRole): boolean {
  const roleHierarchy = {
    [UserRole.VIEWER]: 1,
    [UserRole.SUPPORT_MODERATOR]: 2,
    [UserRole.EDITOR]: 3,
    [UserRole.CONTENT_EDITOR]: 4,
    [UserRole.INSTRUCTOR]: 5,
    [UserRole.PUBLISHER]: 6,
    [UserRole.ADMIN]: 7,
  }

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole]
}

// Middleware to require authentication
export function requireAuth(requiredRole: UserRole = UserRole.VIEWER) {
  return async (request: NextRequest): Promise<AuthUser> => {
    const user = await getUserFromRequest(request)
    
    if (!hasRole(user, requiredRole)) {
      throw new AuthError('Insufficient permissions', 403)
    }

    return user
  }
}

// Bootstrap admin user
export async function bootstrapAdmin(): Promise<void> {
  const adminUsername = process.env.BOOTSTRAP_ADMIN_USERNAME || 'shikshanam'
  const adminPassword = process.env.BOOTSTRAP_ADMIN_PASSWORD || 'amanaman'

  const existingAdmin = await prisma.user.findUnique({
    where: { username: adminUsername },
  })

  if (!existingAdmin) {
    const hashedPassword = await hashPassword(adminPassword)
    
    await prisma.user.create({
      data: {
        username: adminUsername,
        passwordHash: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
    })

    console.log(`✅ Bootstrap admin user created: ${adminUsername}`)
  }
}

// Login user
export async function loginUser(username: string, password: string): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } }> {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      role: true,
      email: true,
      passwordHash: true,
      isActive: true,
    },
  })

  if (!user || !user.isActive) {
    throw new AuthError('Invalid credentials', 401)
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash)
  if (!isValidPassword) {
    throw new AuthError('Invalid credentials', 401)
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  })

  const authUser: AuthUser = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  }

  const tokens = generateTokens(authUser)

  // Store refresh token in database
  await prisma.refreshToken.create({
    data: {
      token: tokens.refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    },
  })

  return { user: authUser, tokens }
}

// Refresh access token
export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  const payload = verifyRefreshToken(refreshToken)

  // Check if refresh token exists in database
  const tokenRecord = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true },
  })

  if (!tokenRecord || tokenRecord.expiresAt < new Date() || !tokenRecord.user.isActive) {
    throw new AuthError('Invalid refresh token', 401)
  }

  const authUser: AuthUser = {
    id: tokenRecord.user.id,
    username: tokenRecord.user.username,
    role: tokenRecord.user.role,
    email: tokenRecord.user.email,
  }

  const tokens = generateTokens(authUser)

  // Replace old refresh token with new one
  await prisma.refreshToken.update({
    where: { id: tokenRecord.id },
    data: {
      token: tokens.refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })

  return tokens
}

// Logout user
export async function logoutUser(refreshToken: string): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: { token: refreshToken },
  })
}

// Clean expired refresh tokens
export async function cleanExpiredTokens(): Promise<void> {
  await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  })
}
