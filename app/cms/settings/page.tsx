'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Settings,
  Globe,
  Database,
  Shield,
  FileText,
  Download,
  Upload,
  Trash2,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  Key,
  Bell,
  Palette,
  Languages,
  Workflow,
  Archive,
  HardDrive,
} from 'lucide-react'

interface SystemSettings {
  siteName: string
  siteUrl: string
  defaultLanguage: string
  timezone: string
  dateFormat: string
  maintenanceMode: boolean
  autoSave: boolean
  autoSaveInterval: number
  maxFileSize: number
  allowedFileTypes: string[]
}

interface WorkflowSettings {
  requireApproval: boolean
  approvalWorkflow: 'simple' | 'complex'
  autoPublish: boolean
  publishDelay: number
  rollbackEnabled: boolean
  auditLogging: boolean
}

interface BackupSettings {
  autoBackup: boolean
  backupInterval: 'daily' | 'weekly' | 'monthly'
  backupRetention: number
  lastBackup?: string
  backupLocation: 'local' | 'cloud'
}

const defaultSystemSettings: SystemSettings = {
  siteName: 'Shikshanam CMS',
  siteUrl: 'https://shikshanam.com',
  defaultLanguage: 'en',
  timezone: 'UTC',
  dateFormat: 'YYYY-MM-DD',
  maintenanceMode: false,
  autoSave: true,
  autoSaveInterval: 30,
  maxFileSize: 10,
  allowedFileTypes: ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'mp4', 'mp3']
}

const defaultWorkflowSettings: WorkflowSettings = {
  requireApproval: true,
  approvalWorkflow: 'simple',
  autoPublish: false,
  publishDelay: 0,
  rollbackEnabled: true,
  auditLogging: true
}

