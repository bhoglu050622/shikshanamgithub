import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileJson, Pencil } from 'lucide-react';

async function getContentFiles() {
  const dataDirectory = path.join(process.cwd(), 'data');
  try {
    const files = await fs.readdir(dataDirectory);
    // Filter for files that follow the pattern *-content.json
    return files.filter(file => file.endsWith('-content.json'));
  } catch (error) {
    console.error('Failed to read data directory:', error);
    return [];
  }
}

function formatContentName(filename: string) {
  return filename
    .replace('-content.json', '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default async function CMSDashboardPage() {
  const contentFiles = await getContentFiles();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Management Dashboard</h1>
          <p className="text-gray-600 mt-2">Select a content file to edit.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentFiles.map(file => (
            <Card key={file}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <FileJson className="w-5 h-5 mr-2 text-blue-500" />
                      {formatContentName(file)}
                    </CardTitle>
                    <CardDescription className="mt-1">{`/${formatContentName(file).toLowerCase().replace(/ /g, '-')}`}</CardDescription>
                  </div>
                  <Link href={`/cms/editor?file=${file}`} passHref>
                    <Button variant="outline" size="sm">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">File path: <code className="bg-gray-100 p-1 rounded text-xs">data/{file}</code></p>
                {/* Git status will be added here in a future phase */}
              </CardContent>
            </Card>
          ))}

          {contentFiles.length === 0 && (
            <p className="text-gray-500">No content files found in the /data directory.</p>
          )}
        </div>
      </div>
    </div>
  );
}