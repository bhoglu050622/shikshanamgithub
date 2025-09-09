'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/cms/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Users,
  UserPlus,
  Shield,
  Key,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'

interface User {
  id: string
  username: string
  email: string
  role: 'ADMIN' | 'PUBLISHER' | 'REVIEWER' | 'EDITOR' | 'VIEWER'
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
  permissions: string[]
  twoFactorEnabled: boolean
  avatar?: string
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  color: string
}

interface Permission {
  id: string
  name: string
  description: string
  category: 'content' | 'media' | 'users' | 'system' | 'publishing'
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@shikshanam.com',
    role: 'ADMIN',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    permissions: ['*'],
    twoFactorEnabled: true
  },
  {
    id: '2',
    username: 'dr_priya_sharma',
    email: 'priya@shikshanam.com',
    role: 'PUBLISHER',
    status: 'active',
    lastLogin: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-05T09:00:00Z',
    permissions: ['content:read', 'content:write', 'content:publish', 'media:read', 'media:write'],
    twoFactorEnabled: false
  },
  {
    id: '3',
    username: 'rajesh_kumar',
    email: 'rajesh@shikshanam.com',
    role: 'EDITOR',
    status: 'active',
    lastLogin: '2024-01-13T12:20:00Z',
    createdAt: '2024-01-08T14:30:00Z',
    permissions: ['content:read', 'content:write', 'media:read'],
    twoFactorEnabled: false
  },
  {
    id: '4',
    username: 'meera_patel',
    email: 'meera@shikshanam.com',
    role: 'REVIEWER',
    status: 'pending',
    lastLogin: '2024-01-12T16:15:00Z',
    createdAt: '2024-01-10T11:00:00Z',
    permissions: ['content:read', 'content:review'],
    twoFactorEnabled: false
  },
  {
    id: '5',
    username: 'viewer_user',
    email: 'viewer@shikshanam.com',
    role: 'VIEWER',
    status: 'active',
    lastLogin: '2024-01-11T08:30:00Z',
    createdAt: '2024-01-12T10:00:00Z',
    permissions: ['content:read'],
    twoFactorEnabled: false
  }
]

const mockRoles: Role[] = [
  {
    id: 'admin',
    name: 'ADMIN',
    description: 'Full system access and control',
    permissions: ['*'],
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'publisher',
    name: 'PUBLISHER',
    description: 'Can create, edit, and publish content',
    permissions: ['content:read', 'content:write', 'content:publish', 'media:read', 'media:write'],
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'reviewer',
    name: 'REVIEWER',
    description: 'Can review and approve content',
    permissions: ['content:read', 'content:review'],
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'editor',
    name: 'EDITOR',
    description: 'Can create and edit content',
    permissions: ['content:read', 'content:write', 'media:read'],
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'viewer',
    name: 'VIEWER',
    description: 'Read-only access to content',
    permissions: ['content:read'],
    color: 'bg-gray-100 text-gray-800'
  }
]

const mockPermissions: Permission[] = [
  // Content permissions
  { id: 'content:read', name: 'Read Content', description: 'View content items', category: 'content' },
  { id: 'content:write', name: 'Write Content', description: 'Create and edit content', category: 'content' },
  { id: 'content:publish', name: 'Publish Content', description: 'Publish content to production', category: 'content' },
  { id: 'content:review', name: 'Review Content', description: 'Review and approve content', category: 'content' },
  { id: 'content:delete', name: 'Delete Content', description: 'Delete content items', category: 'content' },
  
  // Media permissions
  { id: 'media:read', name: 'Read Media', description: 'View media files', category: 'media' },
  { id: 'media:write', name: 'Write Media', description: 'Upload and edit media', category: 'media' },
  { id: 'media:delete', name: 'Delete Media', description: 'Delete media files', category: 'media' },
  
  // User permissions
  { id: 'users:read', name: 'Read Users', description: 'View user accounts', category: 'users' },
  { id: 'users:write', name: 'Write Users', description: 'Create and edit users', category: 'users' },
  { id: 'users:delete', name: 'Delete Users', description: 'Delete user accounts', category: 'users' },
  
  // System permissions
  { id: 'system:settings', name: 'System Settings', description: 'Modify system settings', category: 'system' },
  { id: 'system:logs', name: 'View Logs', description: 'Access system logs', category: 'system' },
  
  // Publishing permissions
  { id: 'publishing:deploy', name: 'Deploy', description: 'Deploy to production', category: 'publishing' },
  { id: 'publishing:rollback', name: 'Rollback', description: 'Rollback deployments', category: 'publishing' }
]

