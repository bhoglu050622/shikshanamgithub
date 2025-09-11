/**
 * CMS Lessons API Tests
 * Tests the lessons API endpoints for CRUD operations
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

// Mock fetch
global.fetch = jest.fn();

// Mock Next.js request
const createMockRequest = (options: Partial<Request> = {}): Request => {
  return {
    url: 'http://localhost:3000/api/cms/lessons',
    method: 'GET',
    headers: new Headers(),
    ...options,
  } as Request;
};

describe('CMS Lessons API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /api/cms/lessons', () => {
    it('should successfully fetch lessons list', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          data: [
            {
              id: 'lesson123',
              title: 'Test Lesson',
              slug: 'test-lesson',
              content: 'This is a test lesson content.',
              order: 1,
              courseId: 'course123',
              status: 'DRAFT',
              createdAt: '2025-09-11T15:16:31.670Z',
              updatedAt: '2025-09-11T15:16:31.670Z',
              createdById: 'user123',
              creator: {
                id: 'user123',
                username: 'testuser',
                role: 'ADMIN'
              },
              course: {
                id: 'course123',
                title: 'Test Course',
                slug: 'test-course'
              }
            }
          ],
          pagination: {
            page: 1,
            limit: 10,
            total: 1,
            pages: 1
          }
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.data).toHaveLength(1);
      expect(data.data[0].title).toBe('Test Lesson');
      expect(data.pagination.total).toBe(1);
    });

    it('should handle empty lessons list', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          data: [],
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            pages: 0
          }
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.data).toHaveLength(0);
      expect(data.pagination.total).toBe(0);
    });

    it('should fail without authentication', async () => {
      const mockResponse = {
        ok: false,
        status: 401,
        json: async () => ({
          error: 'Authentication required',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(401);
      expect(data.error).toBe('Authentication required');
    });
  });

  describe('POST /api/cms/lessons', () => {
    it('should successfully create a new lesson', async () => {
      const mockResponse = {
        ok: true,
        status: 201,
        json: async () => ({
          id: 'lesson123',
          title: 'New Test Lesson',
          slug: 'new-test-lesson',
          content: 'This is a new test lesson content.',
          order: 1,
          courseId: 'course123',
          status: 'DRAFT',
          createdAt: '2025-09-11T15:16:31.670Z',
          updatedAt: '2025-09-11T15:16:31.670Z',
          createdById: 'user123',
          creator: {
            id: 'user123',
            username: 'testuser',
            role: 'ADMIN'
          },
          course: {
            id: 'course123',
            title: 'Test Course',
            slug: 'test-course'
          }
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Test Lesson',
          slug: 'new-test-lesson',
          content: 'This is a new test lesson content.',
          courseId: 'course123',
          order: 1
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(response.status).toBe(201);
      expect(data.title).toBe('New Test Lesson');
      expect(data.slug).toBe('new-test-lesson');
      expect(data.courseId).toBe('course123');
    });

    it('should fail to create lesson with missing required fields', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        json: async () => ({
          error: 'Validation failed',
          details: ['Title is required', 'Slug is required', 'Course ID is required']
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: 'This is a lesson without required fields.'
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
    });
  });

  describe('GET /api/cms/lessons/[id]', () => {
    it('should successfully fetch a single lesson', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          lesson: {
            id: 'lesson123',
            title: 'Test Lesson',
            slug: 'test-lesson',
            content: 'This is a test lesson content.',
            order: 1,
            courseId: 'course123',
            status: 'DRAFT',
            createdAt: '2025-09-11T15:16:31.670Z',
            updatedAt: '2025-09-11T15:16:31.670Z',
            createdById: 'user123',
            creator: {
              id: 'user123',
              username: 'testuser',
              role: 'ADMIN'
            },
            course: {
              id: 'course123',
              title: 'Test Course',
              slug: 'test-course'
            }
          },
          revisions: [
            {
              id: 'revision123',
              contentType: 'LESSON',
              contentId: 'lesson123',
              version: 1,
              status: 'DRAFT',
              createdAt: '2025-09-11T15:16:31.682Z',
              createdById: 'user123'
            }
          ]
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons/lesson123', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.lesson.title).toBe('Test Lesson');
      expect(data.revisions).toHaveLength(1);
      expect(data.revisions[0].version).toBe(1);
    });

    it('should return 404 for non-existent lesson', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: async () => ({
          error: 'Lesson not found',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons/nonexistent', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
      expect(data.error).toBe('Lesson not found');
    });
  });

  describe('PUT /api/cms/lessons/[id]', () => {
    it('should successfully update a lesson', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'lesson123',
          title: 'Updated Test Lesson',
          slug: 'test-lesson',
          content: 'This is updated test lesson content.',
          order: 1,
          courseId: 'course123',
          status: 'DRAFT',
          createdAt: '2025-09-11T15:16:31.670Z',
          updatedAt: '2025-09-11T15:17:00.000Z',
          createdById: 'user123',
          creator: {
            id: 'user123',
            username: 'testuser',
            role: 'ADMIN'
          },
          course: {
            id: 'course123',
            title: 'Test Course',
            slug: 'test-course'
          }
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons/lesson123', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'lesson123',
          title: 'Updated Test Lesson',
          content: 'This is updated test lesson content.'
        }),
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.title).toBe('Updated Test Lesson');
      expect(data.content).toBe('This is updated test lesson content.');
    });
  });

  describe('DELETE /api/cms/lessons/[id]', () => {
    it('should successfully delete a lesson', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons/lesson123', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.success).toBe(true);
    });

    it('should return 404 when trying to delete non-existent lesson', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        json: async () => ({
          error: 'Lesson not found',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons/nonexistent', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
      expect(data.error).toBe('Lesson not found');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(
        fetch('/api/cms/lessons', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer test-token',
            'Content-Type': 'application/json',
          },
        })
      ).rejects.toThrow('Network error');
    });

    it('should handle server errors gracefully', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        json: async () => ({
          error: 'Internal server error',
        }),
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const response = await fetch('/api/cms/lessons', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });
  });
});
