'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Activity, 
  Server, 
  Database, 
  Wifi,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Zap
} from 'lucide-react'

interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: string
  cpu: {
    usage: number
    cores: number
    temperature: number
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
  storage: {
    used: number
    total: number
    percentage: number
  }
  network: {
    inbound: number
    outbound: number
    latency: number
  }
  database: {
    connections: number
    queryTime: number
    status: 'connected' | 'disconnected' | 'slow'
  }
  services: {
    name: string
    status: 'running' | 'stopped' | 'error'
    uptime: string
    memory: number
  }[]
}

export function SystemHealthMonitor() {
  const [health, setHealth] = useState<SystemHealth | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    const generateHealthData = (): SystemHealth => {
      const cpuUsage = Math.random() * 100
      const memoryUsage = Math.random() * 100
      const storageUsage = Math.random() * 100
      
      const getStatus = () => {
        const maxUsage = Math.max(cpuUsage, memoryUsage, storageUsage)
        if (maxUsage > 90) return 'critical'
        if (maxUsage > 70) return 'warning'
        return 'healthy'
      }

      return {
        status: getStatus(),
        uptime: '15d 8h 32m',
        cpu: {
          usage: cpuUsage,
          cores: 8,
          temperature: Math.random() * 30 + 45 // 45-75°C
        },
        memory: {
          used: memoryUsage / 100 * 16,
          total: 16,
          percentage: memoryUsage
        },
        storage: {
          used: storageUsage / 100 * 500,
          total: 500,
          percentage: storageUsage
        },
        network: {
          inbound: Math.random() * 100,
          outbound: Math.random() * 50,
          latency: Math.random() * 50 + 10
        },
        database: {
          connections: Math.floor(Math.random() * 50) + 10,
          queryTime: Math.random() * 100 + 5,
          status: Math.random() > 0.1 ? 'connected' : Math.random() > 0.5 ? 'slow' : 'disconnected'
        },
        services: [
          {
            name: 'Web Server',
            status: Math.random() > 0.05 ? 'running' : 'error',
            uptime: '15d 8h 32m',
            memory: Math.random() * 512 + 256
          },
          {
            name: 'Database',
            status: Math.random() > 0.02 ? 'running' : 'error',
            uptime: '15d 8h 30m',
            memory: Math.random() * 1024 + 512
          },
          {
            name: 'Cache Server',
            status: Math.random() > 0.1 ? 'running' : 'stopped',
            uptime: '15d 8h 25m',
            memory: Math.random() * 256 + 128
          },
          {
            name: 'Search Index',
            status: Math.random() > 0.05 ? 'running' : 'error',
            uptime: '15d 8h 28m',
            memory: Math.random() * 512 + 256
          }
        ]
      }
    }

    const updateHealth = () => {
      setHealth(generateHealthData())
      setLastUpdate(new Date())
    }

    updateHealth()
    const interval = setInterval(updateHealth, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
      case 'slow':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'critical':
      case 'error':
      case 'stopped':
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'running':
      case 'connected':
        return 'bg-green-100 text-green-800'
      case 'warning':
      case 'slow':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
      case 'error':
      case 'stopped':
      case 'disconnected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getUsageColor = (percentage: number) => {
    if (percentage > 90) return 'bg-red-500'
    if (percentage > 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  if (!health) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* System Status Overview */}
      <Card className={`border-l-4 ${
        health.status === 'healthy' ? 'border-l-green-500 bg-green-50' :
        health.status === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
        'border-l-red-500 bg-red-50'
      }`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Server className="w-5 h-5 mr-2" />
              System Status
              {getStatusIcon(health.status)}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(health.status)}>
                {health.status.toUpperCase()}
              </Badge>
              <div className="text-xs text-gray-500">
                Updated {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Uptime: {health.uptime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600">Live monitoring</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <Cpu className="w-4 h-4 mr-2" />
              CPU Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{health.cpu.usage.toFixed(1)}%</span>
                <Badge className={getStatusColor(health.cpu.usage > 80 ? 'critical' : health.cpu.usage > 60 ? 'warning' : 'healthy')}>
                  {health.cpu.cores} cores
                </Badge>
              </div>
              <Progress value={health.cpu.usage} className="h-2" />
              <div className="text-xs text-gray-600">
                Temperature: {health.cpu.temperature.toFixed(1)}°C
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <MemoryStick className="w-4 h-4 mr-2" />
              Memory Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{health.memory.percentage.toFixed(1)}%</span>
                <Badge variant="outline">
                  {health.memory.used.toFixed(1)} / {health.memory.total} GB
                </Badge>
              </div>
              <Progress value={health.memory.percentage} className="h-2" />
              <div className="text-xs text-gray-600">
                Available: {(health.memory.total - health.memory.used).toFixed(1)} GB
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <HardDrive className="w-4 h-4 mr-2" />
              Storage Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{health.storage.percentage.toFixed(1)}%</span>
                <Badge variant="outline">
                  {health.storage.used.toFixed(0)} / {health.storage.total} GB
                </Badge>
              </div>
              <Progress value={health.storage.percentage} className="h-2" />
              <div className="text-xs text-gray-600">
                Free: {(health.storage.total - health.storage.used).toFixed(0)} GB
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services and Database */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Services Status
            </CardTitle>
            <CardDescription>
              All system services and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {health.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <div className="font-medium text-sm">{service.name}</div>
                      <div className="text-xs text-gray-500">
                        Memory: {service.memory.toFixed(0)} MB • Uptime: {service.uptime}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database & Network
            </CardTitle>
            <CardDescription>
              Database performance and network statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Database Status */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span className="font-medium text-sm">PostgreSQL</span>
                  </div>
                  <Badge className={getStatusColor(health.database.status)}>
                    {health.database.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div>Connections: {health.database.connections}</div>
                  <div>Query Time: {health.database.queryTime.toFixed(1)}ms</div>
                </div>
              </div>

              {/* Network Status */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Network className="w-4 h-4" />
                  <span className="font-medium text-sm">Network</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                  <div>
                    <div className="text-green-600 font-medium">↓ {health.network.inbound.toFixed(1)} MB/s</div>
                    <div>Inbound</div>
                  </div>
                  <div>
                    <div className="text-blue-600 font-medium">↑ {health.network.outbound.toFixed(1)} MB/s</div>
                    <div>Outbound</div>
                  </div>
                  <div>
                    <div className="text-purple-600 font-medium">{health.network.latency.toFixed(0)}ms</div>
                    <div>Latency</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
