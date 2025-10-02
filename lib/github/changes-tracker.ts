/**
 * GitHub Changes Tracker
 * Automatically saves CMS edits as GitHub commits
 */

export interface ChangeRecord {
  id: string;
  timestamp: string;
  contentType: 'course' | 'package' | 'page' | 'content';
  contentId: string;
  action: 'create' | 'update' | 'delete';
  changes: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
  editor: {
    name: string;
    email: string;
    userId?: string;
  };
  metadata: {
    userAgent?: string;
    ipAddress?: string;
    sessionId?: string;
  };
}

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  changesFolder: string;
}

export class GitHubChangesTracker {
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  /**
   * Save a change record to GitHub
   */
  async saveChange(change: ChangeRecord): Promise<{ success: boolean; commitHash?: string; error?: string }> {
    try {
      // Only run in production (Vercel)
      if (process.env.NODE_ENV !== 'production') {
        console.log('GitHub changes tracking disabled in development mode');
        return { success: true };
      }

      const filename = this.generateFilename(change);
      const fileContent = this.generateFileContent(change);
      const filePath = `${this.config.changesFolder}/${filename}`;

      // Create or update file in GitHub
      const result = await this.createOrUpdateFile(filePath, fileContent, change);

      return result;
    } catch (error) {
      console.error('Failed to save change to GitHub:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Generate filename for change record
   */
  private generateFilename(change: ChangeRecord): string {
    const timestamp = new Date(change.timestamp).toISOString().replace(/[:.]/g, '-');
    return `${timestamp}_${change.contentType}_${change.contentId}_${change.action}.json`;
  }

  /**
   * Generate file content for change record
   */
  private generateFileContent(change: ChangeRecord): string {
    return JSON.stringify(change, null, 2);
  }

  /**
   * Create or update file in GitHub repository
   */
  private async createOrUpdateFile(
    filePath: string, 
    content: string, 
    change: ChangeRecord
  ): Promise<{ success: boolean; commitHash?: string; error?: string }> {
    try {
      const apiUrl = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
      
      // Check if file exists
      const existingFile = await this.getFileSha(filePath);
      
      const body = {
        message: `CMS Change: ${change.action} ${change.contentType} ${change.contentId} by ${change.editor.name}`,
        content: Buffer.from(content).toString('base64'),
        branch: this.config.branch,
        committer: {
          name: change.editor.name,
          email: change.editor.email
        },
        author: {
          name: change.editor.name,
          email: change.editor.email
        }
      };

      // Add SHA if file exists (for updates)
      if (existingFile.sha) {
        (body as any).sha = existingFile.sha;
      }

      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`GitHub API error: ${response.status} - ${errorData.message || 'Unknown error'}`);
      }

      const result = await response.json();
      return { 
        success: true, 
        commitHash: result.commit.sha 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get file SHA if it exists
   */
  private async getFileSha(filePath: string): Promise<{ sha?: string; exists: boolean }> {
    try {
      const apiUrl = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `token ${this.config.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (response.status === 404) {
        return { exists: false };
      }

      if (!response.ok) {
        throw new Error(`Failed to check file existence: ${response.status}`);
      }

      const data = await response.json();
      return { sha: data.sha, exists: true };
    } catch (error) {
      console.error('Error checking file existence:', error);
      return { exists: false };
    }
  }

  /**
   * Get all changes for a specific content item
   */
  async getChangesForContent(contentType: string, contentId: string): Promise<ChangeRecord[]> {
    try {
      // This would require listing files in the changes folder
      // For now, return empty array - can be implemented later
      return [];
    } catch (error) {
      console.error('Error fetching changes:', error);
      return [];
    }
  }

  /**
   * Get recent changes
   */
  async getRecentChanges(limit: number = 10): Promise<ChangeRecord[]> {
    try {
      // This would require listing files in the changes folder
      // For now, return empty array - can be implemented later
      return [];
    } catch (error) {
      console.error('Error fetching recent changes:', error);
      return [];
    }
  }
}

/**
 * Create a change record from CMS edit data
 */
export function createChangeRecord(
  contentType: ChangeRecord['contentType'],
  contentId: string,
  action: ChangeRecord['action'],
  changes: ChangeRecord['changes'],
  editor: ChangeRecord['editor'],
  metadata: ChangeRecord['metadata'] = {}
): ChangeRecord {
  return {
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    contentType,
    contentId,
    action,
    changes,
    editor,
    metadata
  };
}

/**
 * Get default GitHub configuration from environment variables
 */
export function getDefaultGitHubConfig(): GitHubConfig {
  return {
    owner: process.env.GITHUB_OWNER || 'bhoglu050622',
    repo: process.env.GITHUB_REPO || 'shikshanam_final',
    branch: process.env.GITHUB_BRANCH || 'main',
    token: process.env.GITHUB_TOKEN || '',
    changesFolder: process.env.GITHUB_CHANGES_FOLDER || 'changes'
  };
}

/**
 * Initialize GitHub changes tracker
 */
export function createGitHubTracker(): GitHubChangesTracker {
  const config = getDefaultGitHubConfig();
  
  if (!config.token) {
    console.warn('GitHub token not configured. Changes tracking will be disabled.');
  }
  
  return new GitHubChangesTracker(config);
}