export default function UsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [createUserDialog, setCreateUserDialog] = useState(false)
  const [editUserDialog, setEditUserDialog] = useState(false)
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'VIEWER' as User['role'],
    permissions: [] as string[]
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'
  }

  const getRoleBadge = (role: string) => {
    const roleData = roles.find(r => r.name === role)
    return roleData?.color || 'bg-gray-100 text-gray-800'
  }

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      status: 'pending',
      lastLogin: '',
      createdAt: new Date().toISOString(),
      permissions: newUser.permissions,
      twoFactorEnabled: false
    }
    
    setUsers(prev => [...prev, user])
    setCreateUserDialog(false)
    setNewUser({ username: '', email: '', role: 'VIEWER', permissions: [] })
  }

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ))
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId))
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ))
  }

  const handleTogglePermission = (permissionId: string) => {
    setNewUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }))
  }

  const getPermissionsByCategory = (category: string) => {
    return permissions.filter(p => p.category === category)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Users & Permissions</h1>
          <p className="text-gray-600">Manage user accounts, roles, and access permissions</p>
        </div>
        <Button onClick={() => setCreateUserDialog(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map(role => (
                  <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {filteredUsers.length} users
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                User Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>2FA</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRoleBadge(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          <Badge className={getStatusBadge(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.twoFactorEnabled ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user)
                              setEditUserDialog(true)
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? (
                              <Lock className="w-4 h-4" />
                            ) : (
                              <Unlock className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          {/* Roles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{role.name}</h3>
                      <Badge className={role.color}>
                        {role.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Permissions:</div>
                      <div className="text-sm text-gray-600">
                        {role.permissions.length} permission{role.permissions.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {['content', 'media', 'users', 'system', 'publishing'].map(category => (
                  <div key={category}>
                    <h3 className="font-medium capitalize mb-3">{category} Permissions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getPermissionsByCategory(category).map((permission) => (
                        <div key={permission.id} className="p-3 border rounded-lg">
                          <div className="font-medium">{permission.name}</div>
                          <div className="text-sm text-gray-600">{permission.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create User Dialog */}
      <Dialog open={createUserDialog} onOpenChange={setCreateUserDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Add a new user account with appropriate permissions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter username"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newUser.role} onValueChange={(value: any) => setNewUser(prev => ({ ...prev, role: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Custom Permissions</Label>
              <div className="space-y-4 mt-2">
                {['content', 'media', 'users', 'system', 'publishing'].map(category => (
                  <div key={category}>
                    <h4 className="font-medium capitalize mb-2">{category} Permissions</h4>
                    <div className="space-y-2">
                      {getPermissionsByCategory(category).map((permission) => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.id}
                            checked={newUser.permissions.includes(permission.id)}
                            onCheckedChange={() => handleTogglePermission(permission.id)}
                          />
                          <Label htmlFor={permission.id} className="text-sm">
                            {permission.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setCreateUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>
              Create User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user account settings and permissions
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-username">Username</Label>
                  <Input
                    id="edit-username"
                    value={selectedUser.username}
                    onChange={(e) => setSelectedUser(prev => prev ? { ...prev, username: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select 
                  value={selectedUser.role} 
                  onValueChange={(value: any) => setSelectedUser(prev => prev ? { ...prev, role: value } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (selectedUser) {
                handleUpdateUser(selectedUser.id, selectedUser)
                setEditUserDialog(false)
              }
            }}>
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
