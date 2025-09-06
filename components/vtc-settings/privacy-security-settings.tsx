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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Shield,
  Lock,
  Eye,
  Key,
  UserCheck,
  AlertTriangle,
  Download,
  Trash2,
  RefreshCw,
  Save,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function PrivacySecuritySettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    privacy: {
      publicProfile: true,
      showMemberList: true,
      showStatistics: false,
      allowApplications: true,
      requireApproval: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipWhitelist: false,
      auditLogging: true,
      dataEncryption: true,
    },
    dataRetention: {
      jobHistory: 365,
      telemetryData: 90,
      auditLogs: 180,
      userSessions: 30,
    },
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Mobile App API",
      key: "vtc_live_••••••••••••••••",
      created: "2024-01-10",
      lastUsed: "2024-01-15",
      permissions: ["read:jobs", "read:drivers", "write:telemetry"],
    },
    {
      id: "2",
      name: "Discord Bot",
      key: "vtc_bot_••••••••••••••••",
      created: "2024-01-05",
      lastUsed: "2024-01-15",
      permissions: ["read:all", "write:notifications"],
    },
  ])

  const updateSetting = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings)
    toast({
      title: "Settings Saved",
      description: "Your privacy and security settings have been successfully updated.",
    })
  }

  const handleGenerateApiKey = () => {
    const newApiKey = {
      id: `${apiKeys.length + 1}`,
      name: "New API Key",
      key: `vtc_live_••••••••••••••••${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "Never",
      permissions: ["read:all"],
    }
    setApiKeys([...apiKeys, newApiKey])
    toast({ title: "API Key Generated", description: "A new API key has been successfully generated." })
  }

  const handleExportData = (dataType: string) => {
    toast({
      title: "Exporting Data",
      description: `Your ${dataType} data export has been initiated. You will receive a notification when it's ready for download.`,
    })
  }

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "Feature Not Implemented",
      description: `${featureName} is not yet available.`,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-bold text-foreground">
          Privacy & Security
        </h3>
        <p className="text-muted-foreground">
          Manage your VTC's privacy settings and security configuration
        </p>
      </div>

      <Tabs defaultValue="privacy" className="space-y-6">
        <TabsList className="glass">
          <TabsTrigger value="privacy">Privacy Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Eye className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Public Visibility</CardTitle>
                  <CardDescription>
                    Control what information is publicly visible
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow your VTC to be discovered publicly
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.publicProfile}
                  onCheckedChange={checked =>
                    updateSetting("privacy", "publicProfile", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Member List</Label>
                  <p className="text-sm text-muted-foreground">
                    Display member list on public profile
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showMemberList}
                  onCheckedChange={checked =>
                    updateSetting("privacy", "showMemberList", checked)
                  }
                  disabled={!settings.privacy.publicProfile}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Statistics</Label>
                  <p className="text-sm text-muted-foreground">
                    Display VTC statistics publicly
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.showStatistics}
                  onCheckedChange={checked =>
                    updateSetting("privacy", "showStatistics", checked)
                  }
                  disabled={!settings.privacy.publicProfile}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <UserCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Member Applications</CardTitle>
                  <CardDescription>
                    Configure how new members can join
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Applications</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept new member applications
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.allowApplications}
                  onCheckedChange={checked =>
                    updateSetting("privacy", "allowApplications", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Manually approve all applications
                  </p>
                </div>
                <Switch
                  checked={settings.privacy.requireApproval}
                  onCheckedChange={checked =>
                    updateSetting("privacy", "requireApproval", checked)
                  }
                  disabled={!settings.privacy.allowApplications}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Alert className="glass border-yellow-500/20">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription>
              Security settings affect all VTC members. Changes may require
              re-authentication.
            </AlertDescription>
          </Alert>

          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Shield className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    Configure authentication and access controls
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin accounts
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={checked =>
                    updateSetting("security", "twoFactorAuth", checked)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={e =>
                    updateSetting(
                      "security",
                      "sessionTimeout",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-32"
                />
                <p className="text-sm text-muted-foreground">
                  Automatically log out inactive users
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>IP Whitelist</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict access to specific IP addresses
                  </p>
                </div>
                <Switch
                  checked={settings.security.ipWhitelist}
                  onCheckedChange={checked =>
                    updateSetting("security", "ipWhitelist", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Lock className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>Data Protection</CardTitle>
                  <CardDescription>
                    Configure data encryption and logging
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all administrative actions
                  </p>
                </div>
                <Switch
                  checked={settings.security.auditLogging}
                  onCheckedChange={checked =>
                    updateSetting("security", "auditLogging", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt sensitive data at rest
                  </p>
                </div>
                <Switch
                  checked={settings.security.dataEncryption}
                  onCheckedChange={checked =>
                    updateSetting("security", "dataEncryption", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">API Keys</h4>
              <p className="text-sm text-muted-foreground">
                Manage API keys for integrations and applications
              </p>
            </div>
            <Button
              className="gradient-border hover-lift"
              onClick={handleGenerateApiKey}
            >
              <Key className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>

          <div className="grid gap-4">
            {apiKeys.map(apiKey => (
              <Card key={apiKey.id} className="glass hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{apiKey.name}</h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        {apiKey.key}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created: {apiKey.created}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {apiKey.permissions.map(permission => (
                          <Badge
                            key={permission}
                            variant="secondary"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift bg-transparent"
                        onClick={() => handleFeatureClick("Refresh Key")}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift bg-transparent"
                        onClick={() => handleFeatureClick("Delete Key")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>
                Configure how long different types of data are stored
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Job History (days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetention.jobHistory}
                    onChange={e =>
                      updateSetting(
                        "dataRetention",
                        "jobHistory",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Telemetry Data (days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetention.telemetryData}
                    onChange={e =>
                      updateSetting(
                        "dataRetention",
                        "telemetryData",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Audit Logs (days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetention.auditLogs}
                    onChange={e =>
                      updateSetting(
                        "dataRetention",
                        "auditLogs",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>User Sessions (days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetention.userSessions}
                    onChange={e =>
                      updateSetting(
                        "dataRetention",
                        "userSessions",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>
                Export your VTC data for backup or migration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleExportData("Member Data")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Member Data
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleExportData("Job History")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Job History
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleExportData("Statistics")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Statistics
                </Button>
                <Button
                  variant="outline"
                  className="hover-lift bg-transparent"
                  onClick={() => handleExportData("All Data")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="hover-lift bg-transparent"
          onClick={() => handleFeatureClick("Cancel")}
        >
          Cancel
        </Button>
        <Button
          className="gradient-border hover-lift"
          onClick={handleSaveSettings}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