const defaultBackupSettings: BackupSettings = {
  autoBackup: true,
  backupInterval: 'daily',
  backupRetention: 30,
  lastBackup: '2024-01-15T10:30:00Z',
  backupLocation: 'cloud'
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(defaultSystemSettings)
  const [workflowSettings, setWorkflowSettings] = useState<WorkflowSettings>(defaultWorkflowSettings)
  const [backupSettings, setBackupSettings] = useState<BackupSettings>(defaultBackupSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [exportDialog, setExportDialog] = useState(false)
  const [importDialog, setImportDialog] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setLastSaved(new Date())
  }

  const handleExportSettings = () => {
    const settings = {
      system: systemSettings,
      workflow: workflowSettings,
      backup: backupSettings,
      exportedAt: new Date().toISOString(),
      exportedBy: user?.username
    }
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cms-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setExportDialog(false)
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string)
        if (settings.system) setSystemSettings(settings.system)
        if (settings.workflow) setWorkflowSettings(settings.workflow)
        if (settings.backup) setBackupSettings(settings.backup)
        setImportDialog(false)
      } catch (error) {
        console.error('Error importing settings:', error)
      }
    }
    reader.readAsText(file)
  }

  const handleCreateBackup = async () => {
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setBackupSettings(prev => ({ ...prev, lastBackup: new Date().toISOString() }))
  }

  const handleRestoreBackup = () => {
    // Implement backup restore logic
    console.log('Restoring from backup...')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure system settings, workflows, and maintenance options</p>
        </div>
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <span className="text-sm text-gray-500">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={systemSettings.siteName}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input
                    id="site-url"
                    value={systemSettings.siteUrl}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, siteUrl: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select value={systemSettings.defaultLanguage} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, defaultLanguage: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="sa">Sanskrit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings(prev => ({ ...prev, dateFormat: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Enable maintenance mode to prevent public access</p>
                  </div>
                  <Switch
                    id="maintenance-mode"
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-save">Auto Save</Label>
                    <p className="text-sm text-gray-600">Automatically save content changes</p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={systemSettings.autoSave}
                    onCheckedChange={(checked) => setSystemSettings(prev => ({ ...prev, autoSave: checked }))}
                  />
                </div>
              </div>
              
              {systemSettings.autoSave && (
                <div>
                  <Label htmlFor="auto-save-interval">Auto Save Interval (seconds)</Label>
                  <Input
                    id="auto-save-interval"
                    type="number"
                    value={systemSettings.autoSaveInterval}
                    onChange={(e) => setSystemSettings(prev => ({ ...prev, autoSaveInterval: parseInt(e.target.value) }))}
                    min="10"
                    max="300"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          {/* Workflow Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Workflow className="w-5 h-5 mr-2" />
                Workflow Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="require-approval">Require Approval</Label>
                    <p className="text-sm text-gray-600">Content must be approved before publishing</p>
                  </div>
                  <Switch
                    id="require-approval"
                    checked={workflowSettings.requireApproval}
                    onCheckedChange={(checked) => setWorkflowSettings(prev => ({ ...prev, requireApproval: checked }))}
                  />
                </div>
                
                {workflowSettings.requireApproval && (
                  <div>
                    <Label htmlFor="approval-workflow">Approval Workflow</Label>
                    <Select value={workflowSettings.approvalWorkflow} onValueChange={(value: any) => setWorkflowSettings(prev => ({ ...prev, approvalWorkflow: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple (Single Reviewer)</SelectItem>
                        <SelectItem value="complex">Complex (Multiple Reviewers)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-publish">Auto Publish</Label>
                    <p className="text-sm text-gray-600">Automatically publish approved content</p>
                  </div>
                  <Switch
                    id="auto-publish"
                    checked={workflowSettings.autoPublish}
                    onCheckedChange={(checked) => setWorkflowSettings(prev => ({ ...prev, autoPublish: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="rollback-enabled">Rollback Enabled</Label>
                    <p className="text-sm text-gray-600">Allow content rollback functionality</p>
                  </div>
                  <Switch
                    id="rollback-enabled"
                    checked={workflowSettings.rollbackEnabled}
                    onCheckedChange={(checked) => setWorkflowSettings(prev => ({ ...prev, rollbackEnabled: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="audit-logging">Audit Logging</Label>
                    <p className="text-sm text-gray-600">Log all content changes and user actions</p>
                  </div>
                  <Switch
                    id="audit-logging"
                    checked={workflowSettings.auditLogging}
                    onCheckedChange={(checked) => setWorkflowSettings(prev => ({ ...prev, auditLogging: checked }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          {/* Backup & Restore */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Archive className="w-5 h-5 mr-2" />
                Backup & Restore
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-backup">Auto Backup</Label>
                    <p className="text-sm text-gray-600">Automatically create backups</p>
                  </div>
                  <Switch
                    id="auto-backup"
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, autoBackup: checked }))}
                  />
                </div>
                
                {backupSettings.autoBackup && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="backup-interval">Backup Interval</Label>
                      <Select value={backupSettings.backupInterval} onValueChange={(value: any) => setBackupSettings(prev => ({ ...prev, backupInterval: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="backup-retention">Retention (days)</Label>
                      <Input
                        id="backup-retention"
                        type="number"
                        value={backupSettings.backupRetention}
                        onChange={(e) => setBackupSettings(prev => ({ ...prev, backupRetention: parseInt(e.target.value) }))}
                        min="1"
                        max="365"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="backup-location">Backup Location</Label>
                  <Select value={backupSettings.backupLocation} onValueChange={(value: any) => setBackupSettings(prev => ({ ...prev, backupLocation: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Manual Backup</h3>
                    <p className="text-sm text-gray-600">Create a backup now</p>
                  </div>
                  <Button onClick={handleCreateBackup}>
                    <Archive className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
                
                {backupSettings.lastBackup && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Last backup: {new Date(backupSettings.lastBackup).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Security Configuration</h3>
                <p className="text-gray-600">Configure security settings, SSL, and access controls</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import-export" className="space-y-6">
          {/* Import/Export */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Import/Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Download className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium">Export Settings</h3>
                      <p className="text-sm text-gray-600">Download all settings as JSON</p>
                    </div>
                  </div>
                  <Button onClick={() => setExportDialog(true)} className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Settings
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Upload className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-medium">Import Settings</h3>
                      <p className="text-sm text-gray-600">Upload settings from JSON file</p>
                    </div>
                  </div>
                  <Button onClick={() => setImportDialog(true)} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Export Dialog */}
      <Dialog open={exportDialog} onOpenChange={setExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Settings</DialogTitle>
            <DialogDescription>
              Download all your CMS settings as a JSON file
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">What will be exported:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• General system settings</li>
                <li>• Workflow configurations</li>
                <li>• Backup settings</li>
                <li>• Security preferences</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExportSettings}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={importDialog} onOpenChange={setImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Settings</DialogTitle>
            <DialogDescription>
              Upload a JSON file to restore your CMS settings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Warning</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Importing settings will overwrite your current configuration. Make sure to export your current settings first.
              </p>
            </div>
            
            <div>
              <Label htmlFor="import-file">Select JSON File</Label>
              <Input
                id="import-file"
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="mt-2"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setImportDialog(false)}>
              Cancel
            </Button>
            <Button disabled>
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
