'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Redo,
  Move,
  Copy,
  Trash2,
  Settings,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Code,
  Sparkles,
  Wand2,
  Zap,
  Target,
  BarChart3,
  Users,
  Heart,
  Star,
  Globe,
  Shield,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  Info,
  Clock,
  TrendingUp,
  DollarSign,
  MessageSquare,
  FileText,
  Package,
  GraduationCap,
  BookOpen,
  Brain,
  ArrowRight,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'list' | 'quote' | 'spacer' | 'hero' | 'testimonial' | 'card' | 'stats' | 'pricing' | 'faq' | 'contact' | 'gallery' | 'timeline';
  content: any;
  position: number;
  styles?: any;
  settings?: any;
}

interface EnhancedVisualEditorProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
}

const BLOCK_TYPES = [
  // Basic Content
  { type: 'text', icon: Type, label: 'Text', description: 'Rich text content', category: 'content', color: 'bg-blue-500' },
  { type: 'image', icon: Image, label: 'Image', description: 'Photos and graphics', category: 'content', color: 'bg-green-500' },
  { type: 'video', icon: Video, label: 'Video', description: 'Embedded videos', category: 'content', color: 'bg-purple-500' },
  { type: 'button', icon: ButtonIcon, label: 'Button', description: 'Call-to-action', category: 'content', color: 'bg-orange-500' },
  { type: 'list', icon: List, label: 'List', description: 'Bulleted lists', category: 'content', color: 'bg-pink-500' },
  { type: 'quote', icon: Quote, label: 'Quote', description: 'Testimonials', category: 'content', color: 'bg-indigo-500' },
  
  // Layout
  { type: 'spacer', icon: Layout, label: 'Spacer', description: 'Add spacing', category: 'layout', color: 'bg-gray-500' },
  { type: 'card', icon: FileText, label: 'Card', description: 'Content cards', category: 'layout', color: 'bg-teal-500' },
  
  // Sections
  { type: 'hero', icon: Target, label: 'Hero', description: 'Hero sections', category: 'sections', color: 'bg-red-500' },
  { type: 'testimonial', icon: MessageSquare, label: 'Testimonial', description: 'User reviews', category: 'sections', color: 'bg-yellow-500' },
  { type: 'stats', icon: BarChart3, label: 'Stats', description: 'Statistics', category: 'sections', color: 'bg-cyan-500' },
  { type: 'pricing', icon: DollarSign, label: 'Pricing', description: 'Price tables', category: 'sections', color: 'bg-emerald-500' },
  { type: 'faq', icon: HelpCircle, label: 'FAQ', description: 'Frequently asked', category: 'sections', color: 'bg-rose-500' },
  { type: 'contact', icon: Users, label: 'Contact', description: 'Contact forms', category: 'sections', color: 'bg-violet-500' },
  { type: 'gallery', icon: Image, label: 'Gallery', description: 'Image galleries', category: 'sections', color: 'bg-amber-500' },
  { type: 'timeline', icon: Clock, label: 'Timeline', description: 'Event timelines', category: 'sections', color: 'bg-sky-500' }
];

