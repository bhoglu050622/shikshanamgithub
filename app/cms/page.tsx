import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileJson, Pencil, HelpCircle, BookOpen, Save, Upload, Eye, AlertCircle, CheckCircle, Info } from 'lucide-react';
import HelpPanel from './HelpPanel';

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management Dashboard</h1>
              <p className="text-gray-600 mt-2">Select a content file to edit.</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                System Ready
              </div>
            </div>
          </div>
        </header>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8 border border-blue-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Quick Start Guide</h2>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-gray-700">Click "Edit" on any content file below</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-gray-700">Modify the JSON content in the editor</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-700">Click "Save & Publish" to save changes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-gray-700">Visit your website to see changes live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentFiles.map(file => (
            <Card key={file} className="hover:shadow-lg transition-shadow duration-200">
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
                    <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">File path: <code className="bg-gray-100 p-1 rounded text-xs">data/{file}</code></p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Ready to edit</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {contentFiles.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="bg-gray-100 rounded-lg p-8">
                <FileJson className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No content files found in the /data directory.</p>
                <p className="text-gray-400 text-sm mt-2">Add JSON files to the data folder to get started.</p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
            Need More Help?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Saving Changes
              </h4>
              <p className="text-blue-800 text-sm">
                Use "Save & Publish" to immediately make changes live on your website.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview Changes
              </h4>
              <p className="text-green-800 text-sm">
                After saving, visit the corresponding page on your website to see changes.
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                JSON Format
              </h4>
              <p className="text-yellow-800 text-sm">
                Ensure your JSON is valid before saving. Use a JSON validator if needed.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Help Panel */}
      <HelpPanel />
    </div>
  );
}