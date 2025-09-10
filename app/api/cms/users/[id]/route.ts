import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, AuthError } from '@/cms/lib/auth'
import { prisma } from '@/cms/lib/prisma'
import { AuditLogger, AUDIT_ACTIONS, AUDIT_RESOURCES } from '@/cms/lib/audit'
import { UserRole } from '@/cms/lib/generated/prisma'
import { hashPassword } from '@/cms/lib/auth'

interface RouteParams {
  params: { id: string }
}

// GET /api/cms/users/[id] - Get specific user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    const userData = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            createdCourses: true,
            createdBlogPosts: true,
            createdPackages: true,
          }
        }
      }
    })

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(userData)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Get user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/cms/users/[id] - Update user
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params
    const body = await request.json()

    const { username, email, firstName, lastName, role, isActive, password } = body

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check for duplicate username/email
    if (username || email) {
      const duplicateUser = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: id } },
            {
              OR: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
              ]
            }
          ]
        }
      })

      if (duplicateUser) {
        return NextResponse.json(
          { error: 'User with this username or email already exists' },
          { status: 409 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (username !== undefined) updateData.username = username
    if (email !== undefined) updateData.email = email
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (role !== undefined) updateData.role = role as UserRole
    if (isActive !== undefined) updateData.isActive = isActive
    if (password) updateData.password = await hashPassword(password)

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
        updatedAt: true,
      }
    })

    // Log user update
    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.UPDATE,
      AUDIT_RESOURCES.USER,
      id,
      { 
        updatedFields: Object.keys(updateData),
        previousRole: existingUser.role,
        newRole: updatedUser.role
      },
      request
    )

    return NextResponse.json(updatedUser)
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Update user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/cms/users/[id] - Delete user
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireAuth(UserRole.ADMIN)(request)
    const { id } = params

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent deleting self
    if (user.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete user
    await prisma.user.delete({
      where: { id }
    })

    // Log user deletion
    await AuditLogger.logUserAction(
      user,
      AUDIT_ACTIONS.DELETE,
      AUDIT_RESOURCES.USER,
      id,
      { deletedUser: existingUser.username },
      request
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode })
    }
    console.error('Delete user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
