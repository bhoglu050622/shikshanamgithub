import { NextRequest, NextResponse } from 'next/server';
import { createGitHubTracker, createChangeRecord, ChangeRecord } from '@/lib/github/changes-tracker';

/**
 * API endpoint to save CMS changes to GitHub
 * POST /api/cms/github-changes
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, contentId, action, changes, editor, metadata } = body;

    // Validate required fields
    if (!contentType || !contentId || !action || !changes || !editor) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: contentType, contentId, action, changes, editor'
      }, { status: 400 });
    }

    // Create change record
    const changeRecord = createChangeRecord(
      contentType,
      contentId,
      action,
      changes,
      editor,
      metadata
    );

    // Initialize GitHub tracker
    const tracker = createGitHubTracker();

    // Save to GitHub
    const result = await tracker.saveChange(changeRecord);

    if (result.success) {
      return NextResponse.json({
        success: true,
        changeId: changeRecord.id,
        commitHash: result.commitHash,
        message: 'Change saved to GitHub successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to save change to GitHub'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('GitHub changes API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Get changes for a specific content item
 * GET /api/cms/github-changes?contentType=course&contentId=samkhya-darshan
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType');
    const contentId = searchParams.get('contentId');
    const limit = parseInt(searchParams.get('limit') || '10');

    const tracker = createGitHubTracker();

    if (contentType && contentId) {
      // Get changes for specific content
      const changes = await tracker.getChangesForContent(contentType, contentId);
      return NextResponse.json({
        success: true,
        changes
      });
    } else {
      // Get recent changes
      const changes = await tracker.getRecentChanges(limit);
      return NextResponse.json({
        success: true,
        changes
      });
    }
  } catch (error) {
    console.error('GitHub changes GET API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
