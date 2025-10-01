'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layout, 
  Image, 
  Type, 
  Video, 
  List, 
  Quote, 
  Square as ButtonIcon,
  Plus,
  Grip,
  Eye,
  Save,
  Undo,
  Redo
} from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'list' | 'quote' | 'spacer';
  content: any;
  position: number;
  styles?: any;
}

interface VisualContentBuilderProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
}

const BLOCK_TYPES = [
  { type: 'text', icon: Type, label: 'Text Block', description: 'Add paragraphs, headings, and formatted text' },
  { type: 'image', icon: Image, label: 'Image', description: 'Add photos, illustrations, and graphics' },
  { type: 'video', icon: Video, label: 'Video', description: 'Embed videos and media content' },
  { type: 'button', icon: ButtonIcon, label: 'Button', description: 'Create call-to-action buttons' },
  { type: 'list', icon: List, label: 'List', description: 'Create bulleted or numbered lists' },
  { type: 'quote', icon: Quote, label: 'Quote', description: 'Add testimonials and quotes' },
  { type: 'spacer', icon: Layout, label: 'Spacer', description: 'Add space between sections' }
];

export default function VisualContentBuilder({ content, onUpdate, sectionName }: VisualContentBuilderProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(content?.blocks || []);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);

  const addBlock = useCallback((type: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}`,
      type: type as any,
      content: getDefaultContent(type),
      position: blocks.length,
      styles: getDefaultStyles(type)
    };
    
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
  }, [blocks, content, onUpdate]);

  const updateBlock = useCallback((blockId: string, updates: Partial<ContentBlock>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );
    setBlocks(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
  }, [blocks, content, onUpdate]);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    
    // Update positions
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      position: index
    }));
    
    setBlocks(reorderedBlocks);
    onUpdate({ ...content, blocks: reorderedBlocks });
  }, [blocks, content, onUpdate]);

  const deleteBlock = useCallback((blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
    setSelectedBlock(null);
  }, [blocks, content, onUpdate]);

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text': return { text: 'Your text here...', heading: 'Heading' };
      case 'image': return { src: '', alt: '', caption: '' };
      case 'video': return { src: '', title: '', description: '' };
      case 'button': return { text: 'Click Here', link: '', style: 'primary' };
      case 'list': return { items: ['Item 1', 'Item 2'], type: 'bullet' };
      case 'quote': return { text: 'Your quote here...', author: 'Author Name' };
      case 'spacer': return { height: 20 };
      default: return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'text': return { fontSize: '16px', color: '#000000', textAlign: 'left' };
      case 'image': return { width: '100%', borderRadius: '8px' };
      case 'button': return { backgroundColor: '#007bff', color: '#ffffff', padding: '12px 24px' };
      default: return {};
    }
  };

  const renderBlock = (block: ContentBlock) => {
    const Icon = BLOCK_TYPES.find(b => b.type === block.type)?.icon || Layout;
    
    return (
      <Card 
        key={block.id}
        className={`cursor-pointer transition-all ${
          selectedBlock === block.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
        }`}
        onClick={() => setSelectedBlock(block.id)}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="w-4 h-4" />
              <span className="font-medium capitalize">{block.type} Block</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBlock(block.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {renderBlockContent(block)}
        </CardContent>
      </Card>
    );
  };

  const renderBlockContent = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div>
            <h3 className="font-semibold mb-2">{block.content.heading}</h3>
            <p className="text-gray-600">{block.content.text}</p>
          </div>
        );
      case 'image':
        return (
          <div className="text-center">
            {block.content.src ? (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">Image: {block.content.alt || 'No alt text'}</span>
              </div>
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            {block.content.caption && (
              <p className="text-sm text-gray-500 mt-2">{block.content.caption}</p>
            )}
          </div>
        );
      case 'button':
        return (
          <Button 
            style={block.styles}
            className="w-full"
          >
            {block.content.text}
          </Button>
        );
      case 'list':
        return (
          <ul className="list-disc list-inside">
            {block.content.items.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            <p>"{block.content.text}"</p>
            <cite className="text-sm text-gray-500">— {block.content.author}</cite>
          </blockquote>
        );
      case 'spacer':
        return (
          <div className="text-center text-gray-400">
            <div className="border-t-2 border-dashed border-gray-300 py-2">
              Spacer ({block.content.height}px)
            </div>
          </div>
        );
      default:
        return <div>Unknown block type</div>;
    }
  };

  const renderBlockEditor = (block: ContentBlock) => {
    if (selectedBlock !== block.id) return null;

    return (
      <Card className="mt-4 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">Edit {block.type} Block</CardTitle>
        </CardHeader>
        <CardContent>
          {renderBlockEditorForm(block)}
        </CardContent>
      </Card>
    );
  };

  const renderBlockEditorForm = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Heading</label>
              <input
                type="text"
                value={block.content.heading}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, heading: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text</label>
              <textarea
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded h-24"
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                value={block.content.src}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, src: e.target.value }
                })}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={block.content.alt}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, alt: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <input
                type="text"
                value={block.content.caption}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, caption: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <input
                type="url"
                value={block.content.link}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, link: e.target.value }
                })}
                className="w-full p-2 border rounded"
                placeholder="https://example.com"
              />
            </div>
          </div>
        );
      case 'list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">List Items</label>
              {block.content.items.map((item: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...block.content.items];
                    newItems[index] = e.target.value;
                    updateBlock(block.id, {
                      content: { ...block.content, items: newItems }
                    });
                  }}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newItems = [...block.content.items, 'New item'];
                  updateBlock(block.id, {
                    content: { ...block.content, items: newItems }
                  });
                }}
                className="mt-2"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>
          </div>
        );
      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Quote Text</label>
              <textarea
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full p-2 border rounded h-20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Author</label>
              <input
                type="text"
                value={block.content.author}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, author: e.target.value }
                })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        );
      case 'spacer':
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Spacer Height (px)</label>
            <input
              type="number"
              value={block.content.height}
              onChange={(e) => updateBlock(block.id, {
                content: { ...block.content, height: parseInt(e.target.value) || 20 }
              })}
              className="w-full p-2 border rounded"
              min="10"
              max="200"
            />
          </div>
        );
      default:
        return <div>No editor available for this block type</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Visual Content Builder</h3>
          <p className="text-sm text-gray-600">Drag and drop to build your content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {/* Block Types */}
      {!isPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add Content Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {BLOCK_TYPES.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <Button
                    key={blockType.type}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => addBlock(blockType.type)}
                  >
                    <Icon className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium text-sm">{blockType.label}</div>
                      <div className="text-xs text-gray-500">{blockType.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Blocks */}
      <div className="space-y-4">
        {blocks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content blocks yet</h3>
              <p className="text-gray-600 mb-4">Start building your content by adding blocks above</p>
            </CardContent>
          </Card>
        ) : (
          blocks.map((block, index) => (
            <div key={block.id}>
              {renderBlock(block)}
              {renderBlockEditor(block)}
            </div>
          ))
        )}
      </div>

      {/* Preview Mode */}
      {isPreview && (
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white">
              {blocks.map((block) => (
                <div key={block.id} className="mb-4">
                  {renderBlockContent(block)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
