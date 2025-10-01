'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Save, 
  Eye, 
  Undo, 
  Redo, 
  Copy, 
  Download, 
  Upload,
  Settings,
  Palette,
  Type,
  Image,
  Video,
  Layout,
  Zap,
  Sparkles,
  Wand2,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Target,
  BarChart3,
  Users,
  Heart,
  Star,
  Globe,
  Shield,
  ArrowRight,
  ChevronDown,
  MoreHorizontal,
  FileText,
  Package,
  GraduationCap,
  BookOpen,
  Brain,
  MessageSquare,
  DollarSign,
  Clock,
  TrendingUp,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Tag,
  Filter,
  Search,
  RefreshCw,
  Maximize,
  Minimize,
  RotateCcw,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Star as StarIcon,
  Heart as HeartIcon,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Droplets,
  Flame,
  Snowflake,
  Zap as ZapIcon,
  Sparkles as SparklesIcon,
  Wand2 as Wand2Icon,
  Target as TargetIcon,
  BarChart3 as BarChart3Icon,
  Users as UsersIcon,
  Heart as HeartIcon2,
  Star as StarIcon2,
  Globe as GlobeIcon,
  Shield as ShieldIcon,
  ArrowRight as ArrowRightIcon,
  ChevronDown as ChevronDownIcon,
  MoreHorizontal as MoreHorizontalIcon,
  FileText as FileTextIcon,
  Package as PackageIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain as BrainIcon,
  MessageSquare as MessageSquareIcon,
  DollarSign as DollarSignIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
  HelpCircle as HelpCircleIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  Calendar as CalendarIcon,
  Tag as TagIcon,
  Filter as FilterIcon,
  Search as SearchIcon,
  RefreshCw as RefreshCwIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  RotateCcw as RotateCcwIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Diamond as DiamondIcon
} from 'lucide-react';

interface CodeEditorProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
  language?: string;
}

interface CodeSnippet {
  id: string;
  name: string;
  language: string;
  code: string;
  description: string;
  category: string;
  tags: string[];
}

const CODE_SNIPPETS: CodeSnippet[] = [
  // HTML Snippets
  {
    id: 'html-hero',
    name: 'Hero Section',
    language: 'html',
    code: `<section class="hero">
  <div class="container">
    <h1 class="hero-title">{{title}}</h1>
    <p class="hero-subtitle">{{subtitle}}</p>
    <button class="cta-button">{{ctaText}}</button>
  </div>
</section>`,
    description: 'Beautiful hero section with title, subtitle and CTA',
    category: 'html',
    tags: ['hero', 'section', 'cta']
  },
  {
    id: 'html-card',
    name: 'Content Card',
    language: 'html',
    code: `<div class="card">
  <div class="card-header">
    <h3 class="card-title">{{title}}</h3>
  </div>
  <div class="card-body">
    <p class="card-text">{{content}}</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">{{actionText}}</button>
  </div>
</div>`,
    description: 'Reusable content card component',
    category: 'html',
    tags: ['card', 'component', 'reusable']
  },
  {
    id: 'html-form',
    name: 'Contact Form',
    language: 'html',
    code: `<form class="contact-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Send Message</button>
</form>`,
    description: 'Complete contact form with validation',
    category: 'html',
    tags: ['form', 'contact', 'validation']
  },
  
  // CSS Snippets
  {
    id: 'css-grid',
    name: 'CSS Grid Layout',
    language: 'css',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.grid-item:hover {
  transform: translateY(-4px);
}`,
    description: 'Responsive CSS Grid layout',
    category: 'css',
    tags: ['grid', 'layout', 'responsive']
  },
  {
    id: 'css-animations',
    name: 'CSS Animations',
    language: 'css',
    code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-pulse {
  animation: pulse 2s infinite;
}`,
    description: 'Common CSS animations and keyframes',
    category: 'css',
    tags: ['animation', 'keyframes', 'effects']
  },
  
  // JavaScript Snippets
  {
    id: 'js-modal',
    name: 'Modal Component',
    language: 'javascript',
    code: `class Modal {
  constructor(element) {
    this.element = element;
    this.isOpen = false;
    this.init();
  }
  
  init() {
    this.element.style.display = 'none';
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.close();
      }
    });
  }
  
  open() {
    this.element.style.display = 'flex';
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.element.style.display = 'none';
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }
}

// Usage
const modal = new Modal(document.getElementById('modal'));`,
    description: 'Reusable modal component with JavaScript',
    category: 'javascript',
    tags: ['modal', 'component', 'interactive']
  },
  {
    id: 'js-api',
    name: 'API Fetch Helper',
    language: 'javascript',
    code: `async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Fetch error:', error);
    return { success: false, error: error.message };
  }
}

// Usage
const result = await fetchData('/api/data');
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error);
}`,
    description: 'Robust API fetch helper with error handling',
    category: 'javascript',
    tags: ['api', 'fetch', 'async', 'error-handling']
  },
  
  // React Snippets
  {
    id: 'react-component',
    name: 'React Component',
    language: 'jsx',
    code: `import React, { useState, useEffect } from 'react';

const MyComponent = ({ title, children, onAction }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    // Component mount logic
    return () => {
      // Cleanup logic
    };
  }, []);
  
  const handleClick = () => {
    setIsActive(!isActive);
    onAction?.(isActive);
  };
  
  return (
    <div className={\`component \${isActive ? 'active' : ''}\`}>
      <h2>{title}</h2>
      {children}
      <button onClick={handleClick}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  );
};

export default MyComponent;`,
    description: 'Complete React component with hooks',
    category: 'react',
    tags: ['react', 'component', 'hooks', 'state']
  },
  {
    id: 'react-hook',
    name: 'Custom Hook',
    language: 'jsx',
    code: `import { useState, useEffect } from 'react';

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
};

export default useApi;`,
    description: 'Custom React hook for API calls',
    category: 'react',
    tags: ['react', 'hook', 'api', 'custom']
  }
];

