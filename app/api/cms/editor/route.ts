import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Helper to ensure we are only accessing files within the /data directory
function getSafeFilePath(fileName: string): string | null {
  const dataDirectory = path.join(process.cwd(), 'data');
  const requestedPath = path.join(dataDirectory, fileName);

  // Normalize paths to prevent directory traversal attacks (e.g., ../../)
  const normalizedDataDir = path.normalize(dataDirectory);
  const normalizedRequestedPath = path.normalize(requestedPath);

  if (normalizedRequestedPath.startsWith(normalizedDataDir) && fileName.endsWith('-content.json')) {
    return requestedPath;
  }

  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('file');

  if (!fileName) {
    return NextResponse.json({ success: false, error: 'File name is required.' }, { status: 400 });
  }

  const filePath = getSafeFilePath(fileName);
  if (!filePath) {
    return NextResponse.json({ success: false, error: 'Invalid or unauthorized file path.' }, { status: 403 });
  }

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    return NextResponse.json({ success: true, content: JSON.parse(fileContent) });
  } catch (error) {
    console.error(`Failed to read file ${fileName}:`, error);
    return NextResponse.json({ success: false, error: `File not found or could not be read: ${fileName}` }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { file: fileName, content } = body;

    if (!fileName || !content) {
      return NextResponse.json({ success: false, error: 'File name and content are required.' }, { status: 400 });
    }

    const filePath = getSafeFilePath(fileName);
    if (!filePath) {
      return NextResponse.json({ success: false, error: 'Invalid or unauthorized file path.' }, { status: 403 });
    }

    await fs.writeFile(filePath, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true, message: 'Content saved successfully.' });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ success: false, error: 'Failed to save content.' }, { status: 500 });
  }
}