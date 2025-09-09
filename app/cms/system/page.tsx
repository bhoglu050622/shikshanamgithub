'use client'

import { SystemHealthMonitor } from '@/cms/components/dashboard/SystemHealthMonitor'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRealtimeConnection } from '@/cms/lib/realtime'
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  Download,
  Settings,
  Zap
} from 'lucide-react'

// Helper function to get status color classes
const getStatusColor = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-green-100 text-green-800'
    case 'stopped':
      return 'bg-red-100 text-red-800'
    case 'warning':
      return 'bg-yellow-100 text-yellow-800'
    case 'maintenance':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function CMSSystemPage() {
  const { connected, reconnecting } = useRealtimeConnection()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600">Real-time system health and performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {connected ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">Connected</span>
              </>
            ) : reconnecting ? (
              <>
                <RefreshCw className="w-4 h-4 text-yellow-600 animate-spin" />
                <span className="text-sm text-yellow-600">Reconnecting...</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">Disconnected</span>
              </>
            )}
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card className={`border-l-4 ${
        connected ? 'border-l-green-500 bg-green-50' : 'border-l-red-500 bg-red-50'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className="font-medium">
                Real-time monitoring {connected ? 'active' : 'inactive'}
              </span>
              {connected && (
                <Badge className="bg-green-100 text-green-800">
                  Live data streaming
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>Updates every 3 seconds</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <SystemHealthMonitor />
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Historical performance data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-lg font-bold text-blue-600">245ms</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                    <span className="text-sm font-medium">Throughput</span>
                    <span className="text-lg font-bold text-green-600">1,234 req/min</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                    <span className="text-sm font-medium">Error Rate</span>
                    <span className="text-lg font-bold text-purple-600">0.02%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Alerts</CardTitle>
                <CardDescription>Current system alerts and warnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-yellow-50 rounded border-l-4 border-l-yellow-500">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <div>
                      <div className="text-sm font-medium">High CPU Usage</div>
                      <div className="text-xs text-gray-600">CPU usage above 80% for 5 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-green-50 rounded border-l-4 border-l-green-500">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">All Services Running</div>
                      <div className="text-xs text-gray-600">No service interruptions detected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Next.js App', status: 'running', port: 3000, memory: '256 MB', cpu: '12%' },
              { name: 'PostgreSQL', status: 'running', port: 5432, memory: '512 MB', cpu: '8%' },
              { name: 'Redis Cache', status: 'running', port: 6379, memory: '128 MB', cpu: '3%' },
              { name: 'File Storage', status: 'running', port: 9000, memory: '64 MB', cpu: '2%' },
              { name: 'Search Engine', status: 'running', port: 9200, memory: '1 GB', cpu: '15%' },
              { name: 'Background Jobs', status: 'running', port: null, memory: '128 MB', cpu: '5%' }
            ].map((service, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{service.name}</CardTitle>
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs text-gray-600">
                    {service.port && <div>Port: {service.port}</div>}
                    <div>Memory: {service.memory}</div>
                    <div>CPU: {service.cpu}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { time: '14:23:45', level: 'INFO', message: 'Database connection pool refreshed' },
                  { time: '14:23:32', level: 'INFO', message: 'User authentication successful: shikshanam' },
                  { time: '14:23:15', level: 'WARN', message: 'High memory usage detected: 85%' },
                  { time: '14:22:58', level: 'INFO', message: 'Course published: Advanced Sanskrit Grammar' },
                  { time: '14:22:45', level: 'ERROR', message: 'Failed to send email notification' },
                  { time: '14:22:30', level: 'INFO', message: 'Backup process completed successfully' },
                  { time: '14:22:15', level: 'INFO', message: 'Cache invalidation completed' },
                  { time: '14:22:01', level: 'WARN', message: 'Slow query detected: 2.5s execution time' }
                ].map((log, index) => (
                  <div key={index} className={`p-2 rounded ${
                    log.level === 'ERROR' ? 'bg-red-50 text-red-800' :
                    log.level === 'WARN' ? 'bg-yellow-50 text-yellow-800' :
                    'bg-gray-50 text-gray-800'
                  }`}>
                    <span className="text-gray-500">[{log.time}]</span>
                    <span className={`ml-2 font-medium ${
                      log.level === 'ERROR' ? 'text-red-600' :
                      log.level === 'WARN' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {log.level}
                    </span>
                    <span className="ml-2">{log.message}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