const LANGUAGES = [
  { id: 'html', name: 'HTML', icon: Code, color: 'bg-orange-500' },
  { id: 'css', name: 'CSS', icon: Palette, color: 'bg-blue-500' },
  { id: 'javascript', name: 'JavaScript', icon: Zap, color: 'bg-yellow-500' },
  { id: 'jsx', name: 'React JSX', icon: Sparkles, color: 'bg-cyan-500' },
  { id: 'typescript', name: 'TypeScript', icon: Type, color: 'bg-blue-600' },
  { id: 'json', name: 'JSON', icon: FileText, color: 'bg-green-500' },
  { id: 'markdown', name: 'Markdown', icon: FileText, color: 'bg-gray-500' }
];

export default function EnhancedCodeEditor({ 
  content, 
  onUpdate, 
  sectionName, 
  language = 'html' 
}: CodeEditorProps) {
  const [code, setCode] = useState(content?.code || '');
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSnippets, setShowSnippets] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addToHistory = useCallback((newCode: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newCode);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCode(history[newIndex]);
      onUpdate({ ...content, code: history[newIndex] });
    }
  }, [history, historyIndex, content, onUpdate]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCode(history[newIndex]);
      onUpdate({ ...content, code: history[newIndex] });
    }
  }, [history, historyIndex, content, onUpdate]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    addToHistory(newCode);
    onUpdate({ ...content, code: newCode });
  }, [content, onUpdate, addToHistory]);

  const insertSnippet = useCallback((snippet: CodeSnippet) => {
    const newCode = code + '\n\n' + snippet.code;
    handleCodeChange(newCode);
    setSelectedSnippet(null);
  }, [code, handleCodeChange]);

  const formatCode = useCallback(() => {
    // Basic code formatting
    let formatted = code;
    
    if (selectedLanguage === 'html') {
      // Basic HTML formatting
      formatted = formatted
        .replace(/></g, '>\n<')
        .split('\n')
        .map((line: string) => {
          const depth = (line.match(/</g) || []).length - (line.match(/<\//g) || []).length;
          return '  '.repeat(Math.max(0, depth)) + line.trim();
        })
        .join('\n');
    } else if (selectedLanguage === 'css') {
      // Basic CSS formatting
      formatted = formatted
        .replace(/\{/g, ' {\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/;/g, ';\n  ')
        .replace(/,\s*/g, ',\n  ');
    } else if (selectedLanguage === 'javascript' || selectedLanguage === 'jsx') {
      // Basic JS formatting
      formatted = formatted
        .replace(/\{/g, ' {\n  ')
        .replace(/\}/g, '\n}\n')
        .replace(/;/g, ';\n')
        .replace(/,/g, ',\n  ');
    }
    
    handleCodeChange(formatted);
  }, [code, selectedLanguage, handleCodeChange]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  const downloadCode = useCallback(() => {
    const extension = selectedLanguage === 'jsx' ? 'jsx' : selectedLanguage;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sectionName}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [code, selectedLanguage, sectionName]);

  const filteredSnippets = CODE_SNIPPETS.filter(snippet => 
    snippet.language === selectedLanguage &&
    (snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const renderPreview = () => {
    if (selectedLanguage === 'html') {
      return (
        <div 
          className="w-full h-full border rounded-lg overflow-auto"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      );
    } else if (selectedLanguage === 'css') {
      return (
        <div className="w-full h-full border rounded-lg overflow-auto p-4">
          <style dangerouslySetInnerHTML={{ __html: code }} />
          <div className="preview-content">
            <h1>Preview Content</h1>
            <p>This is how your CSS will look when applied.</p>
          </div>
        </div>
      );
    } else if (selectedLanguage === 'javascript' || selectedLanguage === 'jsx') {
      return (
        <div className="w-full h-full border rounded-lg overflow-auto p-4">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-semibold mb-2">JavaScript Preview</h3>
            <p className="text-sm text-gray-600 mb-4">
              JavaScript code cannot be directly previewed for security reasons.
            </p>
            <div className="bg-white p-3 rounded border">
              <pre className="text-sm overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full border rounded-lg overflow-auto p-4">
          <pre className="text-sm">
            <code>{code}</code>
          </pre>
        </div>
      );
    }
  };

  const getLanguageIcon = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    return lang?.icon || Code;
  };

  const getLanguageColor = (langId: string) => {
    const lang = LANGUAGES.find(l => l.id === langId);
    return lang?.color || 'bg-gray-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold flex items-center space-x-2">
            <Code className="w-6 h-6 text-blue-500" />
            <span>Enhanced Code Editor</span>
          </h3>
          <p className="text-sm text-gray-600">Write and edit code with powerful features</p>
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
            size="sm"
            onClick={formatCode}
          >
            <Wand2 className="w-4 h-4 mr-1" />
            Format
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={copyCode}
          >
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCode}
          >
            <Download className="w-4 h-4 mr-1" />
            Download
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

      {/* Language Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Language & Snippets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Language:</span>
              <div className="flex space-x-2">
                {LANGUAGES.map((lang) => {
                  const Icon = lang.icon;
                  return (
                    <Button
                      key={lang.id}
                      variant={selectedLanguage === lang.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang.id)}
                      className="flex items-center space-x-1"
                    >
                      <div className={`w-3 h-3 rounded-full ${lang.color}`} />
                      <Icon className="w-4 h-4" />
                      <span>{lang.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSnippets(!showSnippets)}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Snippets
            </Button>
          </div>

          {/* Code Snippets */}
          {showSnippets && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search snippets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSnippets.map((snippet) => {
                  const Icon = getLanguageIcon(snippet.language);
                  return (
                    <Card
                      key={snippet.id}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => insertSnippet(snippet)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${getLanguageColor(snippet.language)} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{snippet.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">{snippet.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {snippet.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getLanguageColor(selectedLanguage)}`} />
            <span>{LANGUAGES.find(l => l.id === selectedLanguage)?.name} Editor</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Code Editor</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  className="w-full h-96 p-4 border rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Enter your ${selectedLanguage.toUpperCase()} code here...`}
                  spellCheck={false}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const textarea = textareaRef.current;
                      if (textarea) {
                        textarea.select();
                      }
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-4">
              <div className="h-96">
                {renderPreview()}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Code Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Code Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {code.split('\n').length}
              </div>
              <div className="text-sm text-gray-600">Lines</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {code.length}
              </div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {code.split(' ').filter((word: string) => word.length > 0).length}
              </div>
              <div className="text-sm text-gray-600">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(code.length / 5)}
              </div>
              <div className="text-sm text-gray-600">Tokens</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
