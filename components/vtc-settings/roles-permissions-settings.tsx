"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Plus, Edit, Trash2, Users, Settings } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"

interface Role {
  id: string
  name: string
  color: string
  permissions: string[]
  memberCount: number
  isDefault?: boolean
}

const availablePermissions = [
  { id: "manage_vtc", name: "Manage VTC", category: "Administration" },
  { id: "manage_users", name: "Manage Users", category: "Administration" },
  { id: "manage_roles", name: "Manage Roles", category: "Administration" },
  { id: "view_analytics", name: "View Analytics", category: "Analytics" },
  { id: "manage_jobs", name: "Manage Jobs", category: "Jobs" },
  { id: "create_jobs", name: "Create Jobs", category: "Jobs" },
  { id: "assign_jobs", name: "Assign Jobs", category: "Jobs" },
  { id: "manage_fleet", name: "Manage Fleet", category: "Fleet" },
  { id: "manage_events", name: "Manage Events", category: "Events" },
  { id: "create_events", name: "Create Events", category: "Events" },
  { id: "moderate_chat", name: "Moderate Chat", category: "Moderation" },
  { id: "view_logs", name: "View Audit Logs", category: "Moderation" },
]

const defaultRoles: Role[] = [
  {
    id: "owner",
    name: "Owner",
    color: "#DC2626",
    permissions: availablePermissions.map(p => p.id),
    memberCount: 1,
    isDefault: true,
  },
  {
    id: "manager",
    name: "Manager",
    color: "#EA580C",
    permissions: [
      "manage_users",
      "manage_jobs",
      "create_jobs",
      "assign_jobs",
      "manage_events",
      "create_events",
      "view_analytics",
    ],
    memberCount: 3,
  },
  {
    id: "dispatcher",
    name: "Dispatcher",
    color: "#CA8A04",
    permissions: [
      "create_jobs",
      "assign_jobs",
      "manage_events",
      "create_events",
    ],
    memberCount: 5,
  },
  {
    id: "driver",
    name: "Driver",
    color: "#16A34A",
    permissions: [],
    memberCount: 47,
    isDefault: true,
  },
]

export function RolesPermissionsSettings() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>(defaultRoles)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleColor, setNewRoleColor] = useState("#8B5CF6")

  const groupedPermissions = availablePermissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = []
      }
      acc[permission.category].push(permission)
      return acc
    },
    {} as Record<string, typeof availablePermissions>
  )

  const handleSaveRole = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(
        roles.map(r => (r.id === selectedRole.id ? selectedRole : r))
      )
      toast({
        title: "Role Updated",
        description: `The ${selectedRole.name} role has been updated.`,
      })
    } else {
      // Create new role
      const newRole: Role = {
        id: Date.now().toString(),
        name: newRoleName,
        color: newRoleColor,
        permissions: [],
        memberCount: 0,
      }
      setRoles([...roles, newRole])
      toast({ title: "Role Created", description: `The ${newRoleName} role has been created.` })
    }
    setSelectedRole(null)
    setIsCreateDialogOpen(false)
    setNewRoleName("")
    setNewRoleColor("#8B5CF6")
  }

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(role => role.id !== roleId))
    toast({
      title: "Role Deleted",
      description: "The role has been successfully deleted.",
    })
  }

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Not Implemented",
      description: `${featureName} is not yet available.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Roles & Permissions</h2>
        <p className="text-muted-foreground">
          Configure user roles and access control for your VTC.
        </p>
      </div>

      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Roles Overview
              </CardTitle>
              <CardDescription>
                Manage roles and their permissions within your VTC.
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    Define a new role with specific permissions for your VTC.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Input
                    placeholder="Role name"
                    value={newRoleName}
                    onChange={e => setNewRoleName(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <Label>Role Color</Label>
                    <Input
                      type="color"
                      value={newRoleColor}
                      onChange={e => setNewRoleColor(e.target.value)}
                      className="w-16"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveRole}>Create Role</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map(role => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: role.color }}
                      />
                      <span className="font-medium">{role.name}</span>
                      {role.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {role.memberCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions.length} permissions
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRole(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {!role.isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteRole(role.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      {selectedRole && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Role: {selectedRole.name}</CardTitle>
            <CardDescription>Configure permissions for this role.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(groupedPermissions).map(
              ([category, permissions]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    {category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {permissions.map(permission => (
                      <div
                        key={permission.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{permission.name}</div>
                        </div>
                        <Switch
                          checked={selectedRole.permissions.includes(
                            permission.id
                          )}
                          onCheckedChange={checked => {
                            const updatedPermissions = checked
                              ? [...selectedRole.permissions, permission.id]
                              : selectedRole.permissions.filter(
                                  p => p !== permission.id
                                )
                            setSelectedRole({
                              ...selectedRole,
                              permissions: updatedPermissions,
                            })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedRole(null)}>
                Cancel
              </Button>
              <Button onClick={handleSaveRole}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discord Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Discord Integration</CardTitle>
          <CardDescription>Sync roles with your Discord server.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="font-medium">Discord Role Sync</div>
              <div className="text-sm text-muted-foreground">
                Automatically assign Discord roles based on VTC roles
              </div>
            </div>
            <Switch
              onClick={() => handleFeatureClick("Discord Role Sync")}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => handleFeatureClick("Configure Discord Mapping")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configure Discord Mapping
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
