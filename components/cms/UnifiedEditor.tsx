'use client';

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Palette, 
  Eye, 
  Save, 
  Undo, 
  Redo, 
  Copy, 
  Download, 
  Upload,
  Settings,
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
  Diamond as DiamondIcon,
  Layout,
  Type,
  Image,
  Video,
  List,
  Quote,
  Square as ButtonIcon,
  Plus,
  Grip,
  Move,
  Copy as CopyIcon,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Maximize2,
  Minimize2,
  Split,
  Merge,
  Layers,
  Grid,
  Columns,
  Rows,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Link,
  ExternalLink,
  InternalLink,
  Anchor,
  Bookmark,
  Tag as TagIcon2,
  Hash,
  AtSign,
  Percent,
  DollarSign as DollarSignIcon,
  Euro,
  Pound,
  Yen,
  Rupee,
  Bitcoin,
  Ethereum,
  CreditCard,
  Banknote,
  Coins,
  Wallet,
  PiggyBank,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  Activity,
  BarChart,
  BarChart2,
  BarChart3 as BarChart3Icon2,
  LineChart,
  PieChart,
  DonutChart,
  AreaChart,
  ScatterChart,
  RadarChart,
  Gauge,
  Thermometer,
  Droplet,
  Droplets,
  Wind as WindIcon,
  Cloud as CloudIcon,
  CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon,
  CloudLightning as CloudLightningIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Sunrise,
  Sunset,
  Calendar as CalendarIcon2,
  Clock as ClockIcon2,
  Timer,
  Stopwatch,
  Hourglass,
  Watch,
  AlarmClock,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Monitor,
  Laptop,
  Smartphone,
  Tablet,
  Desktop,
  Server,
  Database,
  HardDrive,
  Cpu,
  Memory,
  Wifi,
  Bluetooth,
  Usb,
  Hdmi,
  Vga,
  Ethernet,
  Router,
  Modem,
  Antenna,
  Satellite,
  Radar,
  Sonar,
  Laser,
  Flashlight,
  Torch,
  Candle,
  Lightbulb as LightbulbIcon,
  Lamp,
  LampDesk,
  LampFloor,
  LampCeiling,
  LampWall,
  LampTable,
  LampBed,
  LampNight,
  LampDay,
  LampOff,
  LampOn,
  Switch,
  Toggle,
  ToggleLeft,
  ToggleRight,
  Power,
  PowerOff,
  PowerOn,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryHigh,
  BatteryFull,
  BatteryCharging,
  Plug,
  Outlet,
  Socket,
  Cable,
  Wire,
  Circuit,
  Chip,
  Microchip,
  Processor,
  Motherboard,
  Graphics,
  VideoCard,
  SoundCard,
  NetworkCard,
  MemoryCard,
  SdCard,
  CompactFlash,
  UsbDrive,
  ExternalDrive,
  InternalDrive,
  Ssd,
  Hdd,
  Nvme,
  Ram,
  Rom,
  Cache,
  Buffer,
  Queue,
  Stack,
  Heap,
  Tree,
  Graph,
  Node,
  Edge,
  Vertex,
  Path,
  Route,
  Way,
  Direction,
  Navigation,
  Compass,
  Map,
  MapPin as MapPinIcon2,
  Location,
  Place,
  Address,
  Home,
  House,
  Building,
  Office,
  Factory,
  Warehouse,
  Store,
  Shop,
  Market,
  Mall,
  Plaza,
  Square as SquareIcon2,
  Circle as CircleIcon2,
  Triangle as TriangleIcon2,
  Hexagon as HexagonIcon2,
  Octagon as OctagonIcon2,
  Diamond as DiamondIcon2,
  Star as StarIcon3,
  Heart as HeartIcon3,
  Smile,
  Frown,
  Meh,
  Laugh,
  Cry,
  Angry,
  Surprised,
  Confused,
  Worried,
  Excited,
  Happy,
  Sad,
  Mad,
  Glad,
  Bad,
  Good,
  Great,
  Awesome,
  Amazing,
  Fantastic,
  Wonderful,
  Beautiful,
  Gorgeous,
  Stunning,
  Magnificent,
  Spectacular,
  Incredible,
  Unbelievable,
  Extraordinary,
  Remarkable,
  Outstanding,
  Excellent,
  Perfect,
  Flawless,
  Impeccable,
  Pristine,
  Clean,
  Fresh,
  New,
  Modern,
  Contemporary,
  Current,
  Latest,
  Recent,
  Updated,
  Upgraded,
  Enhanced,
  Improved,
  Better,
  Best,
  Optimal,
  Ideal,
  Perfect,
  Flawless,
  Impeccable,
  Pristine,
  Clean,
  Fresh,
  New,
  Modern,
  Contemporary,
  Current,
  Latest,
  Recent,
  Updated,
  Upgraded,
  Enhanced,
  Improved,
  Better,
  Best,
  Optimal,
  Ideal
} from 'lucide-react';

// Import the enhanced editors
import EnhancedVisualEditor from './EnhancedVisualEditor';
import EnhancedCodeEditor from './EnhancedCodeEditor';