export default function EnhancedVisualEditor({ content, onUpdate, sectionName }: EnhancedVisualEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(content?.blocks || []);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [history, setHistory] = useState<ContentBlock[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const addToHistory = useCallback((newBlocks: ContentBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newBlocks]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
      onUpdate({ ...content, blocks: history[newIndex] });
    }
  }, [history, historyIndex, content, onUpdate]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
      onUpdate({ ...content, blocks: history[newIndex] });
    }
  }, [history, historyIndex, content, onUpdate]);

  const addBlock = useCallback((type: string) => {
    const newBlock: ContentBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: type as any,
      content: getDefaultContent(type),
      position: blocks.length,
      styles: getDefaultStyles(type),
      settings: getDefaultSettings(type)
    };
    
    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    addToHistory(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
  }, [blocks, content, onUpdate, addToHistory]);

  const updateBlock = useCallback((blockId: string, updates: Partial<ContentBlock>) => {
    const updatedBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );
    setBlocks(updatedBlocks);
    addToHistory(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
  }, [blocks, content, onUpdate, addToHistory]);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    
    const reorderedBlocks = updatedBlocks.map((block, index) => ({
      ...block,
      position: index
    }));
    
    setBlocks(reorderedBlocks);
    addToHistory(reorderedBlocks);
    onUpdate({ ...content, blocks: reorderedBlocks });
  }, [blocks, content, onUpdate, addToHistory]);

  const deleteBlock = useCallback((blockId: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId);
    setBlocks(updatedBlocks);
    addToHistory(updatedBlocks);
    onUpdate({ ...content, blocks: updatedBlocks });
    setSelectedBlock(null);
  }, [blocks, content, onUpdate, addToHistory]);

  const duplicateBlock = useCallback((blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
      const newBlock: ContentBlock = {
        ...block,
        id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position: block.position + 1
      };
      
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(block.position + 1, 0, newBlock);
      
      const reorderedBlocks = updatedBlocks.map((b, index) => ({
        ...b,
        position: index
      }));
      
      setBlocks(reorderedBlocks);
      addToHistory(reorderedBlocks);
      onUpdate({ ...content, blocks: reorderedBlocks });
    }
  }, [blocks, content, onUpdate, addToHistory]);

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text': return { 
        heading: 'Your Heading Here', 
        text: 'Your text content goes here. You can format it with bold, italic, and other styles.',
        alignment: 'left'
      };
      case 'image': return { 
        src: '', 
        alt: 'Image description', 
        caption: '',
        width: '100%',
        height: 'auto'
      };
      case 'video': return { 
        src: '', 
        title: 'Video Title', 
        description: 'Video description',
        autoplay: false,
        controls: true
      };
      case 'button': return { 
        text: 'Click Here', 
        link: '#', 
        style: 'primary',
        size: 'medium'
      };
      case 'list': return { 
        items: ['First item', 'Second item', 'Third item'], 
        type: 'bullet',
        ordered: false
      };
      case 'quote': return { 
        text: 'This is an inspiring quote that will motivate your audience.', 
        author: 'Author Name',
        title: 'Author Title'
      };
      case 'spacer': return { 
        height: 40,
        background: 'transparent'
      };
      case 'hero': return {
        title: 'Welcome to Our Platform',
        subtitle: 'Discover amazing features',
        description: 'This is where you can describe your main value proposition.',
        ctaText: 'Get Started',
        ctaLink: '#',
        backgroundImage: '',
        overlay: true
      };
      case 'testimonial': return {
        text: 'This product has changed my life completely!',
        author: 'John Doe',
        title: 'Customer',
        avatar: '',
        rating: 5
      };
      case 'stats': return {
        items: [
          { label: 'Users', value: '10K+', icon: 'Users' },
          { label: 'Downloads', value: '50K+', icon: 'Download' },
          { label: 'Rating', value: '4.9', icon: 'Star' }
        ]
      };
      case 'pricing': return {
        title: 'Choose Your Plan',
        plans: [
          { name: 'Basic', price: '$9', features: ['Feature 1', 'Feature 2'], popular: false },
          { name: 'Pro', price: '$29', features: ['All Basic', 'Feature 3', 'Feature 4'], popular: true },
          { name: 'Enterprise', price: '$99', features: ['All Pro', 'Feature 5', 'Feature 6'], popular: false }
        ]
      };
      case 'faq': return {
        title: 'Frequently Asked Questions',
        items: [
          { question: 'What is this service?', answer: 'This is a comprehensive solution...' },
          { question: 'How much does it cost?', answer: 'Our pricing is very competitive...' }
        ]
      };
      case 'contact': return {
        title: 'Get in Touch',
        description: 'We would love to hear from you',
        fields: ['name', 'email', 'message'],
        submitText: 'Send Message'
      };
      case 'gallery': return {
        title: 'Our Gallery',
        images: [],
        columns: 3,
        spacing: 'medium'
      };
      case 'timeline': return {
        title: 'Our Journey',
        items: [
          { date: '2020', title: 'Founded', description: 'Company was established' },
          { date: '2021', title: 'Growth', description: 'First major milestone' },
          { date: '2022', title: 'Expansion', description: 'International presence' }
        ]
      };
      default: return {};
    }
  };

  const getDefaultStyles = (type: string) => {
    switch (type) {
      case 'text': return { 
        fontSize: '16px', 
        color: '#374151', 
        textAlign: 'left',
        fontWeight: 'normal',
        lineHeight: '1.6'
      };
      case 'image': return { 
        width: '100%', 
        borderRadius: '8px',
        objectFit: 'cover',
        shadow: 'none'
      };
      case 'button': return { 
        backgroundColor: '#3b82f6', 
        color: '#ffffff', 
        padding: '12px 24px',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'medium'
      };
      case 'hero': return {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        textAlign: 'center',
        padding: '80px 20px'
      };
      case 'card': return {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      };
      default: return {};
    }
  };

  const getDefaultSettings = (type: string) => {
    return {
      responsive: true,
      animation: 'none',
      visibility: 'visible',
      accessibility: true
    };
  };

  const renderBlock = (block: ContentBlock, index: number) => {
    const blockType = BLOCK_TYPES.find(b => b.type === block.type);
    const Icon = blockType?.icon || Layout;
    
    return (
      <Card 
        key={block.id}
        className={`cursor-pointer transition-all duration-200 group ${
          selectedBlock === block.id 
            ? 'ring-2 ring-blue-500 shadow-xl scale-[1.02]' 
            : 'hover:shadow-lg hover:scale-[1.01]'
        } ${dragOver === block.id ? 'ring-2 ring-green-500' : ''}`}
        onClick={() => setSelectedBlock(block.id)}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(block.id);
        }}
        onDragLeave={() => setDragOver(null)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(null);
          // Handle drop logic here
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg ${blockType?.color || 'bg-gray-500'} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-medium text-sm">{blockType?.label || block.type}</span>
                <div className="text-xs text-gray-500">{blockType?.description}</div>
              </div>
            </div>
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  duplicateBlock(block.id);
                }}
                className="h-8 w-8 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBlock(block.id);
                }}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
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
          <div className="space-y-2">
            <h3 className="font-semibold text-lg" style={{ textAlign: block.content.alignment }}>
              {block.content.heading}
            </h3>
            <p className="text-gray-600" style={{ textAlign: block.content.alignment }}>
              {block.content.text}
            </p>
          </div>
        );
      case 'image':
        return (
          <div className="text-center">
            {block.content.src ? (
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={block.content.src} 
                  alt={block.content.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              </div>
            )}
            {block.content.caption && (
              <p className="text-sm text-gray-500 mt-2">{block.content.caption}</p>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="text-center">
            <Button 
              style={block.styles}
              className="w-full"
            >
              {block.content.text}
            </Button>
          </div>
        );
      case 'hero':
        return (
          <div 
            className="rounded-lg p-6 text-center text-white"
            style={block.styles}
          >
            <h2 className="text-2xl font-bold mb-2">{block.content.title}</h2>
            <p className="text-lg mb-4">{block.content.subtitle}</p>
            <p className="mb-6">{block.content.description}</p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100">
              {block.content.ctaText}
            </Button>
          </div>
        );
      case 'testimonial':
        return (
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-2">
              {[...Array(block.content.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-gray-700 italic">
              "{block.content.text}"
            </blockquote>
            <div>
              <div className="font-medium">{block.content.author}</div>
              <div className="text-sm text-gray-500">{block.content.title}</div>
            </div>
          </div>
        );
      case 'stats':
        return (
          <div className="grid grid-cols-3 gap-4">
            {block.content.items.map((item: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{item.value}</div>
                <div className="text-sm text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>
        );
      case 'pricing':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">{block.content.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {block.content.plans.map((plan: any, index: number) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${plan.popular ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                  <div className="text-center">
                    <h4 className="font-semibold">{plan.name}</h4>
                    <div className="text-2xl font-bold">{plan.price}</div>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((feature: string, fIndex: number) => (
                        <li key={fIndex} className="text-sm flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{block.content.title}</h3>
            <div className="space-y-3">
              {block.content.items.map((item: any, index: number) => (
                <div key={index} className="border-b pb-2">
                  <div className="font-medium">{item.question}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{block.content.title}</h3>
            <p className="text-gray-600">{block.content.description}</p>
            <div className="space-y-3">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Textarea placeholder="Your Message" rows={3} />
              <Button className="w-full">{block.content.submitText}</Button>
            </div>
          </div>
        );
      case 'list':
        return (
          <div>
            {block.content.ordered ? (
              <ol className="list-decimal list-inside space-y-1">
                {block.content.items.map((item: string, index: number) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ol>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {block.content.items.map((item: string, index: number) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            <p className="text-gray-700">"{block.content.text}"</p>
            <cite className="text-sm text-gray-500 block mt-2">
              — {block.content.author}
              {block.content.title && <span>, {block.content.title}</span>}
            </cite>
          </blockquote>
        );
      case 'spacer':
        return (
          <div className="text-center text-gray-400">
            <div className="border-t-2 border-dashed border-gray-300 py-2">
              <div className="flex items-center justify-center space-x-2">
                <Layout className="w-4 h-4" />
                <span>Spacer ({block.content.height}px)</span>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500">Unknown block type</div>;
    }
  };

  const renderBlockEditor = (block: ContentBlock) => {
    if (selectedBlock !== block.id) return null;

    return (
      <Card className="mt-4 border-2 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Edit {block.type} Block</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="styles">Styles</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-4">
              {renderContentEditor(block)}
            </TabsContent>
            
            <TabsContent value="styles" className="mt-4">
              {renderStylesEditor(block)}
            </TabsContent>
            
            <TabsContent value="settings" className="mt-4">
              {renderSettingsEditor(block)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  };

  const renderContentEditor = (block: ContentBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Heading</label>
              <Input
                value={block.content.heading}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, heading: e.target.value }
                })}
                placeholder="Enter heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Text</label>
              <Textarea
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value }
                })}
                placeholder="Enter text content"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alignment</label>
              <div className="flex space-x-2">
                <Button
                  variant={block.content.alignment === 'left' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, alignment: 'left' }
                  })}
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={block.content.alignment === 'center' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, alignment: 'center' }
                  })}
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={block.content.alignment === 'right' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, alignment: 'right' }
                  })}
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <Input
                value={block.content.src}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, src: e.target.value }
                })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alt Text</label>
              <Input
                value={block.content.alt}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, alt: e.target.value }
                })}
                placeholder="Describe the image"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caption</label>
              <Input
                value={block.content.caption}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, caption: e.target.value }
                })}
                placeholder="Image caption"
              />
            </div>
          </div>
        );
      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <Input
                value={block.content.text}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value }
                })}
                placeholder="Button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link URL</label>
              <Input
                value={block.content.link}
                onChange={(e) => updateBlock(block.id, {
                  content: { ...block.content, link: e.target.value }
                })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Style</label>
              <div className="flex space-x-2">
                <Button
                  variant={block.content.style === 'primary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, style: 'primary' }
                  })}
                >
                  Primary
                </Button>
                <Button
                  variant={block.content.style === 'secondary' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, style: 'secondary' }
                  })}
                >
                  Secondary
                </Button>
                <Button
                  variant={block.content.style === 'outline' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => updateBlock(block.id, {
                    content: { ...block.content, style: 'outline' }
                  })}
                >
                  Outline
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="text-gray-500">Content editor for {block.type} coming soon...</div>;
    }
  };

  const renderStylesEditor = (block: ContentBlock) => {
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Style editor for {block.type} blocks coming soon...
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">
            Advanced styling options will be available here, including:
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Colors and typography</li>
              <li>Spacing and layout</li>
              <li>Animations and effects</li>
              <li>Responsive settings</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsEditor = (block: ContentBlock) => {
    return (
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={block.settings?.responsive || false}
              onChange={(e) => updateBlock(block.id, {
                settings: { ...block.settings, responsive: e.target.checked }
              })}
              className="rounded"
            />
            <span className="text-sm">Responsive design</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={block.settings?.accessibility || false}
              onChange={(e) => updateBlock(block.id, {
                settings: { ...block.settings, accessibility: e.target.checked }
              })}
              className="rounded"
            />
            <span className="text-sm">Accessibility features</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Animation</label>
          <select
            value={block.settings?.animation || 'none'}
            onChange={(e) => updateBlock(block.id, {
              settings: { ...block.settings, animation: e.target.value }
            })}
            className="w-full p-2 border rounded"
          >
            <option value="none">None</option>
            <option value="fade">Fade In</option>
            <option value="slide">Slide Up</option>
            <option value="bounce">Bounce</option>
          </select>
        </div>
      </div>
    );
  };

  const groupedBlockTypes = BLOCK_TYPES.reduce((acc, blockType) => {
    if (!acc[blockType.category]) {
      acc[blockType.category] = [];
    }
    acc[blockType.category].push(blockType);
    return acc;
  }, {} as Record<string, typeof BLOCK_TYPES>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <span>Enhanced Visual Editor</span>
          </h3>
          <p className="text-sm text-gray-600">Drag and drop to build beautiful content</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={historyIndex <= 0}
          >
            <Undo className="w-4 h-4 mr-1" />
            Undo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          >
            <Redo className="w-4 h-4 mr-1" />
            Redo
          </Button>
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
            <CardTitle className="text-base flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Add Content Blocks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
              
              {Object.entries(groupedBlockTypes).map(([category, blocks]) => (
                <TabsContent key={category} value={category === 'content' ? 'content' : category === 'layout' ? 'layout' : 'sections'}>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                    {blocks.map((blockType) => {
                      const Icon = blockType.icon;
                      return (
                        <Button
                          key={blockType.type}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-all"
                          onClick={() => addBlock(blockType.type)}
                        >
                          <div className={`w-12 h-12 rounded-lg ${blockType.color} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-sm">{blockType.label}</div>
                            <div className="text-xs text-gray-500">{blockType.description}</div>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </TabsContent>
              ))}
              
              <TabsContent value="all">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
                  {BLOCK_TYPES.map((blockType) => {
                    const Icon = blockType.icon;
                    return (
                      <Button
                        key={blockType.type}
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-3 hover:shadow-md transition-all"
                        onClick={() => addBlock(blockType.type)}
                      >
                        <div className={`w-12 h-12 rounded-lg ${blockType.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm">{blockType.label}</div>
                          <div className="text-xs text-gray-500">{blockType.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Content Blocks */}
      <div className="space-y-4">
        {blocks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No content blocks yet</h3>
              <p className="text-gray-600 mb-4">Start building your content by adding blocks above</p>
              <Button onClick={() => addBlock('text')} className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Block
              </Button>
            </CardContent>
          </Card>
        ) : (
          blocks.map((block, index) => (
            <div key={block.id}>
              {renderBlock(block, index)}
              {renderBlockEditor(block)}
            </div>
          ))
        )}
      </div>

      {/* Preview Mode */}
      {isPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Live Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white min-h-[400px]">
              {blocks.map((block) => (
                <div key={block.id} className="mb-6 last:mb-0">
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
