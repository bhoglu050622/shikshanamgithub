import { promises as fs } from 'fs';
import path from 'path';

// GitHub API configuration
const GITHUB_OWNER = 'bhoglu050622';
const GITHUB_REPO = 'shikshanamgithub';
const GITHUB_BRANCH = 'main';

interface GitHubFileResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content: string;
  encoding: string;
}

/**
 * Fetch content from GitHub repository
 * This ensures the live site always gets the latest content from GitHub
 */
export async function fetchContentFromGitHub(fileName: string): Promise<any> {
  try {
    const filePath = `data/${fileName}`;
    const githubUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    
    console.log(`Fetching content from GitHub: ${filePath}`);
    
    const response = await fetch(githubUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Shikshanam-CMS',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`File not found in GitHub: ${fileName}`);
        return null;
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const fileData: GitHubFileResponse = await response.json();
    
    // Decode base64 content
    const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
    const parsedContent = JSON.parse(content);
    
    console.log(`Successfully fetched ${fileName} from GitHub`);
    return parsedContent;
    
  } catch (error) {
    console.error(`Error fetching ${fileName} from GitHub:`, error);
    return null;
  }
}

/**
 * Get content with fallback strategy:
 * 1. Try GitHub first (for production)
 * 2. Fall back to local files (for development)
 */
export async function getContentWithFallback(fileName: string): Promise<any> {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // In production, try GitHub first
    const githubContent = await fetchContentFromGitHub(fileName);
    if (githubContent) {
      return githubContent;
    }
    
    // If GitHub fails, fall back to local
    console.log(`GitHub fetch failed for ${fileName}, falling back to local file`);
  }
  
  // Fallback to local file
  try {
    const filePath = path.join(process.cwd(), 'data', fileName);
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read local file ${fileName}:`, error);
    return null;
  }
}

/**
 * Cache content for a short period to avoid excessive GitHub API calls
 */
const contentCache = new Map<string, { content: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getCachedContent(fileName: string): Promise<any> {
  const now = Date.now();
  const cached = contentCache.get(fileName);
  
  // Return cached content if it's still fresh
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    console.log(`Returning cached content for ${fileName}`);
    return cached.content;
  }
  
  // Fetch fresh content
  const content = await getContentWithFallback(fileName);
  
  if (content) {
    // Cache the content
    contentCache.set(fileName, { content, timestamp: now });
    console.log(`Cached fresh content for ${fileName}`);
  }
  
  return content;
}

/**
 * Clear cache for a specific file (useful after updates)
 */
export function clearContentCache(fileName?: string): void {
  if (fileName) {
    contentCache.delete(fileName);
    console.log(`Cleared cache for ${fileName}`);
  } else {
    contentCache.clear();
    console.log('Cleared all content cache');
  }
}