interface UnifiedEditorProps {
  content: any;
  onUpdate: (content: any) => void;
  sectionName: string;
}

type EditorMode = 'visual' | 'code' | 'split' | 'preview';

export default function UnifiedEditor({ content, onUpdate, sectionName }: UnifiedEditorProps) {
  const [activeMode, setActiveMode] = useState<EditorMode>('visual');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    theme: 'light',
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    lineNumbers: true,
    minimap: true,
    autoSave: true,
    autoFormat: true
  });

  const handleModeChange = useCallback((mode: EditorMode) => {
    setActiveMode(mode);
  }, []);

  const handleContentUpdate = useCallback((newContent: any) => {
    onUpdate(newContent);
  }, [onUpdate]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const toggleSettings = useCallback(() => {
    setShowSettings(!showSettings);
  }, [showSettings]);

  const updateEditorSettings = useCallback((newSettings: Partial<typeof editorSettings>) => {
    setEditorSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const renderEditor = () => {
    switch (activeMode) {
      case 'visual':
        return (
          <EnhancedVisualEditor
            content={content}
            onUpdate={handleContentUpdate}
            sectionName={sectionName}
          />
        );
      case 'code':
        return (
          <EnhancedCodeEditor
            content={content}
            onUpdate={handleContentUpdate}
            sectionName={sectionName}
            language="html"
          />
        );
      case 'split':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-blue-500" />
                  <span>Visual Editor</span>
                </h3>
              </div>
              <EnhancedVisualEditor
                content={content}
                onUpdate={handleContentUpdate}
                sectionName={sectionName}
              />
            </div>
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Code className="w-5 h-5 text-green-500" />
                  <span>Code Editor</span>
                </h3>
              </div>
              <EnhancedCodeEditor
                content={content}
                onUpdate={handleContentUpdate}
                sectionName={sectionName}
                language="html"
              />
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h3>
              <p className="text-gray-600">Preview your content as it will appear to users</p>
            </div>
            <div className="border rounded-lg p-6 bg-white min-h-[400px]">
              {content?.blocks?.map((block: any, index: number) => (
                <div key={index} className="mb-4">
                  {/* Render preview content here */}
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="text-sm text-gray-500 mb-2">{block.type} Block</div>
                    <div className="text-gray-800">
                      {block.content?.text || block.content?.title || 'Content preview'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-white p-6' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            <Sparkles className="w-7 h-7 text-blue-500" />
            <span>Unified Content Editor</span>
          </h2>
          <p className="text-sm text-gray-600">Visual and code editing in one powerful interface</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSettings}
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 mr-1" /> : <Maximize2 className="w-4 h-4 mr-1" />}
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      {/* Mode Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Editor Mode:</span>
              <div className="flex space-x-2">
                <Button
                  variant={activeMode === 'visual' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('visual')}
                  className="flex items-center space-x-2"
                >
                  <Palette className="w-4 h-4" />
                  <span>Visual</span>
                </Button>
                <Button
                  variant={activeMode === 'code' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('code')}
                  className="flex items-center space-x-2"
                >
                  <Code className="w-4 h-4" />
                  <span>Code</span>
                </Button>
                <Button
                  variant={activeMode === 'split' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('split')}
                  className="flex items-center space-x-2"
                >
                  <Split className="w-4 h-4" />
                  <span>Split</span>
                </Button>
                <Button
                  variant={activeMode === 'preview' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleModeChange('preview')}
                  className="flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Auto-save enabled</span>
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Wand2 className="w-3 h-3" />
                <span>Smart formatting</span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Panel */}
      {showSettings && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Editor Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Appearance</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <select
                      value={editorSettings.theme}
                      onChange={(e) => updateEditorSettings({ theme: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size</label>
                    <input
                      type="range"
                      min="12"
                      max="20"
                      value={editorSettings.fontSize}
                      onChange={(e) => updateEditorSettings({ fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-600">{editorSettings.fontSize}px</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Code Editor</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tab Size</label>
                    <select
                      value={editorSettings.tabSize}
                      onChange={(e) => updateEditorSettings({ tabSize: parseInt(e.target.value) })}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={8}>8 spaces</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editorSettings.wordWrap}
                        onChange={(e) => updateEditorSettings({ wordWrap: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Word wrap</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editorSettings.lineNumbers}
                        onChange={(e) => updateEditorSettings({ lineNumbers: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Line numbers</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editorSettings.minimap}
                        onChange={(e) => updateEditorSettings({ minimap: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Minimap</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Features</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editorSettings.autoSave}
                      onChange={(e) => updateEditorSettings({ autoSave: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Auto-save</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editorSettings.autoFormat}
                      onChange={(e) => updateEditorSettings({ autoFormat: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">Auto-format</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Editor */}
      <div className="min-h-[600px]">
        {renderEditor()}
      </div>

      {/* Footer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Section:</span> {sectionName}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Mode:</span> {activeMode}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Blocks:</span> {content?.blocks?.length || 0}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
